#!/usr/bin/env bash

npm run build
rsync -avz -e "ssh -p3001" dist/index.html  root@lingdao-tech.com:/data/www/html/app/
rsync -avz -e "ssh -p3001" dist/static  root@lingdao-tech.com:/data/www/html/