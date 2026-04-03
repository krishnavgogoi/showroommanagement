/* ============================================================
   M MOTORS — MOBILE JS PATCH  v2
   Include AFTER indx.js in your HTML
   ============================================================ */

(function () {
  'use strict';

  const isMobile = () => window.innerWidth <= 768;

  // =========================================================
  // LOGIN — convert sidebar to bottom sheet on mobile
  // =========================================================
  function patchLoginBottomSheet() {
    if (!isMobile()) return;

    const menuBtn   = document.querySelector('#topheader .right span');
    const closeBtn  = document.querySelector('#login .top span');
    const loginPg   = document.querySelector('#login');
    if (!menuBtn || !loginPg) return;

    // Open: slide up from bottom
    menuBtn.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      loginPg.classList.add('mobile-open');
      document.body.style.overflow = 'hidden';
    }, true);

    // Close X button
    closeBtn && closeBtn.addEventListener('click', function (e) {
      e.stopImmediatePropagation();
      loginPg.classList.remove('mobile-open');
      document.body.style.overflow = '';
    }, true);

    // Swipe down to close
    let startY = 0;
    loginPg.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    loginPg.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientY - startY > 70) {
        loginPg.classList.remove('mobile-open');
        document.body.style.overflow = '';
      }
    }, { passive: true });
  }

  // =========================================================
  // CONFIG PAGE — scroll to top on open + prevent bg scroll
  // =========================================================
  function patchConfigPage() {
    if (!isMobile()) return;
    const configpg = document.querySelector('#configpg');
    if (!configpg) return;

    new MutationObserver(() => {
      if (configpg.classList.contains('active')) {
        configpg.scrollTop = 0;
        document.getElementById('scroll-container').style.overflow = 'hidden';
      } else {
        document.getElementById('scroll-container').style.overflow = '';
      }
    }).observe(configpg, { attributes: true, attributeFilter: ['class'] });
  }

  // =========================================================
  // TAX PAGE — scroll to top on open
  // =========================================================
  function patchTaxPage() {
    if (!isMobile()) return;
    const taxpage = document.querySelector('#taxdetails');
    if (!taxpage) return;

    new MutationObserver(() => {
      if (taxpage.classList.contains('active')) {
        setTimeout(() => { taxpage.scrollTop = 0; }, 30);
      }
    }).observe(taxpage, { attributes: true, attributeFilter: ['class'] });
  }

  // =========================================================
  // BODY SCROLL LOCK — when any overlay is open
  // =========================================================
  function patchOverlayScroll() {
    if (!isMobile()) return;

    const overlayIds = [
      'booktestdrive', 'configpg', 'taxdetails',
      'customerLoginPage', 'admincheckerpg', 'admincontrol'
    ];

    function checkOverlays() {
      const anyOpen = overlayIds.some(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const st = window.getComputedStyle(el);
        return (
          el.classList.contains('active') ||
          (st.display !== 'none' && st.transform !== 'scale(0)' && el.id === 'configpg'
            ? el.classList.contains('active')
            : el.classList.contains('active'))
        );
      });
      document.body.style.overflow = anyOpen ? 'hidden' : '';
    }

    overlayIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      new MutationObserver(checkOverlays)
        .observe(el, { attributes: true, attributeFilter: ['class', 'style'] });
    });
  }

  // =========================================================
  // SCROLL CONTAINER — prevent overscroll
  // =========================================================
  function patchScrollContainer() {
    if (!isMobile()) return;
    const sc = document.getElementById('scroll-container');
    if (!sc) return;
    sc.style.scrollSnapType     = 'y mandatory';
    sc.style.overscrollBehaviorY = 'contain';
  }

  // =========================================================
  // SWIPE DOWN TO CLOSE — bottom-sheet overlays
  // =========================================================
  function addSwipeToClose(elementId, closeFn) {
    if (!isMobile()) return;
    const el = document.getElementById(elementId);
    if (!el) return;

    let startY = 0;
    el.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
    }, { passive: true });

    el.addEventListener('touchend', e => {
      if (e.changedTouches[0].clientY - startY > 80) closeFn();
    }, { passive: true });
  }

  // =========================================================
  // VIEWPORT HEIGHT FIX — 100dvh fallback for older iOS
  // =========================================================
  function setVhFallback() {
    const set = () => {
      document.documentElement.style.setProperty(
        '--dvh', (window.innerHeight * 0.01) + 'px'
      );
    };
    set();
    window.addEventListener('resize', set, { passive: true });
  }

  // =========================================================
  // INIT
  // =========================================================
  function init() {
    if (!isMobile()) return;

    setVhFallback();
    patchLoginBottomSheet();
    patchConfigPage();
    patchTaxPage();
    patchOverlayScroll();
    patchScrollContainer();

    addSwipeToClose('booktestdrive', () => {
      if (typeof tdClosePage === 'function') tdClosePage();
    });

    addSwipeToClose('customerLoginPage', () => {
      document.getElementById('customerLoginPage').classList.remove('active');
      document.body.style.overflow = '';
    });

    addSwipeToClose('taxdetails', () => {
      document.getElementById('taxdetails').classList.remove('active');
    });

    addSwipeToClose('admincontrol', () => {
      document.getElementById('admincontrol').classList.remove('active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
