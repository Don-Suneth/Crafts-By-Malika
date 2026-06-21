# Fonts

## Fraunces (`fraunces-latin.woff2`)

Self-hosted display serif used for major headings only (body text uses the system
sans-serif stack, so no second web font is loaded).

- **Family:** Fraunces (variable, optical-size + weight axes)
- **Subset:** Latin (`U+0000–00FF` etc.) — covers the site's English copy
- **Source:** Google Fonts (`fonts.gstatic.com`), v38, fetched once and stored here
  so the site works offline and from `file://` with no external request.
- **Licence:** SIL Open Font License 1.1 — free to use, embed and self-host.
  Copyright © The Fraunces Project Authors (https://github.com/undercasetype/Fraunces).
  Full licence: https://openfontlicense.org and the project repository above.

To update: re-fetch the latin-subset woff2 from the Google Fonts CSS2 API for
`Fraunces` (with a modern browser User-Agent) and replace this file. If the file is
ever missing, headings gracefully fall back to the `Georgia, serif` stack.
