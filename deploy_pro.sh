#!/usr/bin/env bash

npm run build
# rsync -avz -e "ssh -p3005" dist/index.html  root@lingdao-tech.com:/data/www/html/app/
# rsync -avz -e "ssh -p3005" dist/static  root@lingdao-tech.com:/data/www/html/

rsync -avz -e "ssh" dist/* ubuntu@58.87.92.223:/var/www/html/app/
# rsync -avz -e "ssh" dist/* ubuntu@58.87.92.223:/var/www/html/