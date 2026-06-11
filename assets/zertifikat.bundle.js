"use strict";
(() => {
  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/shared/dom.ts
  function byId(id) {
    return document.getElementById(id);
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/pages/zertifikat.ts
  var params = new URLSearchParams(window.location.search);
  var set = (id, val) => {
    if (val) {
      const el = byId(id);
      if (el) el.textContent = val;
    }
  };
  // B-T2: name/company werden bewusst NICHT mehr aus URL-Parametern gesetzt,
  // damit das Zertifikat nicht über die URL frei überschrieben werden kann.
  // Die Identität kommt ausschließlich aus dem Profil (Inline-Script in
  // zertifikat.html). Kurs/Basis/ID/Score/Datum identifizieren die Schulung,
  // nicht die Person, und bleiben aus der URL befüllbar.
  set("cert-course", params.get("course"));
  set("cert-basis", params.get("basis"));
  set("cert-id", params.get("id"));
  if (params.get("score")) set("cert-score", params.get("score") + " Fragen richtig beantwortet");
  var certDateISO = params.get("date") || (/* @__PURE__ */ new Date()).toISOString();
  set("cert-date", new Date(certDateISO).toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }));
  // A-C1: "Gültig bis" berechnen — Standard 12 Monate ab Zertifikatsdatum,
  // sofern keine andere Frist (URL-Param validmonths) übergeben wird.
  var validMonths = parseInt(params.get("validmonths"), 10);
  if (!validMonths || validMonths <= 0) validMonths = 12;
  var validUntil = new Date(certDateISO);
  validUntil.setMonth(validUntil.getMonth() + validMonths);
  set("cert-valid-until", validUntil.toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" }));
  var _a;
  var certId = ((_a = byId("cert-id")) == null ? void 0 : _a.textContent) || "";
  document.title = "Zertifikat " + certId + " \xB7 HerwardTimm";
  var _a2, _b, _c, _d, _e;
  try {
    const KEY = "htk-certs";
    const reg = JSON.parse(localStorage.getItem(KEY) || "{}");
    reg[certId] = {
      id: certId,
      name: ((_a2 = byId("cert-name")) == null ? void 0 : _a2.textContent) || "",
      company: ((_b = byId("cert-company")) == null ? void 0 : _b.textContent) || "",
      course: ((_c = byId("cert-course")) == null ? void 0 : _c.textContent) || "",
      basis: ((_d = byId("cert-basis")) == null ? void 0 : _d.textContent) || "",
      score: ((_e = byId("cert-score")) == null ? void 0 : _e.textContent) || "",
      date: certDateISO
    };
    localStorage.setItem(KEY, JSON.stringify(reg));
  } catch {
  }
  var verifyUrlLive = "https://herwardtimm.com/verify.html?id=" + encodeURIComponent(certId);
  var verifyUrlLocal = "verify.html?id=" + encodeURIComponent(certId);
  var urlEl = byId("cert-verify-url");
  if (urlEl) urlEl.innerHTML = '<a href="' + verifyUrlLocal + '" style="color:inherit;">herwardtimm.com/verify?id=' + certId + "</a>";
  try {
    const q = qrcode(0, "M");
    q.addData(verifyUrlLive);
    q.make();
    const host = byId("cert-qr");
    if (host) {
      host.innerHTML = q.createSvgTag({ cellSize: 2, margin: 0, scalable: true });
      const svg = host.querySelector("svg");
      if (svg) {
        svg.setAttribute("width", "88");
        svg.setAttribute("height", "88");
      }
    }
  } catch {
    const host = byId("cert-qr");
    if (host) host.textContent = "";
  }
})();
