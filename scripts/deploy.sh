#!/bin/bash

# variables
SOURCE_BRANCH="master"
TARGET_BRANCH="gh-pages"
TARGET_FOLDER="public"
GITHUB_REPO="@github.com/weihanchen/puzzle-game-threes1536.git"
FULL_REPO="https://$GITHUB_TOKEN$GITHUB_REPO"

# initial
rm -rf .git/
git init

# config
git config --global user.email "${GITHUB_MAIL}"
git config --global user.name "${GITHUB_USER}"

#deploy
git add .
MESSAGE=`date +\ %Y-%m-%d\ %H:%M:%S`
git commit -m "Site updated:${MESSAGE}"
git push --force "https://${GITHUB_TOKEN}@github.com/weihanchen/puzzle-game-threes1536.git" $SOURCE_BRANCH:$TARGET_BRANCH > /dev/null 2>&1