# ReguNav Compliance-to-Architecture Framework™

**Version 0.1** · published as an open specification under Apache-2.0.

A machine-readable control, evidence and architecture ontology for regulated
AI, data and software systems.

> The navigation layer between regulation, controls, software architecture
> and audit evidence.

---

## Why this exists

Most companies have:

- legal teams reading regulations,
- compliance teams building spreadsheets,
- engineers building systems without knowing control intent,
- auditors asking for evidence,
- vendors producing random documents,
- AI teams deploying models with weak governance.

These groups speak different vocabularies. Compliance-to-Architecture is the
shared graph that lets each group ask the question they care about and get
an answer the others can verify.

## Scope of v0.1

This specification covers eight typed layers that combine into a single
graph. Implementations are free to extend any layer; they SHOULD NOT
remove fields. Optional fields are explicitly marked `?`.

Implementations MUST:

- assign IDs from the canonical prefix space (`OBL-…`, `CTRL-…`, `EV-…`,
  `ARCH-…`, `POL-…`).
- treat every relationship as an immutable, versioned edge with provenance.
- expose the entire graph through a JSON API that mirrors the type
  definitions in [`src/types.ts`](src/types.ts).
- treat any deviation from a published authority's text as a derivative
  obligation with explicit reasoning, not a silent rewrite.

## The eight layers

### 1. Authority Document Layer
Each regulation, standard or contract that obligates someone is registered
as an `Authority`. Each Authority carries a precise version identifier
(`pci-dss@4.0.1`, `eu-ai-act@2024-1689`, `iso-42001@2023`). Versioning is
mandatory because authority text changes.

### 2. Obligation Layer
Authority clauses are decomposed into canonical, framework-neutral
`Obligation`s. An obligation can be satisfied by one or more controls. The
same obligation can originate in multiple authority clauses — e.g.
"periodic privileged access review" is reinforced by ISO 27001 A.5.18,
SOC 2 CC6.3, and PCI DSS Req. 7.2.

### 3. Common Control Layer
Reusable `Control`s are mapped to obligations. Controls carry a
`crosswalk` array — the explicit list of framework references they cover.
This is what lets ReguNav answer "if I implement CTRL-IAM-ACCESS-REVIEW-001,
which audit clauses am I done with?" — instantly.

### 4. Evidence Layer
Each control's runtime proof is an `EvidenceObject` with: type, owner,
source systems, frequency, retention, and (optionally) a JSON Schema for
the artefact body.

### 5. Software Architecture Layer
The strongest differentiator. Each control declares one or more
`ArchitectureRequirement`s — concrete capabilities the software must have
(RBAC/ABAC engine, immutable audit log, tenant-aware identity, approval
workflow, evidence-export endpoint, drift detector, …). Every requirement
ships with reference patterns per cloud (AWS / Azure / GCP / Cloudflare /
on-prem).

### 6. Policy-as-Code Layer
Each control points at one or more `PolicyAsCode` bundles — Cerbos / OPA /
Cedar / Casbin policies that enforce the control at runtime. Bundles
declare their decision type (`allow_deny` / `abac` / `rbac` / `obligation`)
and whether a passing decision must emit evidence.

### 7. Audit Trail Layer
For each control, a runtime `AuditTrailLink` answers: who owns it, who
owns the evidence, who owns the system, how often is it tested, when did
it last pass, what risks/policies/assets/vendors/AI systems are linked.

### 8. AI Governance Layer
On top of layers 1-7, AI systems carry an `AiSystemGovernance` record:
intended purpose, risk classification (per EU AI Act Art. 6 + Annex III),
ISO 42001 actor role, training-data lineage + bias-test results, human
oversight model, model-monitoring posture, post-market monitoring cadence,
and the model change log.

## What's free, what's paid

**Free / open** (this repository):
- This specification.
- Control taxonomy + sample mappings.
- The seed dataset in [`src/seed.ts`](src/seed.ts) (≈ 9 authorities, 12
  obligations, 6 controls, 8 evidence objects, 6 architecture requirements,
  3 policies — small but end-to-end).
- JSON Schema samples for every evidence type.
- Public whitepaper draft (this file).

**Paid** (the ReguNav SaaS):
- Full machine-readable mappings (every clause across every authority).
- Authoritative crosswalks across all 13 frameworks.
- API access for programmatic queries.
- SaaS dashboards (customer + admin).
- Gap analysis from your current evidence to any target authority.
- Evidence pack generator (auditor-defensible, with hash-chain).
- Regulation-to-architecture mapper.
- AI-system compliance classifier.
- Vendor-document ingestion + auto-mapping to obligations.
- Audit-ready report templates (Board / CISO / Auditor / Regulator).
- Change monitoring when standards update.

## Versioning

The framework follows SemVer. Backwards-incompatible changes bump the
major. Adding optional fields or new authorities is a minor bump. Fixing
typos or expanding examples is a patch.

The current authority versions tracked in v0.1:

- `eu-ai-act@2024-1689` (in force 1 Aug 2024, applicable 2 Aug 2026 for high-risk)
- `iso-42001@2023`
- `iso-27001@2022`
- `gdpr@2016-679`
- `soc2@2017` (revised 2022)
- `dora@2022-2554` (applicable 17 Jan 2025)
- `nist-ai-rmf@1.0`
- `pci-dss@4.0.1` (June 2024 limited revision)
- `hipaa@1996` (amended)

## How to extend

1. Open a PR against `packages/ontology/src/seed.ts` adding your authority,
   obligation, control, evidence, architecture or policy.
2. Cite the source clause inline.
3. Run `pnpm --filter @regunav/ontology build` — it will fail loudly if
   you violate the type contract.
4. The merged change auto-deploys to the public `/v1/ontology` API surface
   on `api.regunav.com` and ships in the next ReguNav release.

## Citing the framework

> ReguNav Compliance-to-Architecture Framework™, v0.1 (2026).
> Regunav Inc. https://regunav.com/framework

## Trademark

ReguNav™ is a trademark of Regunav Inc. The framework is published openly
under Apache-2.0; the trademark is reserved for use by the maintainer in
authoritative releases. Forks may use the data but should not invoke the
trademark.
