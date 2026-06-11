/* ============================================================
   HerwardTimm e.K. — Plattform-Demo
   Gemeinsames JS-Modul
   ============================================================ */

// ------- Schulungs-Katalog -------
const COURSES = [
  {
    id: 'allgemein',
    title: 'Allgemeine Sicherheitsunterweisung',
    short: 'Pflicht-Grundunterweisung nach §12 ArbSchG für alle Beschäftigten.',
    duration: 55,
    slides: 54,
    version: 'v4 Premium',
    price: 39,
    basis: '§12 ArbSchG',
    obligation: 'Pflicht jährlich, alle Beschäftigten',
    icon: 'shield',
    group: 'jaehrlich',
    objectives: [
      'Grundpflichten von Arbeitgeber und Beschäftigten kennen',
      'Verantwortlichkeiten im Betrieb verstehen',
      'Verhalten bei Unfällen und Beinahe-Unfällen',
      'Meldewege und Ansprechpartner sicher anwenden'
    ],
    topics: [
      'Rechtsgrundlagen und Pflichten nach ArbSchG',
      'Rolle der Sifa, des Betriebsarztes, der Sicherheitsbeauftragten',
      'Gefährdungsbeurteilung — was Beschäftigte wissen sollten',
      'Unterweisungsdokumentation und Nachweispflicht',
      'Verhalten bei Unfällen, Erste-Hilfe-Grundlagen',
      'Meldewege intern und an die Berufsgenossenschaft'
    ]
  },
  {
    id: 'brandschutz',
    title: 'Brandschutz und Verhalten im Brandfall',
    short: 'Brandklassen, Verhütung, Verhalten — Pflicht jährlich für alle Beschäftigten.',
    duration: 50,
    slides: 49,
    version: 'v4 Premium',
    price: 39,
    basis: '§10 ArbSchG · ASR A2.2',
    obligation: 'Pflicht jährlich, alle Beschäftigten',
    icon: 'flame',
    group: 'jaehrlich',
    objectives: [
      'Brandklassen A bis F sicher unterscheiden',
      'Wirkprinzipien gängiger Feuerlöscher kennen',
      'Eigenes Verhalten im Brandfall richtig priorisieren',
      'Flucht- und Rettungswege zuverlässig nutzen'
    ],
    topics: [
      'Verbrennungsdreieck und Brandklassen A/B/C/D/F',
      'Geeignete Löschmittel je Brandklasse',
      'Bedienung von Feuerlöschern (3-Schritt-Prinzip)',
      'Vorbeugender Brandschutz im Arbeitsalltag',
      'Verhalten im Brandfall — Retten, Melden, Löschen',
      'Flucht- und Rettungswege, Sammelplätze',
      'Brandschutzbeauftragter, Brandschutzordnung Teil A/B/C',
      'Besonderheiten bei Elektrobränden und Akku-Bränden'
    ]
  },
  {
    id: 'bildschirm',
    title: 'Bildschirmarbeit ergonomisch gestalten',
    short: 'Ergonomie am Bildschirmarbeitsplatz nach ArbStättV.',
    duration: 45,
    slides: 46,
    version: 'v4 Premium',
    price: 29,
    basis: 'ArbStättV Anhang 6',
    obligation: 'Pflicht bei Bildschirmarbeit',
    icon: 'monitor',
    group: 'jaehrlich',
    objectives: [
      'Sitzhaltung und Arbeitsplatz korrekt einstellen',
      'Bildschirm, Tastatur und Maus ergonomisch anordnen',
      'Pausen- und Bewegungsregel anwenden',
      'Lichtverhältnisse und Sehkomfort sicherstellen'
    ],
    topics: [
      'Anforderungen der ArbStättV an Bildschirmarbeitsplätze',
      'Sitzhaltung, Stuhleinstellung, Tischhöhe',
      'Bildschirm: Höhe, Abstand, Blickwinkel',
      'Tastatur, Maus, Vorlagen — ergonomische Anordnung',
      'Beleuchtung und Blendung',
      'Pausenregel — 5 Minuten je Stunde Bildschirm',
      'Augenuntersuchungen nach G37'
    ]
  },
  {
    id: 'datenschutz',
    title: 'Datenschutz und DSGVO im Arbeitsalltag',
    short: 'Praxiswissen DSGVO für alle Beschäftigten mit Datenzugang.',
    duration: 45,
    slides: 46,
    version: 'v4 Premium',
    price: 49,
    basis: 'DSGVO Art. 39',
    obligation: 'Pflicht bei Verarbeitung personenbezogener Daten',
    icon: 'lock',
    group: 'jaehrlich',
    objectives: [
      'Grundprinzipien der DSGVO sicher anwenden',
      'Personenbezogene Daten korrekt verarbeiten',
      'Betroffenenrechte und Meldepflichten kennen',
      'Sicheres Verhalten bei E-Mail, USB, Cloud'
    ],
    topics: [
      'Grundsätze: Rechtmäßigkeit, Zweckbindung, Datenminimierung',
      'Personenbezogene und besondere Kategorien von Daten',
      'Betroffenenrechte (Auskunft, Löschung, Berichtigung)',
      'Datenpannen — wann und wie melden (72-Stunden-Frist)',
      'Sichere Passwörter und Mehrfaktor-Authentifizierung',
      'E-Mail, Anhänge, Phishing-Erkennung',
      'Cloud, mobile Geräte, Home-Office',
      'Auftragsverarbeitung und Datenweitergabe'
    ]
  },
  {
    id: 'elektro',
    title: 'Elektrosicherheit für Nichtelektrofachkräfte',
    short: 'Pflichtunterweisung nach DGUV V3 für Bediener elektrischer Geräte.',
    duration: 45,
    slides: 43,
    version: 'v4 Premium',
    price: 49,
    basis: 'DGUV V3 · DIN VDE 0105-100',
    obligation: 'Pflicht jährlich bei elektrischen Tätigkeiten',
    icon: 'bolt',
    group: 'jaehrlich',
    objectives: [
      'Gefahren des elektrischen Stroms einordnen',
      '5 Sicherheitsregeln kennen (für Beobachtung)',
      'Sichtprüfung an Betriebsmitteln durchführen',
      'Grenzen der eigenen Befugnis erkennen'
    ],
    topics: [
      'Wirkung des elektrischen Stroms auf den Menschen',
      'Spannungsbereiche und Schutzklassen',
      'Sichtprüfung ortsveränderlicher Geräte',
      'Defekte Kabel, Stecker, Verlängerungen erkennen',
      'Verhalten bei elektrischen Unfällen',
      'Tätigkeiten unterwiesener Personen vs. Elektrofachkraft',
      'Prüfung nach DGUV V3 — was bedeutet die Plakette?'
    ]
  },
  {
    id: 'gefahrstoffe',
    title: 'Gefahrstoffe Grundunterweisung',
    short: 'Sicherer Umgang mit Gefahrstoffen nach GefStoffV.',
    duration: 45,
    slides: 44,
    version: 'v4 Premium',
    price: 49,
    basis: 'GefStoffV §14',
    obligation: 'Pflicht jährlich bei Tätigkeiten mit Gefahrstoffen',
    icon: 'flask',
    group: 'jaehrlich',
    objectives: [
      'Gefahrenpiktogramme und H/P-Sätze lesen',
      'Sicherheitsdatenblatt sicher interpretieren',
      'Schutzmaßnahmen nach STOP-Prinzip auswählen',
      'Verhalten bei Unfällen und Verschütten'
    ],
    topics: [
      'Gefahrenpiktogramme (GHS) und Bedeutung',
      'H- und P-Sätze — Aufbau und Anwendung',
      'Sicherheitsdatenblatt — wichtige Abschnitte',
      'STOP-Prinzip: Substitution, Technisch, Organisatorisch, Persönlich',
      'Lagerung und Zusammenlagerungsverbote',
      'Persönliche Schutzausrüstung beim Umgang',
      'Notfall: Verschütten, Hautkontakt, Augenkontakt',
      'Gefahrstoffverzeichnis und Betriebsanweisung'
    ]
  },
  {
    id: 'psa',
    title: 'Persönliche Schutzausrüstung (PSA)',
    short: 'Auswahl, Tragen und Pflege von PSA nach DGUV V1.',
    duration: 40,
    slides: 43,
    version: 'v4 Premium',
    price: 29,
    basis: 'DGUV V1 §30 · PSA-BV',
    obligation: 'Pflicht jährlich bei PSA-Nutzung',
    icon: 'helmet',
    group: 'jaehrlich',
    objectives: [
      'PSA-Typen sicher zuordnen',
      'Korrektes Anlegen und Tragen',
      'Pflege, Wartung und Ablegezeitpunkt',
      'Verantwortlichkeiten und Pflichten kennen'
    ],
    topics: [
      'PSA-Kategorien I, II, III',
      'Kopfschutz: Helm, Bauarbeiterhelm, Anstoßkappe',
      'Augen- und Gesichtsschutz, Brillen, Schilde',
      'Gehörschutz: Stöpsel, Kapsel, Otoplastiken',
      'Atemschutz: Filter, FFP-Klassen, Halbmasken',
      'Hand- und Hautschutz, Handschuhauswahl',
      'Fuß- und Beinschutz, S-Klassen',
      'PSA gegen Absturz — Auffanggurt-Grundlagen'
    ]
  },
  // ===== NEUE SCHULUNGEN (Welle A — Auffrischungen) =====
  {
    id: 'stapler-auff',
    title: 'Stapler-Auffrischung',
    short: 'Jährliche Auffrischung nach DGUV V68. Erstausbildung muss in Präsenz erfolgen.',
    duration: 40,
    slides: 42,
    version: 'v4 Premium',
    price: 49,
    basis: 'DGUV V68',
    obligation: 'Pflicht jährlich (Auffrischung)',
    icon: 'truck',
    group: 'auffrischung',
    objectives: [
      'Lastdiagramm und Standsicherheit beurteilen',
      'Lastaufnahme/-abgabe sicher durchführen',
      'Tagespflege und Mängelmeldung als Routine',
      'Verhalten in Notfällen (Kippen, Brand, Lastabsturz)'
    ],
    topics: [
      'Rechtlicher Rahmen DGUV V68 + V70',
      'Fahrzeugkunde (Hubgerüst, Last/Schwerpunkt, Reifen, Bremsen)',
      'Fahrweise (Sicht, Geschwindigkeit, Rampen, Gegenverkehr)',
      'Lastaufnahme und -abgabe',
      'Stapeln und Regalbedienung',
      'Innerbetriebliche Verkehrsregeln',
      'Verhalten in Notfällen',
      'Tagespflege und PSA',
      'UVV-Wiederholungsprüfung'
    ]
  },
  {
    id: 'buehnen-auff',
    title: 'Hubarbeitsbühnen-Auffrischung',
    short: 'Jährliche Auffrischung nach DGUV V100 und Grundsatz 308-008.',
    duration: 40,
    slides: 42,
    version: 'v4 Premium',
    price: 49,
    basis: 'DGUV V100',
    obligation: 'Pflicht jährlich (Auffrischung)',
    icon: 'arrow-up',
    group: 'auffrischung',
    objectives: [
      'Bühnentypen und Einsatzgrenzen unterscheiden',
      'Standsicherheit (Untergrund, Wind, Schräglage) bewerten',
      'PSA gegen Absturz korrekt nutzen',
      'Notabsetzen und Bergung beherrschen'
    ],
    topics: [
      'Bühnen-Typen (Schere, Teleskop, Gelenk, LKW)',
      'Tragfähigkeit und Lastgrenzen',
      'Standsicherheit und Wind-Grenzen',
      'Bedienelemente und Sicherheitseinrichtungen',
      'PSA-Absturz und Hängetrauma-Vorsorge',
      'Mindestabstände zu Stromleitungen',
      'Notabsetzen und Bergung',
      'Tagespflege und Mängelmeldung'
    ]
  },
  {
    id: 'hautschutz',
    title: 'Hautschutz und PSA-Hände',
    short: 'Schutz vor der häufigsten Berufskrankheit — Hauterkrankungen.',
    duration: 35,
    slides: 40,
    version: 'v4 Premium',
    price: 39,
    basis: 'TRGS 401',
    obligation: 'Pflicht jährlich bei Hautgefährdung',
    icon: 'hand',
    group: 'jaehrlich',
    objectives: [
      '3-Stufen-Hautschutzplan anwenden',
      'Hautgefährdung nach Stoffgruppe einschätzen',
      'Schutzhandschuhe passend zur Stoffgruppe auswählen',
      'G24-Vorsorge bei Feuchtarbeit zuordnen'
    ],
    topics: [
      'Hautkrankheiten als Berufskrankheit Nr. 1',
      'Hautgefährdungen (Feuchtarbeit, Lösemittel, Säuren)',
      '3-Stufen-Hautschutzplan',
      'Schutzhandschuhe — Material zur Stoffgruppe',
      'Tragezeiten und Wechsel-Disziplin',
      'STOP-Prinzip und Vermeidung Hautkontakt',
      'Erstmaßnahmen bei Hautkontakt',
      'G24 Vorsorge bei Feuchtarbeit'
    ]
  },
  {
    id: 'eup-auff',
    title: 'Elektrofachkraft EuP — Auffrischung',
    short: 'Jährliche Auffrischung nach DGUV V3 für elektrotechnisch unterwiesene Personen.',
    duration: 40,
    slides: 42,
    version: 'v4 Premium',
    price: 59,
    basis: 'DGUV V3 · VDE 0105-100',
    obligation: 'Pflicht jährlich (Auffrischung)',
    icon: 'bolt',
    group: 'auffrischung',
    objectives: [
      'Stufen EFK / EuP / Laie sicher zuordnen',
      '5 Sicherheitsregeln routiniert anwenden',
      'Erstmaßnahmen bei Elektrounfall ausführen',
      'EuP-Grenzen klar einhalten'
    ],
    topics: [
      'DGUV V3 und DIN VDE 0105-100',
      'Definitionen EFK, EuP, Laie',
      '5 Sicherheitsregeln',
      'Elektrische Gefährdungen erkennen',
      'Sicherheitsabstände',
      'Erstmaßnahmen bei Elektrounfall',
      'Prüfintervalle DGUV V3',
      'Sondertätigkeiten und Grenzen der EuP'
    ]
  },
  {
    id: 'bsh-auff',
    title: 'Brandschutzhelfer-Auffrischung',
    short: 'Auffrischung alle 3-5 Jahre. Erstausbildung mit Löschübung in Präsenz.',
    duration: 35,
    slides: 42,
    version: 'v4 Premium',
    price: 49,
    basis: 'ASR A2.2 · DGUV I 205-023',
    obligation: 'Auffrischung alle 3-5 Jahre',
    icon: 'flame',
    group: 'auffrischung',
    objectives: [
      'Aufgaben als Brandschutzhelfer benennen',
      'Brandklassen und Löschmittel zuordnen',
      'Schema alarmieren-retten-löschen anwenden',
      'Evakuierungsabläufe organisieren'
    ],
    topics: [
      'Rolle des Brandschutzhelfers',
      'Brandklassen und Feuerlöscher',
      '5%-Regel und Brandschutzhelfer-Anzahl',
      'Vorbeugender Brandschutz',
      'Verhalten im Brandfall',
      'Evakuierungsabläufe',
      'Flucht- und Rettungspläne',
      'Zusammenarbeit mit Feuerwehr',
      'Räumungsübung'
    ]
  },
  {
    id: 'sibe-auff',
    title: 'Sicherheitsbeauftragte — Auffrischung',
    short: 'Auffrischung für bestellte SiBe. Erstausbildung erfolgt in BG-Präsenz.',
    duration: 35,
    slides: 42,
    version: 'v4 Premium',
    price: 79,
    basis: 'DGUV V1 §20',
    obligation: 'Auffrischung alle 3-5 Jahre',
    icon: 'shield',
    group: 'auffrischung',
    objectives: [
      'Rolle als SiBe präzise einordnen (beratend, NICHT weisungsbefugt)',
      'Zusammenarbeit mit Sifa, Betriebsarzt, Vorgesetzten strukturieren',
      'Gefährdungen erkennen und melden',
      'Beinaheunfälle systematisch erfassen'
    ],
    topics: [
      'Rolle und Grenzen des SiBe',
      'Bestellung und Wahlperiode',
      'Konkrete Aufgaben',
      'Zusammenarbeit mit Sifa, BA, Vorgesetzten',
      'Gefährdungserkennung',
      'PSA-Wirkung und STOP-Prinzip',
      'Verhalten bei Unfällen',
      'Beinaheunfälle melden',
      'Begehungen und ASA-Sitzungen'
    ]
  },
  // ===== NEUE SCHULUNGEN (Welle B — Standard-Themen) =====
  {
    id: 'lasten',
    title: 'Manuelle Lastenhandhabung',
    short: 'Heben und Tragen rückenschonend — LMM und Hilfsmittel.',
    duration: 45,
    slides: 49,
    version: 'v4 Premium',
    price: 29,
    basis: 'LasthandhabV',
    obligation: 'Pflicht jährlich bei Heben/Tragen',
    icon: 'weight',
    group: 'jaehrlich',
    objectives: [
      'Belastungsgrenzwerte für sich einschätzen',
      'Leitmerkmalmethode (LMM) nutzen',
      'Rückenschonende Hebetechnik anwenden',
      'Hilfsmittel sinnvoll einsetzen'
    ],
    topics: [
      'Rückenleiden als Berufsunfähigkeits-Ursache Nr. 1',
      'Belastungsgrenzwerte M/F',
      'Leitmerkmalmethode (LMM)',
      '5 goldene Regeln der Hebetechnik',
      'Tragen über Distanz',
      'Schieben und Ziehen statt Heben',
      'Hilfsmittel (Sackkarre, Hubwagen)',
      'Pausen und Mikropausen',
      'G46-Vorsorge'
    ]
  },
  {
    id: 'stress',
    title: 'Stress und psychische Belastung',
    short: 'Frühwarnzeichen erkennen und Hilfsangebote nutzen.',
    duration: 35,
    slides: 41,
    version: 'v4 Premium',
    price: 39,
    basis: '§5 Abs. 3 Nr. 6 ArbSchG',
    obligation: 'Pflicht jährlich',
    icon: 'brain',
    group: 'jaehrlich',
    objectives: [
      'Belastung, Beanspruchung und Stress unterscheiden',
      'Stressoren am Arbeitsplatz identifizieren',
      'Symptome bei sich und Kolleg:innen früh erkennen',
      'Selbsthilfe-Techniken anwenden'
    ],
    topics: [
      'Belastung vs. Beanspruchung vs. Stress',
      'Stressoren am Arbeitsplatz',
      'Frühwarnzeichen',
      'Selbsthilfe (Pausen, Bewegung, Atem)',
      'Gespräch mit Vorgesetzten',
      'Betriebliche Hilfsangebote (EAP, BGM)',
      'Burnout-Verlauf',
      'BEM — Wiedereingliederungs-Management',
      'Resilienz aufbauen'
    ]
  },
  {
    id: 'mobil',
    title: 'Mobiles Arbeiten und Homeoffice',
    short: 'Ergonomie, Datenschutz und Arbeitszeit-Erfassung zu Hause.',
    duration: 35,
    slides: 39,
    version: 'v4 Premium',
    price: 39,
    basis: 'ArbSchG · ArbZG · ASR V3a.2',
    obligation: 'Pflicht jährlich bei mobiler Arbeit',
    icon: 'home',
    group: 'jaehrlich',
    objectives: [
      'Telearbeit, mobiles Arbeiten und Homeoffice unterscheiden',
      'Heim-Arbeitsplatz ergonomisch einrichten',
      'Erreichbarkeit gestalten',
      'Datenschutz unterwegs umsetzen'
    ],
    topics: [
      'Definitionen Telearbeit / mobiles Arbeiten / Homeoffice',
      'Ergonomischer Arbeitsplatz zu Hause',
      'Bildschirmpausen und 20-20-20-Regel',
      'Selbst-Organisation und Pausen-Disziplin',
      'Erreichbarkeit und Recht auf Unerreichbarkeit',
      'Arbeitszeit-Erfassungspflicht (BAG-Urteil 2022)',
      'Datenschutz unterwegs (Sichtschutz, VPN)',
      'Versicherungsschutz im Homeoffice'
    ]
  },
  {
    id: 'verkehr',
    title: 'Verkehrssicherheit und Wegeunfälle',
    short: 'Sicher zur Arbeit und zurück — Wegeunfälle vermeiden.',
    duration: 35,
    slides: 40,
    version: 'v4 Premium',
    price: 29,
    basis: 'DGUV V70',
    obligation: 'Pflicht jährlich (Außendienst)',
    icon: 'car',
    group: 'jaehrlich',
    objectives: [
      'Häufigste Wegeunfälle-Ursachen kennen',
      'Müdigkeit und Reaktionszeit einschätzen',
      'Bei Unfall richtig handeln',
      'Versicherungsschutz bei Wegeunfällen verstehen'
    ],
    topics: [
      'Wegeunfall-Statistik',
      'Wahl des sicheren Weges',
      'Müdigkeit und Reaktionszeit',
      'Handy-Verbot (§23 StVO)',
      'Witterungseinflüsse',
      'Reflektierende Kleidung',
      'Verhalten bei Unfall',
      'Erste-Hilfe-Set im Fahrzeug',
      'BG-Versicherungsschutz'
    ]
  },
  {
    id: 'hygiene',
    title: 'Hygiene am Arbeitsplatz',
    short: 'Händehygiene, Infektionsschutz und Pandemie-Resilienz.',
    duration: 35,
    slides: 40,
    version: 'v4 Premium',
    price: 29,
    basis: 'TRBA · IfSG · ArbStättV',
    obligation: 'Pflicht jährlich bei Hygiene-relevanter Tätigkeit',
    icon: 'droplet',
    group: 'branche',
    objectives: [
      '5-Momente-Regel der Händehygiene anwenden',
      'Sauberkeit am Arbeitsplatz als Routine etablieren',
      'Reinigungs- und Desinfektionsmittel sicher einsetzen',
      'Bei eigener Krankheit richtig verhalten'
    ],
    topics: [
      'Händehygiene 5-Momente',
      'Handwäsche vs. Desinfektion',
      'Persönliche Hygiene',
      'Sauberkeit am Arbeitsplatz',
      'Pausenraum-Hygiene',
      'Reinigungsmittel sicher (Mischverbot!)',
      'Infektionsschutz und Lüftung',
      'Verhalten bei Krankheit',
      'Pandemie-Aspekte (COVID Lessons)'
    ]
  },
  {
    id: 'sucht',
    title: 'Suchtprävention am Arbeitsplatz',
    short: 'Sucht erkennen, ansprechen, Hilfe vermitteln.',
    duration: 35,
    slides: 41,
    version: 'v4 Premium',
    price: 39,
    basis: 'DGUV I 206-009',
    obligation: 'Pflicht jährlich',
    icon: 'alert',
    group: 'jaehrlich',
    objectives: [
      'Suchtformen sicher einordnen',
      'Suchtkreislauf und Frühwarnzeichen erkennen',
      'Rechtliche Regelungen kennen',
      'Hilfsangebote nutzen'
    ],
    topics: [
      'Sucht als anerkannte Krankheit',
      'Alkohol, Tabak, Medikamente, Drogen',
      'Verhaltenssüchte (Spielen, Internet, Arbeit)',
      'Suchtkreislauf-Phasen',
      'Auswirkungen auf Arbeitssicherheit',
      'Gesetzliche Regelungen und Stufenplan',
      'Frühwarnzeichen erkennen',
      'Hilfsangebote (BZgA, Suchtberatung)'
    ]
  },
  // ===== NEUE SCHULUNGEN (Welle C — KMU-Standardthemen) =====
  {
    id: 'srs',
    title: 'Stolpern, Rutschen, Stürzen vermeiden',
    short: 'Die häufigste Unfallart sicher vermeiden. Online-Unterweisung — ersetzt nicht die Begehung und Gefährdungsbeurteilung vor Ort.',
    duration: 30,
    slides: 39,
    version: 'v1 (2026)',
    price: 29,
    basis: 'ArbSchG · ArbStättV · ASR A1.5/1,2',
    obligation: 'Pflicht jährlich',
    icon: 'alert',
    group: 'jaehrlich',
    objectives: [
      'Die Bedeutung von SRS-Unfällen einordnen',
      'Typische Ursachen für Stolpern, Rutschen und Stürzen erkennen',
      'Schutzmaßnahmen und sicheres Verhalten anwenden',
      'Gefahrenstellen melden und beseitigen lassen'
    ],
    topics: [
      'SRS als häufigste Unfallart — Bedeutung und Folgen',
      'Rechtsgrundlagen: ArbSchG, ArbStättV, ASR A1.5/1,2, A1.8, A3.4',
      'Stolpern: Ordnung, Kabel, Höhenunterschiede',
      'Rutschen: Nässe, Beläge, Rutschhemmung (R-Gruppen), Schuhwerk',
      'Stürzen: Treppen, Handlauf, Beleuchtung',
      'Schutzmaßnahmen, Verhalten und Winterdienst',
      'Online-Grenze: Begehung und Gefährdungsbeurteilung bleiben vor Ort'
    ]
  },
  {
    id: 'leitern',
    title: 'Leitern und Tritte sicher benutzen',
    short: 'Auswahl, Prüfung und sichere Benutzung von Leitern und Tritten. Ersetzt nicht die praktische Einweisung und Leiterprüfung vor Ort.',
    duration: 35,
    slides: 38,
    version: 'v1 (2026)',
    price: 29,
    basis: 'BetrSichV · TRBS 2121-2 · DGUV I 208-016',
    obligation: 'Pflicht jährlich bei Leiter-/Trittnutzung',
    icon: 'arrow-up',
    group: 'jaehrlich',
    objectives: [
      'Leiterarten kennen und passend auswählen',
      'Gefährdungen und typische Unfallursachen erkennen',
      'Leitern vor der Benutzung richtig prüfen',
      'Leitern und Tritte sicher aufstellen und benutzen'
    ],
    topics: [
      'Rechtsgrundlagen und Vorrangprinzip (sichereres Arbeitsmittel zuerst)',
      'Leiterarten und richtige Auswahl, Tritte und Podestleitern',
      'Gefährdungen und typische Fehlbenutzungen',
      'Sichtprüfung und wiederkehrende Prüfung durch befähigte Person',
      'Sichere Benutzung: Aufstellwinkel, Drei-Punkt-Kontakt',
      'Online-Grenze: praktische Einweisung und Leiterprüfung bleiben vor Ort'
    ]
  }
];

// Für Dashboard / Schulungs-Seiten global verfügbar machen
if (typeof window !== 'undefined') { window.COURSES = COURSES; }

const BUNDLE = {
  id: 'bundle-basis',
  title: 'Basis-Paket Arbeitsschutz',
  price: 199,
  regular: 283,
  description: 'Alle 7 Pflichtschulungen für KMUs in einem Paket — sparen Sie 84 € gegenüber Einzelkauf.'
};

const BRANCHES = [
  'Elektrotechnik / Elektro-Handwerk',
  'Pharma / Kosmetik / Hygiene',
  'Industrie / Maschinenbau',
  'Bauhandwerk / Bauelemente',
  'Gastronomie / Hotellerie',
  'Einzelhandel / Großhandel',
  'Logistik / Transport',
  'Bürodienstleistung / Beratung',
  'Gesundheitswesen / Pflege',
  'Bildung / Soziale Einrichtungen',
  'Reinigung / Gebäudedienste',
  'Landwirtschaft / Garten',
  'Kfz-Gewerbe',
  'Sonstiges'
];

// ------- localStorage helpers -------
const Store = {
  get(key, fallback = null) {
    try {
      const v = localStorage.getItem(`htk-${key}`);
      return v ? JSON.parse(v) : fallback;
    } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(`htk-${key}`, JSON.stringify(value)); } catch (e) {}
  },
  push(key, value) {
    const arr = Store.get(key, []);
    arr.push(value);
    Store.set(key, arr);
  }
};

// ------- Toast notifications -------
function toast(message, type = 'success', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span><span>${message}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .3s, transform .3s';
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    setTimeout(() => el.remove(), 300);
  }, duration);
}

// ------- Mobile nav toggle -------
function initNav() {
  const btn = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', () => menu.classList.toggle('open'));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

// ------- Tier calculator (mirrors Onboarding-Excel logic) -------
/**
 * Liefert eine Tier-Empfehlung basierend auf Firmendaten und Gefährdungen.
 *
 * Tier S = Unternehmermodell — reines Dokumentenpaket (Selbstbetreuung).
 *          Der Kunde steuert die Arbeitssicherheit selbst und übernimmt die
 *          Verantwortung; wir verkaufen NUR die Dokumente/Vorlagen, KEINE
 *          Beratung oder Betreuung. Keine Mitarbeiter-Obergrenze.
 *          Preis je Jahr, größenabhängig (mehr MA = größerer Dokumenten-Umfang).
 * Tier 1 = Quartal-Betreuung, 80–180 €/Quartal (Risiko verschiebt zum oberen Rand)
 * Tier 2 = Monat-Betreuung, ab 200 €/Monat (mit Aufschlag bei Risiko / Sondergefährdung)
 *
 * WICHTIG: Bei Regelbetreuung richtet sich das Tier PRIMÄR nach der Betriebsgröße.
 * Eine Risiko-Branche erhöht den Preis (Aufschlag) und senkt die Tier-2-Schwelle
 * leicht — sie katapultiert aber keinen Kleinbetrieb mehr automatisch in Tier 2.
 *
 * @param {string} model  'regel' | 'unternehmermodell' | 'unklar'
 */
function calculateTier({ employees = 0, branch = '', hazards = [], sites = 1, model = 'regel' }) {
  const empCount = parseInt(employees) || 0;
  const highRiskBranches = [
    'Elektrotechnik / Elektro-Handwerk',
    'Industrie / Maschinenbau',
    'Pharma / Kosmetik / Hygiene',
    'Bauhandwerk / Bauelemente',
    'Kfz-Gewerbe'
  ];
  const highRiskHazards = ['Elektro', 'Höhe', 'Gefahrstoffe', 'Maschinen'];
  const isHighRiskBranch = highRiskBranches.includes(branch);
  const hasHighRiskHazard = hazards.some(h => highRiskHazards.includes(h));
  const sondergefahr = hazards.length >= 5;

  const wantsUM = model === 'unternehmermodell';

  let tier, tierName, basePriceLow, basePriceHigh, frequency, freqLabel;

  if (wantsUM) {
    // --- Tier S: Unternehmermodell — reines Dokumentenpaket ---
    // Keine Beratung, keine Betreuung, keine Verantwortung unsererseits.
    // Wir liefern die Dokumente; der Umfang (und damit der Preis) skaliert
    // mit der Betriebsgröße. Keine MA-Obergrenze.
    tier = 'S';
    tierName = 'Unternehmermodell — Dokumentenpaket';
    frequency = 'Jahr';
    freqLabel = 'je Jahr · Aktualisierung der Dokumente';
    // Laufender Jahrespreis = NUR die Aktualisierung. Die einmalige Erstellung
    // des Dokumentenpakets wird separat als setupFee berechnet (siehe unten).
    basePriceLow = 99; basePriceHigh = 149;
    if (empCount > 50) { basePriceLow = 249; basePriceHigh = 399; }
    else if (empCount > 10) { basePriceLow = 149; basePriceHigh = 249; }
    // Mehr Gefährdungen = mehr Dokumente (Betriebsanweisungen etc.)
    if (isHighRiskBranch || hasHighRiskHazard) {
      basePriceLow = Math.round(basePriceLow * 1.1);
      basePriceHigh = Math.round(basePriceHigh * 1.1);
    }
  } else {
    // --- Regelbetreuung: Tier-Schwelle größenbasiert ---
    // Risiko-Branchen erreichen Tier 2 etwas früher (15 statt 20 MA).
    const tier2Threshold = isHighRiskBranch ? 15 : 20;

    if (empCount < tier2Threshold) {
      tier = 1;
      tierName = 'Tier 1 — Quartal-Betreuung';
      frequency = 'Quartal';
      freqLabel = 'je Quartal · 4 × jährlich';
      basePriceLow = 80; basePriceHigh = 130;
      if (empCount > 10) { basePriceLow = 130; basePriceHigh = 180; }
      else if (empCount > 5) { basePriceLow = 100; basePriceHigh = 150; }
      // Risiko-Aufschlag innerhalb Tier 1, gedeckelt auf den kommunizierten
      // Rahmen von max. 180 €/Quartal.
      if (isHighRiskBranch || hasHighRiskHazard) {
        basePriceLow = Math.round(basePriceLow * 1.1);
        basePriceHigh = Math.round(basePriceHigh * 1.1);
        basePriceHigh = Math.min(basePriceHigh, 180);
        basePriceLow = Math.min(basePriceLow, basePriceHigh);
      }
    } else {
      tier = 2;
      tierName = 'Tier 2 — Monats-Betreuung';
      frequency = 'Monat';
      freqLabel = 'je Monat · monatlich';
      basePriceLow = 200; basePriceHigh = 400;
      if (empCount >= 100) { basePriceLow = 340; basePriceHigh = 480; }
      else if (empCount >= 50) { basePriceLow = 280; basePriceHigh = 400; }
      if (isHighRiskBranch || hasHighRiskHazard) {
        basePriceLow = Math.round(basePriceLow * 1.1);
        basePriceHigh = Math.round(basePriceHigh * 1.15);
      }
    }
  }

  if (sondergefahr) {
    basePriceLow = Math.round(basePriceLow * 1.3);
    basePriceHigh = Math.round(basePriceHigh * 1.3);
  }
  if (sites > 1) {
    basePriceLow = Math.round(basePriceLow * (1 + 0.15 * (sites - 1)));
    basePriceHigh = Math.round(basePriceHigh * (1 + 0.15 * (sites - 1)));
  }

  // Einmalige Erstausstattung / Erstellung.
  let setupFee, setupLabel, setupNote;
  if (tier === 'S') {
    // Unternehmermodell: einmalige Erstellung und Lieferung des Dokumentenpakets,
    // größenabhängig (mehr MA = mehr Dokumente). Danach nur noch der Jahrespreis
    // für die Aktualisierung.
    setupFee = empCount > 50 ? 890 : (empCount > 10 ? 590 : 390);
    setupLabel = 'Dokumentenpaket — einmalige Erstellung';
    setupNote = 'Erstmalige Erstellung und Lieferung aller Dokumente und Vorlagen für Ihren Betrieb';
  } else {
    setupFee = 699;
    setupLabel = 'Einmalige Erstausstattung';
    setupNote = 'GBU-Ersterstellung, Dokumenten-Aufbau, Bestellurkunden, Portal-Einrichtung';
  }

  return {
    tier,
    tierName,
    frequency,
    freqLabel,
    priceLow: basePriceLow,
    priceHigh: basePriceHigh,
    setupFee,
    setupLabel,
    setupNote,
    riskBranch: isHighRiskBranch,
    riskHazard: hasHighRiskHazard,
    sondergefahr
  };
}

// ------- Schulungs-Käufe -------
// TODO GO-LIVE: Dies ist ein Demo-Stub. Der "Kauf" schaltet die Schulung
// nur lokal (localStorage) frei — es findet KEINE echte Zahlung statt.
// Vor Live-Gang an einen Zahlungsanbieter (Stripe/Mollie) anbinden und die
// Freischaltung erst nach bestätigter Zahlung auslösen.
function buyCourse(courseId) {
  const list = Store.get('purchases', []);
  if (list.find(c => c.id === courseId)) {
    toast('Diese Schulung haben Sie bereits gekauft.', 'success');
    return;
  }
  const course = COURSES.find(c => c.id === courseId) || (courseId === BUNDLE.id ? BUNDLE : null);
  if (!course) return;
  if (courseId === BUNDLE.id) {
    COURSES.forEach(c => {
      if (!list.find(x => x.id === c.id)) {
        list.push({ id: c.id, title: c.title, date: new Date().toISOString(), progress: 0, completed: false });
      }
    });
  } else {
    list.push({ id: course.id, title: course.title, date: new Date().toISOString(), progress: 0, completed: false });
  }
  Store.set('purchases', list);
  Store.set('loggedIn', true);
  toast('Schulung freigeschaltet — Sie finden sie jetzt im Lernbereich.', 'success', 4500);
}

// ------- Datums-Formatter -------
function fmtDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// ------- Fade-in Intersection Observer (site-wide) -------
function initFadeIn() {
  const els = document.querySelectorAll('.fade-in');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.05 });
  els.forEach(el => io.observe(el));
}

// ------- Lightbox helper (site-wide, for any page that uses .lightbox) -------
function initLightbox() {
  const lb = document.querySelector('.lightbox');
  if (!lb) return;
  lb.addEventListener('click', e => {
    if (e.target === lb) lb.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') lb.classList.remove('open');
  });
}

// ============================================================
// Profil + Audit-Log (DGUV-Konformität, Juni 2026)
// ------------------------------------------------------------
// Profil bleibt persistent in localStorage. Beim Lernen ist die
// Identität dadurch eindeutig bekannt — der Lerner muss am Ende
// kein Formular mehr ausfüllen, und der Unterweisungsnachweis ist
// rechtssicher zuordbar (statt selbst-deklariert).
// ============================================================

/**
 * Default-Demo-Profil für den friction-armen „Direkt einloggen (Demo)"-Pfad.
 * Wird angelegt, wenn jemand eine Login-pflichtige Seite aufruft, ohne sich
 * vorher per Magic-Link / Formular registriert zu haben.
 *
 * Ein Profil, dessen E-Mail diesem Wert entspricht, gilt als „Demo-Modus" und
 * bekommt einen kleinen Hinweis-Banner auf den Mein-Bereich-Seiten.
 */
const DEMO_PROFILE = {
  email: 'demo@beispiel.de',
  vorname: 'Demo',
  nachname: 'Nutzer',
  firma: 'Demo-Firma GmbH',
  position: 'Geschäftsführer'
};

/**
 * Liefert das aktuelle Profil oder null, wenn der Nutzer nicht eingeloggt ist.
 * Form: { email, vorname, nachname, firma, position, createdAt }
 */
function getProfile() {
  return Store.get('profile', null);
}

/** True, wenn das aktuelle Profil das Default-Demo-Profil ist. */
function isDemoProfile() {
  const p = getProfile();
  return !!(p && (p.email || '').toLowerCase() === DEMO_PROFILE.email);
}

/**
 * Legt das Default-Demo-Profil an, falls noch keins vorhanden ist.
 * Idempotent — wer schon ein Profil hat, behält es.
 * Rückgabe: das aktive Profil nach dem Aufruf.
 */
function ensureDemoProfile() {
  if (!isLoggedIn()) {
    setProfile(DEMO_PROFILE);
    logAuditEvent('login', null, { email: DEMO_PROFILE.email, mode: 'auto-demo' });
  }
  return getProfile();
}

/**
 * Speichert das Profil. Setzt automatisch loggedIn=true und legt
 * createdAt beim ersten Mal an. Erzeugt zusätzlich ein Audit-Event
 * 'profile_created' bzw. 'profile_updated'.
 */
function setProfile(p) {
  const existing = getProfile();
  const profile = {
    email: (p.email || '').trim().toLowerCase(),
    vorname: (p.vorname || '').trim(),
    nachname: (p.nachname || '').trim(),
    firma: (p.firma || '').trim(),
    position: (p.position || '').trim(),
    createdAt: existing && existing.createdAt ? existing.createdAt : new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  Store.set('profile', profile);
  Store.set('loggedIn', true);
  // Kompatibilität mit altem `user`-Objekt aus login.bundle.js / dashboard.bundle.js
  Store.set('user', {
    email: profile.email,
    name: `${profile.vorname} ${profile.nachname}`.trim(),
    firma: profile.firma
  });
  logAuditEvent(existing ? 'profile_updated' : 'profile_created', null, {
    email: profile.email,
    firma: profile.firma
  });
  return profile;
}

/** True, wenn ein Profil vorhanden ist. */
function isLoggedIn() {
  const p = getProfile();
  return !!(p && p.email && p.vorname);
}

/**
 * Schutz-Helper für Seiten, die ein Login erfordern (Lernen, Dashboard,
 * Zertifikat).
 *
 * DEMO-MODUS: Statt zur Login-Seite umzuleiten, legen wir bei fehlendem
 * Profil automatisch das Default-Demo-Profil an. So kommen Test-Nutzer
 * und Vorführungs-Teilnehmer in 10 Sekunden in den Mein-Bereich, ohne
 * Formulare auszufüllen oder Magic-Links abzufangen.
 *
 * TODO GO-LIVE: Vor Live-Gang den ensureDemoProfile()-Call wieder durch
 * eine echte Redirect-auf-Login-Logik ersetzen — Anker-Kommentar
 * GO-LIVE-AUTH unten suchen.
 */
function requireLogin() {
  if (isLoggedIn()) return true;
  // GO-LIVE-AUTH: Demo-Friction-Reduzierer — automatisches Demo-Profil.
  ensureDemoProfile();
  return true;
}

/**
 * Schreibt ein Audit-Event in das (nicht löschbare) Log.
 * event_type: 'slide_viewed' | 'quiz_answered' | 'quiz_passed' | 'quiz_failed' |
 *             'cert_generated' | 'profile_created' | 'profile_updated' |
 *             'login' | 'logout' | 'training_started' | 'training_resumed'
 *
 * payload bleibt JSON-serialisierbar — wir loggen z.B. {folie_nr},
 * {frage_nr, antwort, korrekt}, {score, total, pct, cert_id}.
 */
function logAuditEvent(event_type, schulung_slug, detail) {
  const profile = getProfile();
  const ev = {
    event_id: 'ev_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7),
    user_email: profile ? profile.email : null,
    user_name: profile ? `${profile.vorname} ${profile.nachname}`.trim() : null,
    user_firma: profile ? profile.firma : null,
    schulung_slug: schulung_slug || null,
    event_type,
    detail: detail || {},
    timestamp: new Date().toISOString()
  };
  // Append-only. Wir lesen nie das ganze Array zum Filtern und löschen
  // keine Events — wichtige Eigenschaft für Audit-Konformität (im MVP
  // wird das per RLS im Supabase-Backend erzwungen).
  Store.push('auditLog', ev);
  return ev;
}

/**
 * Generiert eine kompakte Zertifikat-ID nach Schema HTK-XXXXXX.
 * Wird beim Quiz-Bestanden vergeben und ist später nicht änderbar.
 */
function generateCertId() {
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return 'HTK-' + rand;
}

// ------- Audit-Filter / Auswertung -------
function getAuditLog() {
  return Store.get('auditLog', []);
}

/** Liefert alle Profile, die das aktuelle Demo-Setup kennt
 *  (eigenes Profil + geseedete Demo-User). */
function getAllProfiles() {
  const own = getProfile();
  const seeded = Store.get('seedProfiles', []);
  const list = [];
  if (own) list.push(own);
  seeded.forEach(s => {
    if (!list.find(p => p.email === s.email)) list.push(s);
  });
  return list;
}

/** Fortschritt einer Schulung für einen User (0–100). */
function getCourseProgress(userEmail, schulungSlug) {
  const log = getAuditLog();
  const seenFolien = new Set();
  for (const ev of log) {
    if (ev.user_email !== userEmail) continue;
    if (ev.schulung_slug !== schulungSlug) continue;
    if (ev.event_type === 'slide_viewed' && ev.detail && ev.detail.folie_nr != null) {
      seenFolien.add(ev.detail.folie_nr);
    }
  }
  // Gesamtfolien aus MANIFESTS_INLINE (falls geladen)
  let total = 0;
  if (window.MANIFESTS_INLINE && window.MANIFESTS_INLINE[schulungSlug]) {
    total = window.MANIFESTS_INLINE[schulungSlug].anzahl_folien || 0;
  }
  if (!total) total = Math.max(seenFolien.size, 30);
  return Math.min(100, Math.round(seenFolien.size / total * 100));
}

/** Hat der User die Schulung bestanden? */
function hasPassed(userEmail, schulungSlug) {
  return getAuditLog().some(ev =>
    ev.user_email === userEmail &&
    ev.schulung_slug === schulungSlug &&
    ev.event_type === 'quiz_passed'
  );
}

/** Alle Zertifikate eines Users (aus Audit-Log rekonstruiert). */
function getCertsForUser(userEmail) {
  return getAuditLog()
    .filter(ev => ev.event_type === 'cert_generated' && ev.user_email === userEmail)
    .map(ev => ({
      id: ev.detail.cert_id || ev.detail.id,
      schulung_slug: ev.schulung_slug,
      schulung_title: ev.detail.schulung_title || ev.schulung_slug,
      score: ev.detail.score,
      total: ev.detail.total,
      pct: ev.detail.pct,
      date: ev.timestamp,
      basis: ev.detail.basis || ''
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

// ------- Seed-Daten für Admin-Demo -------
// Damit die Admin-Übersichten plausibel aussehen, legen wir einmalig
// ein paar Beispiel-User und passende Audit-Events an. Wird nur ausgeführt,
// wenn noch nichts existiert (idempotent).
// A-T3: Alle Firmen-/Mail-Daten sind SYNTHETISCH (fiktive Namen, reservierte
// .example-Domains nach RFC 2606). Es handelt sich um keine realen Kunden.
// TODO GO-LIVE: Im Live-Betrieb entfällt das Seeding vollständig — die Daten
// kommen dann aus dem Backend (Supabase).
function seedDemoData() {
  if (Store.get('seedDone')) return;

  const demoUsers = [
    { email: 'anna.petersen@nordlicht-elektro.example', vorname: 'Anna',  nachname: 'Petersen', firma: 'Nordlicht Elektrotechnik GmbH', position: 'Monteurin' },
    { email: 'peer.lutz@nordlicht-elektro.example',     vorname: 'Peer',  nachname: 'Lutz',     firma: 'Nordlicht Elektrotechnik GmbH', position: 'Geschäftsführer' },
    { email: 's.brandt@nordlicht-elektro.example',      vorname: 'Sven',  nachname: 'Brandt',   firma: 'Nordlicht Elektrotechnik GmbH', position: 'Mitarbeiter' },
    { email: 'k.sommer@beispiel-tischlerei.example',   vorname: 'Klara', nachname: 'Sommer',   firma: 'Beispiel Tischlerei GbR',       position: 'Tischlerin' },
    { email: 't.reuter@beispiel-tischlerei.example',   vorname: 'Tim',   nachname: 'Reuter',   firma: 'Beispiel Tischlerei GbR',       position: 'Geselle' },
    { email: 'm.klein@muster-buero.example',           vorname: 'Maria', nachname: 'Klein',    firma: 'Muster Bürotechnik',            position: 'Sachbearbeitung' },
    { email: 'd.hagen@beispiel-logistik.example',      vorname: 'David', nachname: 'Hagen',    firma: 'Beispiel Logistik OHG',          position: 'Disponent' },
    { email: 'l.wieland@muster-pharma.example',             vorname: 'Lena',  nachname: 'Wieland',  firma: 'Muster Pharma GmbH',               position: 'Laborantin' }
  ];
  const now = Date.now();
  demoUsers.forEach((u, i) => {
    u.createdAt = new Date(now - (60 + i * 3) * 24 * 3600 * 1000).toISOString();
  });
  Store.set('seedProfiles', demoUsers);

  // Synthetisches Audit-Log: pro User einige slide_viewed + ein quiz_passed +
  // cert_generated für ausgewählte Schulungen.
  const log = Store.get('auditLog', []);
  const plan = [
    { email: 'p.lutz@nordlicht-elektro.example',   slug: 'elektrosicherheit-laien', title: 'Elektrosicherheit für Laien',          basis: 'DGUV V3', daysAgo: 22, score: 8, total: 10 },
    { email: 's.brandt@nordlicht-elektro.example', slug: 'brandschutz',             title: 'Brandschutz und Verhalten im Brandfall', basis: '§10 ArbSchG · ASR A2.2', daysAgo: 22, score: 9, total: 10 },
    { email: 'k.sommer@beispiel-tischlerei.example', slug: 'psa',                  title: 'Persönliche Schutzausrüstung (PSA)',    basis: 'PSA-BV', daysAgo: 23, score: 8, total: 10 },
    { email: 'm.klein@muster-buero.example',      slug: 'bildschirmarbeit',        title: 'Bildschirmarbeit',                       basis: 'ArbStättV', daysAgo: 24, score: 10, total: 10 },
    { email: 'd.hagen@beispiel-logistik.example', slug: 'allgemeine-unterweisung', title: 'Allgemeine Sicherheitsunterweisung',     basis: '§12 ArbSchG', daysAgo: 25, score: 9, total: 10 },
    { email: 'l.wieland@muster-pharma.example',        slug: 'datenschutz',             title: 'Datenschutz am Arbeitsplatz',            basis: 'DSGVO Art. 39', daysAgo: 27, score: 9, total: 10 },
    // Anna Petersen: läuft noch im Quiz
    { email: 'anna.petersen@nordlicht-elektro.example', slug: 'gefahrstoffe', title: 'Gefahrstoffe am Arbeitsplatz', basis: 'GefStoffV §14', daysAgo: 1, score: null, total: 10, progress: 65 }
  ];

  plan.forEach((row, i) => {
    const u = demoUsers.find(x => x.email === row.email);
    if (!u) return;
    const base = now - row.daysAgo * 24 * 3600 * 1000;
    // 6 slide_viewed Events streuen
    const slides = row.progress ? Math.round(row.progress / 100 * 40) : 40;
    for (let s = 1; s <= Math.min(slides, 6); s++) {
      log.push({
        event_id: 'ev_seed_' + i + '_s' + s,
        user_email: u.email,
        user_name: `${u.vorname} ${u.nachname}`,
        user_firma: u.firma,
        schulung_slug: row.slug,
        event_type: 'slide_viewed',
        detail: { folie_nr: Math.min(s * 6, slides) },
        timestamp: new Date(base + s * 90000).toISOString()
      });
    }
    if (row.score != null) {
      const certId = 'HTK-' + (row.email.split('@')[0].slice(0,2).toUpperCase() + Math.random().toString(36).slice(2,6).toUpperCase());
      log.push({
        event_id: 'ev_seed_' + i + '_q',
        user_email: u.email,
        user_name: `${u.vorname} ${u.nachname}`,
        user_firma: u.firma,
        schulung_slug: row.slug,
        event_type: 'quiz_passed',
        detail: { score: row.score, total: row.total, pct: Math.round(row.score/row.total*100) },
        timestamp: new Date(base + 25 * 60000).toISOString()
      });
      log.push({
        event_id: 'ev_seed_' + i + '_c',
        user_email: u.email,
        user_name: `${u.vorname} ${u.nachname}`,
        user_firma: u.firma,
        schulung_slug: row.slug,
        event_type: 'cert_generated',
        detail: {
          cert_id: certId,
          schulung_title: row.title,
          basis: row.basis,
          score: row.score,
          total: row.total,
          pct: Math.round(row.score/row.total*100)
        },
        timestamp: new Date(base + 26 * 60000).toISOString()
      });
    }
  });
  Store.set('auditLog', log);
  Store.set('seedDone', true);
}

// ------- Logout -------
function logoutUser() {
  const profile = getProfile();
  if (profile) logAuditEvent('logout', null, { email: profile.email });
  Store.set('profile', null);
  Store.set('loggedIn', false);
  Store.set('user', null);
}

// ============================================================
// Zentraler Demo-Modus-Schalter (A-T2)
// ------------------------------------------------------------
// EIN Schalter für alle Seiten: window.HT_DEMO_MODE.
// TODO GO-LIVE: window.HT_DEMO_MODE auf false setzen (eine Zeile),
// dann werden die generischen "Demo-Version"-Hinweise im Footer auf
// ALLEN Seiten, die app.js laden, automatisch ausgeblendet.
// WICHTIG: Kontextbezogene Demo-Hinweise (Login-Magic-Link,
// Termin-Buchung, Dashboard-Mailsimulation, Admin-Audit-Log,
// Prüf-Reminder, KI-Betriebsanweisung) bleiben hiervon BEWUSST
// unberührt — sie müssen einzeln entfernt werden, sobald die jeweilige
// echte Schnittstelle angebunden ist.
// ============================================================
if (typeof window !== 'undefined' && typeof window.HT_DEMO_MODE !== 'boolean') {
  window.HT_DEMO_MODE = true; // Demo-Stand. Zum Live-Gang: false.
}

function applyDemoMode() {
  // Nur im Live-Modus (false) eingreifen — im Demo bleibt alles sichtbar.
  if (typeof window === 'undefined' || window.HT_DEMO_MODE !== false) return;
  // Generische "Demo-Version"-Footer-Hinweise ausblenden.
  document.querySelectorAll('.footer-bottom span').forEach(span => {
    const t = (span.textContent || '').trim();
    if (/Demo-Version|Vorführungszweck/i.test(t)) span.style.display = 'none';
  });
  // A-B1: Statische Demo-KPIs im Admin auf "—" setzen, Demo-Deltas/-Hinweis
  // ausblenden — keine erfundenen Live-Zahlen, solange keine echte Datenquelle
  // angebunden ist.
  document.querySelectorAll('[data-demo-kpi]').forEach(el => { el.textContent = '—'; });
  document.querySelectorAll('[data-demo-kpi-delta]').forEach(el => { el.style.display = 'none'; });
  const kpiNote = document.getElementById('kpi-demo-note');
  if (kpiNote) kpiNote.style.display = 'none';
}

/**
 * Mountet einen kleinen Hinweis-Banner oben, wenn das aktuelle Profil
 * das Default-Demo-Profil ist. Sage-getönt, dezent, mit Link zur
 * Profil-Bearbeitung (dashboard.html#profil).
 *
 * Wird auf jeder Mein-Bereich-Seite eingeblendet (dashboard, lernen,
 * meine-schulungen, zertifikat …) und ist still für alle anderen.
 */
function renderDemoBanner() {
  if (!isDemoProfile()) return;
  if (document.getElementById('demo-mode-banner')) return; // schon vorhanden
  const banner = document.createElement('div');
  banner.id = 'demo-mode-banner';
  banner.setAttribute('role', 'status');
  banner.style.cssText = [
    'background:var(--sage-mint-soft,#e7efe7)',
    'border-bottom:1px solid var(--border-soft,#d3dcd3)',
    'color:var(--sage-darker,#2f3f33)',
    'font-size:0.85rem',
    'padding:8px 16px',
    'text-align:center',
    'line-height:1.5'
  ].join(';');
  banner.innerHTML =
    'Sie sind im <strong>Demo-Modus</strong> angemeldet. ' +
    '<a href="dashboard.html#profil" style="color:var(--sage-dark,#3f5f47);text-decoration:underline;">Profil bearbeiten</a>';
  document.body.insertBefore(banner, document.body.firstChild);
}

// ------- Init -------
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFadeIn();
  initLightbox();
  applyDemoMode();
  renderDemoBanner();
  // Seed nur einmal. Das ist eine reine Demo-Maßnahme — im echten MVP
  // entfällt das vollständig, weil die Daten aus Supabase kommen.
  try { seedDemoData(); } catch (e) {}
});

// Exporte ans Window für inline-Scripts in HTML
window.getProfile = getProfile;
window.setProfile = setProfile;
window.isLoggedIn = isLoggedIn;
window.isDemoProfile = isDemoProfile;
window.ensureDemoProfile = ensureDemoProfile;
window.DEMO_PROFILE = DEMO_PROFILE;
window.requireLogin = requireLogin;
window.logAuditEvent = logAuditEvent;
window.generateCertId = generateCertId;
window.getAuditLog = getAuditLog;
window.getAllProfiles = getAllProfiles;
window.getCourseProgress = getCourseProgress;
window.hasPassed = hasPassed;
window.getCertsForUser = getCertsForUser;
window.logoutUser = logoutUser;
