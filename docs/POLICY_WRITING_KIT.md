# Writing Kit: The Argument and the Narration

This kit holds the evidence, the tensions and the structure. It holds none of the prose: that part is yours.

**Where your words go**
- **The argument:** `content/argument.md`. The site shows it on the Findings screen. Cite with `[C07]` or `[C10, C13]`; `npm test` catches any ID that isn't in the ledger.
- **The narration:** your own script, using the scene plan in section 3.

---

## 1. The Four Questions

Each question lists the evidence you can stand on, the tension to hold rather than resolve, and a few prompts to start from.

### Q1. Why should Canada take part in this particular problem?

**Evidence**
- Canada already requires federal departments to report incidents to the Cyber Centre within 1 hour, with detail in 24 [C15]. The departmental leg exists; the outside-developer leg does not.
- Departments stay accountable for incidents involving third-party suppliers [C16].
- Canada's own consultation already raises over-reporting, liability, interoperability and procurement [C10].
- The OECD framework gives 29 shared criteria to interoperate with [C17].
- Australia, a peer middle power, adjusted its receiving side only after the fact [C08, C11].

**Tension to hold:** Canada is not where most frontier developers are headquartered. Its leverage is as a buyer, a regulator of its own systems, and an interoperable partner, not as a host jurisdiction. Say what that leverage reaches and what it doesn't.

**Prompts**
- What does a middle power have that a host country doesn't?
- Why act before a Canadian incident rather than after one?

### Q2. What does sender verification change on the receiving side?

**Evidence**
- The inbox was checked once a day and often received hoaxes; verification took days [C06].
- It was built for researchers' vulnerability reports [C14].
- Officials said the notice should have come through ASD channels or senior staff [C11].
- In the Notice lab, a forged sender's urgent notice still arrives, flagged for manual checking.

**Mechanism you may want to name:** *signal detection theory*. A channel full of false alarms pushes a rational receiver's threshold up, which slows its response to true alarms. Verification raises the prior on reports from known senders, so the receiver can lower the threshold for them without lowering it for everyone. (Related: alarm fatigue, the cry-wolf effect.)

**Tension to hold:** verification says who sent the notice, not whether the incident is real. The app keeps these as separate assessments, and shows sender status in the specification's five canonical states (Verified, Unverified, Failed, Registry unavailable, Historically unknown). Its registry check is simulated with fixture credentials; it is not cryptographic authentication. The "Registry down" scenario shows the protocol failing safe: the notice still arrives, flagged.

**Prompts**
- What did the hoaxes cost the true notice?
- What should a receiver be allowed to stop worrying about once a sender is verified, and what must it never stop worrying about?

### Q3. Why do better voluntary practices still leave a coordination problem? *(the hardest one)*

**Concede first, in full**
- The developer reported voluntarily, and the minister said so in the same breath as calling mandatory reporting essential [C13].
- In the later NSW case, initial contact came within 48 hours, by the developer's account [C09].

**Then the gap, using their own evidence**
- Even in the improved case, the developer had to *confirm the appropriate contact* before it could notify [C09]. The address was discovered per incident, not known in advance.
- The disclosure threshold was the developer's own: AIHW fell below it and was told anyway [C07].
- Five organizations were told on different dates through different channels (Case files screen).

**Mechanism you may want to name:** a *coordination* or *assurance* problem. Each party is better off with a shared address, format and clock, but none can create it alone, and a voluntary practice can change with leadership or incentives. A registry works as a *Schelling point*: it is where everyone knows to look.

**Serious objection to keep in the text:** mandatory reporting can discourage disclosure if confidentiality, liability and competitive consequences are badly designed. Canada's consultation names this [C10], and the minister's own pairing holds both sides [C13].

**Prompts**
- What survives a change of CEO: a practice or a protocol?
- What would the receiving side need to know *before* the next incident?

*Optional evidence not yet in the ledger:* OpenAI's commitment to "notify them promptly and directly" if more agencies are found. If you want to cite it, I'll add it as C19 with the exact passage first.

### Q4. What would have to happen for the procurement route to become real?

**Evidence**
- The consultation already floats procurement requirements as a lever [C10].
- Contractor obligations and departmental accountability for supplier incidents already exist [C16].
- An existing departmental channel to the Cyber Centre exists to connect to [C15].

**Steps to name, without claiming any is underway**
1. A designated recipient that is staffed around the clock.
2. A contract clause for AI suppliers to federal departments: notice clock, format, acknowledgment.
3. A registry of verified senders.
4. Shared definitions and fields (OECD criteria [C17]).
5. Confidentiality and liability protections, so the clause doesn't chill disclosure [C10].

**Limits to state plainly:** procurement reaches suppliers to the federal government. It does not reach unrelated private research or unknown operators of open-weight models. The 48-hour and 24-hour clocks are proposals.

---

## 2. Your Voice: Reminders, Not Rules

- Pair a vivid phrase with its precise restatement, so no figure floats free of its mechanism.
- Name the principle a point instantiates: signal detection, assurance game, Schelling point, Goodhart's Law if thresholds become targets.
- Frame claims as a lens and hedge with *may*; never assert more than the evidence licenses.
- Use "I" for authorial acts and "we" for the shared condition; carry each abstract point to its systemic, material consequence.
- Let the ending land on resonant discomfort rather than resolution. A loop back to the 84 days may suit you.

---

## 3. Narration Plan (about 3 minutes; adjust to Mangrove's limit)

| # | Screen | What the viewer must leave with | Time |
|---|---|---|---|
| 1 | The record: ruler drawing in | 84 days; most of it undetected, some of it not | 0:00–0:30 |
| 2 | Case files | Five organizations, five separate notices | 0:30–0:50 |
| 3 | Notice lab: "Serious, but unproven" | Uncertainty does not lower urgency | 0:50–1:20 |
| 4 | Notice lab: "A forged sender" | A false sender is flagged, not dropped | 1:20–1:45 |
| 5 | Notice lab: "Nobody answers", +24 h, then "Update: still unresolved", then "Update: activity corroborated", then the version 1 copy | Silence escalates; the tier follows the evidence (T1 → T2); every version stays | 1:45–2:25 |
| 6 | Findings | What Canada would need, and what this cannot do | 2:25–3:00 |

**Recording notes**
- Rehearse the clicks once before recording. Scene 5 needs: "Nobody answers" → +24 hours → +1 hour → Update: still unresolved → Update: activity corroborated → Version 1 copy.
- Say *counterfactual* and *synthetic* aloud when those scenes are on screen; the labels are small on video.
- Reload the record screen just before recording so the ruler draws in on camera.
