#!/bin/bash
chromium --headless \
  --hide-scrollbars \
  --remote-debugging-port=9222 \
  --disable-gpu &

last_pid=$!
node ./thumbs/server.js
kill $last_pid
