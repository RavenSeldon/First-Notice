<!-- Draft French translation of content/brief/3-protocol.md. English is authoritative; citations must match it exactly. -->
# Une voie d’avertissement connue à l’avance

La première étape n’est ni un nouvel organisme fédéral ni une loi universelle de signalement. C’est une obligation limitée et vérifiable, rattachée à certains contrats fédéraux d’approvisionnement en IA. Le Canada devrait exiger que les fournisseurs visés signalent toute activité non autorisée crédible et potentiellement grave de leurs agents d’IA dans les 48 heures suivant une découverte admissible, au moyen d’un canal sécurisé désigné. Le but est de faire en sorte qu’un avertissement parvienne à une personne chargée d’agir, même lorsque les preuves demeurent incomplètes.

## Qui doit signaler?

Le projet pilote initial s’appliquerait aux fournisseurs fédéraux chargés de développer, d’évaluer, d’héberger ou d’exploiter des systèmes d’IA capables d’agir au moyen d’outils, d’applications ou de réseaux externes. Chaque contrat participant préciserait les systèmes, les activités et les risques visés. Une découverte admissible déclencherait le signalement lorsque des preuves crédibles indiquent une activité d’agent non autorisée potentiellement importante qui touche, ou menace de façon crédible, l’information, les systèmes ou les services du gouvernement du Canada dans ce champ contractuel.

Cette limite compte. Un contrat pourrait inclure expressément certains essais et évaluations menés par le fournisseur, mais l’approvisionnement à lui seul n’atteindrait ni la recherche du fournisseur sans lien avec le contrat, ni les fournisseurs sans contrat participant, ni chaque incident touchant un citoyen canadien. Toute obligation plus large exigerait un autre fondement juridique ou une obligation négociée explicitement.

La proposition prolongerait le cadre existant du Canada, sans le remplacer. Le Plan de gestion des événements de cybersécurité du gouvernement du Canada exige déjà que les organisations fédérales signalent les cyberincidents détectés au Centre canadien pour la cybersécurité dès que possible, et au plus tard une heure après leur détection, avec des précisions dans les 24 heures. Les fournisseurs tiers doivent gérer et signaler les cyberévénements conformément à leurs contrats [C15, C19]. La nouvelle clause normaliserait un déclencheur propre aux agents d’IA et une voie de notification précoce pour les découvertes visées, au lieu de s’en remettre uniquement au libellé de chaque contrat.

## À partir de quand un avertissement doit-il être signalé?

Un fournisseur ne devrait pas attendre la fin d’une enquête avant de partager un avertissement crédible. Le délai de 48 heures commencerait lorsque le fournisseur relève pour la première fois des preuves atteignant le seuil contractuel — non à la première anomalie inexpliquée, et non seulement après un préjudice confirmé. Les découvertes admissibles pourraient comprendre l’utilisation non autorisée d’outils, l’accès à des systèmes restreints ou une tentative d’extraction de renseignements sensibles, lorsque les conséquences potentielles sont importantes.

L’avis initial indiquerait ce qui a été observé, le moment où cela s’est produit, les systèmes possiblement touchés, les preuves qui appuient la préoccupation et ce qui demeure inconnu. Il distinguerait la conduite observée des conséquences soupçonnées et décrirait les mesures de confinement immédiates. Un rapport préliminaire invite à évaluer le risque; il ne déclare pas qu’une atteinte a été prouvée.

Les avis utiliseraient trois niveaux fondés sur les preuves :

- **T0 — Information :** Observations pertinentes qui n’atteignent pas le seuil de notification provisoire. Aucun accusé de réception n’est requis.
- **T1 — Provisoire :** Activité crédible et potentiellement importante qui n’a pas encore été étayée. Elle exige un accusé de réception dans les 24 heures.
- **T2 — Étayé :** Activité non autorisée corroborée et importante qui justifie une mise à jour technique exploitable, à déclarer obligatoirement.

Un avis ne conserverait pas son niveau initial de façon permanente. Chaque version serait évaluée selon ses propres preuves : un avertissement T1 pourrait demeurer provisoire, passer à T2 après corroboration, ou être abaissé à la suite d’une correction. Les versions antérieures seraient conservées, et les changements de classification consignés séparément. On verrait ainsi ce que chaque partie savait et à quel moment, sans réécrire l’historique de l’enquête.

## Qui reçoit l’avertissement, et qui agit?

Trois responsabilités doivent rester distinctes. Le **fournisseur** enquête sur l’activité, préserve les preuves, envoie l’avis initial et fournit des renseignements corrigés ou complétés à mesure que son enquête progresse. Il demeure responsable de ses propres systèmes et des mesures de confinement qui relèvent de lui.

Le **destinataire ministériel désigné** reçoit l’avis et en accuse réception, vérifie sa provenance, évalue les conséquences possibles pour le ministère et active au besoin les procédures existantes d’intervention en cas d’incident. L’accusé de réception signifie que le message est arrivé; il ne certifie pas les affirmations de l’expéditeur et n’établit pas qu’une atteinte a eu lieu.

Le **Centre canadien pour la cybersécurité** assure la fonction nationale de coordination existante pour les cyberincidents fédéraux pertinents, y compris l’évaluation technique, les conseils et la coordination interministérielle [C24]. Le projet pilote devrait préciser quand les avis sont communiqués au Centre pour la cybersécurité, sans affaiblir les délais de signalement ministériels existants [C15].

Avant tout incident, le fournisseur et le ministère conviendraient des personnes-ressources, de la transmission sécurisée et de l’escalade. Cela répond à la difficulté de coordination illustrée en Australie, où les responsables ont ensuite désigné les canaux de l’ASD ou des cadres supérieurs du ministère comme destinataires plus appropriés que la boîte générale d’abord utilisée [C03, C11].

## Se fier aux preuves, et non seulement à l’expéditeur

Le protocole consigne cinq résultats de vérification de l’expéditeur : **Vérifié**, **Non vérifié**, **Échec**, **Registre indisponible** et **Inconnu (historique)**. Ils distinguent une vérification d’identité réussie d’un résultat non concluant, d’une vérification échouée, d’un registre de contacts temporairement indisponible et d’une information historique insuffisante.

L’échec d’une vérification d’identité devrait entraîner un examen plus poussé, et non la suppression silencieuse d’un avertissement potentiellement important. À l’inverse, un expéditeur vérifié ne rend pas l’incident signalé véridique. La provenance et les preuves doivent être évaluées indépendamment. Le prototype actuel simule la vérification des expéditeurs au moyen de justificatifs de test; il ne met pas en œuvre une authentification cryptographique de niveau production.

Le protocole ne peut garantir qu’un incident d’IA sera détecté ou évité. Il peut clarifier qui doit communiquer une découverte crédible, où l’avertissement doit aller, quand sa réception doit être confirmée et comment les preuves évoluent dans le temps.
