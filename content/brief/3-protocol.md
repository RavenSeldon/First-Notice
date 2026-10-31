<!--
  BRIEF 3: The proposed procurement-backed protocol  (target ≈ 750 words)
  Who is covered, what triggers a notice, who receives and acts. T0/T1/T2 in one compact passage. Kit: Brief 3.
  Send it in chat under the label "BRIEF 3" and Claude places it here, unchanged.
  Optional first line "# Your heading" replaces the default heading.
  Cite with [C07] or [C10, C13]. Comments like this one are ignored.
-->
# A Warning Pathway Known in Advance

The first step is neither a new federal agency nor a universal reporting law. It is a limited, testable obligation attached to selected federal AI procurement contracts. Canada should require covered suppliers to report credible, potentially serious unauthorized activity by their AI agents within 48 hours of qualifying discovery, using a designated secure channel. The goal is to ensure that a warning reaches someone responsible for acting on it even when the evidence remains incomplete.

## Who must report?

The initial pilot would apply to federal suppliers contracted to develop, evaluate, host or operate AI systems capable of taking actions through external tools, applications or networks. Each participating contract would identify the systems, activities and risks it covers. A qualifying discovery would trigger reporting when credible evidence indicates potentially significant unauthorized agent activity affecting, or credibly threatening, Government of Canada information, systems or services within that contractual scope.

This boundary matters. A contract could expressly include specified supplier-run testing and evaluation, but procurement alone would not reach a supplier’s unrelated research, suppliers without participating contracts, or every incident involving a Canadian citizen. Any broader duty would require another authority or an explicitly negotiated obligation.

The proposal would extend Canada’s existing framework, not replace it. The Government of Canada Cyber Security Event Management Plan already requires federal organizations to report detected cyber incidents to the Canadian Centre for Cyber Security as soon as possible and no later than one hour after detection, with further detail within 24 hours. Third-party suppliers must manage and report cyber events according to their contracts [C15, C19]. The new clause would standardize an AI-agent-specific trigger and early-notification route for covered discoveries instead of relying solely on contract-by-contract wording.

## When does a warning become reportable?

A supplier should not wait for a final investigation before sharing a credible warning. The 48-hour clock would begin when the supplier first identifies evidence meeting the contractual threshold—not at the first unexplained anomaly, and not only after confirmed harm. Qualifying discoveries might include unauthorized tool use, access to restricted systems or attempted extraction of sensitive information where the potential consequences are materially significant.

The initial notice would state what was observed, when it occurred, which systems may be affected, what evidence supports the concern and what remains unknown. It would distinguish observed conduct from suspected consequences and describe immediate containment measures. A preliminary report invites risk assessment; it does not declare that a breach has been proved.

Notices would use three evidence-based tiers:

- **T0 — Information:** Relevant observations that do not meet the provisional notification threshold. No acknowledgment is required.
- **T1 — Provisional:** Credible, potentially significant activity that has not yet been substantiated. It requires acknowledgment of receipt within 24 hours.
- **T2 — Substantiated:** Corroborated, materially significant unauthorized activity that warrants a notifiable, actionable technical update.

A notice would not keep its initial tier permanently. Each version would be assessed on its own evidence: a T1 warning could remain provisional, rise to T2 after corroboration, or be downgraded following correction. Earlier versions would remain preserved, with classification changes recorded separately. This would show what each party knew and when without rewriting the investigation’s history.

## Who receives the warning, and who acts?

Three responsibilities must remain distinct. The **supplier** investigates the activity, preserves evidence, sends the initial notice and provides corrected or expanded information as its investigation progresses. It remains responsible for its own systems and containment measures within its control.

The **designated departmental recipient** receives and acknowledges the notice, checks its provenance, assesses possible departmental consequences and activates existing incident-response procedures where required. Acknowledgment means the message arrived; it does not certify the sender’s claims or establish that a breach occurred.

The **Canadian Centre for Cyber Security** provides the existing national coordination function for relevant federal cyber incidents, including technical assessment, advice and cross-departmental coordination [C24]. The pilot should specify when notices are shared with the Cyber Centre without weakening existing departmental reporting deadlines [C15].

Before an incident, the supplier and department would agree on reporting contacts, secure delivery and escalation. That addresses the coordination difficulty illustrated in Australia, where officials later identified ASD channels or senior departmental staff as more appropriate recipients than the general inbox initially used [C03, C11].

## Trust the evidence, not merely the sender

The protocol records five sender-verification outcomes: **Verified**, **Unverified**, **Failed**, **Registry unavailable**, and **Historically unknown**. These distinguish a successful identity check from an inconclusive result, a failed check, a temporarily unavailable contact registry and insufficient historical information.

A failed identity check should trigger additional scrutiny, not silent deletion of a potentially important warning. Conversely, a verified sender does not make the reported incident true. Provenance and evidence must be assessed independently. The current prototype simulates sender verification using test credentials; it does not implement production-grade cryptographic authentication.

The protocol cannot guarantee that an AI incident will be detected or prevented. It can clarify who must communicate a credible discovery, where the warning must go, when receipt must be acknowledged, and how the evidence changes over time.
