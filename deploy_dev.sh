#!/usr/bin/env bash

npm run build
rsync -avz -e "ssh -p43221" dist/*  root@tentop.com.cn:/data/yinxinapp/
