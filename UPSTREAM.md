# Upstream provenance

## Pinned sources

- Original repository: `https://github.com/Yu9191/wloc` (deleted)
- Community restoration: `https://github.com/xepes0/wloc`
- Restoration commit: `7f28c5e4fb6b802862988735b92e5c800382f2a2`
- Recovered original baseline: `529fcd841952571e79f40faf2d3e0ef90a7bdfa6`
- Reviewed integration source: `https://github.com/xweiba/location-spoofer`
- Reviewed integration commit: `f4712f7fb2df5e64d07233cbd0400b2ea1ac8420`

## Included file integrity

| File | SHA-256 |
| --- | --- |
| `scripts/wloc.js` | `a1b361e60f0b434585260fb59c65d1ddbe3bff89ace3639f592e7d8af432b3c1` |
| `scripts/wloc-settings.js` | `cbff047a7f42055615ee19e208ddfc2ec66833e6f2b75555eac84f1c299a66cf` |
| `LICENSE` | `8486a10c4393cee1c25392769ddd3b2d6c242d6ec7928e1414efff7dfb2f07ef` |

The three files above are byte-for-byte copies from the reviewed integration source. Local changes are limited to module packaging, expanded hostname matching, documentation, and tests.

## Maintenance rule

Do not replace the vendored scripts without verifying license, provenance, Shadowrocket compatibility, hashes, save/query behavior, and WLOC response behavior. Run `npm test` after every change.
