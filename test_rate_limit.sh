#!/bin/bash

echo "Testing Login Rate Limiting"
echo "=========================="

BASE_URL="http://localhost:8080/api"

echo "1. Testing 3 failed login attempts..."

for i in {1..3}; do
    echo "Attempt $i:"
    curl -s -X POST "$BASE_URL/login.php" \
      -H "Content-Type: application/json" \
      -d '{"email":"test@example.com","password":"wrongpassword"}' | \
      python3 -c "import sys, json; data=json.load(sys.stdin); print(f'Success: {data[\"success\"]}, Message: {data[\"message\"]}')"
    sleep 1
done

echo -e "\n2. Testing 4th attempt (should be blocked)..."
curl -s -X POST "$BASE_URL/login.php" \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"wrongpassword"}' | \
  python3 -c "import sys, json; data=json.load(sys.stdin); print(f'Success: {data[\"success\"]}, Message: {data[\"message\"]}')"

echo -e "\n3. Testing valid login (should also be blocked)..."
curl -s -X POST "$BASE_URL/login.php" \
  -H "Content-Type: application/json" \
  -d '{"email":"system@foodfusion.com","password":"system123"}' | \
  python3 -c "import sys, json; data=json.load(sys.stdin); print(f'Success: {data[\"success\"]}, Message: {data[\"message\"]}')"

echo -e "\nRate limiting test completed!"
echo "Wait 3 minutes before trying to login again."