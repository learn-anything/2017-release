#!/bin/bash

node scripts/parseMaps.js
rm -r maps

if [[ -f scripts/utils/.last-update ]]; then
  # Get all maps that changed since last uploaded commit.
  # TODO - update so on dev environment it doesn't fetch
  # the git hash from the .last-update file
  maps=($(
    git diff --name-only $(cat scripts/utils/.last-update) HEAD |
      grep .json |
      grep -v package.json |
      grep -v package-lock.json |
      grep -v scripts/
  ))
else
  # TODO - walk dir and get all maps
  exit
fi

# # Loop all maps and upload to ES.
for map in ${maps[@]}; do
  node scripts/updateMap.js $map
done

# Write hash of last commit
if [[ $NODE_ENV = production ]]; then
  echo $(git rev-parse HEAD) > scripts/utils/.last-update
fi

echo 'Done.'
