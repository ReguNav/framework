/**
 * @regunav/ontology — Compliance-to-Architecture Framework™
 *
 * The Universal Compliance Ontology. Eight typed layers that turn the chaos
 * of "ISO maps to GDPR" into an executable graph from regulation → control
 * → evidence → software architecture → policy-as-code → audit trail →
 * AI governance.
 *
 * This package is INTENTIONALLY minimal in surface — types + IDs + queries
 * only. The data lives in @regunav/ontology-seed (next package) and the
 * HTTP surface is mounted by services/api/src/routes/ontology.ts.
 *
 * The framework is published openly (Apache-2.0) — the engine that runs
 * on it is the commercial product. See SPEC.md for the public framework
 * specification.
 *
 * Apache-2.0. Copyright (c) 2026 Regunav Inc.
 */

// ─── 1. Authority Document Layer ───────────────────────────────────────
/** A regulatory or standards document we track as a source of truth. */
export interface Authority {
  readonly id: string;                  // "eu-ai-act@2024-1689"
  readonly shortName: string;           // "EU AI Act"
  readonly title: string;               // "Regulation (EU) 2024/1689"
  readonly publisher: string;           // "European Parliament + Council"
  readonly jurisdiction: readonly string[];   // ["EU", "EEA"]
  readonly version: string;             // "2024-1689"
  readonly publishedAt: string;         // ISO date
  readonly inForceFrom?: string;        // ISO date
  readonly applicableFrom?: string;     // ISO date — different from publication
  readonly url: string;                 // canonical URL
  readonly citation: string;            // "EU AI Act 2024/1689"
  readonly category: AuthorityCategory;
}

export type AuthorityCategory =
  | "ai-regulation"
  | "data-protection"
  | "information-security"
  | "financial-services"
  | "healthcare"
  | "sector-specific"
  | "industry-standard";

// ─── 2. Obligation Layer ───────────────────────────────────────────────
/** A canonical, framework-neutral obligation. Multiple authority clauses
 *  can map to the same obligation. */
export interface Obligation {
  readonly id: string;                  // "OBL-PRIV-ACCESS-001"
  readonly title: string;               // "Right of access to personal data"
  readonly statement: string;           // Plain-language imperative
  readonly category: ObligationCategory;
  /** Source clauses that originate / reinforce this obligation. */
  readonly originatingClauses: readonly ClauseRef[];
}

export type ObligationCategory =
  | "privacy"
  | "security"
  | "ai-risk"
  | "incident-response"
  | "vendor-risk"
  | "data-governance"
  | "human-oversight"
  | "transparency"
  | "training"
  | "audit"
  | "continuity";

export interface ClauseRef {
  readonly authorityId: string;         // "eu-ai-act@2024-1689"
  readonly clause: string;              // "Art. 27" or "A.5.18"
  readonly url?: string;
}

// ─── 3. Common Control Layer ───────────────────────────────────────────
/** Reusable control. Multiple obligations can require the same control. */
export interface Control {
  readonly id: string;                  // "CTRL-IAM-ACCESS-REVIEW-001"
  readonly title: string;               // "Periodic privileged-access review"
  readonly statement: string;
  readonly category: ControlCategory;
  /** Obligations this control fully or partially satisfies. */
  readonly satisfies: readonly string[];
  /** ISO 27001 Annex A / SOC 2 TSC / NIST CSF / etc. cross-references. */
  readonly crosswalk: readonly { framework: string; ref: string }[];
}

export type ControlCategory =
  | "identity-access"
  | "data-protection"
  | "encryption"
  | "logging-monitoring"
  | "incident-response"
  | "change-management"
  | "vulnerability-management"
  | "vendor-management"
  | "physical-security"
  | "ai-system-governance"
  | "training"
  | "business-continuity";

// ─── 4. Evidence Layer ─────────────────────────────────────────────────
/** A typed evidence object that proves a control. */
export interface EvidenceObject {
  readonly id: string;                  // "EV-IAM-001"
  readonly title: string;
  readonly forControl: string;          // Control.id
  readonly type: EvidenceType;
  readonly owner: string;               // role, e.g. "Security Admin"
  readonly source: readonly string[];   // systems / artefact stores
  readonly frequency: EvidenceFrequency;
  readonly retentionYears: number;
  readonly schemaUri?: string;          // JSON Schema for the artefact body
}

export type EvidenceType =
  | "policy"
  | "procedure"
  | "log"
  | "report"
  | "screenshot"
  | "attestation"
  | "configuration"
  | "training-record"
  | "incident-record"
  | "fria"
  | "dpia"
  | "contract"
  | "model-card"
  | "data-card"
  | "audit-trail-export"
  | "access-review";

export type EvidenceFrequency = "continuous" | "daily" | "weekly" | "monthly" | "quarterly" | "annual" | "on-event";

// ─── 5. Software Architecture Layer (the strong differentiator) ───────
/** A concrete architecture requirement that implements a control. */
export interface ArchitectureRequirement {
  readonly id: string;                  // "ARCH-IAM-001"
  readonly forControl: string;          // Control.id
  readonly title: string;
  readonly capability: ArchitectureCapability;
  readonly statement: string;           // What the system must do
  /** Reference implementation patterns (cloud / on-prem / hybrid). */
  readonly patterns: readonly ImplementationPattern[];
  /** Test that verifies the capability is in place. */
  readonly verification?: string;
}

export type ArchitectureCapability =
  | "rbac-abac-policy-engine"
  | "immutable-audit-log"
  | "tenant-aware-identity"
  | "approval-workflow"
  | "evidence-export-endpoint"
  | "log-retention-policy"
  | "encryption-at-rest"
  | "encryption-in-transit"
  | "key-rotation"
  | "secret-vault"
  | "incident-runbook"
  | "ai-system-registry"
  | "model-card-publisher"
  | "drift-detector"
  | "dlp-redaction"
  | "sso-mfa"
  | "scim-provisioning"
  | "byok-byoc"
  | "data-lineage";

export interface ImplementationPattern {
  readonly cloud: "any" | "aws" | "azure" | "gcp" | "cloudflare" | "on-prem";
  readonly summary: string;
  readonly stack?: readonly string[];   // ["Cerbos", "OPA", "Cedar", ...]
  readonly notes?: string;
}

// ─── 6. Policy-as-Code Layer ───────────────────────────────────────────
/** A compiled policy that enforces a control at runtime. */
export interface PolicyAsCode {
  readonly id: string;                  // "POL-IAM-PRIV-001"
  readonly forControl: string;          // Control.id
  readonly engine: "cerbos" | "opa" | "cedar" | "casbin";
  readonly decisionType: "allow_deny" | "abac" | "rbac" | "obligation";
  readonly bundleUri?: string;          // where the bundle is published
  readonly evidenceRequired: boolean;   // whether decisions emit evidence
  readonly testFixtures: readonly string[]; // YAML/JSON fixture URIs
}

// ─── 7. Audit Trail Layer ──────────────────────────────────────────────
/** A control's runtime audit record — the "who owns what, when did it pass". */
export interface AuditTrailLink {
  readonly controlId: string;
  readonly controlOwner: string;        // person / role
  readonly evidenceOwner: string;
  readonly systemOwner: string;
  readonly testFrequency: EvidenceFrequency;
  readonly lastTestedAt?: string;
  readonly lastResult?: "pass" | "fail" | "partial" | "not-tested";
  readonly linkedRiskIds: readonly string[];
  readonly linkedPolicyIds: readonly string[];
  readonly linkedAssetIds: readonly string[];
  readonly linkedVendorIds: readonly string[];
  readonly linkedAiSystemIds: readonly string[];
}

// ─── 8. AI Governance Layer ────────────────────────────────────────────
/** AI-specific governance metadata layered on top of the rest. */
export interface AiSystemGovernance {
  readonly aiSystemId: string;
  readonly intendedPurpose: string;
  readonly riskClassification: "minimal" | "limited" | "high-risk" | "prohibited" | "gpai";
  readonly euAiActAnnex?: "annex-iii-row-1" | "annex-iii-row-2" | "annex-iii-row-3" | "annex-iii-row-4" | "annex-iii-row-5" | "annex-iii-row-6" | "annex-iii-row-7" | "annex-iii-row-8" | "art-5-prohibited" | "art-50-transparency" | "n/a";
  /** ISO 42001 + EU AI Act roles. A given party can hold multiple. */
  readonly roles: readonly AiActorRole[];
  readonly dataGovernance: {
    readonly trainingDatasets: readonly string[]; // dataset IDs
    readonly biasTested: boolean;
    readonly lineageDocumented: boolean;
  };
  readonly humanOversight: "approve-each" | "review-batches" | "exception-only" | "none";
  readonly modelMonitoring: {
    readonly driftDetection: boolean;
    readonly performanceTracking: boolean;
    readonly incidentLog: boolean;
  };
  readonly postMarketMonitoring: {
    readonly enabled: boolean;
    readonly cadence: EvidenceFrequency;
  };
  readonly conformityEvidenceIds: readonly string[];
  readonly modelChangeLog: readonly { version: string; at: string; summary: string }[];
}

export type AiActorRole = "provider" | "deployer" | "importer" | "distributor" | "authorized-representative";

// ─── Compose: the full ontology graph ──────────────────────────────────
export interface Ontology {
  readonly version: string;             // ontology version itself
  readonly authorities: readonly Authority[];
  readonly obligations: readonly Obligation[];
  readonly controls: readonly Control[];
  readonly evidence: readonly EvidenceObject[];
  readonly architecture: readonly ArchitectureRequirement[];
  readonly policies: readonly PolicyAsCode[];
}

// ─── Snapshots / queries ───────────────────────────────────────────────
export interface OntologySnapshot {
  readonly version: string;
  readonly counts: {
    readonly authorities: number;
    readonly obligations: number;
    readonly controls: number;
    readonly evidence: number;
    readonly architecture: number;
    readonly policies: number;
  };
  readonly coverage: {
    /** % of obligations that have at least one control. */
    readonly obligationCoverage: number;
    /** % of controls with at least one evidence object. */
    readonly evidenceCoverage: number;
    /** % of controls with at least one architecture pattern. */
    readonly architectureCoverage: number;
    /** % of controls with at least one policy-as-code binding. */
    readonly policyCoverage: number;
  };
  readonly generatedAt: string;
}
