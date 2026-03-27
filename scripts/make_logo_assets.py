"""Generate transparent PNGs: full trim + monogram crop from source logo."""
from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "images" / "menna-logo.png"
OUT_FULL = ROOT / "images" / "menna-lockup-transparent.png"
OUT_MONO = ROOT / "images" / "menna-monogram.png"


def main() -> None:
    img = Image.open(SRC).convert("RGBA")
    arr = np.array(img)
    h, w = arr.shape[:2]

    corners = np.stack(
        [
            arr[0, 0][:3],
            arr[0, w - 1][:3],
            arr[h - 1, 0][:3],
            arr[h - 1, w - 1][:3],
        ]
    )
    bg = np.mean(corners, axis=0).astype(np.float32)

    diff = np.abs(arr[:, :, :3].astype(np.float32) - bg.reshape(1, 1, 3))
    dist = np.sum(diff, axis=2)
    thresh = 42
    mask = dist < thresh * 3
    arr = arr.copy()
    arr[mask, 3] = 0

    cleaned = Image.fromarray(arr, mode="RGBA")
    bbox = cleaned.getbbox()
    if not bbox:
        raise SystemExit("No content after background removal")
    trimmed = cleaned.crop(bbox)
    trimmed.save(OUT_FULL, optimize=True)

    tw, th = trimmed.size
    mono_h = max(int(th * 0.4), 1)
    monogram = trimmed.crop((0, 0, tw, mono_h))
    mono_bbox = monogram.getbbox()
    if mono_bbox:
        monogram = monogram.crop(mono_bbox)
    monogram.save(OUT_MONO, optimize=True)

    print("Wrote", OUT_FULL.relative_to(ROOT), trimmed.size)
    print("Wrote", OUT_MONO.relative_to(ROOT), monogram.size)


if __name__ == "__main__":
    main()
