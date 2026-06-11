/* ============================================================
   HerwardTimm Plattform-Demo · i18n-Engine
   Lädt Übersetzungen aus i18n-data.js, mountet Sprach-Picker,
   wendet [data-i18n]-Attribute an, persistiert Sprache in
   localStorage. Unterstützt 7 Sprachen inkl. Arabisch (RTL).
   ============================================================ */

(function () {
  'use strict';

  const LANGS = [
    { code: 'de', label: 'Deutsch',    flag: 'DE' },
    { code: 'en', label: 'English',    flag: 'EN' },
    { code: 'tr', label: 'Türkçe',     flag: 'TR' },
    { code: 'ru', label: 'Русский',    flag: 'RU' },
    { code: 'pl', label: 'Polski',     flag: 'PL' },
    { code: 'uk', label: 'Українська', flag: 'UA' },
    { code: 'ar', label: 'العربية',     flag: 'AR' }
  ];
  const RTL_LANGS = new Set(['ar']);
  const DEFAULT = 'de';
  const STORAGE_KEY = 'ht_lang';

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (_) { return null; }
  }
  function setStored(code) {
    try { localStorage.setItem(STORAGE_KEY, code); } catch (_) {}
  }

  let current = getStored() || DEFAULT;
  if (!LANGS.find(l => l.code === current)) current = DEFAULT;

  function data() {
    return (window.I18N_DATA && window.I18N_DATA.ui) ? window.I18N_DATA.ui : null;
  }

  function trainingData(slug) {
    if (!window.I18N_DATA) return null;
    return window.I18N_DATA[slug] || null;
  }

  function lookup(scope, key, lang) {
    const d = window.I18N_DATA && window.I18N_DATA[scope];
    if (!d) return null;
    const langTable = d[lang] || d[DEFAULT];
    if (!langTable) return null;
    return langTable[key] != null ? langTable[key] : (d[DEFAULT] ? d[DEFAULT][key] : null);
  }

  function t(key, vars) {
    let raw = lookup('ui', key, current);
    if (raw == null) return key; // Fallback: Schlüssel selbst
    if (vars) {
      Object.keys(vars).forEach(v => {
        raw = raw.replace(new RegExp('\\{' + v + '\\}', 'g'), vars[v]);
      });
    }
    return raw;
  }

  function tTraining(slug, key, vars) {
    let raw = lookup(slug, key, current);
    if (raw == null) return null;
    if (vars) {
      Object.keys(vars).forEach(v => {
        raw = raw.replace(new RegExp('\\{' + v + '\\}', 'g'), vars[v]);
      });
    }
    return raw;
  }

  function applyToDocument(root) {
    const scope = root || document;
    // Text-Inhalte
    scope.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const html = el.hasAttribute('data-i18n-html');
      const val = t(key);
      if (val != null) {
        if (html) el.innerHTML = val;
        else el.textContent = val;
      }
    });
    // Placeholder
    scope.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const val = t(key);
      if (val != null) el.setAttribute('placeholder', val);
    });
    // Title attribute
    scope.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const val = t(key);
      if (val != null) el.setAttribute('title', val);
    });
    // Aria-label
    scope.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const val = t(key);
      if (val != null) el.setAttribute('aria-label', val);
    });
    // Dokument-lang + Richtung setzen
    document.documentElement.setAttribute('lang', current);
    document.documentElement.setAttribute('dir', RTL_LANGS.has(current) ? 'rtl' : 'ltr');
  }

  function setLang(code) {
    if (!LANGS.find(l => l.code === code)) return;
    current = code;
    setStored(code);
    applyToDocument();
    // Picker-Anzeigen aktualisieren
    document.querySelectorAll('.lang-picker').forEach(refreshPicker);
    // Event für andere Module
    window.dispatchEvent(new CustomEvent('i18n:change', { detail: { lang: code } }));
  }

  function getLang() { return current; }

  function buildPicker(container) {
    container.classList.add('lang-picker');
    container.innerHTML = `
      <button class="lang-picker__toggle" type="button" aria-haspopup="true" aria-expanded="false">
        <svg class="lang-picker__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <circle cx="12" cy="12" r="9"/>
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>
        </svg>
        <span class="lang-picker__current"></span>
        <svg class="lang-picker__chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
      </button>
      <ul class="lang-picker__menu" role="menu">
        ${LANGS.map(l => `
          <li role="menuitem" data-code="${l.code}" class="lang-picker__item">
            <span class="lang-picker__flag">${l.flag}</span>
            <span class="lang-picker__label">${l.label}</span>
          </li>
        `).join('')}
      </ul>
    `;
    const toggle = container.querySelector('.lang-picker__toggle');
    const menu = container.querySelector('.lang-picker__menu');
    toggle.addEventListener('click', e => {
      e.stopPropagation();
      const open = container.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    container.querySelectorAll('.lang-picker__item').forEach(li => {
      li.addEventListener('click', e => {
        e.stopPropagation();
        const code = li.getAttribute('data-code');
        setLang(code);
        container.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('click', () => {
      container.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
    refreshPicker(container);
  }

  function refreshPicker(container) {
    const lang = LANGS.find(l => l.code === current) || LANGS[0];
    const cur = container.querySelector('.lang-picker__current');
    if (cur) cur.textContent = lang.flag;
    container.querySelectorAll('.lang-picker__item').forEach(li => {
      li.classList.toggle('active', li.getAttribute('data-code') === current);
    });
  }

  function mountPickers() {
    document.querySelectorAll('[data-lang-picker]').forEach(el => {
      if (!el.dataset.langMounted) {
        buildPicker(el);
        el.dataset.langMounted = '1';
      }
    });
  }

  function init() {
    mountPickers();
    applyToDocument();
  }

  // Öffentliche API
  window.i18n = {
    t: t,
    tTraining: tTraining,
    setLang: setLang,
    getLang: getLang,
    apply: applyToDocument,
    mountPickers: mountPickers,
    LANGS: LANGS,
    RTL_LANGS: RTL_LANGS
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
