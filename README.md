# Salix Corp Portal — Code Showcase

Selected TypeScript and React source from a corporate administration portal in the Salix / Trip Master ecosystem. This code-only portfolio focuses on how roles, organization features, and explicit permission overrides are represented and combined, alongside a small set of reusable interface components.

**This is a curated source sample, not the full application or a runnable demo.** Original relative paths are preserved. App routes, authentication providers, storage/API integrations, styles, assets, dependency manifests, deployment configuration, and production records are intentionally absent.

## Reading guide

| Start here | What to look for |
| --- | --- |
| [`types/access.ts`](types/access.ts) | Access profiles, effective-access results, and migration-compatible fields. |
| [`lib/rolePresets.ts`](lib/rolePresets.ts) | Base and corporate role permissions combined without duplicates. |
| [`lib/organizationFeatures.ts`](lib/organizationFeatures.ts) | Organization feature-to-permission mapping. |
| [`lib/effectiveAccess.ts`](lib/effectiveAccess.ts) | Role defaults, grants, denials, inactive-state handling, feature filtering, and legacy branches. |
| [`lib/permissions.ts`](lib/permissions.ts) | Training permissions derived from roles and explicit overrides. |
| [`types/corporate.ts`](types/corporate.ts), [`types/training.ts`](types/training.ts) | Domain contracts for organizations, assignments, audit/support workflows, and training records. These are schemas, not customer records. |
| [`lib/betaApprovalPolicy.ts`](lib/betaApprovalPolicy.ts) | A staged, pure approval-transition contract with eligibility checks and lifecycle deadlines. The original implementation-ready flag remains `false`; it is not connected to an API. |
| [`components/CorpDropdown.tsx`](components/CorpDropdown.tsx) | Controlled selection, outside-click/Escape dismissal, and event-listener cleanup. |
| [`components/ThemeToggle.tsx`](components/ThemeToggle.tsx) | Client-side theme state and local preference persistence. |
| [`lib/format.ts`](lib/format.ts) | Shared date and USD currency presentation. |

## Scope and interpretation

The access helpers illustrate application policy modeling; they are **not a standalone authorization system or evidence of server-side enforcement**. In particular, the legacy branch in `resolveEffectiveAccess` returns the legacy permission list based on profile activity without applying organization feature/activity filtering. The migration branch with no organization record permits role-derived permissions. These original behaviors are preserved, not presented as recommended security defaults.

The beta policy is staged code, not a claim of a shipped approval workflow. Its comments describe transaction and authorization obligations for a future caller. UI samples depend on React and styles from the omitted application; browser behavior and accessibility have not been fully audited in this showcase.

## Preparation and verification

- Selected files retain their original implementation. Partner-specific enum names were consistently changed to generic `PARTNER_*` identifiers; no feature logic was added.
- No live credentials, account values, customer records, service endpoints, or backend clients are included. Type fields such as `email` describe data shapes only.
- Preparation checks cover TypeScript compilation of the selected files, local import closure, and focused checks of pure helper behavior. These are showcase-preparation checks, not the original project's test suite or an end-to-end application validation.
- No production configuration or installation instructions are provided: this repository is intended for code review. A working demo is outside this version's scope.

## Rights

No open-source license is granted by this showcase. Inclusion of source does not grant reuse or redistribution rights.
