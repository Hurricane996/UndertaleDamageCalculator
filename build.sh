mkdir -p dist && 
babel  src -d dist --source-maps --extensions ".ts,.js" && 
cp src/index.html dist/index.nomin.html && 
sass src/index.scss:dist/index.css --style compressed && 
cp src/manifest.json dist/manifest.json && 
pwa-asset-generator src/icon.svg dist/ --favicon --manifest dist/manifest.json --index dist/index.nomin.html --icon-only
minify dist/index.nomin.html > dist/index.html &&
rm dist/index.nomin.html
