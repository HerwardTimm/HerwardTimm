"use strict";
(() => {
  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/shared/catalog.ts
  var uid = () => "id" + Math.random().toString(36).slice(2, 9);
  function G(key) {
    return Store.get(key, []);
  }
  var fmt = (iso) => new Date(iso).toLocaleDateString("de-DE", { day: "2-digit", month: "2-digit", year: "numeric" });
  var daysTo = (iso) => Math.round((new Date(iso).getTime() - Date.now()) / (24 * 3600 * 1e3));
  var ID2SLUG = {
    allgemein: "allgemeine-unterweisung",
    brandschutz: "brandschutz",
    bildschirm: "bildschirmarbeit",
    datenschutz: "datenschutz",
    elektro: "elektrosicherheit-laien",
    gefahrstoffe: "gefahrstoffe",
    psa: "psa",
    "stapler-auff": "stapler-auffrischung",
    "buehnen-auff": "hubarbeitsbuehnen-auffrischung",
    hautschutz: "hautschutz-psa-haende",
    "eup-auff": "eup-auffrischung",
    "bsh-auff": "brandschutzhelfer-auffrischung",
    "sibe-auff": "sicherheitsbeauftragte-auffrischung",
    lasten: "manuelle-lastenhandhabung",
    stress: "stress-psyche",
    mobil: "mobiles-arbeiten-homeoffice",
    verkehr: "verkehrssicherheit-wegeunfaelle",
    hygiene: "hygiene-arbeitsplatz",
    sucht: "suchtpraevention"
  };
  var COURSE_BY_SLUG = {};
  function buildCatalog() {
    const courses = window.COURSES || [];
    courses.forEach((c) => {
      const s = ID2SLUG[c.id];
      if (s) COURSE_BY_SLUG[s] = { ...c, slug: s };
    });
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/core.ts
  function company() {
    return Store.get("company", { name: "Muster GmbH", pauschale: false, sharepointUrl: "" });
  }
  function isPauschalCovered(slug) {
    const c = COURSE_BY_SLUG[slug];
    return company().pauschale && !!c && c.group === "jaehrlich";
  }
  function assignmentsForSlug(slug) {
    return G("assignments").filter((a) => a.slug === slug);
  }
  function seatsFor(slug) {
    if (isPauschalCovered(slug)) {
      return { unlimited: true, total: Infinity, used: assignmentsForSlug(slug).length };
    }
    const total = G("licenses").filter((l) => l.slug === slug).reduce((s, l) => s + l.seats, 0);
    return { unlimited: false, total, used: assignmentsForSlug(slug).length };
  }
  function empName(id) {
    const m = G("employees").find((x) => x.id === id);
    return m ? m.name : "\u2014";
  }
  function empById(id) {
    return G("employees").find((x) => x.id === id);
  }
  function personStats(empId) {
    const as = G("assignments").filter((a) => a.employeeId === empId);
    const valid = as.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) >= 0).length;
    const expired = as.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) < 0).length;
    const open = as.filter((a) => a.status !== "abgeschlossen").length;
    const soon = as.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) >= 0 && daysTo(a.expiresAt) <= 30).length;
    const pct = as.length ? Math.round(100 * valid / as.length) : 0;
    return { as, valid, expired, open, soon, pct, total: as.length };
  }
  function statusText(a) {
    if (a.status === "abgeschlossen") return daysTo(a.expiresAt) < 0 ? "abgelaufen" : "abgeschlossen";
    return a.status === "in_arbeit" ? "in Arbeit" : "zugewiesen";
  }
  function auditRows() {
    const emps = G("employees");
    const rows = [];
    G("assignments").forEach((a) => {
      const m = emps.find((x) => x.id === a.employeeId);
      if (!m) return;
      rows.push({
        name: m.name,
        abteilung: m.abteilung,
        email: m.email || "",
        kurs: a.title || a.slug,
        status: statusText(a),
        zugewiesen: fmt(a.assignedAt),
        abgeschlossen: a.completedAt ? fmt(a.completedAt) : "",
        gueltig: a.status === "abgeschlossen" ? fmt(a.expiresAt) : ""
      });
    });
    rows.sort((p, q) => p.abteilung.localeCompare(q.abteilung) || p.name.localeCompare(q.name) || p.kurs.localeCompare(q.kurs));
    return rows;
  }
  function seed() {
    if (Store.get("dash_seeded")) return;
    Store.set("company", { name: "Muster GmbH", pauschale: true, tier: 2, sharepointUrl: "" });
    const emps = [
      { id: uid(), name: "Anna Petersen", abteilung: "Verwaltung", email: "a.petersen@muster.de" },
      { id: uid(), name: "Bernd Klar", abteilung: "Verwaltung", email: "b.klar@muster.de" },
      { id: uid(), name: "Carla Demir", abteilung: "Lager", email: "c.demir@muster.de" },
      { id: uid(), name: "Dirk Hansen", abteilung: "Lager", email: "d.hansen@muster.de" },
      { id: uid(), name: "Eva Roth", abteilung: "Lager", email: "e.roth@muster.de" },
      { id: uid(), name: "Frank Bauer", abteilung: "Technik", email: "f.bauer@muster.de" },
      { id: uid(), name: "Greta Sahin", abteilung: "Technik", email: "g.sahin@muster.de" },
      { id: uid(), name: "Hannes Vogt", abteilung: "Technik", email: "h.vogt@muster.de" }
    ];
    Store.set("employees", emps);
    const now = Date.now();
    const M = 30.4 * 24 * 3600 * 1e3;
    Store.set("licenses", [
      { id: uid(), slug: "eup-auffrischung", seats: 12, kind: "einzel", boughtAt: new Date(now - 2 * M).toISOString() },
      { id: uid(), slug: "stapler-auffrischung", seats: 5, kind: "einzel", boughtAt: new Date(now - 11 * M).toISOString() }
    ]);
    const a = (slug, emp, status, assignedAgo, doneAgo) => ({
      id: uid(),
      slug,
      title: (COURSE_BY_SLUG[slug] || {}).title || slug,
      employeeId: emp,
      status,
      assignedAt: new Date(now - assignedAgo * M).toISOString(),
      completedAt: status === "abgeschlossen" ? new Date(now - doneAgo * M).toISOString() : null,
      expiresAt: new Date(now - assignedAgo * M + 12 * M).toISOString(),
      lastReminder: null
    });
    Store.set("assignments", [
      a("eup-auffrischung", emps[5].id, "abgeschlossen", 2, 1.5),
      a("eup-auffrischung", emps[6].id, "in_arbeit", 2, 0),
      a("eup-auffrischung", emps[7].id, "zugewiesen", 0.5, 0),
      a("stapler-auffrischung", emps[2].id, "abgeschlossen", 11.4, 11),
      a("stapler-auffrischung", emps[3].id, "abgeschlossen", 11.4, 11),
      a("allgemeine-unterweisung", emps[0].id, "abgeschlossen", 3, 3),
      a("allgemeine-unterweisung", emps[1].id, "zugewiesen", 1, 0)
    ]);
    Store.set("reminderLog", []);
    Store.set("dash_seeded", true);
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/shared/dom.ts
  function byId(id) {
    return document.getElementById(id);
  }
  function setHTML(id, html) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }
  function getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value || "" : "";
  }
  function setVal(id, value) {
    const el = document.getElementById(id);
    if (el) el.value = value;
  }
  function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
  }
  function qs(selector) {
    return document.querySelector(selector);
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/ui.ts
  function closeModal(id) {
    var _a;
    (_a = document.getElementById(id)) == null ? void 0 : _a.classList.remove("open");
  }
  function uiConfirm(text, onYes, okLabel) {
    var _a;
    const txt = document.getElementById("confirm-text");
    if (txt) txt.textContent = text;
    const ok = document.getElementById("confirm-ok");
    if (!ok || !ok.parentNode) return;
    ok.textContent = okLabel || "Best\xE4tigen";
    const fresh = ok.cloneNode(true);
    ok.parentNode.replaceChild(fresh, ok);
    fresh.addEventListener("click", () => {
      closeModal("confirm-modal");
      onYes();
    });
    (_a = document.getElementById("confirm-modal")) == null ? void 0 : _a.classList.add("open");
    fresh.focus();
  }
  function initTabs() {
    var _a;
    const tabs = qsa(".dash-tab");
    const activate = (t) => {
      tabs.forEach((x) => {
        x.classList.remove("active");
        x.setAttribute("aria-selected", "false");
        x.setAttribute("tabindex", "-1");
      });
      qsa(".dash-panel").forEach((x) => x.classList.remove("active"));
      t.classList.add("active");
      t.setAttribute("aria-selected", "true");
      t.setAttribute("tabindex", "0");
      const panel = qs('.dash-panel[data-p="' + t.dataset.p + '"]');
      panel == null ? void 0 : panel.classList.add("active");
    };
    tabs.forEach((t, i) => {
      t.setAttribute("role", "tab");
      t.setAttribute("aria-selected", t.classList.contains("active") ? "true" : "false");
      t.setAttribute("tabindex", t.classList.contains("active") ? "0" : "-1");
      t.addEventListener("click", () => activate(t));
      t.addEventListener("keydown", (ev) => {
        if (ev.key === "ArrowRight" || ev.key === "ArrowLeft") {
          ev.preventDefault();
          const n = (i + (ev.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
          tabs[n].focus();
          activate(tabs[n]);
        }
      });
    });
    (_a = qs(".dash-tabs")) == null ? void 0 : _a.setAttribute("role", "tablist");
  }
  function initModals() {
    qsa(".modal-bg").forEach((m) => {
      m.addEventListener("click", (ev) => {
        if (ev.target === m) m.classList.remove("open");
      });
    });
    document.addEventListener("keydown", (ev) => {
      if (ev.key === "Escape") {
        qsa(".modal-bg.open").forEach((m) => m.classList.remove("open"));
      }
    });
  }
  function initLogout() {
    var _a;
    (_a = document.getElementById("logout-link")) == null ? void 0 : _a.addEventListener("click", () => Store.set("loggedIn", false));
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/state.ts
  var ui = {
    selPerson: null,
    pendingOrder: null,
    assignSlug: null
  };

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/render.ts
  var eur = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " \u20AC";
  function ringSvg(pct, size) {
    const r = size / 2 - 5;
    const C = 2 * Math.PI * r;
    const len = C * pct / 100;
    const col = pct >= 80 ? "#4C7A5E" : pct >= 50 ? "#C99B45" : "#B03A2E";
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="var(--sage-mint-soft)" stroke-width="6"/><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="6" stroke-linecap="round" stroke-dasharray="' + len + " " + (C - len) + '" transform="rotate(-90 ' + size / 2 + " " + size / 2 + ')"/><text x="' + size / 2 + '" y="' + (size / 2 + 1) + '" text-anchor="middle" class="ring-num">' + pct + '%</text><text x="' + size / 2 + '" y="' + (size / 2 + size * 0.13) + '" text-anchor="middle" class="ring-lbl">aktuell</text></svg>';
  }
  function renderAll() {
    const co = company();
    setText("dash-company", co.name + (co.pauschale ? "  \xB7  Pauschalbetreuung Tier " + co.tier : ""));
    renderKpis();
    renderCharts();
    renderOverviewDue();
    renderEmployees();
    renderLicenses();
    renderInvoices();
    renderMatrix();
    renderReminders();
    renderSharePoint();
  }
  function renderInvoices() {
    const host = byId("inv-list");
    if (!host) return;
    const inv = G("invoices");
    if (!inv.length) {
      host.innerHTML = '<p class="text-muted" style="font-size:.88rem;">Noch keine Rechnungen.</p>';
      return;
    }
    host.innerHTML = '<div class="card table-scroll" style="padding:0;"><table class="matrix"><thead><tr><th>Rechnung</th><th>Datum</th><th>Schulung</th><th>Pl\xE4tze</th><th>Netto</th><th>Brutto</th></tr></thead><tbody>' + inv.slice().reverse().map((r) => "<tr><td><strong>" + r.no + "</strong></td><td>" + fmt(r.date) + "</td><td>" + r.title + "</td><td>" + r.seats + "</td><td>" + eur(r.net) + "</td><td>" + eur(r.brutto) + "</td></tr>").join("") + "</tbody></table></div>";
  }
  function renderCharts() {
    renderDonut();
    renderAbtBars();
    renderExpiryChart();
  }
  function renderDonut() {
    const asg = G("assignments");
    const cats = [
      { key: "abgeschlossen", label: "Abgeschlossen", color: "#4C7A5E", n: asg.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) >= 0).length },
      { key: "in_arbeit", label: "In Arbeit", color: "#C99B45", n: asg.filter((a) => a.status === "in_arbeit").length },
      { key: "zugewiesen", label: "Zugewiesen", color: "#9DB3A8", n: asg.filter((a) => a.status === "zugewiesen").length },
      { key: "abgelaufen", label: "Abgelaufen", color: "#B03A2E", n: asg.filter((a) => daysTo(a.expiresAt) < 0).length }
    ];
    const total = cats.reduce((s, c) => s + c.n, 0);
    const R = 52;
    const C = 2 * Math.PI * R;
    const host = byId("donut-host");
    if (!host) return;
    if (!total) {
      host.innerHTML = '<p class="text-muted" style="font-size:.85rem;">Noch keine Zuweisungen.</p>';
      setHTML("donut-legend", "");
      return;
    }
    let off = 0;
    const segs = cats.filter((c) => c.n > 0).map((c) => {
      const len = C * c.n / total;
      const s = '<circle cx="70" cy="70" r="' + R + '" fill="none" stroke="' + c.color + '" stroke-width="18" stroke-dasharray="' + len + " " + (C - len) + '" stroke-dashoffset="' + -off + '" transform="rotate(-90 70 70)"/>';
      off += len;
      return s;
    }).join("");
    host.innerHTML = '<svg width="140" height="140" viewBox="0 0 140 140">' + segs + '<text x="70" y="68" text-anchor="middle" class="donut-center">' + total + '</text><text x="70" y="84" text-anchor="middle" class="donut-center-l">Schulungen</text></svg>';
    setHTML("donut-legend", cats.map((c) => '<div class="row"><span class="dot" style="background:' + c.color + '"></span>' + c.label + '<span class="num">' + c.n + "</span></div>").join(""));
  }
  function renderAbtBars() {
    const emps = G("employees");
    const asg = G("assignments");
    const host = byId("abt-bars");
    if (!host) return;
    const abts = [...new Set(emps.map((m) => m.abteilung))].sort();
    if (!abts.length) {
      host.innerHTML = '<p class="text-muted" style="font-size:.85rem;">Keine Mitarbeitenden.</p>';
      return;
    }
    host.innerHTML = abts.map((abt) => {
      const ids = new Set(emps.filter((m) => m.abteilung === abt).map((m) => m.id));
      const rows = asg.filter((a) => ids.has(a.employeeId));
      const done = rows.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) >= 0).length;
      const pct = rows.length ? Math.round(100 * done / rows.length) : 0;
      return '<div class="hbar-row"><div class="hbar-head"><span>' + abt + '</span><span class="pct">' + pct + '%</span></div><div class="hbar"><span style="width:' + pct + "%; background:" + (pct >= 80 ? "#4C7A5E" : pct >= 50 ? "#C99B45" : "#B03A2E") + ';"></span></div></div>';
    }).join("");
  }
  function renderExpiryChart() {
    const asg = G("assignments").filter((a) => a.status === "abgeschlossen");
    const now = /* @__PURE__ */ new Date();
    const buckets = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      buckets.push({ label: d.toLocaleDateString("de-DE", { month: "short" }), y: d.getFullYear(), m: d.getMonth(), n: 0 });
    }
    asg.forEach((a) => {
      const e = new Date(a.expiresAt);
      buckets.forEach((b) => {
        if (e.getFullYear() === b.y && e.getMonth() === b.m) b.n++;
      });
    });
    const max = Math.max(1, ...buckets.map((b) => b.n));
    setHTML("expiry-chart", buckets.map((b) => {
      const h = b.n ? Math.round(100 * b.n / max) : 0;
      return '<div class="col-item"><div class="col-cnt">' + (b.n || "") + '</div><div class="col-bar ' + (b.n ? "" : "zero") + '" style="height:' + (b.n ? Math.max(h, 8) : 2) + '%;"></div><div class="col-lbl">' + b.label + "</div></div>";
    }).join(""));
  }
  function renderKpis() {
    const emps = G("employees");
    const asg = G("assignments");
    const done = asg.filter((a) => a.status === "abgeschlossen").length;
    const open = asg.filter((a) => a.status !== "abgeschlossen").length;
    const dueSoon = asg.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) <= 30 && daysTo(a.expiresAt) >= 0).length;
    const expired = asg.filter((a) => daysTo(a.expiresAt) < 0).length;
    const cells = [
      ["Mitarbeitende", emps.length, ""],
      ["Offene Zuweisungen", open, ""],
      ["Abgeschlossen", done, ""],
      ["L\xE4uft in \u226430 Tagen ab", dueSoon, dueSoon ? "warn" : ""],
      ["Abgelaufen", expired, expired ? "warn" : ""]
    ];
    setHTML("kpis", cells.map(([l, v, c]) => '<div class="stat ' + c + '"><div class="v">' + v + '</div><div class="l">' + l + "</div></div>").join(""));
  }
  function renderOverviewDue() {
    const dueRows = G("assignments").filter((a) => a.status === "abgeschlossen").map((a) => ({ a, d: daysTo(a.expiresAt) })).filter((x) => x.d <= 30).sort((p, q) => p.d - q.d);
    const open = G("assignments").filter((a) => a.status !== "abgeschlossen");
    const host = byId("overview-due");
    if (!host) return;
    if (!dueRows.length && !open.length) {
      host.innerHTML = '<p class="text-muted">Keine f\xE4lligen oder offenen Schulungen.</p>';
      return;
    }
    host.innerHTML = dueRows.map(({ a, d }) => {
      const exp = d < 0;
      return '<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border-soft);"><div><strong>' + empName(a.employeeId) + "</strong> \xB7 " + a.title + '<br><span class="text-muted" style="font-size:.84rem;">' + (exp ? "Abgelaufen am " : "L\xE4uft ab am ") + fmt(a.expiresAt) + (exp ? "" : " (" + d + " Tage)") + '</span></div><span class="pill ' + (exp ? "exp" : "prog") + '">' + (exp ? "abgelaufen" : "l\xE4uft ab") + "</span></div>";
    }).join("") + open.map((a) => '<div style="display:flex; justify-content:space-between; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border-soft);"><div><strong>' + empName(a.employeeId) + "</strong> \xB7 " + a.title + '<br><span class="text-muted" style="font-size:.84rem;">Noch nicht abgeschlossen</span></div><span class="pill ' + (a.status === "in_arbeit" ? "prog" : "todo") + '">' + (a.status === "in_arbeit" ? "in Arbeit" : "zugewiesen") + "</span></div>").join("");
  }
  function renderEmployees() {
    const all = G("employees");
    const allAbts = [...new Set(all.map((m) => m.abteilung))].sort();
    setHTML("abt-list", allAbts.map((a) => '<option value="' + a + '">').join(""));
    const fsel = byId("emp-abt-filter");
    if (fsel) {
      const cur = fsel.value;
      fsel.innerHTML = '<option value="">Alle Abteilungen</option>' + allAbts.map((a) => '<option value="' + a + '">' + a + "</option>").join("");
      fsel.value = cur;
    }
    const q = getVal("emp-search").toLowerCase().trim();
    const fAbt = fsel ? fsel.value : "";
    const emps = all.filter((m) => (!fAbt || m.abteilung === fAbt) && (!q || m.name.toLowerCase().includes(q) || (m.email || "").toLowerCase().includes(q) || m.abteilung.toLowerCase().includes(q)));
    const byAbt = {};
    emps.forEach((m) => {
      (byAbt[m.abteilung] = byAbt[m.abteilung] || []).push(m);
    });
    const host = byId("emp-list");
    if (!host) return;
    if (!all.length) {
      host.innerHTML = '<p class="text-muted">Noch keine Mitarbeitenden \u2014 \xFCber \u201E+ Mitarbeiter" anlegen.</p>';
      return;
    }
    if (!emps.length) {
      host.innerHTML = '<p class="text-muted">Keine Treffer f\xFCr die aktuelle Suche/Filter.</p>';
      return;
    }
    host.innerHTML = Object.keys(byAbt).sort().map((abt) => '<div class="abt-head">' + abt + " \xB7 " + byAbt[abt].length + '</div><div class="card table-scroll" style="padding:0; margin-bottom:14px;"><table class="matrix"><thead><tr><th>Name</th><th>E-Mail</th><th>Schulungen</th><th></th></tr></thead><tbody>' + byAbt[abt].map((m) => {
      const as = G("assignments").filter((a) => a.employeeId === m.id);
      const done = as.filter((a) => a.status === "abgeschlossen").length;
      return "<tr><td><strong>" + m.name + "</strong></td><td>" + m.email + "</td><td>" + (as.length - done) + " offen \xB7 " + done + ` erledigt</td><td style="text-align:right;"><button class="btn btn-ghost btn-sm" onclick="delEmp('` + m.id + `')">Entfernen</button></td></tr>`;
    }).join("") + "</tbody></table></div>").join("");
  }
  function renderLicenses() {
    const host = byId("lic-list");
    if (!host) return;
    const slugs = new Set(G("licenses").map((l) => l.slug));
    if (company().pauschale) Object.values(COURSE_BY_SLUG).filter((c) => c.group === "jaehrlich").forEach((c) => slugs.add(c.slug));
    if (!slugs.size) {
      host.innerHTML = '<p class="text-muted">Noch keine Schulungen gekauft \u2014 \xFCber \u201E+ Schulung kaufen" starten.</p>';
      return;
    }
    host.innerHTML = [...slugs].map((slug) => {
      const c = COURSE_BY_SLUG[slug] || { title: slug };
      const s = seatsFor(slug);
      const pct = s.unlimited ? 100 : Math.min(100, Math.round(100 * s.used / Math.max(1, s.total)));
      const full = !s.unlimited && s.used >= s.total;
      return '<div class="card" style="display:flex; justify-content:space-between; align-items:center; gap:16px; flex-wrap:wrap; margin-bottom:12px;"><div style="flex:1; min-width:240px;"><strong>' + c.title + "</strong>" + (s.unlimited ? '<span class="pill done" style="margin-left:8px;">Pauschale inklusive</span>' : "") + '<div style="font-size:.85rem; color:var(--text-soft); margin-top:4px;">' + (s.unlimited ? s.used + " Mitarbeitende zugewiesen \xB7 unbegrenzt" : s.used + " von " + s.total + " Pl\xE4tzen belegt") + "</div>" + (s.unlimited ? "" : '<div class="seatbar ' + (full ? "full" : "") + '"><span style="width:' + pct + '%;"></span></div>') + `</div><div style="display:flex; gap:8px;"><button class="btn btn-cta btn-sm" onclick="openAssign('` + slug + `')" ` + (full ? "disabled" : "") + ">Zuweisen</button>" + (s.unlimited ? "" : `<button class="btn btn-ghost btn-sm" onclick="openBuyModal('` + slug + `')">Pl\xE4tze nachkaufen</button>`) + "</div></div>";
    }).join("");
  }
  function renderMatrix() {
    const all = G("employees");
    const grid = byId("person-grid");
    if (!grid) return;
    if (!all.length) {
      grid.innerHTML = '<p class="text-muted">Noch keine Mitarbeitenden \u2014 \xFCber \u201E+ Mitarbeiter" anlegen.</p>';
      setHTML("person-detail", "");
      return;
    }
    const q = getVal("person-search").toLowerCase().trim();
    const fStat = getVal("person-status-filter");
    const emps = all.filter((m) => {
      if (q && !(m.name.toLowerCase().includes(q) || m.abteilung.toLowerCase().includes(q))) return false;
      if (!fStat) return true;
      const s = personStats(m.id);
      if (fStat === "offen") return s.open > 0;
      if (fStat === "ablauf") return s.soon > 0 || s.expired > 0;
      if (fStat === "komplett") return s.total > 0 && s.valid === s.total;
      return true;
    });
    if (!emps.length) {
      grid.innerHTML = '<p class="text-muted">Keine Treffer f\xFCr die aktuelle Suche/Filter.</p>';
      setHTML("person-detail", "");
      return;
    }
    if (!ui.selPerson || !emps.find((m) => m.id === ui.selPerson)) ui.selPerson = emps[0].id;
    grid.innerHTML = emps.map((m) => {
      const s = personStats(m.id);
      return '<div class="person-card ' + (m.id === ui.selPerson ? "sel" : "") + '" role="button" tabindex="0" aria-label="Details zu ' + m.name + `" onclick="selectPerson('` + m.id + `')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();selectPerson('` + m.id + `');}">` + ringSvg(s.pct, 58) + '<div><div class="pname">' + m.name + '</div><div class="pabt">' + m.abteilung + '</div><div class="pmeta">' + s.valid + "/" + s.total + " g\xFCltig" + (s.open ? " \xB7 " + s.open + " offen" : "") + (s.expired ? " \xB7 " + s.expired + " abgelaufen" : "") + "</div></div></div>";
    }).join("");
    renderPersonDetail();
  }
  function renderPersonDetail() {
    const host = byId("person-detail");
    if (!host) return;
    const m = ui.selPerson ? empById(ui.selPerson) : void 0;
    if (!m) {
      host.innerHTML = "";
      return;
    }
    const s = personStats(m.id);
    const rows = s.as.slice().sort((a, b) => {
      const da = new Date(a.completedAt || a.assignedAt).getTime();
      const db = new Date(b.completedAt || b.assignedAt).getTime();
      return db - da;
    });
    const tl = !rows.length ? '<p class="text-muted">Dieser Person ist noch keine Schulung zugewiesen. Im Tab \u201ESchulungen & Lizenzen" zuweisen.</p>' : '<ul class="tl">' + rows.map((a) => {
      const exp = daysTo(a.expiresAt) < 0;
      let cls = "todo";
      let label = "zugewiesen";
      let dot = "#9DB3A8";
      if (a.status === "in_arbeit") {
        cls = "prog";
        label = "in Arbeit";
        dot = "#C99B45";
      }
      if (a.status === "abgeschlossen") {
        cls = "done";
        label = "abgeschlossen";
        dot = "#4C7A5E";
      }
      if (exp) {
        cls = "exp";
        label = "abgelaufen";
        dot = "#B03A2E";
      }
      let desc;
      if (a.status === "abgeschlossen") {
        const d = daysTo(a.expiresAt);
        desc = "Absolviert am " + fmt(a.completedAt) + " \xB7 " + (exp ? '<span style="color:var(--error)">abgelaufen am ' + fmt(a.expiresAt) + "</span>" : "g\xFCltig bis " + fmt(a.expiresAt) + (d <= 30 ? ' <span style="color:var(--gold-dark)">(l\xE4uft in ' + d + " Tagen ab)</span>" : ""));
      } else {
        desc = "Zugewiesen am " + fmt(a.assignedAt) + (a.lastReminder ? " \xB7 zuletzt erinnert " + fmt(a.lastReminder) : "");
      }
      const due = a.status !== "abgeschlossen" || daysTo(a.expiresAt) <= 30;
      const btn = due ? `<button class="btn btn-ghost btn-sm" style="margin-top:8px;" onclick="event.stopPropagation();remindOne('` + a.id + `')">\u2709 Erinnern</button>` : "";
      return '<li><span class="tldot" style="background:' + dot + '"></span><span class="tlbadge pill ' + cls + '">' + label + '</span><div class="tlt">' + (a.title || a.slug) + '</div><div class="tld">' + desc + "</div>" + btn + "</li>";
    }).join("") + "</ul>";
    host.innerHTML = '<div class="pd-card"><div class="pd-head">' + ringSvg(s.pct, 76) + '<div class="pinfo"><h3>' + m.name + '</h3><div class="meta">' + m.abteilung + " \xB7 " + m.email + '</div></div><div class="pd-mini"><div class="m"><div class="v">' + s.valid + '</div><div class="l">g\xFCltig</div></div><div class="m"><div class="v">' + s.open + '</div><div class="l">offen</div></div><div class="m"><div class="v" style="color:' + (s.soon ? "var(--gold-dark)" : "var(--sage-dark)") + '">' + s.soon + '</div><div class="l">l\xE4uft bald ab</div></div><div class="m"><div class="v" style="color:' + (s.expired ? "var(--error)" : "var(--sage-dark)") + '">' + s.expired + '</div><div class="l">abgelaufen</div></div></div></div><h4 style="font-size:.95rem; margin:0 0 14px; color:var(--sage-dark);">Schulungsverlauf</h4>' + tl + "</div>";
  }
  function renderReminders() {
    const due = G("assignments").filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) <= 30 || a.status !== "abgeschlossen");
    setText("rem-summary", due.length ? due.length + " Schulung" + (due.length > 1 ? "en" : "") + " f\xE4llig/offen \u2014 direkt unten im Verlauf erinnern." : "Aktuell nichts zu erinnern.");
    const log = Store.get("reminderLog", []);
    setHTML("rem-log", !log.length ? '<p class="text-muted">Noch keine Erinnerungen versendet.</p>' : '<div class="card" style="padding:0; overflow:hidden;"><table class="matrix"><tbody>' + log.slice().reverse().slice(0, 30).map((r) => "<tr><td>" + fmt(r.at) + "</td><td><strong>" + r.name + "</strong></td><td>" + r.course + '</td><td><span class="text-muted">' + r.type + "</span></td></tr>").join("") + "</tbody></table></div>");
  }
  function renderSharePoint() {
    const co = company();
    setVal("sp-url", co.sharepointUrl || "");
    const base = co.sharepointUrl || "";
    const folder = (p) => base ? base.replace(/\/$/, "") + p : "#";
    const emps = G("employees");
    setHTML("sp-list", '<div class="abt-head">Zentrale Ordner</div><a class="sp-link" href="' + folder("/Schulungsnachweise") + '" target="_blank"><span>\u{1F4C1}</span><strong>Schulungsnachweise (alle)</strong></a><a class="sp-link" href="' + folder("/Gefaehrdungsbeurteilungen") + '" target="_blank"><span>\u{1F4C1}</span><strong>Gef\xE4hrdungsbeurteilungen</strong></a><a class="sp-link" href="' + folder("/Unterweisungsplan") + '" target="_blank"><span>\u{1F4C1}</span><strong>Unterweisungsplan &amp; Nachweise</strong></a><div class="abt-head">Mitarbeiter-Ordner (automatisch aus der Kartei)</div>' + emps.map((m) => '<a class="sp-link" href="' + folder("/Mitarbeiter/" + encodeURIComponent(m.abteilung) + "/" + encodeURIComponent(m.name)) + '" target="_blank"><span>\u{1F4C2}</span><span>' + m.name + ' <span class="text-muted">\xB7 ' + m.abteilung + "</span></span></a>").join("") + (base ? "" : '<p class="text-muted" style="margin-top:12px; font-size:.85rem;">Hinterlegen Sie oben Ihre SharePoint-URL, dann werden die Links aktiv.</p>'));
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/actions.ts
  var eur2 = (x) => x.toLocaleString("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " \u20AC";
  function openEmpModal() {
    var _a;
    ["m-name", "m-abt", "m-mail"].forEach((i) => {
      const el = byId(i);
      if (el) el.value = "";
    });
    (_a = byId("emp-modal")) == null ? void 0 : _a.classList.add("open");
  }
  function addEmp() {
    const name = getVal("m-name").trim();
    const abt = getVal("m-abt").trim();
    const mail = getVal("m-mail").trim();
    if (!name || !abt || !mail) {
      toast("Bitte alle Felder ausf\xFCllen.", "error");
      return;
    }
    Store.push("employees", { id: uid(), name, abteilung: abt, email: mail });
    closeModal("emp-modal");
    toast("Mitarbeiter angelegt \u2014 SharePoint-Ordner wird angelegt.");
    renderAll();
  }
  function delEmp(id) {
    const m = empById(id);
    uiConfirm((m ? m.name : "Mitarbeiter:in") + " entfernen? Alle Zuweisungen dieser Person werden ebenfalls gel\xF6scht.", () => {
      Store.set("employees", G("employees").filter((x) => x.id !== id));
      Store.set("assignments", G("assignments").filter((a) => a.employeeId !== id));
      toast("Mitarbeiter entfernt.");
      renderAll();
    }, "Entfernen");
  }
  function openBuyModal(slug) {
    var _a;
    const pre = typeof slug === "string" ? slug : null;
    const sel = byId("b-course");
    if (sel) {
      sel.innerHTML = Object.values(COURSE_BY_SLUG).map((c) => '<option value="' + c.slug + '" ' + (c.slug === pre ? "selected" : "") + ">" + c.title + " \u2014 " + c.price + " \u20AC / Platz</option>").join("");
      sel.onchange = updateBuyPrice;
    }
    const seats = byId("b-seats");
    if (seats) seats.oninput = updateBuyPrice;
    updateBuyPrice();
    (_a = byId("buy-modal")) == null ? void 0 : _a.classList.add("open");
  }
  function updateBuyPrice() {
    const c = COURSE_BY_SLUG[getVal("b-course")];
    const n = parseInt(getVal("b-seats"), 10) || 0;
    setText("b-price", c ? "Gesamt: " + (c.price * n).toLocaleString("de-DE") + " \u20AC netto (" + n + " \xD7 " + c.price + " \u20AC) zzgl. USt" : "");
  }
  function confirmBuy() {
    var _a;
    const slug = getVal("b-course");
    const n = parseInt(getVal("b-seats"), 10) || 0;
    if (n < 1) {
      toast("Bitte mindestens 1 Platz w\xE4hlen.", "error");
      return;
    }
    const c = COURSE_BY_SLUG[slug] || { title: slug, price: 0 };
    const net = c.price * n;
    const ust = Math.round(net * 0.19 * 100) / 100;
    const brutto = Math.round((net + ust) * 100) / 100;
    ui.pendingOrder = { slug, n, net, ust, brutto, title: c.title, unit: c.price };
    setHTML(
      "checkout-body",
      '<div class="vrow2"><span>' + c.title + "</span><span>" + n + " \xD7 " + eur2(c.price) + '</span></div><div class="vrow2"><span>Zwischensumme (netto)</span><span>' + eur2(net) + '</span></div><div class="vrow2"><span>zzgl. 19 % USt</span><span>' + eur2(ust) + '</span></div><div class="vrow2" style="font-weight:700;border-top:1px solid var(--border-soft);padding-top:10px;margin-top:4px;"><span>Gesamt (brutto)</span><span>' + eur2(brutto) + "</span></div>"
    );
    closeModal("buy-modal");
    (_a = byId("checkout-modal")) == null ? void 0 : _a.classList.add("open");
  }
  function finalizeBuy() {
    var _a;
    const o = ui.pendingOrder;
    if (!o) return;
    const now = /* @__PURE__ */ new Date();
    Store.push("licenses", { id: uid(), slug: o.slug, seats: o.n, kind: "einzel", boughtAt: now.toISOString() });
    const invNo = "RE-" + now.getFullYear() + "-" + String(G("invoices").length + 1).padStart(4, "0");
    Store.push("invoices", { id: uid(), no: invNo, date: now.toISOString(), title: o.title, seats: o.n, net: o.net, ust: o.ust, brutto: o.brutto });
    ui.pendingOrder = null;
    closeModal("checkout-modal");
    toast(o.n + " Pl\xE4tze gekauft \xB7 Rechnung " + invNo + " erstellt.", "success", 4800);
    renderAll();
    (_a = document.querySelector('.dash-tab[data-p="licenses"]')) == null ? void 0 : _a.click();
  }
  function openAssign(slug) {
    var _a;
    ui.assignSlug = slug;
    const s = seatsFor(slug);
    const free = s.unlimited ? Infinity : s.total - s.used;
    setText("assign-title", "Zuweisen: " + (COURSE_BY_SLUG[slug] || { title: slug }).title);
    setText("assign-sub", s.unlimited ? "Pauschale inklusive \u2014 unbegrenzt zuweisbar." : free + " freie Pl\xE4tze von " + s.total + ".");
    const assigned = new Set(assignmentsForSlug(slug).map((a) => a.employeeId));
    setHTML("assign-emps", G("employees").map((m) => {
      const has = assigned.has(m.id);
      return '<label class="check-item" style="border:0; padding:8px 4px; gap:12px;"><input type="checkbox" value="' + m.id + '" ' + (has ? "checked disabled" : "") + ' class="assign-cb"><span>' + m.name + ' <span class="text-muted">\xB7 ' + m.abteilung + "</span>" + (has ? ' <span class="pill done" style="margin-left:6px;">zugewiesen</span>' : "") + "</span></label>";
    }).join(""));
    (_a = byId("assign-modal")) == null ? void 0 : _a.classList.add("open");
  }
  function confirmAssign() {
    const slug = ui.assignSlug;
    if (!slug) return;
    const checks = Array.from(document.querySelectorAll(".assign-cb:checked:not(:disabled)"));
    const sel = checks.map((c) => c.value);
    if (!sel.length) {
      toast("Bitte Mitarbeitende ausw\xE4hlen.", "error");
      return;
    }
    const s = seatsFor(slug);
    const free = s.unlimited ? Infinity : s.total - s.used;
    if (sel.length > free) {
      toast("Nicht genug Pl\xE4tze: " + free + " frei, " + sel.length + " gew\xE4hlt. Bitte Pl\xE4tze nachkaufen.", "error", 5e3);
      return;
    }
    const now = Date.now();
    const M = 30.4 * 24 * 3600 * 1e3;
    sel.forEach((id) => {
      Store.push("assignments", { id: uid(), slug, title: (COURSE_BY_SLUG[slug] || {}).title || slug, employeeId: id, status: "zugewiesen", assignedAt: (/* @__PURE__ */ new Date()).toISOString(), completedAt: null, expiresAt: new Date(now + 12 * M).toISOString(), lastReminder: null });
      logReminder(id, slug, "Einladung zur Schulung");
    });
    closeModal("assign-modal");
    toast(sel.length + " Mitarbeitende zugewiesen \u2014 Einladungs-Mail versendet.", "success", 4500);
    renderAll();
  }
  function selectPerson(id) {
    var _a;
    ui.selPerson = id;
    renderMatrix();
    (_a = byId("person-detail")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  function logReminder(empId, slug, type) {
    const m = empById(empId);
    const log = Store.get("reminderLog", []);
    log.push({ at: (/* @__PURE__ */ new Date()).toISOString(), name: m ? m.name : "\u2014", email: m ? m.email : "", course: (COURSE_BY_SLUG[slug] || {}).title || slug, type });
    Store.set("reminderLog", log);
  }
  function remindOne(aid) {
    const a = G("assignments").find((x) => x.id === aid);
    if (!a) return;
    a.lastReminder = (/* @__PURE__ */ new Date()).toISOString();
    Store.set("assignments", G("assignments").map((x) => x.id === aid ? a : x));
    const exp = daysTo(a.expiresAt);
    logReminder(a.employeeId, a.slug, a.status !== "abgeschlossen" ? "Erinnerung: Schulung offen" : exp < 0 ? "Erinnerung: abgelaufen" : "Erinnerung: l\xE4uft ab");
    toast("Erinnerung an " + empName(a.employeeId) + " versendet.");
    renderMatrix();
    renderReminders();
    renderKpis();
  }
  function remindOneSilent(a) {
    a.lastReminder = (/* @__PURE__ */ new Date()).toISOString();
    Store.set("assignments", G("assignments").map((x) => x.id === a.id ? a : x));
    const exp = daysTo(a.expiresAt);
    logReminder(a.employeeId, a.slug, a.status !== "abgeschlossen" ? "Erinnerung: Schulung offen" : exp < 0 ? "Erinnerung: abgelaufen" : "Erinnerung: l\xE4uft ab");
  }
  function remindAllDue() {
    const due = G("assignments").filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) <= 30);
    if (!due.length) {
      toast("Keine ablaufenden Schulungen.", "info");
      return;
    }
    due.forEach(remindOneSilent);
    toast(due.length + " Erinnerungen (Ablauf) versendet.");
    renderMatrix();
    renderReminders();
  }
  function remindAllOpen() {
    const open = G("assignments").filter((a) => a.status !== "abgeschlossen");
    if (!open.length) {
      toast("Keine offenen Zuweisungen.", "info");
      return;
    }
    open.forEach(remindOneSilent);
    toast(open.length + " Erinnerungen (offen) versendet.");
    renderMatrix();
    renderReminders();
  }
  function saveSp() {
    const co = company();
    co.sharepointUrl = getVal("sp-url");
    Store.set("company", co);
    toast("SharePoint-URL gespeichert.");
    renderAll();
  }
  function exportCsv() {
    const rows = auditRows();
    if (!rows.length) {
      toast("Keine Daten zum Export.", "info");
      return;
    }
    const head = ["Mitarbeiter", "Abteilung", "E-Mail", "Schulung", "Status", "Zugewiesen am", "Abgeschlossen am", "G\xFCltig bis"];
    const esc = (v) => '"' + String(v).replace(/"/g, '""') + '"';
    const lines = [head.map(esc).join(";")].concat(rows.map((r) => [r.name, r.abteilung, r.email, r.kurs, r.status, r.zugewiesen, r.abgeschlossen, r.gueltig].map(esc).join(";")));
    const blob = new Blob(["\uFEFF" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Schulungsnachweis_" + company().name.replace(/[^\w]+/g, "_") + "_" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) + ".csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    toast("CSV exportiert.");
  }
  function printNachweis() {
    const rows = auditRows();
    if (!rows.length) {
      toast("Keine Daten zum Export.", "info");
      return;
    }
    const co = company();
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
    const pill = (st) => {
      const c = st === "abgeschlossen" ? "#2f5a3e" : st === "abgelaufen" ? "#B03A2E" : st === "in Arbeit" ? "#A57E33" : "#677A70";
      return '<span style="color:' + c + ';font-weight:600;">' + st + "</span>";
    };
    const body = rows.map((r) => "<tr><td>" + r.name + "</td><td>" + r.abteilung + "</td><td>" + r.kurs + "</td><td>" + pill(r.status) + "</td><td>" + (r.abgeschlossen || "\u2014") + "</td><td>" + (r.gueltig || "\u2014") + "</td></tr>").join("");
    const html = '<!DOCTYPE html><html lang="de"><head><meta charset="UTF-8"><title>Unterweisungsnachweis ' + co.name + '</title><style>body{font-family:Arial,Helvetica,sans-serif;color:#243029;margin:32px;}h1{font-size:20px;margin:0 0 4px;}.meta{color:#677A70;font-size:13px;margin-bottom:20px;}table{width:100%;border-collapse:collapse;font-size:12.5px;}th,td{text-align:left;padding:7px 8px;border-bottom:1px solid #D8E4DC;}th{background:#ECF2EE;text-transform:uppercase;font-size:10.5px;letter-spacing:.04em;}.sig{margin-top:48px;display:flex;justify-content:space-between;gap:40px;}.sig div{flex:1;border-top:1px solid #243029;padding-top:6px;font-size:12px;color:#677A70;}@media print{@page{size:A4;margin:14mm;}}</style></head><body><h1>Unterweisungsnachweis</h1><div class="meta">' + co.name + (co.pauschale ? " \xB7 Pauschalbetreuung Tier " + co.tier : "") + " \xB7 Stand " + today + " \xB7 " + rows.length + " Eintr\xE4ge</div><table><thead><tr><th>Mitarbeiter:in</th><th>Abteilung</th><th>Schulung</th><th>Status</th><th>Absolviert</th><th>G\xFCltig bis</th></tr></thead><tbody>" + body + '</tbody></table><div class="sig"><div>Datum, Unterschrift Arbeitgeber</div><div>HerwardTimm e.K. \xB7 Fachkraft f\xFCr Arbeitssicherheit</div></div><script>window.onload=function(){window.print();}<\/script></body></html>';
    const w = window.open("", "_blank");
    if (!w) {
      toast("Bitte Pop-ups erlauben.", "error");
      return;
    }
    w.document.open();
    w.document.write(html);
    w.document.close();
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/dashboard/main.ts
  var handlers = {
    addEmp,
    confirmAssign,
    confirmBuy,
    delEmp,
    exportCsv,
    finalizeBuy,
    openAssign,
    openBuyModal,
    openEmpModal,
    printNachweis,
    remindAllDue,
    remindAllOpen,
    remindOne,
    saveSp,
    selectPerson,
    closeModal,
    renderEmployees,
    renderMatrix
  };
  Object.entries(handlers).forEach(([name, fn]) => {
    window[name] = fn;
  });
  function init() {
    buildCatalog();
    initTabs();
    initModals();
    initLogout();
    seed();
    renderAll();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
