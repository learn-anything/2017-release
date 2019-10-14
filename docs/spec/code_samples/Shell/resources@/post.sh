curl -X POST \
  'https://learn-anything.xyz/api/resources/' \
  -H "Authorization:Bearer $access_token" \
  -H "Content-Type:application/json" \
  -d @resource.json
