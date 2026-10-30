# First Notice

A proposed AI-incident notification protocol for Canada, demonstrated against the documented June–September 2026 Australian case. Mangrove Middle Powers Hackathon · Canada · Track A (Regulation).

> What changes is the account, never the record.

## Run
```bash
npm install
npm test        # acceptance tests (deterministic, simulated clock)
npm run dev     # local app
npm run build   # static build in dist/
```

## Structure
- `evidence/ledger.csv`: the frozen evidence ledger (C01–C18), with a verbatim passage for every claim. The app parses this file directly rather than retyping it.
- `src/domain/`: the typed protocol engine (triage, sender verification, routing, append-only event log, JSON export).
- `src/data/`: documented case files (cite ledger IDs), plus clearly labelled counterfactual and synthetic fixtures.
- `src/views/`: The record · Case files · Notice lab · Findings.
- `tests/acceptance/`: historical integrity, triage, verification, workflow clocks, audit.

## Evidence categories
**Documented** = cites the ledger. **Counterfactual** = the documented case replayed under the proposed protocol, with its assumptions listed. **Synthetic** = invented failure cases. No real government systems are contacted.
