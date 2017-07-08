find . -iname "*.jpg" -exec convert -resize 1280x -strip -interlace Plane -quality 75% {} ../big/{} \;
