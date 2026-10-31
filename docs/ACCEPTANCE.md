# Acceptance Check

Run on 31 October 2026 against the build that follows commit `599edff`, plus this final pass. **Passed** means checked and passing; **Not tested** means not checked at all, not "probably fine".

## Automated (`npm test`): 48 of 48 passed

| Gate | Result |
|---|---|
| Ledger IDs consecutive, every claim with source URL and verbatim passage | Passed |
| Every citation on the site, in the brief and in the narration exists in the ledger | Passed |
| Five distinct organization cases; AIHW below-threshold and NPWS separately-discovered qualifications | Passed |
| Approximate dates displayed as text windows, never invented days | Passed |
| T0 has no acknowledgment; incomplete evidence on a significant report gives T1; corroboration gives T2 | Passed |
| Specification example v1 T1 → v2 T1 → v3 T2 → v4 T2; tiers can fall after correction | Passed |
| Seven internal sender states map to the five canonical states; unregistered is Unverified, not Failed | Passed |
| A failed, unverified or unavailable sender check never drops an urgent notice | Passed |
| Sender verification never alters evidence status (independent assessments) | Passed |
| Updates delivered to every original recipient; earlier versions preserved and immutable | Passed |
| Only the designated departmental recipient owes the 24-hour acknowledgment; overdue escalates once | Passed |
| Acknowledgment rejects non-recipients; duplicates are no-ops | Passed |
| JSON export round-trips exactly; same inputs and clock give identical output | Passed |
| French brief cites exactly the same sources in the same order; every ledger claim translated | Passed |

## Browser checks (headless Chromium)

| Gate | Result |
|---|---|
| Keyboard: visible focus (3px outline); scenarios selectable by keyboard | Passed |
| Reduced motion: the ruler animation is disabled | Passed |
| Mobile (375 px): no horizontal scroll on any of the five views | Passed |
| Downloaded JSON matches the displayed history (event and version counts) | Passed |
| Evidence categories labelled (Documented, Counterfactual, Synthetic) | Passed |
| Three separate assessments shown (sender, evidence, tier) | Passed |
| T0 after correction shows "No acknowledgment required" | Passed |
| Print view hides navigation and citations' chrome, keeps the brief | Passed |

## Not tested

- Screen-reader walkthrough
- Colour contrast measured with a tool (accents were darkened for WCAG AA by design, not measured)
- Physical phones and tablets, and Safari or Firefox
- French translation reviewed by a fluent reviewer (some strings are marked as Claude's drafts in `src/i18n/fr.ts`)

## Out of scope by design

Cryptographic authentication, a live registry or backend, real recipients, and any claim that the protocol would have prevented real-world harm.
