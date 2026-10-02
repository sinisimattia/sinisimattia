---
title: "Regula"
description: "An open-source Laravel starter template for enterprise-grade applications, built on Domain-Driven Design, strict standards, and AI agent support."
logo: "/assets/images/projects/regula-logo.webp"
show_title: false
banner: "/assets/images/projects/regula-bg.svg"
brand_color: "#290087"
featured: true
category: "personal"
tags: ["open-source"]
status: "active"
repo_url: "https://github.com/sinisimattia/regula"
---

Regula is a production-grade Laravel 13 foundation I put together so new backends can skip
the plumbing and start with the product. It deliberately ships with no product of its own:
what you get is everything a serious backend needs before its first feature. That means
accounts and sessions, an admin panel, queues, logging, infrastructure, a test suite, CI,
and a set of written standards that a machine checks on every pull request.

It's aimed at large teams and solo developers alike who care about long-term maintainability.

## Highlights

- **Auth, done.** Registration, email verification, login, token refresh, password reset and
  two-phase account deletion, all behind a dual Sanctum token pair.
- **Domain modules.** Business logic lives in self-contained domains with entities, services
  behind interfaces, private repositories and their own docs.
- **A self-enforcing canon.** Every rule a machine can check is checked by
  `php artisan canon:check`, and the build fails on any single violation.
- **Filament 5 admin.** An admin panel with roles and permissions, ready out of the box.
- **Runs anywhere.** The same code runs on a laptop, a self-hosted server or AWS (via CDK),
  and the environment picks every driver.
- **AI-ready.** Specialist agents, workflow skills and a Laravel Boost MCP server, all pointed
  at the same written standards.

The only thing you need to get started is Docker. It's MIT licensed and open to contributions.
