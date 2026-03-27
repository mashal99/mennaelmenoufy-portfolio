#!/usr/bin/env python3
"""Crop sheet title blocks and rotate Apple Store CAD slides to landscape."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

# Output height in pixels (before rotation): crop just above NAME / ID / TA strip.
# Tuned per sheet from row-ink analysis on source JPEGs.
CROP_HEIGHT = {
    "img_p003_005.jpeg": 785,
    "img_p003_006.jpeg": 788,
    "img_p003_007.jpeg": 805,
    "img_p003_008.jpeg": 788,
}


def main() -> None:
    root = Path(__file__).resolve().parents[1]
    assets = root / "images" / "extracted" / "menna-portfolio-assets"
    for name, crop_h in CROP_HEIGHT.items():
        path = assets / name
        if not path.is_file():
            raise SystemExit(f"Missing: {path}")
        im = Image.open(path).convert("RGB")
        w, h = im.size
        target_h = min(crop_h, h)
        im = im.crop((0, 0, w, target_h))
        # Clockwise 90° (landscape): drawing reads correctly on screen.
        im = im.rotate(-90, expand=True, fillcolor=(255, 255, 255))
        im.save(path, quality=95, optimize=True)
        print(f"Updated {name} → landscape {im.size}")


if __name__ == "__main__":
    main()
