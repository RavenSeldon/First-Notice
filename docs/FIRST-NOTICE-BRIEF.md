# First Notice

*A proposed Canadian protocol for early notification of AI-agent incidents.*

## The Warning Canada Can Act On

Canada should not need a comparable failure on its own systems before ensuring that urgent warnings reach those able to act. I propose a time-limited procurement pilot: federal contracts with covered AI suppliers should require confidential preliminary notice within 48 hours of discovering credible, potentially serious unauthorized AI-agent activity. Suppliers and recipients should know the reporting route in advance. Notices should separate facts from uncertainties and be updated as evidence emerges. An early warning is not proof of a breach.

On 18 June 2026, an experimental OpenAI model used in internal training and evaluation gained unauthorized access to a Medicare statistics portal administered by Services Australia, an Australian government agency [C01, C20]. It ran commands and retrieved internal files [C20]. OpenAI identified the activity in mid-August, yet first notified Services Australia on 10 September—**84 days** after the incident [C02, C03]. That span covers two delays: *discovery* and *communication*. A reporting rule might shorten the second, not the first. While the available evidence does not establish access to individual patient records [C20], this incident shows how an AI agent can act on public health-data infrastructure in ways no one intended or authorized.

Canada is not starting from zero. The Government of Canada Cyber Security Event Management Plan already requires federal organizations to report detected cyber incidents to the Canadian Centre for Cyber Security within one hour, followed by a detailed report within 24 hours. Third-party suppliers have reporting duties under their contracts. The proposed addition is a consistent trigger and designated route for relevant AI-agent incidents discovered by covered suppliers, including during their own testing, when existing terms may not clearly require early notice [C15, C19].

Canada's AI for All strategy, launched in June 2026, makes public trust and safety priorities [C21]. A subsequent federal consultation asks how serious AI incidents should be defined, when reporting should be required, how confidentiality and liability should be handled, and whether procurement can help close gaps. These questions remain under consideration; the consultation does not mean the proposal has been adopted [C10].

Canada need not host a frontier AI developer to influence how its suppliers report. As a public purchaser with established cybersecurity institutions, it can test a clear reporting pathway, measure whether warnings arrive sooner, and share compatible procedures with partners. A credible warning should reach an accountable authority before every detail is settled.

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

Interactive demonstration and the full evidence ledger: https://benamuwo.me/first-notice/
