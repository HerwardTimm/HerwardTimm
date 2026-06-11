"use strict";
(() => {
  // src/shared/dom.ts
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

  // src/shared/catalog.ts
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

  // src/shared/repo.ts
  var empId = () => Store.get("currentEmployeeId", null);
  var newCertId = () => "HTK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
  var localRepo = {
    async currentEmployee() {
      const id = empId();
      return id ? G("employees").find((m) => m.id === id) : void 0;
    },
    async companyName() {
      return Store.get("company", {}).name || "";
    },
    async myAssignments() {
      const id = empId();
      return G("assignments").filter((a) => a.employeeId === id);
    },
    async startTraining(id) {
      const all = G("assignments");
      const a = all.find((x) => x.id === id);
      if (!a) return;
      if (a.status === "zugewiesen") {
        a.status = "in_arbeit";
        Store.set("assignments", all.map((x) => x.id === id ? a : x));
      }
    },
    async completeTraining(id) {
      const all = G("assignments");
      const a = all.find((x) => x.id === id);
      if (!a) throw new Error("Zuweisung nicht gefunden: " + id);
      const now = /* @__PURE__ */ new Date();
      const exp = new Date(now);
      exp.setMonth(exp.getMonth() + 12);
      a.status = "abgeschlossen";
      a.completedAt = now.toISOString();
      a.expiresAt = exp.toISOString();
      a.certId = a.certId || newCertId();
      Store.set("assignments", all.map((x) => x.id === id ? a : x));
      return a;
    }
  };
  var repo = localRepo;

  // src/pages/meine-schulungen.ts
  buildCatalog();
  function ringSvg(pct, size) {
    const r = size / 2 - 5;
    const C = 2 * Math.PI * r;
    const len = C * pct / 100;
    const col = pct >= 80 ? "#4C7A5E" : pct >= 50 ? "#C99B45" : "#B03A2E";
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 ' + size + " " + size + '"><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="#fff" stroke-width="7"/><circle cx="' + size / 2 + '" cy="' + size / 2 + '" r="' + r + '" fill="none" stroke="' + col + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + len + " " + (C - len) + '" transform="rotate(-90 ' + size / 2 + " " + size / 2 + ')"/><text x="' + size / 2 + '" y="' + (size / 2 + 1) + '" text-anchor="middle" class="ring-num">' + pct + '%</text><text x="' + size / 2 + '" y="' + (size / 2 + size * 0.14) + '" text-anchor="middle" class="ring-lbl">g\xFCltig</text></svg>';
  }
  function certLink(a, emp, company) {
    const c = COURSE_BY_SLUG[a.slug] || {};
    const id = a.certId || "HTK-" + Math.random().toString(36).slice(2, 7).toUpperCase();
    const p = new URLSearchParams({
      name: emp ? emp.name : "",
      company,
      course: a.title || a.slug,
      basis: c.basis || "",
      id,
      date: a.completedAt || (/* @__PURE__ */ new Date()).toISOString()
    });
    return "zertifikat.html?" + p.toString();
  }
  async function render() {
    const m = await repo.currentEmployee();
    if (!m) {
      setText("ms-name", "Nicht eingeloggt");
      setText("ms-sub", "");
      setHTML("ms-grid", '<div class="ms-empty"><p class="text-muted">Es sind noch keine Mitarbeiterdaten vorhanden. Bitte einmal als <a href="login.html">Firma einloggen</a> (legt die Demo-Daten an) und dann als Mitarbeiter:in anmelden.</p></div>');
      return;
    }
    const company = await repo.companyName();
    setText("ms-name", "Hallo, " + m.name.split(" ")[0] + "!");
    setText("ms-sub", m.abteilung + " \xB7 " + company);
    const as = await repo.myAssignments();
    const valid = as.filter((a) => a.status === "abgeschlossen" && daysTo(a.expiresAt) >= 0).length;
    const pct = as.length ? Math.round(100 * valid / as.length) : 0;
    setHTML("ms-ring", ringSvg(pct, 92));
    const open = as.filter((a) => a.status !== "abgeschlossen" || daysTo(a.expiresAt) < 0);
    setHTML("ms-due-wrap", open.length ? '<div class="demo-note" style="background:rgba(201,155,69,.12);border-left:2px solid var(--gold);padding:12px 16px;border-radius:6px;margin-bottom:20px;font-size:.9rem;">Sie haben <strong>' + open.length + "</strong> offene bzw. f\xE4llige Schulung" + (open.length > 1 ? "en" : "") + ". Bitte zeitnah erledigen.</div>" : '<div class="demo-note" style="background:rgba(76,122,94,.12);border-left:2px solid #4C7A5E;padding:12px 16px;border-radius:6px;margin-bottom:20px;font-size:.9rem;">Alles erledigt \u2014 alle zugewiesenen Schulungen sind aktuell g\xFCltig. \u{1F44D}</div>');
    if (!as.length) {
      setHTML("ms-grid", '<div class="ms-empty"><p class="text-muted">Ihnen wurde noch keine Schulung zugewiesen. Ihre Firma weist Ihnen Pflichtschulungen \xFCber das Firmen-Dashboard zu.</p></div>');
      return;
    }
    const order = (a) => a.status !== "abgeschlossen" ? 0 : daysTo(a.expiresAt) < 0 ? 0 : daysTo(a.expiresAt) <= 30 ? 1 : 2;
    setHTML("ms-grid", as.slice().sort((x, y) => order(x) - order(y)).map((a) => {
      const exp = a.status === "abgeschlossen" && daysTo(a.expiresAt) < 0;
      let cls = "todo";
      let label = "zugewiesen";
      let cardcls = "due";
      if (a.status === "in_arbeit") {
        cls = "prog";
        label = "in Arbeit";
      }
      if (a.status === "abgeschlossen") {
        cls = "done";
        label = "abgeschlossen";
        cardcls = "ok";
      }
      if (exp) {
        cls = "exp";
        label = "abgelaufen";
        cardcls = "exp";
      }
      let meta = "";
      let actions = "";
      if (a.status === "abgeschlossen" && !exp) {
        const d = daysTo(a.expiresAt);
        meta = "Absolviert am " + fmt(a.completedAt) + " \xB7 g\xFCltig bis " + fmt(a.expiresAt) + (d <= 30 ? " (l\xE4uft bald ab)" : "");
        actions = '<a class="btn btn-ghost btn-sm" href="' + certLink(a, m, company) + '" target="_blank">Zertifikat ansehen</a>';
        if (d <= 30) actions += `<button class="btn btn-cta btn-sm" onclick="startTraining('` + a.id + `')">Auffrischung starten</button>`;
      } else if (exp) {
        meta = "Abgelaufen am " + fmt(a.expiresAt) + " \u2014 bitte auffrischen.";
        actions = `<button class="btn btn-cta btn-sm" onclick="startTraining('` + a.id + `')">Auffrischung starten</button>`;
      } else {
        meta = "Zugewiesen am " + fmt(a.assignedAt);
        actions = `<button class="btn btn-cta btn-sm" onclick="startTraining('` + a.id + `')">Schulung starten</button><button class="btn btn-ghost btn-sm" onclick="completeTraining('` + a.id + `')">Als erledigt markieren</button>`;
      }
      return '<div class="ms-card ' + cardcls + '"><span class="pill ' + cls + '">' + label + "</span><h3>" + (a.title || a.slug) + '</h3><div class="ms-meta">' + meta + '</div><div class="ms-actions">' + actions + "</div></div>";
    }).join(""));
  }
  async function startTraining(aid) {
    const all = await repo.myAssignments();
    const a = all.find((x) => x.id === aid);
    await repo.startTraining(aid);
    if (a) window.open("lernen.html?schulung=" + encodeURIComponent(a.slug), "_blank");
    await render();
  }
  async function completeTraining(aid) {
    const a = await repo.completeTraining(aid);
    toast("Schulung abgeschlossen \u2014 Zertifikat erstellt.", "success", 4200);
    const m = await repo.currentEmployee();
    const company = await repo.companyName();
    await render();
    window.open(certLink(a, m, company), "_blank");
  }
  var w = window;
  w.startTraining = startTraining;
  w.completeTraining = completeTraining;
  var _a;
  (_a = byId("logout-link")) == null ? void 0 : _a.addEventListener("click", () => {
    Store.set("loggedIn", false);
    Store.set("role", null);
  });
  void render();
})();
