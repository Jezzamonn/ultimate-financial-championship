npm run webpack

rm -rf /tmp/ufc

mkdir /tmp/ufc

cp *.html /tmp/ufc
cp build/main.bundle.js /tmp/ufc/build/main.bundle.js
cp -r css /tmp/ufc/css
cp -r font /tmp/ufc/font
cp -r sfx /tmp/ufc/sfx
cp -r assets /tmp/ufc/assets/

zip -r build/ufc.zip /tmp/ufc