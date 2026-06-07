#!/bin/bash
# Usage: ./ship.sh "commit message"
# Copies working file to index.html, stamps version, pushes to GitHub Pages.
MSG="${1:-update}"
cp Vietnam-15-Days-offline.html index.html

# Stamp a unique version in index.html so CDN always fetches fresh
STAMP=$(date +%s)
sed -i '' "s/<!-- v:[0-9]* -->//" index.html
echo "<!-- v:$STAMP -->" >> index.html

git add index.html
git commit -m "$MSG

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
git push origin main
echo ""
echo "Deployed. Wait 2 min then open:"
echo "https://fuoco-guide.github.io/unknown-route-vietnam/?v=$STAMP"
