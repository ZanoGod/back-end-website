const API_URL = "http://localhost:8080/api";

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  token?: string;
  user?: any;
}

const handleResponse = async (response: Response): Promise<ApiResponse> => {
  const text = await response.text();

  try {
    const result = JSON.parse(text);
    // Backend returns token and user inside data object
    if (result.success && result.data) {
      const user = result.data.user;
      // Map backend field names to frontend expected format
      const mappedUser = {
        ...user,
        firstName: user.first_name,
        lastName: user.last_name,
      };
      return {
        success: result.success,
        message: result.message,
        token: result.data.token,
        user: mappedUser,
      };
    }
    return result;
  } catch (error) {
    console.error("API Response Error:", text);
    return {
      success: false,
      message: "Server error. Please check backend configuration.",
      data: null,
    };
  }
};

export const authApi = {
  async login(data: LoginData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return await handleResponse(response);
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  },

  async signup(data: SignupData): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/signup.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      return await handleResponse(response);
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  },

  async logout(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/logout.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      return await handleResponse(response);
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  },

  async getDashboard(): Promise<ApiResponse> {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/dashboard.php`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return await handleResponse(response);
    } catch (error) {
      return { success: false, message: "Network error. Please try again." };
    }
  },
};
