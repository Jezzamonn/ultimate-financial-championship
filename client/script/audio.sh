rm -rf sfx/
cp -r sfx_source sfx

for file in sfx/*
do
    file="${file%.*}"
    ffmpeg -i "$file".wav -acodec libmp3lame "$file".mp3
    rm "$file".wav
done