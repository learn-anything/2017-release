#!/bin/bash
git submodule update --init
npm install
cd maps
npm install
npm run setup
