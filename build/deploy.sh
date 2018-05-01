#!/bin/bash

cp -TR "./" "../wwwroot/"
cd "../wwwroot"
npm install
npm install --only=production