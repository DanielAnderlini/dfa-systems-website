(function () {
  const LANG_KEY = 'dfaLanguage';
  const DEFAULT_LANG = 'en';

  const getSavedLanguage = () => {
    const stored = localStorage.getItem(LANG_KEY);
    return stored && window.TRANSLATIONS && window.TRANSLATIONS[stored] ? stored : DEFAULT_LANG;
  };

  const getCurrentPage = () => document.body.dataset.page || 'index';

  const getValue = (lang, page, key) => {
    const langPack = window.TRANSLATIONS[lang] || {};
    const common = langPack.common || {};
    const pagePack = langPack[page] || {};

    if (Object.prototype.hasOwnProperty.call(pagePack, key)) {
      return pagePack[key];
    }

    if (Object.prototype.hasOwnProperty.call(common, key)) {
      return common[key];
    }

    return null;
  };

  const applyTranslations = (lang) => {
    const page = getCurrentPage();
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((node) => {
      const key = node.dataset.i18n;
      const value = getValue(lang, page, key);
      if (value !== null) {
        node.textContent = value;
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => {
      const key = node.dataset.i18nPlaceholder;
      const value = getValue(lang, page, key);
      if (value !== null) {
        node.setAttribute('placeholder', value);
      }
    });

    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });
  };

  const initLanguage = () => {
    const lang = getSavedLanguage();
    applyTranslations(lang);

    document.querySelectorAll('.lang-btn').forEach((button) => {
      button.addEventListener('click', () => {
        const selected = button.dataset.lang || DEFAULT_LANG;
        localStorage.setItem(LANG_KEY, selected);
        applyTranslations(selected);
      });
    });
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector('.menu-toggle');
    const navWrap = document.querySelector('.nav-wrap');

    if (!toggle || !navWrap) return;

    toggle.addEventListener('click', () => {
      const isOpen = navWrap.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navWrap.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navWrap.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  };

  const initActiveNav = () => {
    const page = getCurrentPage();
    const map = {
      index: 'home',
      services: 'services',
      portfolio: 'portfolio',
      about: 'about',
      contact: 'contact',
      login: 'login',
      private: 'private'
    };

    const target = map[page];
    if (!target) return;

    document.querySelectorAll('.site-nav a[data-nav]').forEach((link) => {
      link.classList.toggle('active', link.dataset.nav === target);
    });
  };

  const initPortfolioFilters = () => {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('.project-card[data-category]');

    if (!filterButtons.length || !cards.length) return;

    const runFilter = (filter) => {
      cards.forEach((card) => {
        const categories = (card.dataset.category || '').split(',').map((item) => item.trim());
        const show = filter === 'all' || categories.includes(filter);
        card.style.display = show ? '' : 'none';
      });
    };

    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        filterButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
        runFilter(button.dataset.filter);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    initLanguage();
    initMobileMenu();
    initActiveNav();
    initPortfolioFilters();
  });
})();
