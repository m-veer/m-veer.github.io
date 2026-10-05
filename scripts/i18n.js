// Color, language, and code flavor switching for the theme slider.
//
// Position 0 is the default black page in English. Positions 1-10 follow
// window.PORTFOLIO_LOCALES (scripts/locales.js): each applies that country's
// colors, translates every [data-i18n] / [data-i18n-html] element using
// scripts/i18n/<code>.js, and restyles the page with its paired programming
// language. English text lives only in index.html; it is captured on load and
// restored when a translation is switched off.
(function () {
  var LOCALES = window.PORTFOLIO_LOCALES;
  var STORAGE_KEY = 'portfolio-theme';
  var PALETTE = { '100': 1, '50': 0.6, '33': 0.45, '25': 0.4, '20': 0.27, '15': 0.22, '10': 0.17, '5': 0.12, '0': 0 };
  var originals = new Map();
  var currentIndex = 0;

  function captureEnglish() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      originals.set(el, { key: el.dataset.i18n, html: false, value: el.textContent });
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      originals.set(el, { key: el.dataset.i18nHtml, html: true, value: el.innerHTML });
    });
  }

  function applyStrings(strings) {
    originals.forEach(function (original, el) {
      var value = strings && strings[original.key] != null ? strings[original.key] : original.value;
      if (original.html) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });
  }

  // Locale files are plain scripts rather than JSON so they also load when
  // the page is opened straight from disk
  function loadStrings(code, done) {
    window.PORTFOLIO_I18N = window.PORTFOLIO_I18N || {};
    if (code === 'en' || window.PORTFOLIO_I18N[code]) {
      done(window.PORTFOLIO_I18N[code] || null);
      return;
    }
    var script = document.createElement('script');
    script.src = 'scripts/i18n/' + code + '.js?v=2';
    script.onload = function () { done(window.PORTFOLIO_I18N[code] || null); };
    script.onerror = function () { done(null); };
    document.head.appendChild(script);
  }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255].join(' ');
  }

  function applyColors(locale) {
    var style = document.body.style;
    Object.keys(PALETTE).forEach(function (step) {
      var name = '--color--foreground--' + step;
      if (locale) {
        style.setProperty(name, 'rgb(' + locale.foreground + ' / ' + PALETTE[step] + ')');
      } else {
        style.removeProperty(name);
      }
    });
    if (locale) {
      var background = hexToRgb(locale.colors[0]);
      style.setProperty('--color--background--100', 'rgb(' + background + ' / 1)');
      style.setProperty('--color--background--0', 'rgb(' + background + ' / 0)');
    } else {
      style.removeProperty('--color--background--100');
      style.removeProperty('--color--background--0');
    }
  }

  // CSS reads these as strings for ::before / ::after content. Each is wrapped
  // in left-to-right isolate marks (U+2066 ... U+2069) so code punctuation
  // keeps its order and shape inside right-to-left Arabic text.
  function applyCodeFlavor(locale) {
    var style = document.body.style;
    var values = locale ? {
      '--code-comment-open': locale.comment[0],
      '--code-comment-close': locale.comment[1],
      '--code-print-open': locale.print[0],
      '--code-print-close': locale.print[1]
    } : null;
    ['--code-comment-open', '--code-comment-close', '--code-print-open', '--code-print-close'].forEach(function (name) {
      if (values) {
        style.setProperty(name, JSON.stringify(values[name] ? '⁦' + values[name] + '⁩' : ''));
      } else {
        style.removeProperty(name);
      }
    });
    document.body.classList.toggle('has--code-flavor', !!locale);
    var currentFlag = document.querySelector('.app-aside .theme-current-flag');
    if (currentFlag) {
      currentFlag.className = 'theme-current-flag flag-icon' + (locale ? ' flag-icon-' + locale.countryCode : '');
    }
  }

  function setTheme(index, options) {
    index = Math.max(0, Math.min(LOCALES.length, parseInt(index, 10) || 0));
    currentIndex = index;
    var locale = index ? LOCALES[index - 1] : null;

    appThemeRemoveAll();
    document.body.classList.add('theme--' + (index < 10 ? '0' : '') + index);
    $('.app-aside .slider').val(index);
    applyColors(locale);
    applyCodeFlavor(locale);

    document.documentElement.lang = locale ? locale.lang : 'en';
    document.documentElement.dir = locale ? locale.dir : 'ltr';
    loadStrings(locale ? locale.code : 'en', function (strings) {
      if (currentIndex === index) {
        applyStrings(strings);
      }
    });

    if (!options || options.save !== false) {
      try {
        localStorage.setItem(STORAGE_KEY, String(index));
      } catch (error) {
        // Storage can be unavailable (private windows); the choice just isn't remembered
      }
    }
  }

  // Show the flag of the slider position under the pointer
  function setupFlagPreview() {
    var option = document.querySelector('.app-aside .option.theme');
    var container = option && option.querySelector('.slider-container');
    if (!container) {
      return;
    }
    var preview = document.createElement('div');
    preview.className = 'theme-flag-preview';
    preview.setAttribute('aria-hidden', 'true');
    option.appendChild(preview);

    function show(position) {
      var locale = position ? LOCALES[position - 1] : null;
      preview.innerHTML = locale
        ? '<span class="flag-icon flag-icon-' + locale.countryCode + '"></span>'
        : '<span class="theme-flag-black"></span>';
      preview.style.bottom = (position * 20 + 12) + 'px';
      preview.classList.add('is--visible');
    }
    function hide() {
      preview.classList.remove('is--visible');
    }

    // The slider is rotated -90deg, so position 0 sits at the bottom and each
    // step is 20px further up
    function positionAt(event) {
      var rect = container.getBoundingClientRect();
      var position = Math.round((rect.bottom - event.clientY - 24) / 20);
      return Math.max(0, Math.min(LOCALES.length, position));
    }
    container.addEventListener('mousemove', function (event) {
      show(positionAt(event));
    });
    container.addEventListener('mouseleave', hide);

    // The range thumb is 48px tall but positions are 20px apart, so a click on
    // a neighbouring position lands on the thumb and the browser ignores it.
    // Clicks therefore pick the position under the pointer directly; dragging
    // still works through the slider's own input events.
    container.addEventListener('click', function (event) {
      var position = positionAt(event);
      if (position !== currentIndex) {
        setTheme(position);
        show(position);
      }
    });
    $('.app-aside .slider').on('input', function () { show(parseInt(this.value, 10)); });
    $('.app-aside .slider').on('change', function () { window.setTimeout(hide, 900); });
  }

  window.portfolioSetTheme = setTheme;
  window.portfolioThemeIndex = function () { return currentIndex; };

  $(document).ready(function () {
    captureEnglish();
    setupFlagPreview();
    var saved = 0;
    try {
      saved = parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
    } catch (error) {
      saved = 0;
    }
    setTheme(saved, { save: false });
  });
})();
