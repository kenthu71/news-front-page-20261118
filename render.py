#!/usr/bin/env python3
"""Render page.html (1024x1024) to entry.png with headless Chromium.

Run with the superagent-v7 venv python, which has Playwright installed:
    ~/workspace/superagent-v7/.venv/bin/python render.py
"""
from pathlib import Path

from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
HTML = HERE / "page.html"
OUT = HERE / "entry.png"


def main() -> None:
    with sync_playwright() as pw:
        browser = pw.chromium.launch(
            args=["--use-gl=swiftshader", "--enable-unsafe-swiftshader"]
        )
        page = browser.new_page(
            viewport={"width": 1024, "height": 1024}, device_scale_factor=1
        )
        page.goto(HTML.as_uri())
        page.wait_for_timeout(400)
        page.screenshot(path=str(OUT))  # viewport == page body, 1024x1024
        browser.close()
    print(f"wrote {OUT} ({OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
