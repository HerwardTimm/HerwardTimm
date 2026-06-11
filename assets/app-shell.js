/* ============================================================
   App-Shell — Injektor für das „Plattform-Gefühl"
   ------------------------------------------------------------
   mountAppShell({ active, crumb, title }) baut die feste
   dunkelgrüne Sidebar + die App-Topbar und hängt den bestehenden
   Seiteninhalt in einen Arbeitsbereich um. Additiv & reversibel:
   es werden nur Knoten verschoben (IDs, Event-Listener und die
   Seiten-eigene Logik bleiben intakt) — nichts wird neu gerendert.

   Aufruf je Seite, z.B.:
     mountAppShell({ active:'mein-bereich', crumb:'Lernen / Start', title:'Mein Bereich' });

   Verwendet styles aus assets/app-shell.css (Klassen-Prefix `as-`).
   ============================================================ */
(function () {
  'use strict';

  // ====================================================================
  //  ZWEI getrennte Navigationsmodelle — klare Trennung Kunde / Inhaber.
  //  - KUNDE  (variant 'customer', Standard): Lern-/Schulungsbereich.
  //           KEINE Links auf admin.html (Umsätze, Firmen, Audit-Log).
  //  - ADMIN  (variant 'admin'): nur für den Inhaber (HerwardTimm).
  //           Eigene, schlanke Navigation; getrennt vom Kundenbereich.
  //  Die admin.html wird zusätzlich serverseitig per Passwort geschützt.
  // ====================================================================
  // Kundenbereich — rollenabhängig zusammengesetzt (siehe navFor):
  //  - Beide Rollen: Lernen-Gruppe + Hilfe.
  //  - Nur 'verwalter': zusätzlich die Verwalten-Gruppe (Firmen-Management).
  const NAV_CUST_LERNEN = { head: 'Lernen', items: [
    { key: 'mein-bereich',     label: 'Mein Bereich',      href: 'dashboard.html',        ic: '◧' },
    { key: 'katalog',          label: 'Schulungs-Katalog', href: 'schulungen.html',       ic: '▦' },
    { key: 'meine-schulungen', label: 'Meine Schulungen',  href: 'meine-schulungen.html', ic: '▤', badge: 'progressCount' }
  ]};
  const NAV_CUST_VERWALTEN = { head: 'Verwalten', items: [
    { key: 'overview',   label: 'Firma · Übersicht',     href: 'dashboard.html#overview',   ic: '◳' },
    { key: 'employees',  label: 'Mitarbeiter',           href: 'dashboard.html#employees',  ic: '⦿' },
    { key: 'licenses',   label: 'Schulungen & Lizenzen', href: 'dashboard.html#licenses',   ic: '▥' },
    { key: 'matrix',     label: 'Mitarbeiter-Dashboard', href: 'dashboard.html#matrix',     ic: '▤' },
    { key: 'sharepoint', label: 'Dokumente',             href: 'dashboard.html#sharepoint', ic: '❒' },
    { key: 'werkzeuge',  label: 'Werkzeuge & Vorlagen',  href: 'werkzeuge.html',            ic: '✎' }
  ]};
  const NAV_CUST_HILFE = { head: null, items: [
    { key: 'hilfe', label: 'Hilfe & Support', href: 'anfrage.html', ic: '?' }
  ]};

  const NAV_ADMIN = [
    { head: 'Steuerung', items: [
      { key: 'uebersicht', label: 'Übersicht',        href: '#uebersicht', ic: '◵' },
      { key: 'anfragen',   label: 'Anfragen',         href: '#anfragen',   ic: '✉', badge: 'admin-anfragen' },
      { key: 'pauschal',   label: 'Pauschal-Kunden',  href: '#pauschal',   ic: '◈' },
      { key: 'schulungen', label: 'Schulungs-Käufer', href: '#schulungen', ic: '▦' }
    ]},
    { head: 'Analyse', items: [
      { key: 'firmen', label: 'Firmen-Übersicht', href: '#firmen', ic: '◳' },
      { key: 'stats',  label: 'Statistik',        href: '#stats',  ic: '▤' },
      { key: 'audit',  label: 'Audit-Log',        href: '#audit',  ic: '⎘' }
    ]},
    { head: null, items: [
      { key: 'kundenansicht', label: 'Zur Kundenansicht', href: '../dashboard.html', ic: '⇄' },
      { key: 'abmelden',      label: 'Abmelden',          href: '../login.html',     ic: '⎋' }
    ]}
  ];

  function navFor(cfg) {
    if (cfg.variant === 'admin') return NAV_ADMIN;
    var groups = [NAV_CUST_LERNEN];
    var role = (window.getRole ? window.getRole() : 'verwalter');
    if (role === 'verwalter') groups.push(NAV_CUST_VERWALTEN);
    groups.push(NAV_CUST_HILFE);
    return groups;
  }

  function el(tag, attrs, html) {
    const n = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === 'style') n.style.cssText = attrs[k];
      else if (k in n) { try { n[k] = attrs[k]; } catch (e) { n.setAttribute(k, attrs[k]); } }
      else n.setAttribute(k, attrs[k]);
    }
    if (html != null) n.innerHTML = html;
    return n;
  }

  function initials(name) {
    const parts = (name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '–';
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  function progressCount() {
    // Anzahl laufender (gekaufter, nicht abgeschlossener) Schulungen.
    try {
      const purchases = Store.get('purchases', []) || [];
      const n = purchases.filter(p => !p.completed).length;
      return n > 0 ? String(n) : null;
    } catch (e) { return null; }
  }

  function buildSidebar(cfg, profile) {
    const isAdmin = cfg.variant === 'admin';
    const aside = el('aside', { className: 'as-sidebar', role: 'navigation', 'aria-label': 'Hauptnavigation' });

    // Marke + Konto-Kontext (Kunde: Firmen-Konto · Admin: Inhaber-Bereich)
    const brand = el('div', { className: 'as-brand' });
    brand.appendChild(el('a', { className: 'as-brand__logo', href: isAdmin ? 'admin.html' : 'dashboard.html', style: 'text-decoration:none' },
      '<span class="as-brand__mark">HT</span><span class="as-brand__name">HerwardTimm</span>'));
    const acctTitle = isAdmin ? 'HerwardTimm e.K.' : ((profile && profile.firma) || 'Mein Konto');
    const acctRole  = isAdmin
      ? 'Admin · Inhaber'
      : ((window.getRole && window.getRole() === 'mitarbeiter') ? 'Mitarbeiter:in' : 'Firmen-Verwalter');
    brand.appendChild(el('div', { className: 'as-account' },
      `<div><div class="as-account__firma">${esc(acctTitle)}</div><div class="as-account__role">${esc(acctRole)}</div></div>` +
      `<span class="as-account__caret">▾</span>`));
    aside.appendChild(brand);

    // Navigation
    const nav = el('nav', { className: 'as-nav' });
    navFor(cfg).forEach(group => {
      if (group.head) nav.appendChild(el('div', { className: 'as-nav__head' }, esc(group.head)));
      group.items.forEach(item => {
        const a = el('a', { className: 'as-nav__link', href: item.href });
        if (item.key === cfg.active) a.classList.add('is-active');
        let badgeHtml = '';
        if (item.badge) {
          let c = null;
          if (item.badge === 'progressCount') c = progressCount();
          else if (window.AS_BADGES && window.AS_BADGES[item.badge] != null) c = String(window.AS_BADGES[item.badge]);
          if (c) badgeHtml = `<span class="as-nav__badge">${c}</span>`;
        }
        a.innerHTML = `<span class="as-ic">${item.ic}</span>${esc(item.label)}${badgeHtml}`;
        nav.appendChild(a);
      });
    });
    aside.appendChild(nav);

    // Nutzer-Karte unten
    const name = profile ? `${profile.vorname || ''} ${profile.nachname || ''}`.trim() : 'Gast';
    const role = (profile && profile.position) || '—';
    const foot = el('div', { className: 'as-side-foot' });
    foot.appendChild(el('div', { className: 'as-user' },
      `<div class="as-user__avatar">${esc(initials(name))}</div>` +
      `<div style="min-width:0"><div class="as-user__name">${esc(name)}</div><div class="as-user__role">${esc(role)}</div></div>` +
      `<a class="as-user__gear" href="${isAdmin ? '../dashboard.html#profil' : 'dashboard.html#profil'}" title="Profil & Einstellungen" aria-label="Profil & Einstellungen">⚙</a>`));
    aside.appendChild(foot);

    return aside;
  }

  function buildTopbar(cfg) {
    const bar = el('header', { className: 'as-topbar' });

    const burger = el('button', { className: 'as-burger', type: 'button', 'aria-label': 'Menü öffnen' },
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>');
    burger.addEventListener('click', () => document.body.classList.toggle('as-drawer-open'));
    bar.appendChild(burger);

    const titles = el('div', { className: 'as-topbar__titles' });
    titles.appendChild(el('div', { className: 'as-topbar__crumb' }, esc(cfg.crumb || '')));
    titles.appendChild(el('div', { className: 'as-topbar__title' }, esc(cfg.title || document.title)));
    bar.appendChild(titles);

    bar.appendChild(el('div', { className: 'as-spacer' }));

    // Suche + „Schulung kaufen" gehören in den KUNDENbereich, nicht in den Admin.
    if (cfg.variant !== 'admin') {
      // Suche → leitet in den Katalog mit ?q=
      const search = el('div', { className: 'as-search' });
      search.appendChild(el('span', { className: 'as-search__ic' }, '⌕'));
      const input = el('input', { type: 'search', placeholder: 'Schulung suchen…', 'aria-label': 'Schulung suchen' });
      input.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const q = input.value.trim();
          location.href = 'schulungen.html' + (q ? ('?q=' + encodeURIComponent(q)) : '');
        }
      });
      search.appendChild(input);
      bar.appendChild(search);

      // „+ Schulung kaufen"
      bar.appendChild(el('a', { className: 'as-buy', href: 'schulungen.html' },
        '<span>＋</span><span class="as-buy__txt">Schulung kaufen</span>'));
    }

    return bar;
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function doMount(cfg) {
    if (document.body.classList.contains('as-active')) return; // nur einmal
    const profile = (window.getProfile && window.getProfile()) || null;

    const shell = el('div', { className: 'as-shell' });
    const main  = el('main', { className: 'as-main' });
    const content = el('div', { className: 'as-content' });

    shell.appendChild(buildSidebar(cfg, profile));
    main.appendChild(buildTopbar(cfg));
    main.appendChild(content);
    shell.appendChild(main);

    // Bestehenden Seiteninhalt in den Arbeitsbereich umhängen.
    // Header, Footer und Scripts bleiben unangetastet (Header/Footer
    // werden per CSS ausgeblendet, Scripts laufen weiter).
    const skip = new Set(['SCRIPT', 'TEMPLATE', 'LINK', 'STYLE', 'NOSCRIPT']);
    const nodes = Array.from(document.body.childNodes);
    nodes.forEach(node => {
      if (node.nodeType === 1) {
        const tag = node.tagName;
        if (skip.has(tag)) return;
        if (node.classList && (node.classList.contains('site-header') || node.classList.contains('site-footer'))) return;
        content.appendChild(node);
      } else if (node.nodeType === 3) {
        // reine Whitespace-Textknoten ignorieren
        if (node.textContent.trim()) content.appendChild(node);
      }
    });

    // Demo-Banner (von app.js an body.firstChild gesetzt) nach oben im Content halten
    const banner = document.getElementById('demo-mode-banner');
    if (banner) content.insertBefore(banner, content.firstChild);

    // Scrim fürs mobile Drawer-Menü
    const scrim = el('div', { className: 'as-scrim' });
    scrim.addEventListener('click', () => document.body.classList.remove('as-drawer-open'));

    document.body.appendChild(shell);
    document.body.appendChild(scrim);
    document.body.classList.add('as-active');

    // Sidebar-Logout (falls die Seite einen Logout-Link hatte) weiter ermöglichen:
    // der bestehende #logout-link bleibt im (versteckten) Header — wir spiegeln
    // die Funktion auf das Zahnrad-Menü nicht, Profil-Link reicht für die Demo.
  }

  // Öffentliche API — sicher zu jedem Zeitpunkt aufrufbar.
  window.mountAppShell = function (cfg) {
    cfg = cfg || {};
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => doMount(cfg));
    } else {
      doMount(cfg);
    }
  };
})();
