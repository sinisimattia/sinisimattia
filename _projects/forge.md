---
title: "Forge"
description: "A dependency-free project generator that scaffolds a full-stack TypeScript monorepo with a working identity foundation, written standards, and AI agents."
logo: "/assets/images/projects/forge-logo.webp"
show_title: false
banner: "/assets/images/projects/forge-bg.svg"
brand_color: "#00bf63"
featured: true
category: "personal"
tags: ["open-source"]
status: "active"
repo_url: "https://github.com/sinisimattia/forge"
---

Forge generates new application projects from a single template: an NX monorepo with a
NestJS, TypeORM and PostgreSQL backend, a Nuxt 4 webapp, and a framework-agnostic
`libs/core` domain layer. There are no presets or stack variants, just one template and
one way to generate a project. The generator has zero runtime dependencies.

A generated project isn't a skeleton. It boots, signs people up, verifies their address,
signs them in and out, handles password changes and resets, manages profiles and sessions,
and passes its own gates on the way out of the generator.

## Highlights

- **Identity, done.** Registration, email verification, sign-in/out, password reset,
  profile and session management, plus an append-only audit log.
- **Contracts as tests.** Every domain service port ships an executable conformance suite,
  and the backend runs each one against its own implementation.
- **Ports, not vendors.** Mail leaves through a port. The shipped adapter writes messages
  to disk, so a project works end to end with nothing to sign up for.
- **Enforced layering.** The webapp's Atomic Design component library is checked by a tool,
  not by convention.
- **The "how we work" layer.** An agent roster, single-source standards docs and ADRs come
  with every project. Adopt mode brings just that layer into an existing repository without
  overwriting anything.

Getting started is one command, `npm run create -- --name my-app`, then `npm run dev:up`
for a containerized stack.
