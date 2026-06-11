"use strict";
(() => {
  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/shared/dom.ts
  function byId(id) {
    return document.getElementById(id);
  }

  // ../../sessions/ecstatic-sleepy-davinci/mnt/OneDrive-HerwardTimme.K/Geschäftsentwicklung/Plattform-Demo/src/pages/login.ts
  function go(url) {
    setTimeout(() => {
      location.href = url;
    }, 600);
  }
  var _a;
  (_a = byId("send-link")) == null ? void 0 : _a.addEventListener("click", () => {
    var _a5;
    const email = ((_a5 = byId("login-email")) == null ? void 0 : _a5.value.trim()) || "";
    if (!email || !email.includes("@")) {
      toast("Bitte eine g\xFCltige E-Mail-Adresse eingeben.", "error");
      return;
    }
    const sent = byId("sent-to");
    if (sent) sent.textContent = email;
    const s1 = byId("step-1");
    const s2 = byId("step-2");
    if (s1) s1.style.display = "none";
    if (s2) s2.style.display = "block";
  });
  var _a2;
  (_a2 = byId("back-step1")) == null ? void 0 : _a2.addEventListener("click", () => {
    const s1 = byId("step-1");
    const s2 = byId("step-2");
    if (s2) s2.style.display = "none";
    if (s1) s1.style.display = "block";
  });
  var _a3;
  (_a3 = byId("demo-login-firma")) == null ? void 0 : _a3.addEventListener("click", () => {
    var _a5;
    const email = ((_a5 = byId("sent-to")) == null ? void 0 : _a5.textContent) || "demo@firma.de";
    Store.set("loggedIn", true);
    Store.set("role", "firma");
    Store.set("user", { email, name: "Demo-Kunde", firma: "Muster GmbH" });
    toast("Eingeloggt als Firma.", "success");
    go("dashboard.html");
  });
  var _a4;
  (_a4 = byId("demo-login-emp")) == null ? void 0 : _a4.addEventListener("click", () => {
    var _a5;
    const email = (((_a5 = byId("sent-to")) == null ? void 0 : _a5.textContent) || "").toLowerCase();
    const emps = Store.get("employees", []);
    const emp = emps.find((m) => (m.email || "").toLowerCase() === email) || emps[0];
    if (!emp) {
      toast("Keine Mitarbeiter in der Demo angelegt. Bitte zuerst als Firma einloggen.", "error", 4500);
      return;
    }
    Store.set("loggedIn", true);
    Store.set("role", "mitarbeiter");
    Store.set("currentEmployeeId", emp.id);
    Store.set("user", { email: emp.email, name: emp.name, firma: Store.get("company", {}).name || "Muster GmbH" });
    toast("Eingeloggt als " + emp.name + ".", "success");
    go("meine-schulungen.html");
  });
})();
