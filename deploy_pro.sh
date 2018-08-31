#!/usr/bin/env bash

npm run build
rsync -avz -e "ssh -p43221" dist/index.html  root@tentop.com.cn:/data/www/html/app/
rsync -avz -e "ssh -p43221" dist/static  root@tentop.com.cn:/data/www/html/
