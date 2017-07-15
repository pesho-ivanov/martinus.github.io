#!/bin/bash

# find youngest /tmp/Flash* file
STR=`find /tmp/ -maxdepth 1 -iname "Flash*" -links 1`
if [ -z "$STR" ]; then
	echo "nothing found"
	exit
fi

if [ -n "$1" ]; then
	cd "$1"
fi

# extract first file
for FILE in `ls --sort=time $STR`; do
	break
done

totem $FILE

OUTFILE=`zenity --file-selection --save --confirm-overwrite --title "Saving $FILE"`
if [ -z "$OUTFILE" ]; then
	exit
fi

# link to it
ln "$FILE" "$OUTFILE"
chmod 644 "$OUTFILE"
