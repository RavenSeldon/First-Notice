# First Notice

A proposed Canadian protocol for early notification of AI-agent incidents, tested against the documented June–September 2026 Australian case. Mangrove Middle Powers Hackathon · Canada · Track A (Regulation).

**Live:** https://benamuwo.me/first-notice/ (English; `?lang=fr` for French)

> What changes is the account, never the record.

## Run
```bash
npm ci
npm test              # 48 acceptance tests (deterministic, simulated clock)
npm run dev           # local app
npm run brief         # assemble docs/FIRST-NOTICE-BRIEF.md with references
npm run build         # static build in dist/
./scripts/deploy.sh   # publish (see DEPLOY.md)
```

## The five views
1. **The record:** a day-scale ruler of the Australian case, from access (18 June) to the first technical exchange (22 September).
2. **Case files:** five affected organizations with differing notification histories.
3. **Notice lab:** counterfactual and synthetic notices through the protocol, with a simulated clock, acknowledgment, updates, corrections and a downloadable record.
4. **Findings:** existing Canadian rules, the gap, the full policy brief (printable), limits, and project materials.
5. **Evidence:** the searchable ledger, with each claim's passage, date precision and qualification.

## Structure
- `evidence/ledger.csv`: **C01–C24**, each with a verbatim supporting passage. Australian sources: ministerial transcripts and OpenAI's account. Canadian sources: GC Cyber Security Event Management Plan (C15, C16, C19, C24), the ISED consultation (C10), the AI for All strategy (C21). Also the OECD framework (C17) and Australian critical-infrastructure rules (C18).
- `src/domain/`: the protocol engine (triage, sender verification, routing, append-only event log).
- `src/data/`: documented cases citing ledger IDs; labelled counterfactual and synthetic fixtures.
- `content/brief/`: the author's policy brief, in five sections (`fr/` holds the French).
- `docs/`: [acceptance checklist](docs/ACCEPTANCE.md), [AI-assistance log](docs/AI_ASSISTANCE_LOG.md), [limitations](docs/LIMITATIONS.md), [writing kit](docs/POLICY_WRITING_KIT.md).

## Evidence categories
**Documented** cites the ledger. **Counterfactual** replays the documented case under the proposed rules, with its assumptions listed. **Synthetic** is invented to test failure. No real government system is contacted, and sender verification is simulated, not cryptographic.

## Prior work
[Schrödinger's Civilization](https://benamuwo.me/schrodingers_civ/) predates this hackathon and inspired its approach to provenance.
