---
title: "tapi.js"
description: "An open-source TypeScript library that maps raw JSON and API responses into strongly-typed objects."
logo: "/assets/images/projects/tapi-logo.webp"
banner: "/assets/images/projects/tapi-js-bg.svg"
brand_color: "#e8820c"
featured: true
category: "open-source"
status: "active"
external_url: "https://tapi.js.org"
repo_url: "https://github.com/sinisimattia/tapi"
---

tapi.js is a small open-source JS/TS package I created for turning raw JSON — typically
API responses — into strongly-typed class instances. Instead of scattering manual parsing
and casting across a codebase, you describe how a response maps to your classes once and
let tapi handle the conversion, with customizable rules for the awkward cases.

## Highlights

- **Strongly typed** — raw JSON comes out the other side as real, typed class instances.
- **Customizable mapping** — control how fields map, including nested and renamed properties.
- **Runs anywhere** — works across Node, the browser, and Deno, and ships on npm as `tapi.js`.

It's GPL-3.0 licensed and open to contributions.
