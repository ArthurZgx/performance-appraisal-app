#!/usr/bin/env bash

npm run build
rsync -avz -e "ssh -p39109" dist/*  bril@110.249.155.61:/var/www/html/yinxin/
