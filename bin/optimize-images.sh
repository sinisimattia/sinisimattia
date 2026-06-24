#!/usr/bin/env bash
#
# optimize-images.sh — generate resized WebP versions of the raster images that
# the site serves (blog thumbnails, project logos). The site references only the
# generated .webp files; the original PNG/JPEG sources have been removed from the
# repo to save space. To (re)generate, drop a source raster (e.g. my-thumb.png)
# into assets/images/thumbnails or assets/images/projects and run this script —
# it produces my-thumb.webp next to it. Animated GIFs are left as-is (WebP was
# larger for ours).
#
# Requires: cwebp and gif2webp (Homebrew: `brew install webp`).
# Idempotent: skips a target whose .webp is newer than its source.
#
set -euo pipefail
cd "$(dirname "$0")/.."

command -v cwebp   >/dev/null || { echo "cwebp not found (brew install webp)";   exit 1; }
command -v gif2webp >/dev/null || { echo "gif2webp not found (brew install webp)"; exit 1; }

# Convert one raster to webp. $1=src $2=cwebp resize args (width height; 0 = keep aspect) $3=quality
to_webp() {
  local src="$1" resize="$2" q="$3"
  local out="${src%.*}.webp"
  if [[ -f "$out" && "$out" -nt "$src" ]]; then
    echo "skip   $out (up to date)"
    return
  fi
  cwebp -quiet -q "$q" -resize $resize "$src" -o "$out"
  printf "webp   %-60s %6sK -> %6sK\n" "$out" \
    "$(( $(stat -f%z "$src")  / 1024 ))" \
    "$(( $(stat -f%z "$out") / 1024 ))"
}

echo "== Blog thumbnails (article header + list teaser): max 1440px wide, q80 =="
for f in assets/images/thumbnails/*.png assets/images/thumbnails/*.jpeg; do
  [[ -e "$f" ]] || continue
  to_webp "$f" "1440 0" 80
done

echo "== Animated gif -> animated webp, q75 =="
gif_src="assets/images/thumbnails/anti-patterns-early-optimization.gif"
gif_out="${gif_src%.*}.webp"
if [[ -f "$gif_out" && "$gif_out" -nt "$gif_src" ]]; then
  echo "skip   $gif_out (up to date)"
else
  gif2webp -quiet -q 75 "$gif_src" -o "$gif_out"
  printf "webp   %-60s %6sK -> %6sK\n" "$gif_out" \
    "$(( $(stat -f%z "$gif_src") / 1024 ))" "$(( $(stat -f%z "$gif_out") / 1024 ))"
fi

echo "== Project logos: 140px tall (2x of 56px display), q90 =="
for f in assets/images/projects/*.png; do
  [[ -e "$f" ]] || continue
  to_webp "$f" "0 140" 90
done

echo "Done."
