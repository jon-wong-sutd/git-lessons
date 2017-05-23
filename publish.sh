#!/usr/bin/env bash

git branch -f gh-pages
git checkout gh-pages

JEKYLL_ENV=production jekyll build --config _config.yml,_build.yml

git rm -rf assets # jquery ignored
rm -rf assets
git rm -rf _data
git rm -rf _includes
git rm -rf _layouts
git rm -rf _posts
git rm -rf _sass
git rm Gemfile* *.yml *.md

mv _site/* .

git add *
git commit -m "Published"
git push -u -f origin gh-pages

git checkout master
