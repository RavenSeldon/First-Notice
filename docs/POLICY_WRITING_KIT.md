# Writing Kit: The Brief and the Narration (v2)

This kit holds the evidence, the precise wording to keep, the structure and the prompts. It holds none of the prose: that part is yours.

*v2 incorporates the ChatGPT writing-kit review of 30 October 2026: the narrowed Canadian gap (new ledger entry C19), the precise five-case wording, the two delays inside the 84 days, plain-language explanation, a bounded pilot, and a simpler Scene 5.*

---

## 1. How to Send Me Sections

Type a section into chat under a label on its own line. I place it in the right file without changing a word, run the checks, and report back.

| Label | Goes to | Shown on the site |
|---|---|---|
| `BRIEF 1` | `content/brief/1-recommendation.md` | Findings screen |
| `BRIEF 2` | `content/brief/2-evidence.md` | Findings screen |
| `BRIEF 3` | `content/brief/3-protocol.md` | Findings screen |
| `BRIEF 4` | `content/brief/4-implementation.md` | Findings screen |
| `BRIEF 5` | `content/brief/5-pilot.md` | Findings screen |
| `NARRATION 1` … `NARRATION 6` | the matching scene in `content/narration.md` | No (recording script) |

- A label **replaces** that section. Write `APPEND BRIEF 3` to add to the end instead.
- Several labelled sections can go in one message.
- Formatting: `# Heading` (replaces the default section heading), `## Subheading`, blank line between paragraphs, `- ` for lists, `*italic*`, `**bold**`, citations `[C07]` or `[C10, C13]`.

**What I report back each time**
- Citation check: any ID not in the ledger.
- Word count against the section's target.
- Any factual claim that goes beyond what its cited ledger entry supports, quoted, with the narrower wording the source allows. I flag; you decide.

**What I never do:** rewrite, smooth or "improve" your prose.

`npm run brief` assembles `docs/FIRST-NOTICE-BRIEF.md`, a standalone brief with a readable references list built from the citations you actually used, and reports word counts and narration length.

---

## 2. Precise Wording to Keep

These come from the review and the ledger. They make the argument narrower and stronger.

1. **The Canadian gap is specific, not total.** Departments already report incidents to the Cyber Centre within 1 hour, with detail in 24 [C15]. Third-party suppliers already report cyber events *as their contracts stipulate*, and departments must write those requirements into contracts [C19]. What does not exist is a **uniform, AI-agent-specific early-notification pathway** covering what an external AI developer discovers about its own agents' activity, especially outside existing contractual reporting. Say precisely what the new procurement condition adds.
2. **Five cases, different histories.** Four organizations were notified on three dates (10, 18 and 24 September) [C07]. A fifth, NPWS, was found later (29 September); there, *initial contact* came within 48 hours, and the full technical notification was a separate step [C09]. The record does not establish every channel used. Say "five affected-organization cases with differing notification histories", not "five separate notices".
3. **The 84 days hold two delays.** 84 days is 18 June [C01] to the 10 September notice [C03]. It is *not* 84 days undetected: the developer found the activity in mid-August [C02], exact day unknown. So there are two gaps, discovering the activity and getting actionable information to the government that needs it. The second is the one a protocol can address.
4. **Acknowledgment means received, not accepted.** An acknowledgment confirms that the notice arrived. It does not mean the recipient has verified the incident or accepts its accuracy.
5. **Sender verification is not incident verification.** Knowing who sent a report makes it easier to process responsibly; it does not make the report true. In the prototype, verification is simulated with fixture credentials, not cryptographic authentication.
6. **What the delay explanation is.** The once-daily inbox, frequent hoaxes and verification time are the minister's account, with the reasons still under investigation [C06]. Use them as context, not as a measured cause of a specific number of days.

---

## 3. The Brief: Five Sections (about 5 pages, about 2,500 words)

Put the recommendation on page one. Use plain-language headings: "Why an authentic warning can still arrive too late" beats "Signal Detection and Institutional Assurance". Explain each mechanism in ordinary words first, and add a technical name only if it adds something (see section 4).

### BRIEF 1: The recommendation and why Canada should act (about 15%, 375 words)

**Must answer:** What exactly is Canada asked to do? Why Canada, and why now?

**Evidence**
- Existing departmental and supplier reporting [C15, C19]: the proposal adds to these, not replaces them.
- Canada's own consultation already raises reporting thresholds, burden, confidentiality, liability, interoperability, and procurement as an instrument [C10]. It does not show the proposal has been adopted.
- Australia, a peer, adjusted its receiving side only after the fact [C08, C11].

**Prompts**
- In one sentence a minister could repeat: what is the ask?
- What can Canada do as a buyer and an interoperable partner that does not depend on hosting frontier developers?

### BRIEF 2: The Australian evidence and the notification gap (about 20%, 500 words)

**Must answer:** What happened, for a reader who has never heard of Services Australia or agentic AI? Where exactly was the gap?

**Evidence:** wording points 2, 3 and 6 above; the general inbox and its purpose [C03, C14]; officials' view that the notice should have come through ASD or senior staff, with OpenAI's acceptance as the minister's understanding [C11]; the minister calling mandatory reporting essential while acknowledging the voluntary report [C13].

**Optional lens, in plain words first:** a busy inbox that receives many false reports can struggle to recognize a genuine urgent warning. (The technical name is signal detection. It explains why verified channels may help triage; it does not prove the hoaxes caused a particular delay.)

**Prompts**
- Which of the two delays inside the 84 days could a protocol shorten, and which could it not?
- What did the receiving side need to know before 10 September?

### BRIEF 3: The proposed procurement-backed protocol (about 30%, 750 words)

**Must answer (the pilot, questions 1 to 3):**
1. **Who is covered?** The initial class of federal AI suppliers, and when an AI-agent incident they discover triggers the contractual obligation. Do not imply procurement reaches unrelated research.
2. **What triggers a notice?** The 48-hour clock from qualifying discovery; why serious but unresolved activity deserves early warning; T0, T1 and T2 in one compact passage:
   - T0, information: no acknowledgment needed.
   - T1, provisional: credible and potentially significant, not yet substantiated; acknowledge within 24 hours.
   - T2, substantiated: corroborated, materially significant unauthorized activity; an actionable technical update. Versions change and earlier versions stay; the tier follows the evidence and can rise or fall.
3. **Who receives and acts?** Separate the designated departmental contact, the national cyber authority and the supplier. Who acknowledges receipt, who checks the sender (five states: Verified, Unverified, Failed, Registry unavailable, Historically unknown), and who assesses the incident.

**Prompts**
- What does the new clause add that a supplier's existing contractual reporting [C19] does not?
- What should the recipient know in advance, before any incident?

### BRIEF 4: Implementation, objections and safeguards (about 25%, 625 words)

**Concede first, in full:** the developer reported voluntarily [C13]. In the later NPWS case, initial contact came within 48 hours, by the developer's account [C09]. Treat this as relevant contrary evidence, not an inconvenience to hide.

**Then the coordination gap, in their own evidence**
- Even in the improved case, the developer first had to *confirm the appropriate contact* [C09]. The address was found per incident, not known in advance.
- The disclosure threshold was the developer's own: AIHW fell below it and was told anyway [C07].

**Frame (avoid a false choice):** voluntary practice and binding rules can both persist. The question is which commitments are independently defined, auditable and enforceable, and what happens when one party does not act. In plain words: a coordination problem in which both sides need reliable commitments, and a designated contact both know in advance.

**Must answer (the pilot, questions 4 and 5)**
4. **What protects disclosure?** Confidential handling, security-sensitive technical detail, legitimate uncertainty, liability concerns [C10], and the administrative cost of false alarms.
5. **What happens after non-compliance?** Proportionate contractual remedies or escalation; an obligation alone does not guarantee compliance.

**The serious objection to keep:** mandatory reporting can discourage disclosure if confidentiality, liability and competitive consequences are badly designed [C10, C13].

### BRIEF 5: Pilot evaluation and conclusion (about 10%, 250 words)

**The bounded first step:** a time-limited pilot for covered federal AI suppliers, using designated departmental recipients and existing cybersecurity coordination wherever possible.

**Must answer (the pilot, question 6): how would it be judged?**
- Elapsed time to the first actionable notice
- Acknowledgment timeliness
- Evidence completeness, and correction quality
- False-positive burden, and administrative effort

**Costs, by category only:** contact registry, staffing and verifying notices, supplier compliance, secure information handling, auditing. Invent no dollar figures without a costing method.

**What the prototype shows, and does not:** it shows the protocol behaving as specified on documented, counterfactual and synthetic cases. It does not show that real-world harm would have been prevented. The test of the pilot is timelier, actionable communication at acceptable administrative cost.

---

## 4. Plain Language First

| If you reach for | Say first |
|---|---|
| Signal detection | why a busy inbox full of false reports can miss a genuine urgent warning |
| Raises the prior | establishes who sent the report, making it easier to assess, without assuming it is true |
| Schelling point | a designated contact that the developer and the government both know in advance |
| Assurance game | a coordination problem in which both sides need reliable commitments |
| Interoperability | different organizations can exchange reports using compatible information and procedures |
| Procurement leverage | conditions Canada can attach to government purchasing contracts |
| Counterfactual replay | a simulation of what might have happened under different rules |

Use coordination as the principal mechanism and signal detection as an optional lens. Leave Goodhart's Law out unless threshold gaming becomes part of the argument.

---

## 5. Narration Plan (about 3 minutes; confirm the limit in the submission rules)

The opening must work for a viewer who has never heard of Services Australia or agentic AI.

| # | Screen | What the viewer must leave with | Time |
|---|---|---|---|
| 1 | The record: ruler drawing in | An AI agent got into a government system; 84 days passed before notice, including weeks after the developer found it | 0:00–0:30 |
| 2 | Case files | Five affected organizations, five different notification histories | 0:30–0:50 |
| 3 | Notice lab: "Serious, but unproven" | Uncertainty does not lower urgency | 0:50–1:20 |
| 4 | Notice lab: "A forged sender" | A false sender is flagged, not dropped; knowing the sender is not knowing the incident is real | 1:20–1:45 |
| 5 | Notice lab: "Nobody answers" → "Update: activity corroborated" → the version 1 copy | The tier rises from T1 to T2 as evidence firms up, and version 1 stays | 1:45–2:25 |
| 6 | Findings | What Canada would pilot, and what this cannot show | 2:25–3:00 |

**Recording notes**
- Scene 5: show the T1 to T2 change and the preserved version 1. Mention overdue acknowledgment in one sentence; leave the rest for viewers to explore.
- When acknowledgment comes up, say what it means: received, not verified or accepted.
- Say *counterfactual* and *synthetic* aloud when those scenes are on screen; the labels are small on video.
- Reload the record screen just before recording so the ruler draws in on camera.

---

## 6. Your Voice: Reminders, Not Rules

- Memorable language belongs most in the opening and closing; let it reinforce a precise mechanism, never stand in for one.
- Pair a vivid phrase with its plain restatement.
- Frame claims as a lens and hedge with *may*; never assert more than the evidence licenses.
- "I" for authorial acts, "we" for the shared condition; carry abstract points to their material consequences.
- An ending on resonant discomfort rather than resolution may suit you; a loop back to the 84 days is available.

The standard: intelligible to a reader with no background in AI safety or Australian politics, and rigorous enough that a government cybersecurity specialist finds nothing overstated.
