#!/usr/bin/env sh
npm run build
cp CNAME dist
npm run deploy
