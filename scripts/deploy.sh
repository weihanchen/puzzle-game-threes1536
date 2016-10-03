#!/bin/bash

# config
git config --global user.email "${GITHUB_MAIL}"
git config --global user.name "${GITHUB_USER}"

# build (CHANGE THIS)
npm run gulp 

# deploy
git add .
MESSAGE=`date +\ %Y-%m-%d\ %H:%M:%S`
git commit -m "Site updated:${MESSAGE}"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/weihanchen/puzzle-game-threes1536.git" master:gh-pages > /dev/null 2>&1