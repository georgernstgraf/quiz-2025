# Projekt-Bewertung: quiz-2025

**Repository:** `georgernstgraf/quiz-2025`
**Klasse:** 5AHWII
**Projektzeitraum:** 1. Dezember 2025 – 9. Februar 2026 (~10 Wochen)
**Gesamtcommits:** 29 (davon 16 durch Lehrkraft `grafg@spengergasse.at`)

## Projektbeschreibung

Ein Deno-basiertes Trivia-Quiz mit Hono-Webserver, Prisma ORM (SQLite), Singleplayer- und Multiplayer-Modus. Fragen werden von der OpenTDB-API bezogen. Das Projekt wurde ursprünglich von Wiktor Brzychczy erstellt und als Basis ins Gruppenrepository importiert.

---

## Beteiligte Studierende

| Name | GitHub-Login | E-Mail | Eigene Commits |
|------|-------------|--------|----------------|
| Arslan Ceyda | `spg-Ceyda` | `ars210315@spengergasse.at` | 0 |
| Aschenbrenner Nina | `ninaascx` | `asc22258@spengergasse.at` | 0 |
| Biberovic Seid | `Seid-Biberovic` | `bib210317@spengergasse.at` | 0 |
| Brzychczy Wiktor | `BWGeGe` | `brz210319@spengergasse.at` | 1 |
| Brunner Anastasia | `spg-anastasia` | `bru210318@spengergasse.at` | 0 |
| Castro Yoav | `spg-YoavCastro` | `cas210320@spengergasse.at` | 0 |
| Fink Fabian | `fab1-spg` | `fin210321@spengergasse.at` | 0 |
| Fuchs Alexander | `spg-AlexFuchs` | `fuc210322@spengergasse.at` | 0 |
| Gradascevic Edvin | `edvingrd` | `gra22087@spengergasse.at` | 1 |
| Hristovski Marius | `EinKrasserRndm` | `hri210324@spengergasse.at` | 1 |
| Janjic Luka | `Luke4910` | `jan210325@spengergasse.at` | 1 |
| Kabic Branka | `spg-branka` | `kab210326@spengergasse.at` | 0 |
| Kolm Benjamin | `KOLMBenjamin` | `kol210327@spengergasse.at` | 3 (+1 Merge) |
| Kulha Tim | `SPG-KULT` | `kul210328@spengergasse.at` | 1 |
| Seitinger Jakob | `Jakey1222` | `sei22446@spengergasse.at` | 0 |
| Zuskin Silver | `StanLobo` | `zus22328@spengergasse.at` | 0 |

---

## Pull Requests im Überblick

| PR | Titel | Ersteller | Status | Datum |
|----|-------|-----------|--------|-------|
| #1 | Import Wiktors project | `Luke4910` (Luka) | merged | 2025-12-01 |
| #2 | Grg fix prisma | `georgernstgraf` | merged | 2025-12-22 |
| #6 | Grg fix prisma | `georgernstgraf` | merged | 2025-12-23 |
| #7 | Multiplayer | `georgernstgraf` | merged (von `BWGeGe`) | 2026-01-12 |
| #11 | Oberfläche für Login-Seite | `edvingrd` | merged | 2026-01-19 |
| #12 | Endpoints | `georgernstgraf` (Branch von `KOLMBenjamin`) | merged | 2026-01-19 |

---

## Issues im Überblick

Alle 5 Issues wurden vom Lehrer erstellt. Kein Student hat Issues erstellt oder kommentiert.

| # | Titel | Ersteller | Status |
|---|-------|-----------|--------|
| 3 | Datenmodell Multiplayer | `georgernstgraf` | open |
| 4 | html seiten für .. | `georgernstgraf` | open |
| 5 | Testing | `georgernstgraf` | open |
| 9 | ssr erklären | `georgernstgraf` | open |
| 10 | sessions! | `georgernstgraf` | open |

---

## Beiträge im Überblick

### Kolm Benjamin (`KOLMBenjamin`)

**Commits:**
- Anzahl: 4 (3 substanziell, 1 Merge-Commit)
- Zeitlicher Verlauf: 11. Jänner und 19. Jänner 2026 — phasenhaft, innerhalb einer Woche
- Branches: `Endpoints` (remote, noch vorhanden), `main`
- Codequalität: Gut strukturierte Tests mit `Deno.test`, korrekte Verwendung von `assertEquals`. Der Import wurde von der veralteten URL (`https://deno.land/std@0.224.0/assert/mod.ts`) auf den jsr-Specifier (`@std/assert`) umgestellt, was den Projektkonventionen entspricht.

**Pull Requests:**
- PR #12 (Endpoints): Die Branch `Endpoints` wurde vom Lehrer als PR eröffnet, Benjamins Commits wurden gemerged. PR-Beschreibung: "benjamin testet".
- Reviews: Keine
- PR-Kommentare: Keine

**Issues:**
- Issue #5 (Testing) indirekt referenziert im Commit "tests added #5"
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Test-Infrastruktur: `main_test.ts` mit 2 Testfällen (OpenTDB API-Test, Local Server-Test)
- Dependency-Management: `@std/assert` zu `deno.json` hinzugefügt, Lockfile aktualisiert
- Kommentar-Bereinigung (Kommentare entfernt und wieder hinzugefügt — restless Editieren)

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: phasenhaft (zwei Tage mit Aktivität, dazwischen Pause)
- Beitragstyp: kodeorientiert
- Sorgfalt: mittel — die Kommentar-Entfernung und Wiedereinfügung in aufeinanderfolgenden Commits deutet auf unsicheres Arbeiten hin; der Import-Wechsel war aber sinnvoll

**Gesamteinschätzung:** Benjamin hat als einziger Student Test-Arbeit geleistet und damit einen wichtigen Beitrag zur Codequalitätssicherung geleistet. Die Tests sind grundsolide, wenn auch nicht sehr umfangreich. Die Arbeit zeigt Engagement im Testing-Bereich. Die Unsicherheit bei den Kommentaren und die fehlende eigene PR-Erstellung sind Verbesserungspunkte.

---

### Gradascevic Edvin (`edvingrd`)

**Commits:**
- Anzahl: 1 (substanziell)
- Zeitlicher Verlauf: 18. Jänner 2026
- Branches: `Feature/login-seite` (remote, noch vorhanden), `main`
- Codequalität: Vollständige HTML-Login-Seite mit Formular, CSS-Styling und einfacher JavaScript-Weiterleitung. Sauber strukturiert, responsive Ansatz mit Flexbox.

**Pull Requests:**
- PR #11 (Oberfläche für Login-Seite erstellt): Selbst erstellt, beschrieben als "Edvin & Fabian". Merged am 19. Jänner.
- Reviews: Keine
- PR-Kommentare: Keine

**Issues:**
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- UI/UX: Login-Seite mit modernem Design (Box-Shadow, Rounded Corners, Hover-Effekte)
- Kooperation mit Fabian Fink (im Commit und PR dokumentiert)

**Geschätzter Zeitaufwand:** niedrig bis mittel

**Qualitative Bewertung:**
- Arbeitsstil: einzelner Beitrag
- Beitragstyp: kodeorientiert (Frontend)
- Sorgfalt: mittel — die Login-Seite ist visuell ansprechend, verwendet aber `process_login.php` als Action (PHP statt Deno/Hono), was technisch nicht zum Projekt-Stack passt. Die JavaScript-Weiterleitung via `onclick` ist ein Workaround, der keine echte Authentifizierung implementiert.

**Gesamteinschätzung:** Edvin hat mit der Login-Seite einen sichtbaren UI-Beitrag geleistet und die Zusammenarbeit mit Fabian im Commit dokumentiert. Technisch ist die Seite jedoch nicht in die bestehende Deno/Hono-Architektur integriert — das Formular verweist auf eine PHP-Datei, die im Projekt nicht existiert. Die CSS-Gestaltung ist ordentlich, die funktionale Einbindung hätte durchdachter sein können.

---

### Hristovski Marius (`EinKrasserRndm`)

**Commits:**
- Anzahl: 1 (Merge-Commit via GitHub UI)
- Zeitlicher Verlauf: 1. Dezember 2025
- Branches: `main`
- Codequalität: Kein eigener Code — Merge des PR #1

**Pull Requests:**
- PR #1 (Import Wiktors project): Von Luka (`Luke4910`) erstellt, Marius hat den Merge via GitHub UI durchgeführt. PR-Beschreibung: ":)"
- Reviews: Keine
- PR-Kommentare: Keine

**Issues:**
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Koordinationsrolle beim Import des ursprünglichen Projekts

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: einzelner Klick-Aktivität
- Beitragstyp: organisatorisch
- Sorgfalt: niedrig — der PR-Body ":)" zeigt wenig formale Sorgfalt

**Gesamteinschätzung:** Marius' Beitrag beschränkt sich auf das Klicken des Merge-Buttons für PR #1. Der Import des ursprünglichen Projekts von Wiktor war eine koordinative Handlung, kein eigener Codebeitrag. Im weiteren Projektverlauf (10 Wochen) hat sich Marius nicht mehr am Code beteiligt.

---

### Kulha Tim (`SPG-KULT`)

**Commits:**
- Anzahl: 1 (substanziell)
- Zeitlicher Verlauf: 11. Jänner 2026
- Branches: `Multiplayer` (remote, noch vorhanden), `main`
- Codequalität: Professionelles Prisma-Schema-Design mit 6 neuen Modellen (`Account`, `GameSession`, `GameParticipant`, `GameQuestion`, `PlayerAnswer`) und einem Enum (`SessionStatus`). Saubere Relationen mit Foreign Keys, Unique Constraints und `onDelete: Cascade`. Die Namenskonventionen sind konsistent und durchdacht.

**Pull Requests:**
- Keine eigenen PRs erstellt. Der Code wurde über PR #7 (vom Lehrer erstellt) gemerged.
- Wiktor (`BWGeGe`) hat PR #7 gemerged und approved.

**Issues:**
- Issue #3 (Datenmodell Multiplayer) direkt adressiert durch den Commit
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Datenmodellierung: Vollständiges Multiplayer-Schema mit Session-Management, Teilnehmer-Verwaltung und Antwort-Tracking
- Kooperation mit Wiktor Brzychczy (im Commit erwähnt: "created with @BWGeGe")
- Backrelationen zu bestehendem Schema ergänzt (`gameQuestions` in `Question`, `playerAnswers` in `Answer`)

**Geschätzter Zeitaufwand:** mittel

**Qualitative Bewertung:**
- Arbeitsstil: einzelner, aber umfangreicher Beitrag
- Beitragstyp: kodeorientiert (Backend/Datenmodellierung)
- Sorgfalt: hoch — das Schema ist durchdacht, vollständig und folgt Best Practices

**Gesamteinschätzung:** Tim hat mit dem Multiplayer-Schema den architektonisch wertvollsten einzelnen Studentbeitrag geleistet. Das Datenmodell ist professionell entworfen und bildet die Grundlage für den gesamten Multiplayer-Modus. Die Zusammenarbeit mit Wiktor zeigt koordiniertes Arbeiten. Einziger Kritikpunkt: Nur ein einziger Commit über den gesamten Projektzeitraum.

---

### Brzychczy Wiktor (`BWGeGe`)

**Commits:**
- Anzahl: 1 (Merge-Commit)
- Zeitlicher Verlauf: 12. Jänner 2026
- Branches: `Multiplayer` (remote)
- Codequalität: Merge des PR #7, der Tims Schema-Commit integriert

**Pull Requests:**
- PR #7 (Multiplayer): Vom Lehrer erstellt, Wiktor hat den Merge durchgeführt und ein `APPROVED`-Review verfasst.
- Reviews: 1 (APPROVED auf PR #7)

**Issues:**
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Ursprüngliches Projekt: Wiktor ist der ursprüngliche Autor des Quiz-Projekts, das als Basis diente (Commit "import Wiktors project" — 22 Dateien, ~1385 Zeilen)
- Review-Aktivität: Hat PR #7 geprüft und approved

**Hinweis:** Wiktor's ursprüngliches Projekt wurde vom Lehrer importiert (Commits `grafg@spengergasse.at`). Die Autorenschaft des ursprünglichen Codes ist durch den Commit-Kontext und PR #1 dokumentiert, aber nicht direkt über Git-Commits von Wiktors E-Mail zuzuordnen.

**Geschätzter Zeitaufwand:** hoch (Ursprungsprojekt) bis niedrig (Repository-Beiträge)

**Qualitative Bewertung:**
- Arbeitsstil: Vorarbeit extern, dann einzelner Review/Merge
- Beitragstyp: kodeorientiert (Ursprungscode) + organisatorisch
- Sorgfalt: Bei den Repository-Beiträgen niedrig (nur Merge + Review)

**Gesamteinschätzung:** Wiktors größter Beitrag liegt außerhalb des Gruppen-Repositories — er hat das ursprüngliche Quiz-Projekt erstellt, das als Basis diente. Im Gruppenrepository selbst hat er nur den Merge von PR #7 durchgeführt und ein Review verfasst. Die Mithilfe beim Multiplayer-Schema (von Tim im Commit erwähnt) ist eine unsichtbare Kooperation, die nicht direkt gemessen werden kann.

---

### Janjic Luka (`Luke4910`)

**Commits:**
- Anzahl: 1 (Merge-Commit)
- Zeitlicher Verlauf: 22. Dezember 2025
- Branches: `main`
- Codequalität: Kein eigener Code — Merge des PR #2 (Prisma Fix)

**Pull Requests:**
- PR #1 (Import Wiktors project): Von Luka erstellt, PR-Beschreibung ":)". Der Merge wurde von Marius durchgeführt.
- Keine Reviews verfasst.
- PR-Kommentare: Keine

**Issues:**
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Initiativrolle: Hat PR #1 zum Import des Projekts erstellt und damit den Startpunkt des Gruppen-Repositorys gesetzt

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: einzelne Initiativhandlung zu Projektbeginn
- Beitragstyp: organisatorisch
- Sorgfalt: niedrig — PR-Beschreibung ":)" zeigt wenig formale Sorgfalt

**Gesamteinschätzung:** Luka hat den initialen Import des Projekts durch Erstellung von PR #1 angestoßen. Danach hat er sich im weiteren Projektverlauf nicht mehr beteiligt. Der Beitrag beschränkt sich auf eine koordinative Handlung zu Projektbeginn.

---

### Fink Fabian (`fab1-spg`)

**Commits:**
- Anzahl: 0 (keine eigenen Commits)
- Wird als Co-Autor in Edvins Commit ("Oberfläche für Login-Seite erstellt Edvin & Fabian") und im PR #11 erwähnt

**Pull Requests:**
- Keine PRs erstellt
- Keine Reviews verfasst
- Keine PR-Kommentare

**Issues:**
- Keine Issues erstellt oder kommentiert

**Weitere Beiträge:**
- Kooperation mit Edvin bei der Login-Seite (im Commit dokumentiert, aber kein eigener Git-Nachweis)

**Geschätzter Zeitaufwand:** niedrig

**Qualitative Bewertung:**
- Arbeitsstil: nicht nachweisbar
- Beitragstyp: möglicherweise kodeorientiert (Co-Autor), aber nicht belegbar
- Sorgfalt: nicht beurteilbar

**Gesamteinschätzung:** Fabian wird in Edvins Commit als Co-Autor der Login-Seite erwähnt und ist als Collaborator im Repository eingetragen. Da er jedoch keinen eigenen Commit hat, lässt sich sein tatsächlicher Beitrag nicht messen. Es ist möglich, dass er beim Code-Review oder bei der Konzeption mitgewirkt hat, aber es gibt keinen Git-Nachweis dafür.

---

### Arslan Ceyda (`spg-Ceyda`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Ceyda ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet. Weder Commits, noch PRs, noch Issue-Kommentare sind vorhanden.

---

### Aschenbrenner Nina (`ninaascx`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Nina ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Biberovic Seid (`Seid-Biberovic`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Seid ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Brunner Anastasia (`spg-anastasia`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Anastasia ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Castro Yoav (`spg-YoavCastro`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Yoav ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Fuchs Alexander (`spg-AlexFuchs`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Alexander ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Kabic Branka (`spg-branka`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Branka ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Seitinger Jakob (`Jakey1222`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Jakob ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

### Zuskin Silver (`StanLobo`)

**Commits:** 0
**Pull Requests:** Keine
**Issues:** Keine
**Weitere Beiträge:** Keine nachweisbaren Beiträge im Repository

**Geschätzter Zeitaufwand:** nicht nachweisbar

**Gesamteinschätzung:** Silver ist als Collaborator eingetragen, hat aber keine nachweisbaren Beiträge zum Projekt geleistet.

---

## Zusammenfassung

### Aktivitätsverteilung

| Kategorie | Studierende |
|-----------|------------|
| Substanzielle Codebeiträge | Kulha Tim (Schema), Kolm Benjamin (Tests), Gradascevic Edvin (Login-UI) |
| Organisatorische Beiträge (Merge/PR) | Hristovski Marius, Brzychczy Wiktor, Janjic Luka |
| Nur Co-Autor-Erwähnung | Fink Fabian |
| Keine nachweisbaren Beiträge | Arslan, Aschenbrenner, Biberovic, Brunner, Castro, Fuchs, Kabic, Seitinger, Zuskin (9 Studierende) |

### Auffällige Beobachtungen

- **Starkes Ungleichgewicht:** Von 16 Collaboratoren haben nur 6 überhaupt Commits oder PR-Aktivität. 9 Studierende haben gar keine nachweisbaren Beiträge geleistet.
- **Lehrkraft als Hauptbeitragende:** 16 der 29 Commits stammen vom Lehrer, was auf ein hohes Maß an "Vorbereitungsarbeit" hindeutet.
- **Kurze Aktivitätsphase:** Die Studentenaktivität konzentriert sich auf den Zeitraum 11.–19. Jänner 2026 (ca. 1 Woche). Davor und danach gibt es keine Studentencommits.
- **Fehlende Issue-Kultur:** Kein einziges Issue wurde von einem Studenten erstellt oder kommentiert, obwohl 5 offene Issues existieren.
- **Technische Inkonsistenz:** Die Login-Seite verweist auf `process_login.php`, obwohl das Projekt auf Deno/Hono basiert.
- **Potenzielle unsichtbare Beiträge:** Pair Programming (z.B. Tim + Wiktor beim Schema, Edvin + Fabian bei der Login-Seite) und Offline-Koordination können nicht über Git erfasst werden.

### Empfehlungen für Folgegespräche

- Mit den 9 Studierenden ohne Beiträge: Klären, ob und wie sie außerhalb des Repositories beigetragen haben.
- Mit Tim und Benjamin: Positive Rückmeldung zur Codequalität; ermutigen, öfter und regelmäßiger zu committen.
- Mit Edvin: Architektur-Zusammenhänge besprechen (Deno/Hono vs. PHP).
- Klassenübergreifend: Git-Workflow (Branches, PRs, Issues) intensiver üben.

### Methodische Einschränkungen

Diese Bewertung basiert ausschließlich auf im Git-Repository und auf GitHub nachweisbaren Aktivitäten. Offline-Koordination, Pair Programming als Navigator, verbale Diskussionen und externe Recherche bleiben unsichtbar. Die Bewertung sollte daher als Gesprächsgrundlage verstanden werden, nicht als abschließende Beurteilung.
