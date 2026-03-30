/* ============================================================
   M MOTORS — MOBILE JS PATCH
   Add this as mobile.js and include it AFTER indx.js in your HTML
   ============================================================ */

   (function () {
    'use strict';
  
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
  
    // =========================================================
    // FIX: Login sidebar — mobile uses full open position
    // =========================================================
    function patchLoginSidebar() {
      if (!isMobile()) return;
  
      const topheadermenu = document.querySelector('#topheader .right span');
      const loginremover  = document.querySelector('#login .top span');
      const loginpg       = document.querySelector('#login');
  
      if (!topheadermenu || !loginpg) return;
  
      // Override existing click — open at 15% from left (85% wide panel)
      topheadermenu.addEventListener('click', function () {
        loginpg.style.marginLeft = '15%';
      }, true); // capture phase so it runs alongside existing listener
  
      loginremover && loginremover.addEventListener('click', function () {
        loginpg.style.marginLeft = '100%';
      }, true);
    }
  
    // =========================================================
    // FIX: Config page — scroll to top when opened on mobile
    // =========================================================
    function patchConfigPage() {
      if (!isMobile()) return;
  
      const configpg = document.querySelector('#configpg');
      if (!configpg) return;
  
      const observer = new MutationObserver(() => {
        if (configpg.classList.contains('active')) {
          setTimeout(() => { configpg.scrollTop = 0; }, 50);
        }
      });
  
      observer.observe(configpg, { attributes: true, attributeFilter: ['class'] });
    }
  
    // =========================================================
    // FIX: Tax page — scroll to top when opened on mobile
    // =========================================================
    function patchTaxPage() {
      if (!isMobile()) return;
  
      const taxpage = document.querySelector('#taxdetails');
      if (!taxpage) return;
  
      const observer = new MutationObserver(() => {
        if (taxpage.classList.contains('active')) {
          setTimeout(() => { taxpage.scrollTop = 0; }, 50);
        }
      });
  
      observer.observe(taxpage, { attributes: true, attributeFilter: ['class'] });
    }
  
    // =========================================================
    // FIX: Prevent body scroll when overlays are open
    //      (booktestdrive, configpg, taxdetails, customer, admin)
    // =========================================================
    function patchOverlayScroll() {
      if (!isMobile()) return;
  
      const overlayIds = ['booktestdrive', 'configpg', 'taxdetails',
                          'customerLoginPage', 'admincheckerpg', 'admincontrol'];
  
      overlayIds.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
  
        const observer = new MutationObserver(() => {
          const anyActive = overlayIds.some(oid => {
            const o = document.getElementById(oid);
            return o && (o.classList.contains('active') ||
                         (o.style.display && o.style.display !== 'none'));
          });
          document.body.style.overflow = anyActive ? 'hidden' : '';
        });
  
        observer.observe(el, { attributes: true, attributeFilter: ['class', 'style'] });
      });
    }
  
    // =========================================================
    // FIX: Touch swipe to close bottom-sheet overlays
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
        const dy = e.changedTouches[0].clientY - startY;
        if (dy > 80) closeFn(); // swipe down 80px = close
      }, { passive: true });
    }
  
    // =========================================================
    // FIX: Smooth scroll-snap on mobile — prevent overscroll
    // =========================================================
    function patchScrollContainer() {
      if (!isMobile()) return;
      const sc = document.getElementById('scroll-container');
      if (!sc) return;
      sc.style.scrollSnapType = 'y mandatory';
      sc.style.overscrollBehaviorY = 'contain';
    }
  
    // =========================================================
    // INIT — wait for DOM
    // =========================================================
    function init() {
      patchLoginSidebar();
      patchConfigPage();
      patchTaxPage();
      patchOverlayScroll();
      patchScrollContainer();
  
      // Bottom-sheet swipe-to-close
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
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  
  })();