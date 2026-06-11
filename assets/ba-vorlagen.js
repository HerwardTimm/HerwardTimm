/* ============================================================
   HerwardTimm · Betriebsanweisungs-Vorlagen (Bibliothek)
   Fertige Muster in der vorgeschriebenen Form:
   - Gefahrstoff (GefStoffV §14): b1 Gefahrstoffbezeichnung, b2 Gefahren,
     b3 Schutzmaßnahmen, b4 Verhalten im Gefahrfall, b5 Erste Hilfe, b6 Entsorgung
   - Maschine: b1 Anwendungsbereich, b2 Gefahren, b3 Schutzmaßnahmen,
     b4 Verhalten bei Störungen, b5 Erste Hilfe, b6 Instandhaltung
   Inhalte sind fachliche Muster (Stand 2026) und vor Aushang an den
   konkreten Betrieb anzupassen.
   ============================================================ */
window.BA_VORLAGEN = {
  gefahrstoff: [
    {
      subject: "Aceton",
      ghs: "GHS02, GHS07 / Gefahr",
      b1: "Aceton (Propan-2-on). Leicht entzündbare, klare Flüssigkeit mit typischem Geruch. H225, H319, H336. Verwendung als Löse- und Reinigungsmittel.",
      b2: "Dämpfe bilden mit Luft explosionsfähige Gemische. Reizt die Augen. Kann Schläfrigkeit und Benommenheit verursachen. Entfettet die Haut. Wassergefährdend.",
      b3: "Von Zündquellen fernhalten, nicht rauchen. Nur in gut belüfteten Bereichen verwenden, Behälter geschlossen halten. Schutzbrille und lösemittelbeständige Handschuhe tragen. Mengen am Arbeitsplatz begrenzen.",
      b4: "Bei Brand: CO2, Pulver oder Schaum verwenden, kein Wasserstrahl. Auslaufendes Produkt mit nicht brennbarem Bindemittel aufnehmen, Zündquellen entfernen, lüften. Nicht in Kanalisation gelangen lassen.",
      b5: "Augenkontakt: 10–15 Min. mit Wasser spülen, Augenarzt. Hautkontakt: mit Wasser und Seife reinigen. Einatmen: an die frische Luft, bei Beschwerden Arzt. Notruf 112.",
      b6: "Reste und kontaminierte Aufnahmemittel als gefährlichen Abfall der zugelassenen Entsorgung zuführen. Nicht in den Hausmüll oder Abfluss."
    },
    {
      subject: "Natronlauge (Natriumhydroxid-Lösung)",
      ghs: "GHS05 / Gefahr",
      b1: "Natronlauge (NaOH-Lösung), z. B. als Reinigungs- oder Entfettungsmittel. H314, H290. Stark alkalisch, ätzend.",
      b2: "Verursacht schwere Verätzungen der Haut und schwere Augenschäden. Wirkt korrosiv auf Metalle. Spritzer besonders an Augen sehr gefährlich.",
      b3: "Dicht schließende Schutzbrille/Gesichtsschutz, chemikalienbeständige Handschuhe und Schürze tragen. Spritzer vermeiden, niemals Wasser in Konzentrat geben. Augenspülflasche bereithalten.",
      b4: "Verschüttetes mit viel Wasser verdünnen und mit säurefestem Bindemittel aufnehmen. Nicht mit Säuren mischen. Betroffene Flächen kennzeichnen, lüften.",
      b5: "Augen: sofort mind. 15 Min. mit Wasser spülen, Lider spreizen, Augenarzt. Haut: benetzte Kleidung entfernen, mit viel Wasser spülen. Verschlucken: Mund spülen, nicht erbrechen, Arzt. Notruf 112.",
      b6: "Neutralisierte Reste und Aufnahmemittel als gefährlichen Abfall entsorgen. Behälter nicht wiederverwenden."
    },
    {
      subject: "Dieselkraftstoff",
      ghs: "GHS02, GHS07, GHS08, GHS09 / Gefahr",
      b1: "Dieselkraftstoff (Gasöl). H226, H304, H315, H332, H351, H373, H411. Verwendung als Kraftstoff/Betriebsstoff.",
      b2: "Entzündbar. Kann beim Verschlucken und Eindringen in die Atemwege tödlich sein. Reizt die Haut, Verdacht auf krebserzeugende Wirkung. Giftig für Wasserorganismen.",
      b3: "Von Zündquellen fernhalten, Rauchverbot. Hautkontakt vermeiden, Schutzhandschuhe tragen. Beim Umfüllen Auffangwannen nutzen, nicht mit dem Mund ansaugen. Für Belüftung sorgen.",
      b4: "Bei Brand: Schaum, Pulver oder CO2. Leckagen mit Ölbindemittel aufnehmen, Boden- und Gewässereintrag verhindern. Zündquellen beseitigen.",
      b5: "Verschlucken: KEIN Erbrechen auslösen, sofort Arzt/Notruf 112. Hautkontakt: mit Wasser und Seife reinigen. Augen: spülen. Bei Beschwerden ärztliche Hilfe.",
      b6: "Reste, Filter und ölverschmutzte Bindemittel als gefährlichen Abfall entsorgen. Nicht in Boden, Gewässer oder Kanalisation."
    }
  ],
  maschine: [
    {
      subject: "Tischkreissäge",
      b1: "Stationäre Tischkreissäge zum Längs- und Querschneiden von Holz und Holzwerkstoffen. Bedienung nur durch unterwiesene, beauftragte Personen ab 18 Jahren.",
      b2: "Schnitt- und Amputationsgefahr am Sägeblatt. Rückschlag des Werkstücks. Wegfliegende Teile/Späne (Augen). Lärm. Holzstaub (gesundheitsschädlich).",
      b3: "Schutzhaube, Spaltkeil und Schiebestock verwenden. Eng anliegende Kleidung, keine Handschuhe am laufenden Blatt, Gehör- und Augenschutz, Staubabsaugung einschalten. Nur scharfe, unbeschädigte Sägeblätter. Werkstück sicher führen.",
      b4: "Bei Störung/ungewöhnlichen Geräuschen: Maschine sofort ausschalten, Stillstand abwarten, gegen Wiedereinschalten sichern. Keine Eingriffe bei laufendem Blatt. Störung dem Vorgesetzten melden.",
      b5: "Bei Schnittverletzung: Wunde versorgen, Blutung stillen, Ersthelfer/Notruf 112. Verletzten betreuen. Eintrag ins Verbandbuch.",
      b6: "Reinigung und Wartung nur bei Stillstand und gezogenem Netzstecker. Blattwechsel nach Herstellervorgabe. Wiederkehrende Prüfung der elektrischen Sicherheit (DGUV V3) beachten."
    },
    {
      subject: "Winkelschleifer",
      b1: "Handgeführter Winkelschleifer zum Trennen und Schleifen von Metall/Stein. Einsatz nur durch unterwiesene Personen mit geeigneter Trenn-/Schleifscheibe.",
      b2: "Funkenflug und Brandgefahr. Wegfliegende Scheibenbruchstücke. Schnitt-/Schürfverletzungen. Rückschlag. Lärm und Staub. Heißes Werkstück.",
      b3: "Schutzhaube korrekt einstellen, Schutzbrille/Gesichtsschutz, Gehörschutz, eng anliegende Kleidung. Nur zugelassene, unbeschädigte Scheiben mit passender Drehzahl. Werkstück sichern, Funkenflug von Personen/Brennbarem weglenken.",
      b4: "Bei Blockieren/ungewöhnlicher Vibration: Gerät ausschalten, Stillstand abwarten, vom Netz/Akku trennen. Beschädigte Scheiben sofort tauschen. Störung melden.",
      b5: "Schnitt-/Augenverletzung: Erste Hilfe leisten, bei Augenbeteiligung Augenarzt, Notruf 112. Eintrag ins Verbandbuch.",
      b6: "Wartung nur im stromlosen Zustand. Scheibenwechsel nach Herstellerangabe, Ablaufdatum der Scheiben beachten. Elektrische Prüfung nach DGUV V3."
    },
    {
      subject: "Handgeführter Gabelhubwagen",
      b1: "Handgeführter Gabelhubwagen (Ameise) zum Transport palettierter Lasten auf ebenem, festem Boden. Nutzung nur durch unterwiesene Personen.",
      b2: "Quetsch- und Stoßgefahr für Füße und Hände. Kippen/Wegrollen der Last. Anfahren von Personen. Überlastung. Gefahr an Rampen und Gefällen.",
      b3: "Sicherheitsschuhe tragen. Nennlast nicht überschreiten, Last gleichmäßig und tief führen. Nur ziehen/schieben mit freier Sicht, an Kreuzungen langsam. Nicht auf Gefällen abstellen, Feststellung beachten.",
      b4: "Bei Defekt (Hydraulik, Räder, Gabel): Gerät kennzeichnen, außer Betrieb nehmen und Vorgesetzten informieren. Keine improvisierten Reparaturen.",
      b5: "Bei Quetschung/Anfahrunfall: Erste Hilfe, Ersthelfer/Notruf 112, Verletzten betreuen. Eintrag ins Verbandbuch.",
      b6: "Regelmäßige Sicht- und Funktionsprüfung (Gabel, Räder, Hydraulik). Wiederkehrende Prüfung nach Herstellervorgabe/Gefährdungsbeurteilung. Mängel dokumentieren."
    }
  ]
};
