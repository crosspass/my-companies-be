#!/bin/bash
set -x

yarn build

jsmd5=($(md5sum dist/umi.js))
cssmd5=($(md5sum dist/umi.css))
targetJs="umi-${jsmd5}.js"
targetCss="umi-${cssmd5}.css"

mv dist/umi.js dist/${targetJs}
mv dist/umi.css dist/${targetCss}

sed -i -e /umi.js/s//${targetJs}/ dist/index.html
sed -i -e /umi.css/s//${targetCss}/ dist/index.html

tar -cvf dist.tar dist

scp dist.tar rails:~/

ssh rails "tar -xvf dist.tar;  mv /var/www/my-companies/dist /var/www/my-companies/$(date +%Y%m%d); mv dist /var/www/my-companies/"