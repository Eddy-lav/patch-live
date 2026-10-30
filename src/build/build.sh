#!/bin/sh
# Construit le site (GitHub Pages) depuis patch-live.html : usage build.sh <source.html> <dossier de sortie> [clé Dropbox]
set -e
SRC="$1"; OUT="$2"; KEY="${3:-}"; HERE="$(cd "$(dirname "$0")" && pwd)"
mkdir -p "$OUT"
VER=$(sha1sum "$SRC" | cut -c1-10)
{
  printf '<!doctype html>\n<html lang="fr">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n'
  printf '<link rel="manifest" href="manifest.webmanifest">\n<meta name="theme-color" content="#050517">\n<link rel="icon" href="icon-192.png">\n<link rel="apple-touch-icon" href="icon-192.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n'
  printf '<style>*,*::before,*::after{box-sizing:border-box}body{margin:0}[hidden]{display:none!important}</style>\n</head>\n<body>\n'
  sed "s/  const DBX_KEY = \"\";/  const DBX_KEY = \"$KEY\";/" "$SRC"
  printf '\n<script>if ("serviceWorker" in navigator) addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));</script>\n</body>\n</html>\n'
} > "$OUT/index.html"
sed "s/__VER__/$VER/" "$HERE/sw.js" > "$OUT/sw.js"
cp "$HERE/manifest.webmanifest" "$HERE/icon-192.png" "$HERE/icon-512.png" "$OUT/"
touch "$OUT/.nojekyll"
echo "site → $OUT ($VER)"
