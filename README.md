# ReguNav Compliance-to-Architecture Framework™

**Version 0.1** · open specification · Apache-2.0

A machine-readable control, evidence and architecture ontology for regulated
AI, data and software systems.

> The navigation layer between regulation, controls, software architecture
> and audit evidence.

- Specification: [SPEC.md](./SPEC.md)
- TypeScript types + seed dataset: [`src/`](./src)
- Live API: <https://api.regunav.com/v1/ontology>
- Public site: <https://framework.regunav.com>
- Commercial implementation (engine + SaaS): <https://regunav.com>

## Quickstart

```ts
import { ONTOLOGY, snapshot, resolveClause } from "@regunav/ontology";

console.log(snapshot(ONTOLOGY));
console.log(resolveClause(ONTOLOGY, "eu-ai-act@2024-1689", "Art. 27"));
```

## Contributing

Open a PR adding your authority / obligation / control / evidence /
architecture / policy. See [SPEC.md §How to extend](./SPEC.md#how-to-extend).

## License

Apache-2.0. ReguNav™ is a trademark of Regunav Inc.

## Cite

> ReguNav Compliance-to-Architecture Framework™, v0.1 (2026).
> Regunav Inc. <https://framework.regunav.com>
