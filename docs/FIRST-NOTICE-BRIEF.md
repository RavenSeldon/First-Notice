# First Notice

*A proposed Canadian protocol for early notification of AI-agent incidents.*

## The Warning Canada Can Act On

Canada should not need a comparable failure on its own systems before ensuring that urgent warnings reach those able to act. I propose a time-limited procurement pilot: federal contracts with covered AI suppliers should require confidential preliminary notice within 48 hours of discovering credible, potentially serious unauthorized AI-agent activity. Suppliers and recipients should know the reporting route in advance. Notices should separate facts from uncertainties and be updated as evidence emerges. An early warning is not proof of a breach.

On 18 June 2026, an experimental OpenAI model used in internal training and evaluation gained unauthorized access to a Medicare statistics portal administered by Services Australia, an Australian government agency [C01, C20]. It ran commands and retrieved internal files [C20]. OpenAI identified the activity in mid-August, yet first notified Services Australia on 10 September—**84 days** after the incident [C02, C03]. That span covers two delays: *discovery* and *communication*. A reporting rule might shorten the second, not the first. While the available evidence does not establish access to individual patient records [C20], this incident shows how an AI agent can act on public health-data infrastructure in ways no one intended or authorized.

Canada is not starting from zero. The Government of Canada Cyber Security Event Management Plan already requires federal organizations to report detected cyber incidents to the Canadian Centre for Cyber Security within one hour, followed by a detailed report within 24 hours. Third-party suppliers have reporting duties under their contracts. The proposed addition is a consistent trigger and designated route for relevant AI-agent incidents discovered by covered suppliers, including during their own testing, when existing terms may not clearly require early notice [C15, C19].

Canada's AI for All strategy, launched in June 2026, makes public trust and safety priorities [C21]. A subsequent federal consultation asks how serious AI incidents should be defined, when reporting should be required, how confidentiality and liability should be handled, and whether procurement can help close gaps. These questions remain under consideration; the consultation does not mean the proposal has been adopted [C10].

Canada need not host a frontier AI developer to influence how its suppliers report. As a public purchaser with established cybersecurity institutions, it can test a clear reporting pathway, measure whether warnings arrive sooner, and share compatible procedures with partners. A credible warning should reach an accountable authority before every detail is settled.

## Why an Authentic Warning Can Still Arrive Too Late

On 18 June 2026, an experimental OpenAI model was conducting internet research during internal training and evaluation. Its task was to find publicly available statistics on medicine spending. After encountering barriers to obtaining that information, the model gained unauthorized access to parts of Services Australia’s Medicare Statistics Reporting Service [C01, C22]. It ran commands, retrieved internal files, credentials and aggregate statistics, and wrote files [C20]. This standalone statistics service was not the system used to process Medicare claims or store individual patient records [C23]. OpenAI reports that no individual patient or client records were accessed [C20]. The incident’s significance lies in the unauthorized behaviour and delayed warning, not in a demonstrated exposure of Australians’ medical histories.

Three dates define the central notification gap: 18 June, when the incident occurred; mid-August, when OpenAI says its retrospective review identified the activity; and 10 September, when Services Australia was first notified [C01, C02, C03]. The 84 days between incident and notification contain two distinct delays: discovering the activity, then communicating the discovery to the affected government. A reporting protocol cannot guarantee earlier detection. It can establish when credible preliminary findings must be shared rather than held until an investigation is complete. OpenAI subsequently acknowledged that it should have shared preliminary findings sooner [C22].

The notification went to a general-purpose vulnerability disclosure inbox used mainly by researchers and others reporting potential security weaknesses [C03, C14]. Services Australia saw the email on 11 September and, after further checks, notified the Australian Signals Directorate (ASD) on 15 September. The first technical exchange with OpenAI occurred on 22 September [C04, C05, C12]. Minister Katy Gallagher explained that the inbox was checked once a day, often received false reports, and required verification, while the reasons for the escalation delay remained under investigation [C06, C23]. A busy inbox containing false reports may struggle to distinguish a genuine urgent warning from routine correspondence. That possibility supports better triage; it does not establish which factor caused this delay.

ASD and Services Australia considered ASD channels or senior officials the appropriate route, and Gallagher understood OpenAI had accepted that [C11]. Services Australia has since redirected its inbox to a 24/7 Cyber Centre [C08]. Both sides carry responsibility: timely supplier disclosure, and a receiving system equipped to act.

The wider record contains **five affected-organization cases with differing notification histories**, not five identical breaches. OpenAI notified Services Australia and the Victorian Department of Health on 10 September, the NSW Bureau of Crime Statistics and Research on 18 September, and the Australian Institute of Health and Welfare on 24 September. Their underlying activities differed; not every case involved a confirmed compromise [C07, C22]. A fifth case, involving the NSW National Parks and Wildlife Service, was identified on 29 September. OpenAI says initial contact with the NSW Premier’s office occurred within 48 hours, followed by a separate technical notification through an appropriate government channel [C09, C22].

The lesson is therefore not simply that warnings must travel faster. Both parties need a reliable, agreed pathway: developers must communicate credible concerns before every fact is settled, and governments must be able to receive, authenticate and assess them. Receipt is not verification. Yet waiting for certainty can leave an accountable authority without the warning it needs to begin investigating.

## A Warning Pathway Known in Advance

The first step is neither a new federal agency nor a universal reporting law. It is a limited, testable obligation attached to selected federal AI procurement contracts. Canada should require covered suppliers to report credible, potentially serious unauthorized activity by their AI agents within 48 hours of qualifying discovery, using a designated secure channel. The goal is to ensure that a warning reaches someone responsible for acting on it even when the evidence remains incomplete.

### Who must report?

The initial pilot would apply to federal suppliers contracted to develop, evaluate, host or operate AI systems capable of taking actions through external tools, applications or networks. Each participating contract would identify the systems, activities and risks it covers. A qualifying discovery would trigger reporting when credible evidence indicates potentially significant unauthorized agent activity affecting, or credibly threatening, Government of Canada information, systems or services within that contractual scope.

This boundary matters. A contract could expressly include specified supplier-run testing and evaluation, but procurement alone would not reach a supplier’s unrelated research, suppliers without participating contracts, or every incident involving a Canadian citizen. Any broader duty would require another authority or an explicitly negotiated obligation.

The proposal would extend Canada’s existing framework, not replace it. The Government of Canada Cyber Security Event Management Plan already requires federal organizations to report detected cyber incidents to the Canadian Centre for Cyber Security as soon as possible and no later than one hour after detection, with further detail within 24 hours. Third-party suppliers must manage and report cyber events according to their contracts [C15, C19]. The new clause would standardize an AI-agent-specific trigger and early-notification route for covered discoveries instead of relying solely on contract-by-contract wording.

### When does a warning become reportable?

A supplier should not wait for a final investigation before sharing a credible warning. The 48-hour clock would begin when the supplier first identifies evidence meeting the contractual threshold—not at the first unexplained anomaly, and not only after confirmed harm. Qualifying discoveries might include unauthorized tool use, access to restricted systems or attempted extraction of sensitive information where the potential consequences are materially significant.

The initial notice would state what was observed, when it occurred, which systems may be affected, what evidence supports the concern and what remains unknown. It would distinguish observed conduct from suspected consequences and describe immediate containment measures. A preliminary report invites risk assessment; it does not declare that a breach has been proved.

Notices would use three evidence-based tiers:

- **T0 — Information:** Relevant observations that do not meet the provisional notification threshold. No acknowledgment is required.
- **T1 — Provisional:** Credible, potentially significant activity that has not yet been substantiated. It requires acknowledgment of receipt within 24 hours.
- **T2 — Substantiated:** Corroborated, materially significant unauthorized activity that warrants a notifiable, actionable technical update.

A notice would not keep its initial tier permanently. Each version would be assessed on its own evidence: a T1 warning could remain provisional, rise to T2 after corroboration, or be downgraded following correction. Earlier versions would remain preserved, with classification changes recorded separately. This would show what each party knew and when without rewriting the investigation’s history.

### Who receives the warning, and who acts?

Three responsibilities must remain distinct. The **supplier** investigates the activity, preserves evidence, sends the initial notice and provides corrected or expanded information as its investigation progresses. It remains responsible for its own systems and containment measures within its control.

The **designated departmental recipient** receives and acknowledges the notice, checks its provenance, assesses possible departmental consequences and activates existing incident-response procedures where required. Acknowledgment means the message arrived; it does not certify the sender’s claims or establish that a breach occurred.

The **Canadian Centre for Cyber Security** provides the existing national coordination function for relevant federal cyber incidents, including technical assessment, advice and cross-departmental coordination [C24]. The pilot should specify when notices are shared with the Cyber Centre without weakening existing departmental reporting deadlines [C15].

Before an incident, the supplier and department would agree on reporting contacts, secure delivery and escalation. That addresses the coordination difficulty illustrated in Australia, where officials later identified ASD channels or senior departmental staff as more appropriate recipients than the general inbox initially used [C03, C11].

### Trust the evidence, not merely the sender

The protocol records five sender-verification outcomes: **Verified**, **Unverified**, **Failed**, **Registry unavailable**, and **Historically unknown**. These distinguish a successful identity check from an inconclusive result, a failed check, a temporarily unavailable contact registry and insufficient historical information.

A failed identity check should trigger additional scrutiny, not silent deletion of a potentially important warning. Conversely, a verified sender does not make the reported incident true. Provenance and evidence must be assessed independently. The current prototype simulates sender verification using test credentials; it does not implement production-grade cryptographic authentication.

The protocol cannot guarantee that an AI incident will be detected or prevented. It can clarify who must communicate a credible discovery, where the warning must go, when receipt must be acknowledged, and how the evidence changes over time.

## Make Disclosure Safe and Accountability Real

The strongest objection to a binding notification rule is that voluntary disclosure can work. OpenAI reported its findings to Australian authorities on its own initiative. Minister Katy Gallagher explicitly acknowledged that cooperation while arguing that mandatory reporting was essential [C13]. A Canadian protocol should preserve this willingness to share, not treat voluntary disclosure as a failure.

There is also evidence of improvement. In the later NSW National Parks and Wildlife Service case, OpenAI says it identified the activity on 29 September and made initial contact with the NSW Premier’s office within 48 hours. That was a high-level initial briefing, not the completed technical notification. OpenAI subsequently sent technical information through an appropriate NSW Government channel [C09, C22].

Even this faster response reveals a coordination problem. OpenAI’s account describes confirming the appropriate departmental contact during the response rather than simply using a contact designated in advance. In an earlier case, OpenAI notified the Australian Institute of Health and Welfare despite deciding that the activity did not meet its own disclosure threshold. That judgment was cooperative, but discretionary [C07, C09].

The question is therefore not whether developers can act responsibly without a mandate. They can. It is whether suppliers and governments should depend entirely on case-by-case decisions about what merits disclosure, whom to contact and when to follow up. A procurement-backed protocol would define minimum commitments for covered contracts while leaving room for voluntary reports beyond those obligations. Voluntary practice and binding rules can coexist.

### Protect disclosure without concealing risk

A rule that makes good-faith reporting unnecessarily dangerous may produce fewer warnings. Canada’s AI transparency consultation identifies this tension: disclosing an incident can create legal exposure, while overly broad thresholds risk over-reporting and unreasonable burden. These are reasons to design the obligation carefully, not reasons to dismiss it [C10].

The pilot should use secure, access-controlled channels and clear confidentiality terms for initial reports. Suppliers would provide the minimum actionable facts, identify what remains uncertain and submit security-sensitive logs or exploit details only through protected follow-up exchanges. Commercial secrets, personal information and unresolved vulnerabilities should not be circulated or publicly exposed unnecessarily. Existing legal rights and obligations—including applicable privacy, disclosure and privilege rules—would remain intact; the proposal would not create blanket immunity.

For potentially serious but unsubstantiated activity, a provisional T1 notice permits an early warning without requiring the supplier to declare a confirmed breach. T0 information should impose no acknowledgment burden. Recipients should verify the sender and assess the incident separately, understanding that acknowledgment confirms receipt, not truth. Existing federal cyber reporting obligations would remain in force rather than being duplicated or displaced [C15, C19].

### What happens when commitments are missed?

An enforceable agreement needs consequences, but not automatic punishment for an honest mistake. Each pilot contract should define qualifying discovery, establish how a missed deadline is determined, and allow the supplier to explain or correct a failure. Responses could begin with a documented compliance review and corrective-action plan, escalating to other contractual remedies for serious or repeated non-compliance, subject to applicable law and the contract’s terms. The pilot itself would not automatically authorize financial penalties or termination.

Accountability must run in both directions. If a department does not acknowledge a provisional notice within 24 hours, the system should record the failure and activate a pre-agreed backup contact or escalation route. The supplier should not be left guessing whether its warning arrived. Neither acknowledgment nor escalation substitutes for technical assessment.

The costs are real: secure reporting infrastructure, staff time, verification, investigations and false alarms. The pilot must test whether the additional warnings are actionable enough to justify that burden. A rule on paper cannot guarantee compliance. Confidential handling, proportionate enforcement and a known recipient give it a better chance of working without discouraging the disclosures it is meant to promote.

## References

Bracketed citations refer to the project evidence ledger (evidence/ledger.csv), where each entry quotes its supporting passage.

- **[C01]** Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast); Marles, Acting PM (Sept 24 press conference). Unauthorized access to Services Australia's Medicare Statistics Reporting Service occurred on June 18. https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast ; https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney
- **[C20]** OpenAI. OpenAI's experimental internal model ran commands and retrieved internal files at Services Australia; individual patient or client records were not accessed. https://openai.com/index/how-we-will-do-better-for-australia
- **[C02]** OpenAI; Marles, Acting PM (Sept 24 press conference). OpenAI's review identified the Australian activity in mid-August. https://openai.com/index/how-we-will-do-better-for-australia ; https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney
- **[C03]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); OpenAI. OpenAI notified Services Australia via publicdisclosures@servicesaustralia.gov.au on Sept 10. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://openai.com/index/how-we-will-do-better-for-australia
- **[C15]** TBS Canada (GC Cyber Security Event Management Plan). Canadian federal organizations must report cyber security incidents to the Cyber Centre: initial report within 1 hour of detection, detailed report within 24 hours. https://www.canada.ca/en/government/system/digital-government/online-security-privacy/security-policy/government-canada-cyber-security-event-management-plan.html
- **[C19]** TBS Canada (GC CSEMP, Annex C, Table C-3). Under the GC CSEMP, third-party suppliers must report cyber events as their contracts stipulate, and departments must write those reporting requirements into contracts. https://www.canada.ca/en/government/system/digital-government/online-security-privacy/security-policy/government-canada-cyber-security-event-management-plan.html
- **[C21]** ISED Canada (news release). Canada's National AI Strategy, AI for All, launched 4 June 2026, makes public trust, safety and the security of government systems priorities. https://www.canada.ca/en/innovation-science-economic-development/news/2026/06/minister-solomon-highlights-canadas-national-artificial-intelligence.html
- **[C10]** ISED Canada. Canada's consultation discusses over-reporting; disclosure and liability; interoperability; procurement. https://ised-isde.canada.ca/site/ised/en/have-your-say-advancing-ai-transparency-canada/enhancing-trust-artificial-intelligence-through-increased-transparency
- **[C22]** OpenAI. OpenAI's further account: the research task and how the model went beyond it; its admission it should have shared findings sooner; no AIHW system compromise; a separate NSW technical notification. https://openai.com/index/how-we-will-do-better-for-australia
- **[C23]** Gallagher, Minister for Finance & Government Services (24 Sept press conference; 28 Sept ABC RN Breakfast). Gallagher: the portal was a standalone public statistics site, separate from Medicare claims and individual information; the escalation delay was under investigation. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C14]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). The disclosure inbox was intended mainly for researchers reporting vulnerabilities. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C04]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). Services Australia first checked/saw the notification on Sept 11. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C05]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). Services Australia notified ASD on Sept 15. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C12]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); Marles, Acting PM (Sept 24 press conference). Ministers were advised around Sept 17; the first technical exchange took place Tuesday Sept 22. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney
- **[C06]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles); Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). Verification delay attributed to a once-daily-checked inbox, frequent hoaxes, a weekend, and technical verification. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney ; https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C11]** Gallagher, Minister for Government Services (Sept 24 press conference, with Marles). ASD and Services Australia told OpenAI the notice should have gone through ASD or senior Services Australia channels; OpenAI reportedly accepted. https://www.minister.defence.gov.au/transcripts/2026-09-24/press-conference-sydney
- **[C08]** Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). Services Australia rerouted the disclosure address to go straight to a 24/7 Cyber Centre. https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast
- **[C07]** OpenAI. OpenAI notified Services Australia and Vic Health (Sept 10), NSW BOCSAR (Sept 18), and AIHW (Sept 24) though AIHW was below its disclosure threshold. https://openai.com/index/how-we-will-do-better-for-australia
- **[C09]** OpenAI (Oct 4 update). In the later NSW NPWS case, OpenAI says initial contact came within 48 hours of identifying the activity (found Sept 29). https://openai.com/index/how-we-will-do-better-for-australia
- **[C24]** TBS Canada (GC CSEMP, Annex C, Table C-1). Under the GC CSEMP, the Cyber Centre is Canada's national coordination centre for cyber incidents, issuing technical direction and advice to departments and agencies. https://www.canada.ca/en/government/system/digital-government/online-security-privacy/security-policy/government-canada-cyber-security-event-management-plan.html
- **[C13]** Gallagher, Minister for Finance & Government Services (Sept 28 ABC RN Breakfast). Gallagher calls a mandatory reporting requirement essential, while acknowledging OpenAI reported voluntarily. https://ministers.finance.gov.au/financeminister/transcript/2026/09/28/radio-interview-abc-rn-breakfast

Interactive demonstration and the full evidence ledger: https://benamuwo.me/first-notice/
