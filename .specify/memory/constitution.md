# Two Ball Breakout Static Web App Constitution
<!-- Sync Impact Report is maintained at top of this file. -->

<!--
Version change: 0.0.0 → 1.0.0
Modified principles: N/A (template → concrete)
Added sections: Core Principles, Additional Constraints, Development Workflow, Governance
Removed sections: Template comments and placeholder tokens
Templates requiring updates:
✅ .specify/templates/plan-template.md (footer reference/version label)
✅ .specify/templates/spec-template.md (no conflicting mandates)
✅ .specify/templates/tasks-template.md (aligns with TDD and web structure)
✅ .specify/templates/agent-file-template.md (generic; no change required)
Follow-up TODOs: TODO(RATIFICATION_DATE): Original adoption date unknown; set when known
-->

## Core Principles

### I. Static-First Delivery (NON-NEGOTIABLE)
The application MUST be served as static assets (HTML/CSS/JS) without a
custom backend service. All dynamic needs MUST be satisfied via:
- Pre-rendered content at build time
- Client-side logic
- Third-party APIs with simple, documented contracts

Rationale: Static hosting minimizes cost, operational risk, and complexity.

### II. TDD and Quick Feedback
Tests MUST be authored before implementation for all logic that can be
unit-tested. Critical paths MUST have integration-level checks via headless
browser or DOM tests. CI MUST run tests on every change.

Rationale: Prevents regressions and anchors design in user-observable behavior.

### III. Simplicity over Framework Bloat
Prefer zero/low-dependency solutions. If a framework is used, it MUST justify
bundle size and complexity with measurable benefit. Remove unused dependencies
promptly.

Rationale: Smaller bundles improve performance and maintainability.

## Additional Constraints

- Hosting: Static hosting (e.g., GitHub Pages, Netlify, Vercel static). No
  custom servers.
- Build: Single deterministic build command. Output directory MUST be
  configurable via environment.
- Security: No secret keys in client code. Third-party API calls MUST use
  public-safe tokens or serverless proxies owned by the provider.
- Analytics: Privacy-friendly analytics only; no PII collection.

## Development Workflow

1. Write or update tests for the user-visible change.
2. Implement minimal code to satisfy tests.
3. Run accessibility and performance checks locally.
4. Open PR: CI runs tests, budgets, and linting; require green CI to merge.
5. Deploy via static hosting preview, then promote to production.

## Governance

- Authority: This constitution supersedes other process docs for the static web
  app scope.
- Amendments: Proposals MUST include rationale, impact on budgets and
  accessibility, and migration considerations. Approval requires maintainer
  consensus and version bump according to policy below.
- Versioning Policy: Semantic versioning of this constitution.
  - MAJOR: Backward-incompatible governance or principle changes.
  - MINOR: New principles/sections or material expansions.
  - PATCH: Clarifications and wording fixes only.
- Compliance: PR reviewers MUST verify alignment with principles, workflow, and
  constraints. Deviations require documented justification in the plan's
  Complexity Tracking.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Original adoption date unknown | **Last Amended**: 2025-10-06
<!-- Version: 1.0.0 | Ratified: TODO | Last Amended: 2025-10-06 -->