#!/bin/bash

# also see https://developers.google.com/speed/docs/insights/OptimizeImages
find . -iname "*.jpg" -exec convert -resize 1280x -gravity center -crop 1280x720+0+0 -sampling-factor 4:2:0  -strip -interlace JPEG -quality 75% {} ../big/{} \;
