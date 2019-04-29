#!/bin/bash
usage="Usage: $(basename "$0") path -- Uploads to the www.jezzamon.com/somepath"

if [ "$#" -ne 1 ]; then
    echo "$usage"
    exit 1
fi

path=$1

# TODO: Update HTML, etc so the path gets updated

gsutil -m cp *.html gs://www.jezzamon.com/$path/
gsutil -m cp build/main.bundle.js gs://www.jezzamon.com/$path/build/main.bundle.js
gsutil -m rsync -r css/ gs://www.jezzamon.com/$path/css/
gsutil -m rsync -r font/ gs://www.jezzamon.com/$path/font/
gsutil -m rsync -r sfx/ gs://www.jezzamon.com/$path/sfx/
gsutil -m rsync -r assets/ gs://www.jezzamon.com/$path/assets/
gsutil -m acl ch -r -u AllUsers:R gs://www.jezzamon.com/$path
