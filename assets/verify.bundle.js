"use strict";
(() => {
  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/shared/dom.ts
  function byId(id) {
    return document.getElementById(id);
  }
  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/pages/verify.ts
  var card = byId("verify-card");
  function getReg() {
    try {
      return JSON.parse(localStorage.getItem("htk-certs") || "{}");
    } catch {
      return {};
    }
  }
  function render(rawId) {
    if (!card) return;
    const id = (rawId || "").trim();
    if (!id) {
      card.innerHTML = '<p class="text-muted">Bitte eine Zertifikat-ID eingeben.</p>';
      return;
    }
    const rec = getReg()[id];
    if (!rec) {
      card.innerHTML = '<div class="vstatus bad"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></span><div><h2>Kein g\xFCltiges Zertifikat gefunden</h2><p class="text-muted" style="margin:2px 0 0; font-size:.9rem;">Zur ID <strong>' + escapeHtml(id) + '</strong> liegt kein Nachweis vor.</p></div></div><p class="text-muted" style="font-size:.9rem; margin:0;">Bitte ID pr\xFCfen. In der Demo erscheinen nur Zertifikate, die auf diesem Ger\xE4t erzeugt wurden.</p>';
      return;
    }
    const d = new Date(rec.date);
    const exp = new Date(d.getTime());
    exp.setMonth(exp.getMonth() + 12);
    const valid = exp.getTime() >= Date.now();
    const fmtLong = (x) => x.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" });
    card.innerHTML = '<div class="vstatus ok"><span class="ic"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><polyline points="20 6 9 17 4 12"/></svg></span><div><h2>G\xFCltiges Zertifikat</h2><p class="text-muted" style="margin:2px 0 0; font-size:.9rem;">Dieser Schulungsnachweis ist echt und im System hinterlegt.</p></div></div><div class="vrow"><span class="k">Zertifikat-ID</span><span class="v">' + escapeHtml(rec.id) + '</span></div><div class="vrow"><span class="k">Teilnehmer:in</span><span class="v">' + escapeHtml(rec.name) + '</span></div><div class="vrow"><span class="k">Firma</span><span class="v">' + escapeHtml(rec.company) + '</span></div><div class="vrow"><span class="k">Schulung</span><span class="v">' + escapeHtml(rec.course) + "</span></div>" + (rec.basis ? '<div class="vrow"><span class="k">Pflichtgrundlage</span><span class="v">' + escapeHtml(rec.basis) + "</span></div>" : "") + '<div class="vrow"><span class="k">Absolviert am</span><span class="v">' + fmtLong(d) + '</span></div><div class="vrow"><span class="k">G\xFCltig bis</span><span class="v" style="color:' + (valid ? "#2f5a3e" : "var(--error)") + '">' + fmtLong(exp) + (valid ? "" : " \xB7 abgelaufen") + "</span></div>";
  }
  function check() {
    var _a2;
    const id = ((_a2 = byId("vid")) == null ? void 0 : _a2.value) || "";
    render(id);
    history.replaceState(null, "", "verify.html?id=" + encodeURIComponent(id.trim()));
  }
  window.check = check;
  var pid = new URLSearchParams(location.search).get("id");
  if (pid) {
    const vid = byId("vid");
    if (vid) vid.value = pid;
    render(pid);
  } else if (card) {
    card.innerHTML = '<p class="text-muted">Geben Sie unten eine Zertifikat-ID ein, um die Echtheit zu pr\xFCfen.</p>';
  }
  var _a;
  (_a = byId("vid")) == null ? void 0 : _a.addEventListener("keydown", (e) => {
    if (e.key === "Enter") check();
  });
})();
