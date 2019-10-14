curl -X POST \
  'https://learn-anything.xyz/api/votes/' \
  -H "Authorization:Bearer $access_token" \
  -H "Content-Type:application/json" \
  -d @vote.json
