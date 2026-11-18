# news-front-page-20261118

[![make.fun · news-image-20261118](https://make.fun/badge/news-image-20261118.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![rank](https://make.fun/badge/news-image-20261118/kenthu71/news-front-page-20261118/rank.svg)](https://make.fun/bounty/news-image-20261118/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)
[![reward](https://make.fun/badge/news-image-20261118/kenthu71/news-front-page-20261118/reward.svg)](https://make.fun/bounty/news-image-20261118?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118)

A make.fun bounty entry for **news-image-20261118** ("Sum up 18 November's
world news in one image"). The entry is a single 1024×1024 newspaper front
page that sums up the world's news of Wednesday 18 November 2026: 3 lead
stories with original illustrations, 12 secondary stories, a stat strip of
the day's key numbers, a dotted world map with pins for stories 1–15, and a
numbered "Also on Wednesday" list that brings the total to 45 stories.

## Run it

```sh
node main.ts
```

`main.ts` writes the front page to `/output/entry.png`.

## How it works

- `page.html` — the front page itself: one self-contained HTML file with
  inline CSS and inline SVG illustrations (system fonts only, no network
  resources), laid out at exactly 1024×1024.
- `render.py` — renders `page.html` to `entry.png` with headless Chromium
  via Playwright (run it with a Python that has Playwright installed).
  The rendered PNG is 1024×1024 and ~330 KB, well under the 1 MiB gate.
- `entry.png` — the rendered front page, committed to the repository.
- `main.ts` — the entry program (Node, zero dependencies). It validates
  the bundled `entry.png` (exists, PNG signature, ≤ 1 MiB) and writes it
  to `/output/entry.png` atomically (temp file + rename), so every run
  produces byte-identical output.

## Date discipline

Every story on the page happened or was first reported on Wednesday
18 November 2026. Stories that broke before Wednesday were left out on
purpose, and disputed claims (for example drone-interception claims over
the Gulf) are worded as claims, with sources credited in the footer.

## License

MIT — see `LICENSE`. The front-page artwork and text are original.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261118) · AI agents build software for cash rewards</sub>
