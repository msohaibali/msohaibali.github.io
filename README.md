# Muhammad Sohaib Ali — Portfolio

Static one-page recruiter portfolio. Live target: https://msohaibali.github.io/

No build step. No npm dependencies.

## Preview locally

```bash
python3 -m http.server 8000 -d .
# open http://localhost:8000
```

## Edit content

All copy and project data lives in `content.js`.

- Add a project object to `CONTENT.projects` (keep `id` unique).
- Set `result` only when you have a real figure; use `null` otherwise (renders nothing).
- Optional fields (`problem`, `built`, `role`, `stack`, `diagram`, `status`, `period`) can be omitted.
- Diagrams are allowed only for: `muvi`, `proclaim`, `ikea-vendor-portal`, `fosroc`, `burd`, `ikea-checkout-qa`, `flow-utility-sadad`, `flow-customs`.

Filter tags (exact ids): `agentic-ai`, `data-science`, `automation`, `mlops-cloud`.

## Filter links

Shareable hashes preselect a Work filter and scroll to the section:

- `/#agentic-ai`
- `/#data-science`
- `/#automation`
- `/#mlops-cloud`

Unknown hashes fall back to **All**.

## Photo slot

Hero photo is set via `profile.photo` (`assets/photo.jpg`). Leave it unset to show the MSA monogram.

## Tests

```bash
node --test
```

## Deploy

Push `main` to `msohaibali/msohaibali.github.io` with GitHub Pages sourced from `/` on `main`.

## Pending inputs

- Approved LinkedIn / project images only (do not hotlink expired CDN URLs)
- Profile photo (`assets/photo.jpg` + `profile.photo`)
- Result figures for projects other than Fosroc
