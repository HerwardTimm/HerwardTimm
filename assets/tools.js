/* ============================================================
   HerwardTimm · Compliance-Werkzeuge — gemeinsame Logik
   Persistiert Formular-/Tabellen-Stand im localStorage,
   unterstützt Zeilen hinzufügen/löschen, Druck & Reset.
   Aktivierung: <body data-tool-key="ht-tool-xyz">
   - Einzelfelder:  Attribut data-k="name"
   - Tabellenzeilen: <template id="row-template"> mit Feldern data-f="name",
                     Zielcontainer <tbody id="tool-rows">
   ============================================================ */
(function () {
  function key() { return document.body.dataset.toolKey; }

  function collect() {
    const data = { fields: {}, rows: [] };
    document.querySelectorAll('[data-k]').forEach(el => { data.fields[el.dataset.k] = el.value; });
    document.querySelectorAll('#tool-rows > [data-row]').forEach(rowEl => {
      const r = {};
      rowEl.querySelectorAll('[data-f]').forEach(el => { r[el.dataset.f] = el.value; });
      data.rows.push(r);
    });
    data._savedAt = new Date().toISOString();
    return data;
  }

  function flash(msg) {
    const s = document.getElementById('tool-status');
    if (!s) return;
    s.textContent = msg;
    s.style.visibility = 'visible';
    clearTimeout(s._t);
    s._t = setTimeout(() => { s.style.visibility = 'hidden'; }, 4000);
  }

  window.toolSave = function (silent) {
    try { localStorage.setItem(key(), JSON.stringify(collect())); } catch (e) {}
    if (!silent) flash('Gespeichert ✓ ' + new Date().toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'short' }));
  };

  function makeRow() {
    const tpl = document.getElementById('row-template');
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : null;
  }

  window.toolAddRow = function () {
    const host = document.getElementById('tool-rows');
    const node = makeRow();
    if (host && node) { host.appendChild(node); node.querySelector('[data-f]')?.focus(); toolSave(true); if (window.toolRenderGhs) window.toolRenderGhs(); }
  };

  window.toolDelRow = function (btn) {
    const row = btn.closest('[data-row]');
    if (row) { row.remove(); toolSave(true); }
  };

  window.toolReset = function () {
    if (!confirm('Alle Eingaben dieses Werkzeugs zurücksetzen?')) return;
    localStorage.removeItem(key());
    location.reload();
  };

  // ---- CSV-Export (generisch) -----------------------------------------
  // Exportiert die Tabellenzeilen (#tool-rows) als CSV. Spalten-Überschriften
  // werden über die Spaltenposition aus dem <thead> abgeleitet (Status-/Aktions-
  // spalten ohne data-f werden automatisch übersprungen). Wird NUR auf Seiten
  // genutzt, die bewusst einen Button onclick="toolExportCsv()" setzen.
  // Sensible Werkzeuge (Verbandbuch, Vorsorgekartei) erhalten KEINEN Button.
  window.toolExportCsv = function (filename) {
    const table = document.querySelector('table.tool-table');
    const rows = Array.from(document.querySelectorAll('#tool-rows > [data-row]'));
    if (!table || !rows.length) { alert('Keine Einträge zum Exportieren.'); return; }
    const headEls = Array.from(table.querySelectorAll('thead th'));
    // Spalten anhand der ersten Zeile bestimmen (nur Zellen mit data-f).
    const cols = [];
    Array.from(rows[0].children).forEach((td, idx) => {
      const fEl = td.querySelector('[data-f]');
      if (fEl) cols.push({ field: fEl.dataset.f, header: (headEls[idx] ? headEls[idx].textContent.trim() : fEl.dataset.f) });
    });
    const esc = v => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
    const lines = [cols.map(c => esc(c.header)).join(';')];
    rows.forEach(row => {
      lines.push(cols.map(c => {
        const el = row.querySelector('[data-f="' + c.field + '"]');
        return esc(el ? el.value : '');
      }).join(';'));
    });
    const csv = '﻿' + lines.join('\r\n'); // BOM: korrekte Umlaute in Excel
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (filename || document.body.dataset.toolKey || 'export') + '.csv';
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 100);
  };

  function load() {
    let data = null;
    try { data = JSON.parse(localStorage.getItem(key()) || 'null'); } catch (e) {}
    if (!data) return;
    Object.entries(data.fields || {}).forEach(([k, v]) => {
      const el = document.querySelector('[data-k="' + k + '"]');
      if (el) el.value = v;
    });
    if (Array.isArray(data.rows)) {
      const host = document.getElementById('tool-rows');
      if (host && document.getElementById('row-template')) {
        host.innerHTML = '';
        data.rows.forEach(r => {
          const node = makeRow();
          if (!node) return;
          node.querySelectorAll('[data-f]').forEach(el => { if (r[el.dataset.f] !== undefined) el.value = r[el.dataset.f]; });
          host.appendChild(node);
        });
      }
    }
  }

  // ---- GHS-Piktogramme aus Code-Feldern rendern (B-P1) ----------------
  // Greift nur, wo ein Tabellenfeld data-f="ghs" existiert (Gefahrstoffkataster).
  // Es werden AUSSCHLIESSLICH eindeutige Codes GHS01–GHS09 als Bild gezeigt.
  // Leeres/ohne-Code-Feld => KEIN Piktogramm (kein Raten).
  const GHS_BEDEUTUNG = {
    '01': 'Explodierende Bombe', '02': 'Flamme (entzündbar)', '03': 'Flamme über Kreis (brandfördernd)',
    '04': 'Gasflasche (Gase unter Druck)', '05': 'Ätzwirkung', '06': 'Totenkopf (giftig)',
    '07': 'Ausrufezeichen (Reiz-/Gesundheitsgefahr)', '08': 'Gesundheitsgefahr', '09': 'Umwelt (gewässergefährdend)'
  };
  function ghsImgHtml(text) {
    const codes = ((text || '').toUpperCase().match(/GHS0[1-9]/g) || []);
    const uniq = Array.from(new Set(codes));
    return uniq.map(c => {
      const nr = c.slice(-2);
      const bed = GHS_BEDEUTUNG[nr] || c;
      return '<img src="assets/piktogramme/ghs/' + c + '.png" alt="' + c + ' – ' + bed + '" title="' + c + ' – ' + bed
        + '" style="height:26px;width:auto;margin:3px 4px 0 0;vertical-align:middle;">';
    }).join('');
  }
  function renderGhsCells() {
    document.querySelectorAll('#tool-rows [data-f="ghs"]').forEach(inp => {
      let box = inp.parentElement.querySelector('.ghs-pics');
      if (!box) {
        box = document.createElement('div');
        box.className = 'ghs-pics';
        box.style.cssText = 'margin-top:4px; line-height:0;';
        inp.insertAdjacentElement('afterend', box);
      }
      box.innerHTML = ghsImgHtml(inp.value);
    });
  }
  window.toolRenderGhs = renderGhsCells;

  document.addEventListener('input', e => {
    if (e.target.closest('#tool-rows') || e.target.hasAttribute('data-k')) toolSave(true);
    if (e.target.matches && e.target.matches('[data-f="ghs"]')) renderGhsCells();
  });

  // ---- Fälligkeits-Erinnerungen --------------------------------------
  // Aktiv, wenn <body data-due-field="naechste"> gesetzt ist.
  // Erwartet je Zeile ein Eingabefeld data-f=<dueField> und ein
  // Status-Element [data-status]. Schwellen: überfällig / fällig in 30 Tagen.
  function parseDue(str) {
    if (!str) return null;
    str = str.trim();
    let m;
    if ((m = str.match(/^(\d{1,2})\.(\d{1,2})\.(\d{2,4})$/))) {           // TT.MM.JJJJ
      let y = +m[3]; if (y < 100) y += 2000;
      return new Date(y, +m[2] - 1, +m[1]);
    }
    if ((m = str.match(/^(\d{1,2})\.(\d{2,4})$/))) {                      // MM.JJJJ -> Monatsende
      let y = +m[2]; if (y < 100) y += 2000;
      return new Date(y, +m[1], 0);
    }
    if ((m = str.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/))) {          // JJJJ-MM(-TT)
      return new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1);
    }
    return null;
  }

  function refreshDue() {
    const field = document.body.dataset.dueField;
    if (!field) return;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const soon = new Date(today); soon.setDate(soon.getDate() + 30);
    let over = 0, due = 0, ok = 0;
    document.querySelectorAll('#tool-rows > [data-row]').forEach(row => {
      const inp = row.querySelector('[data-f="' + field + '"]');
      const badge = row.querySelector('[data-status]');
      if (!badge) return;
      const d = inp ? parseDue(inp.value) : null;
      badge.className = 'due-pill';
      if (!d) { badge.textContent = ''; return; }
      if (d < today) { badge.textContent = 'überfällig'; badge.classList.add('due-over'); over++; }
      else if (d <= soon) { badge.textContent = 'bald fällig'; badge.classList.add('due-soon'); due++; }
      else { badge.textContent = 'aktuell'; badge.classList.add('due-ok'); ok++; }
    });
    const banner = document.getElementById('tool-reminders');
    if (banner) {
      if (over + due === 0) {
        banner.className = 'tool-rem ok';
        banner.innerHTML = ok ? '✓ Alle ' + ok + ' Einträge sind aktuell — nichts fällig.' : 'Noch keine Fristen erfasst.';
      } else {
        banner.className = 'tool-rem warn';
        const parts = [];
        if (over) parts.push('<strong>' + over + '</strong> überfällig');
        if (due) parts.push('<strong>' + due + '</strong> in den nächsten 30 Tagen fällig');
        banner.innerHTML = '⏰ ' + parts.join(' · ') +
          '. <span class="tool-rem-note">Im Live-Betrieb erinnert HerwardTimm automatisch per E-Mail (30 Tage vorher).</span>';
      }
    }
  }
  window.toolRefreshDue = refreshDue;

  // Init
  load();
  renderGhsCells();
  const host = document.getElementById('tool-rows');
  if (host && host.children.length === 0 && document.getElementById('row-template')) toolAddRow();
  if (document.body.dataset.dueField) {
    refreshDue();
    document.addEventListener('input', e => { if (e.target.closest('#tool-rows')) refreshDue(); });
    document.addEventListener('click', e => { if (e.target.closest('.tool-addrow') || e.target.closest('.tool-del')) setTimeout(refreshDue, 0); });
  }
})();
