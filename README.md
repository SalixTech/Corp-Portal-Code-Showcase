# Salix Corp Portal — Enterprise Multi-Tenant Access & RBAC Architecture

A curated architectural showcase demonstrating enterprise-grade Role-Based Access Control (RBAC), multi-tenant organization feature entitlement, and migration-resilient permission models built for the Salix / Trip Master corporate platform[cite: 6].

This repository highlights selected implementation modules—specifically focusing on pure permission resolution, hierarchical authorization overlays, domain contract design, and staged lifecycle transition policies[cite: 6].

---

### Core Engineering Competencies Demonstrated

- **Hierarchical RBAC & Explicit Overrides:** Deterministic resolution combining base roles (`DRIVER`, etc.) and corporate administrative tiers (`corpRoles`), with explicit grant and denial handling (`permissionGrants`, `permissionDenials`) where denials take strict precedence[cite: 6, 7].
- **Tenant-Level Feature Entitlements:** Dynamic capability gating that validates user-level permissions against an organization's active feature set (`permissionsAllowedByFeatures`) while preserving immutable platform baselines (`TRIP_MASTER_STANDARD`)[cite: 6, 7].
- **Tenant & Account Lifecycle Enforcement:** Fail-closed access revocation that zeroes effective permissions if either the user profile or the parent organization is marked inactive[cite: 6, 7].
- **Zero-Downtime Migration Resilience:** Backward-compatible evaluation branches that support legacy flat permissions and transitional unassigned-organization states without causing user lockouts during schema upgrades[cite: 6, 7].
- **State Transition & Lifecycle Policies:** Deterministic lifecycle contracts (`betaApprovalPolicy.ts`) enforcing compliance checks, tenant eligibility requirements, and strict expiration deadlines[cite: 6].
- **Strongly Typed Domain Contracts:** Comprehensive TypeScript interfaces for multi-tenant organizational hierarchies, operator assignments, audit logs, and compliance records[cite: 6].
- **Accessible UI Primitives:** Controlled interface components with document listener cleanup, outside-click/Escape dismissal, and client-side preference persistence[cite: 6].

---

### Tech Stack & Architecture

- **Language & Runtime:** TypeScript (Strict Mode), React, Node.js[cite: 1, 6]
- **Design Pattern:** Pure Functional Policy Engine (Business logic completely decoupled from presentation, network, and storage side effects)[cite: 6, 7]
- **Target Platform:** Multi-tenant Next.js enterprise portal (`corp.salixtechnologies.com`)

---

### Architecture & Reading Guide

| Module / Path | Domain | Architectural Highlight |
| :--- | :--- | :--- |
| [`lib/effectiveAccess.ts`](lib/effectiveAccess.ts)[cite: 6] | **Permission Resolution Engine** | Evaluates role defaults, explicit grants/denials, tenant feature entitlements, lifecycle status, and legacy migration branches[cite: 6, 7]. |
| [`lib/rolePresets.ts`](lib/rolePresets.ts)[cite: 6] | **RBAC Hierarchy Modeling** | Deduplicated composition of base operational roles and corporate administrative presets[cite: 6, 7]. |
| [`lib/organizationFeatures.ts`](lib/organizationFeatures.ts)[cite: 6] | **Tenant Entitlements** | Declarative mapping linking organization-purchased feature modules to granular permission sets[cite: 6, 7]. |
| [`lib/permissions.ts`](lib/permissions.ts)[cite: 6] | **Training & Override Delegation** | Domain-specific permission derivation governing safety, compliance, and training waivers[cite: 6]. |
| [`lib/betaApprovalPolicy.ts`](lib/betaApprovalPolicy.ts)[cite: 6] | **Lifecycle State Machines** | Staged, pure state transition contracts enforcing compliance validation, tenant eligibility, and strict expiration deadlines[cite: 6]. |
| [`types/access.ts`](types/access.ts)[cite: 6]<br>[`types/corporate.ts`](types/corporate.ts)[cite: 6]<br>[`types/training.ts`](types/training.ts)[cite: 6] | **Enterprise Domain Schemas** | Strongly-typed domain models defining multi-tenant organizational trees, operator assignments, audit logs, and training records[cite: 6, 7]. |
| [`components/CorpDropdown.tsx`](components/CorpDropdown.tsx)[cite: 6]<br>[`components/ThemeToggle.tsx`](components/ThemeToggle.tsx)[cite: 6] | **Controlled UI Primitives** | Controlled selection state, outside-click/Escape keyboard dismissal with listener cleanup, and local preference persistence[cite: 6]. |
| [`lib/format.ts`](lib/format.ts)[cite: 6] | **Data Presentation** | Shared formatting utilities for localized dates and USD currency presentation[cite: 6]. |

---

### Architectural Design Decisions & Isolation Scope

- **Pure Business Logic:** Access evaluation functions are implemented as pure, side-effect-free helpers, making them deterministic, simple to unit-test, and portable across client, edge, and server runtimes[cite: 6, 7].
- **Migration Resilience:** Preserves dedicated fallback branches for historical accounts and transitional organization records, guaranteeing uninterrupted platform access during database cutovers[cite: 6, 7].
- **Data Protection & Sanitization:** All partner identifiers have been abstracted to generic `PARTNER_*` enums[cite: 6]. No live credentials, database connection strings, or production customer records are included[cite: 6].
- **Showcase Boundaries:** This repository isolates the application policy and domain logic for architectural code review; complete production configurations, routing layers, and backend databases are intentionally omitted[cite: 6].

---

### Rights

No open-source license is granted by this showcase[cite: 6]. Inclusion of source does not grant reuse or redistribution rights[cite: 6].
