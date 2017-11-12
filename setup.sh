#!/bin/bash
git submodule update --init
npm install
npm run build:d3
cd maps
npm install
npm run setup
