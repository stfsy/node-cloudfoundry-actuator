#!/bin/bash

npm outdated
npm update
npm test
git add .
git commit -m "feat: update dependencies"
git push origin master