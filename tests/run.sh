#!/usr/bin/env bash
cd "${0%/*}"

node ../index.js --out "./out.simple.pdf" "file://$(pwd)/test.html"
node ../index.js --out "./out.scale.pdf" --scale 2 --width "2cm" "file://$(pwd)/test.html"
node ../index.js --out "./out.A6.pdf" --format 'A6' "file://$(pwd)/test.html"
node ../index.js --out "./out.header.pdf" --displayHeaderFooter --headerTemplate '<span class="date"></span>' --marginTop "2cm"  "file://$(pwd)/test.html"
