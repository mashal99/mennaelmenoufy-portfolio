#!/usr/bin/env python3
"""
Extract images from a PDF (embedded bitmaps) and/or render each page to PNG.

Usage:
  .venv/bin/python extract_pdf_assets.py /path/to/portfolio.pdf
  .venv/bin/python extract_pdf_assets.py portfolio.pdf --pages --dpi 200

Outputs go to ./images/extracted/<pdf_stem>/ by default.
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

import fitz


def extract_embedded_images(doc: fitz.Document, out_dir: Path) -> int:
    count = 0
    seen_xref: set[int] = set()
    for page_index in range(len(doc)):
        page = doc[page_index]
        for info in page.get_images(full=True):
            xref = info[0]
            if xref in seen_xref:
                continue
            seen_xref.add(xref)
            try:
                data = doc.extract_image(xref)
            except Exception:
                continue
            img_bytes = data["image"]
            ext = data.get("ext", "png")
            count += 1
            name = f"img_p{page_index + 1:03d}_{count:03d}.{ext}"
            Path(out_dir / name).write_bytes(img_bytes)
    return count


def render_pages(doc: fitz.Document, out_dir: Path, dpi: int) -> int:
    scale = dpi / 72.0
    matrix = fitz.Matrix(scale, scale)
    for i in range(len(doc)):
        page = doc[i]
        pix = page.get_pixmap(matrix=matrix, alpha=False)
        pix.save(str(out_dir / f"page_{i + 1:03d}.png"))
    return len(doc)


def main() -> None:
    parser = argparse.ArgumentParser(description="Extract PDF images / pages for web use.")
    parser.add_argument("pdf", type=Path, help="Path to PDF")
    parser.add_argument(
        "-o",
        "--out",
        type=Path,
        default=None,
        help="Output directory (default: images/extracted/<pdf name>)",
    )
    parser.add_argument(
        "--pages",
        action="store_true",
        help="Also render each full page as PNG (for vector / layout PDFs)",
    )
    parser.add_argument("--dpi", type=int, default=200, help="DPI for --pages (default 200)")
    args = parser.parse_args()

    pdf = args.pdf.expanduser().resolve()
    if not pdf.is_file():
        print(f"File not found: {pdf}", file=sys.stderr)
        sys.exit(1)

    out = args.out
    if out is None:
        out = Path("images") / "extracted" / pdf.stem
    out = out.resolve()
    out.mkdir(parents=True, exist_ok=True)

    doc = fitz.open(pdf)
    try:
        n_img = extract_embedded_images(doc, out)
        print(f"Extracted {n_img} embedded image file(s) → {out}")
        if args.pages:
            pages_dir = out / "pages"
            pages_dir.mkdir(exist_ok=True)
            n_pages = render_pages(doc, pages_dir, args.dpi)
            print(f"Rendered {n_pages} page PNG(s) → {pages_dir} @ {args.dpi} DPI")
    finally:
        doc.close()

    if n_img == 0 and not args.pages:
        print(
            "No embedded bitmaps found. Try again with --pages to export full-page PNGs, "
            "or re-export spreads from your design app as JPG/PNG.",
            file=sys.stderr,
        )


if __name__ == "__main__":
    main()
