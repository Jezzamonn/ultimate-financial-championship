npm run webpack

rm -rf /tmp/ufc
rm -rf /tmp/ufc.zip
rm -rf build/ufc.zip

mkdir /tmp/ufc

cp *.html /tmp/ufc
mkdir /tmp/ufc/build
cp build/main.bundle.js /tmp/ufc/build/main.bundle.js
cp -r css /tmp/ufc/css
cp -r font /tmp/ufc/font
cp -r sfx /tmp/ufc/sfx
cp -r assets /tmp/ufc/assets/

cd /tmp
zip -r ufc.zip ufc
cd -
cp /tmp/ufc.zip build/ufc.zip