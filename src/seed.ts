/**
 * Ontology v0.1 — seed data.
 *
 * Hand-curated seed entries that prove the data model end-to-end across
 * all eight layers. Real, citable, and small enough to read in one sitting.
 * Future versions expand authority by authority.
 *
 * Apache-2.0. Copyright (c) 2026 Regunav Inc.
 */
import type {
  Authority, Obligation, Control, EvidenceObject, ArchitectureRequirement,
  PolicyAsCode, Ontology,
} from "./types.js";

export const ONTOLOGY_VERSION = "0.1.0";

// ─── 1. Authority Document Layer ───────────────────────────────────────
export const AUTHORITIES: readonly Authority[] = [
  { id: "eu-ai-act@2024-1689", shortName: "EU AI Act", title: "Regulation (EU) 2024/1689 on Artificial Intelligence",
    publisher: "European Parliament + Council", jurisdiction: ["EU","EEA"], version: "2024-1689",
    publishedAt: "2024-07-12", inForceFrom: "2024-08-01", applicableFrom: "2026-08-02",
    url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj", citation: "EU AI Act 2024/1689", category: "ai-regulation" },
  { id: "iso-42001@2023", shortName: "ISO/IEC 42001", title: "Information technology — Artificial intelligence — Management system",
    publisher: "ISO/IEC", jurisdiction: ["GLOBAL"], version: "2023",
    publishedAt: "2023-12-18", url: "https://www.iso.org/standard/81230.html",
    citation: "ISO/IEC 42001:2023", category: "industry-standard" },
  { id: "iso-27001@2022", shortName: "ISO/IEC 27001", title: "Information security management systems — Requirements",
    publisher: "ISO/IEC", jurisdiction: ["GLOBAL"], version: "2022",
    publishedAt: "2022-10-25", url: "https://www.iso.org/standard/27001",
    citation: "ISO/IEC 27001:2022", category: "industry-standard" },
  { id: "gdpr@2016-679", shortName: "GDPR", title: "Regulation (EU) 2016/679 — General Data Protection Regulation",
    publisher: "European Parliament + Council", jurisdiction: ["EU","EEA"], version: "2016-679",
    publishedAt: "2016-04-27", inForceFrom: "2018-05-25", applicableFrom: "2018-05-25",
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj", citation: "GDPR 2016/679", category: "data-protection" },
  { id: "soc2@2017", shortName: "SOC 2", title: "Trust Services Criteria",
    publisher: "AICPA", jurisdiction: ["US","GLOBAL"], version: "2017 (revised 2022)",
    publishedAt: "2017-04-15", url: "https://www.aicpa.org/topic/audit-assurance/audit-and-assurance-greater-than-soc-2",
    citation: "SOC 2 TSC 2017", category: "industry-standard" },
  { id: "dora@2022-2554", shortName: "DORA", title: "Regulation (EU) 2022/2554 — Digital Operational Resilience Act",
    publisher: "European Parliament + Council", jurisdiction: ["EU","EEA"], version: "2022-2554",
    publishedAt: "2022-12-14", inForceFrom: "2023-01-16", applicableFrom: "2025-01-17",
    url: "https://eur-lex.europa.eu/eli/reg/2022/2554/oj", citation: "DORA 2022/2554", category: "financial-services" },
  { id: "nist-ai-rmf@1.0", shortName: "NIST AI RMF", title: "Artificial Intelligence Risk Management Framework 1.0",
    publisher: "NIST", jurisdiction: ["US","GLOBAL"], version: "1.0",
    publishedAt: "2023-01-26", url: "https://www.nist.gov/itl/ai-risk-management-framework",
    citation: "NIST AI RMF 1.0", category: "industry-standard" },
  { id: "pci-dss@4.0.1", shortName: "PCI DSS", title: "Payment Card Industry Data Security Standard",
    publisher: "PCI Security Standards Council", jurisdiction: ["GLOBAL"], version: "4.0.1",
    publishedAt: "2024-06-13", url: "https://www.pcisecuritystandards.org/document_library/",
    citation: "PCI DSS 4.0.1", category: "industry-standard" },
  { id: "hipaa@1996", shortName: "HIPAA", title: "Health Insurance Portability and Accountability Act + HITECH",
    publisher: "US Congress + HHS OCR", jurisdiction: ["US"], version: "1996 (amended)",
    publishedAt: "1996-08-21", url: "https://www.hhs.gov/hipaa", citation: "HIPAA 1996",
    category: "healthcare" },
];

// ─── 2. Obligation Layer (canonical, framework-neutral) ────────────────
export const OBLIGATIONS: readonly Obligation[] = [
  { id: "OBL-PRIV-ACCESS-001", title: "Right of access to personal data", category: "privacy",
    statement: "Data subjects must be able to obtain confirmation that their personal data is being processed and access that data + metadata.",
    originatingClauses: [
      { authorityId: "gdpr@2016-679", clause: "Art. 15", url: "https://gdpr-info.eu/art-15-gdpr/" },
      { authorityId: "hipaa@1996", clause: "§164.524" },
    ] },
  { id: "OBL-PRIV-ERASURE-001", title: "Right to erasure", category: "privacy",
    statement: "Data subjects must be able to request deletion of their personal data subject to lawful exemptions.",
    originatingClauses: [
      { authorityId: "gdpr@2016-679", clause: "Art. 17" },
    ] },
  { id: "OBL-AI-FRIA-001", title: "Fundamental-rights impact assessment for high-risk AI", category: "ai-risk",
    statement: "Deployers of high-risk AI systems must perform a FRIA before deployment in the EU market.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 27" },
    ] },
  { id: "OBL-AI-RISK-MGMT-001", title: "AI risk-management system", category: "ai-risk",
    statement: "Providers of high-risk AI systems must establish and maintain a continuous risk-management system across the AI lifecycle.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 9" },
      { authorityId: "iso-42001@2023", clause: "§6.1" },
      { authorityId: "nist-ai-rmf@1.0", clause: "MAP-1" },
    ] },
  { id: "OBL-AI-DATA-GOV-001", title: "Training data governance + bias mitigation", category: "data-governance",
    statement: "Training, validation and test datasets must be relevant, representative, free of errors and assessed for bias.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 10" },
      { authorityId: "nist-ai-rmf@1.0", clause: "MEASURE-2.11" },
    ] },
  { id: "OBL-AI-LOGGING-001", title: "AI system event logging", category: "ai-risk",
    statement: "High-risk AI systems must automatically record events ensuring traceability of operation, impact and post-market monitoring.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 12" },
    ] },
  { id: "OBL-AI-OVERSIGHT-001", title: "Human oversight of high-risk AI", category: "human-oversight",
    statement: "High-risk AI systems must be designed to be effectively overseen by natural persons during use.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 14" },
      { authorityId: "iso-42001@2023", clause: "§7.4" },
    ] },
  { id: "OBL-AI-LITERACY-001", title: "AI literacy training of staff", category: "training",
    statement: "Providers and deployers must ensure their staff have an adequate level of AI literacy proportionate to their role.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 4" },
    ] },
  { id: "OBL-IAM-ACCESS-REVIEW-001", title: "Periodic access review", category: "security",
    statement: "Privileged access must be reviewed at a defined cadence, with results documented and remediated.",
    originatingClauses: [
      { authorityId: "iso-27001@2022", clause: "A.5.18" },
      { authorityId: "soc2@2017", clause: "CC6.3" },
      { authorityId: "pci-dss@4.0.1", clause: "Req. 7.2" },
    ] },
  { id: "OBL-INC-72H-001", title: "Personal-data breach notification within 72 hours", category: "incident-response",
    statement: "Personal-data breaches must be notified to the supervisory authority without undue delay and within 72 hours of awareness.",
    originatingClauses: [
      { authorityId: "gdpr@2016-679", clause: "Art. 33" },
    ] },
  { id: "OBL-AI-INC-REPORT-001", title: "Serious-incident reporting for AI systems", category: "incident-response",
    statement: "Providers of high-risk AI systems must report serious incidents to the market-surveillance authority.",
    originatingClauses: [
      { authorityId: "eu-ai-act@2024-1689", clause: "Art. 73" },
    ] },
  { id: "OBL-DORA-ICT-INC-001", title: "Major ICT-related incident reporting", category: "incident-response",
    statement: "Financial entities must report major ICT-related incidents to the competent authority.",
    originatingClauses: [
      { authorityId: "dora@2022-2554", clause: "Art. 19" },
    ] },
];

// ─── 3. Common Control Layer ───────────────────────────────────────────
export const CONTROLS: readonly Control[] = [
  { id: "CTRL-IAM-ACCESS-REVIEW-001", title: "Quarterly privileged-access review", category: "identity-access",
    statement: "Privileged accounts and roles are reviewed every 90 days. Removals are tracked through an approval workflow.",
    satisfies: ["OBL-IAM-ACCESS-REVIEW-001"],
    crosswalk: [
      { framework: "ISO 27001", ref: "A.5.18" },
      { framework: "SOC 2", ref: "CC6.3" },
      { framework: "PCI DSS", ref: "Req. 7.2" },
      { framework: "NIST CSF", ref: "PR.AA-05" },
    ] },
  { id: "CTRL-INC-RESPONSE-72H-001", title: "Personal-data-breach 72h response runbook", category: "incident-response",
    statement: "Documented runbook + tabletop drill + paging chain that triggers GDPR Art. 33 notification within 72 hours of awareness.",
    satisfies: ["OBL-INC-72H-001", "OBL-AI-INC-REPORT-001", "OBL-DORA-ICT-INC-001"],
    crosswalk: [
      { framework: "GDPR", ref: "Art. 33" },
      { framework: "EU AI Act", ref: "Art. 73" },
      { framework: "DORA", ref: "Art. 19" },
      { framework: "ISO 27001", ref: "A.5.24, A.5.26" },
    ] },
  { id: "CTRL-AI-FRIA-AUTHORING-001", title: "FRIA authoring + sign-off workflow", category: "ai-system-governance",
    statement: "Every high-risk AI system has a FRIA authored, reviewed and signed off before deployment, version-controlled per system.",
    satisfies: ["OBL-AI-FRIA-001", "OBL-AI-RISK-MGMT-001"],
    crosswalk: [
      { framework: "EU AI Act", ref: "Art. 27" },
      { framework: "ISO 42001", ref: "§8.2" },
    ] },
  { id: "CTRL-AI-EVENT-LOG-001", title: "Automatic AI-system event logging", category: "logging-monitoring",
    statement: "AI systems automatically emit structured events to an immutable WORM log: input class, output, confidence, oversight action, model version.",
    satisfies: ["OBL-AI-LOGGING-001"],
    crosswalk: [
      { framework: "EU AI Act", ref: "Art. 12" },
      { framework: "ISO 42001", ref: "§9.1" },
    ] },
  { id: "CTRL-AI-DATA-GOV-001", title: "Training-data governance + bias-test gating", category: "ai-system-governance",
    statement: "Datasets pass the bias-test engine + lineage capture before any training run promotes to production.",
    satisfies: ["OBL-AI-DATA-GOV-001"],
    crosswalk: [
      { framework: "EU AI Act", ref: "Art. 10" },
      { framework: "NIST AI RMF", ref: "MEASURE-2.11" },
      { framework: "ISO 42001", ref: "§7.4" },
    ] },
  { id: "CTRL-AI-LITERACY-001", title: "Annual AI-literacy training register", category: "training",
    statement: "Every staff member touching AI completes a role-specific AI-literacy module annually; completions tracked via the training-records rail.",
    satisfies: ["OBL-AI-LITERACY-001"],
    crosswalk: [{ framework: "EU AI Act", ref: "Art. 4" }] },
];

// ─── 4. Evidence Layer ────────────────────────────────────────────────
export const EVIDENCE: readonly EvidenceObject[] = [
  { id: "EV-IAM-001", title: "Privileged access review report", forControl: "CTRL-IAM-ACCESS-REVIEW-001",
    type: "access-review", owner: "Security Admin",
    source: ["IAM provider", "HRIS", "Ticketing"], frequency: "quarterly", retentionYears: 6 },
  { id: "EV-INC-001", title: "Incident response runbook + tabletop record", forControl: "CTRL-INC-RESPONSE-72H-001",
    type: "procedure", owner: "Incident Commander",
    source: ["Confluence/Notion", "PagerDuty post-mortems"], frequency: "annual", retentionYears: 7 },
  { id: "EV-INC-002", title: "Regulator notification draft + timestamp", forControl: "CTRL-INC-RESPONSE-72H-001",
    type: "incident-record", owner: "DPO",
    source: ["incident-disclosures rail"], frequency: "on-event", retentionYears: 7 },
  { id: "EV-FRIA-001", title: "FRIA report — signed", forControl: "CTRL-AI-FRIA-AUTHORING-001",
    type: "fria", owner: "AI Risk Owner",
    source: ["FRIA agent output", "approver chain"], frequency: "on-event", retentionYears: 10 },
  { id: "EV-AI-LOG-001", title: "AI-system event-log retention attestation", forControl: "CTRL-AI-EVENT-LOG-001",
    type: "audit-trail-export", owner: "Platform SRE",
    source: ["audit-trail rail", "OLAP warehouse"], frequency: "monthly", retentionYears: 10 },
  { id: "EV-DATA-GOV-001", title: "Bias-test results + dataset card", forControl: "CTRL-AI-DATA-GOV-001",
    type: "report", owner: "ML Platform Lead",
    source: ["bias-tester engine", "data-lineage engine"], frequency: "on-event", retentionYears: 10 },
  { id: "EV-DATA-GOV-002", title: "Dataset card (Datasheets-for-Datasets)", forControl: "CTRL-AI-DATA-GOV-001",
    type: "data-card", owner: "Data Steward",
    source: ["data-lineage rail"], frequency: "on-event", retentionYears: 10 },
  { id: "EV-TRAINING-001", title: "AI-literacy training register export", forControl: "CTRL-AI-LITERACY-001",
    type: "training-record", owner: "People Ops",
    source: ["training-records rail"], frequency: "monthly", retentionYears: 5 },
];

// ─── 5. Software Architecture Layer ───────────────────────────────────
export const ARCHITECTURE: readonly ArchitectureRequirement[] = [
  { id: "ARCH-IAM-001", forControl: "CTRL-IAM-ACCESS-REVIEW-001",
    title: "RBAC/ABAC policy engine + scheduled review job",
    capability: "rbac-abac-policy-engine",
    statement: "System enforces RBAC/ABAC at every boundary, with a scheduled job that emits review tasks every 90 days.",
    patterns: [
      { cloud: "any", summary: "Cerbos PEP at every API gateway + Edge worker", stack: ["Cerbos Hub", "Cloudflare Workers"] },
      { cloud: "aws", summary: "Cognito + Verified Permissions (Cedar) + EventBridge cron", stack: ["AWS Cedar", "EventBridge"] },
    ],
    verification: "Synthetic privileged user → review task auto-created in next cycle." },
  { id: "ARCH-IAM-002", forControl: "CTRL-IAM-ACCESS-REVIEW-001",
    title: "Approval workflow",
    capability: "approval-workflow",
    statement: "Removal/grant requests follow a documented multi-party approval chain, surfaced in dashboard + audit trail.",
    patterns: [{ cloud: "any", summary: "Hierarchy rail (TeamMembership) + policy-lifecycle rail" }] },
  { id: "ARCH-INC-001", forControl: "CTRL-INC-RESPONSE-72H-001",
    title: "Immutable audit log + paging chain",
    capability: "immutable-audit-log",
    statement: "WORM audit trail (append-only, hash-chained) + on-call paging that triggers within 5 minutes of breach detection.",
    patterns: [{ cloud: "any", summary: "audit-trail rail (R2 + ClickHouse) + PagerDuty integration" }],
    verification: "Tabletop drill emits the regulator-shaped notification draft within the deadline." },
  { id: "ARCH-AI-LOG-001", forControl: "CTRL-AI-EVENT-LOG-001",
    title: "AI-system event collector",
    capability: "tenant-aware-identity",
    statement: "Every AI inference emits a tenant-scoped, structured event with input class, output, confidence, model version.",
    patterns: [{ cloud: "any", summary: "audit-trail rail with `kind: ai-inference` events; OLAP-queryable" }] },
  { id: "ARCH-AI-FRIA-001", forControl: "CTRL-AI-FRIA-AUTHORING-001",
    title: "FRIA agent + approver chain",
    capability: "ai-system-registry",
    statement: "AI system registry triggers a FRIA agent run on every new high-risk system; FRIA goes through documented approver chain.",
    patterns: [{ cloud: "any", summary: "ai-systems rail + agents rail + policy-lifecycle approvals" }] },
  { id: "ARCH-DATA-GOV-001", forControl: "CTRL-AI-DATA-GOV-001",
    title: "Bias-test gate + lineage capture",
    capability: "data-lineage",
    statement: "No training run is promoted to production without a passing bias-test report + lineage trace.",
    patterns: [{ cloud: "any", summary: "bias-tester engine + data-lineage engine + gate in deploy.yml" }] },
];

// ─── 6. Policy-as-Code Layer ───────────────────────────────────────────
export const POLICIES: readonly PolicyAsCode[] = [
  { id: "POL-IAM-PRIV-001", forControl: "CTRL-IAM-ACCESS-REVIEW-001", engine: "cerbos",
    decisionType: "abac", evidenceRequired: true,
    bundleUri: "config/cerbos/policies/iam-priv.yaml",
    testFixtures: ["config/cerbos/tests/iam-priv.yaml"] },
  { id: "POL-AI-FRIA-001", forControl: "CTRL-AI-FRIA-AUTHORING-001", engine: "cerbos",
    decisionType: "obligation", evidenceRequired: true,
    bundleUri: "config/cerbos/policies/ai-fria.yaml",
    testFixtures: ["config/cerbos/tests/ai-fria.yaml"] },
  { id: "POL-INC-72H-001", forControl: "CTRL-INC-RESPONSE-72H-001", engine: "cerbos",
    decisionType: "obligation", evidenceRequired: true,
    bundleUri: "config/cerbos/policies/incident-72h.yaml",
    testFixtures: ["config/cerbos/tests/incident-72h.yaml"] },
];

export const ONTOLOGY: Ontology = {
  version: ONTOLOGY_VERSION,
  authorities: AUTHORITIES,
  obligations: OBLIGATIONS,
  controls: CONTROLS,
  evidence: EVIDENCE,
  architecture: ARCHITECTURE,
  policies: POLICIES,
};
