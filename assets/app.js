/* =========================================
   Wohngebäude-SparCheck - Funnel Script
   - reliable open/close modal
   - steps + validation
   - mobile nav + dropdown
   ========================================= */

(function () {
  "use strict";

  // ---------- helpers ----------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function show(el) {
    if (!el) return;
    el.hidden = false;
  }
  function hide(el) {
    if (!el) return;
    el.hidden = true;
  }
  function setText(el, txt) {
    if (!el) return;
    el.textContent = txt;
  }

  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || "").trim());
  }
  function isPhone(v) {
    // simple German-ish check
    const s = String(v || "").replace(/\s+/g, "");
    return /^(\+?\d{6,15})$/.test(s);
  }
  function isPLZ(v) {
    return /^\d{5}$/.test(String(v || "").trim());
  }

  function lockScroll(lock) {
    document.body.style.overflow = lock ? "hidden" : "";
  }

  // ---------- header dropdown ----------
  function initDropdown() {
    const btn = $("#navDropBtn");
    const menu = $("#navDrop");
    if (!btn || !menu) return;

    function close() { menu.style.display = "none"; btn.setAttribute("aria-expanded", "false"); }
    function open() { menu.style.display = "block"; btn.setAttribute("aria-expanded", "true"); }

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const openNow = btn.getAttribute("aria-expanded") === "true";
      openNow ? close() : open();
    });

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && e.target !== btn) close();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  // ---------- mobile menu ----------
  function initMobileMenu() {
    const burger = $("#burger");
    const mobile = $("#mobileNav");
    if (!burger || !mobile) return;

    burger.addEventListener("click", () => {
      const expanded = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!expanded));
      mobile.hidden = expanded;
    });

    // close mobile menu when clicking a link
    $$(".mobile__link", mobile).forEach((a) => {
      a.addEventListener("click", () => {
        burger.setAttribute("aria-expanded", "false");
        mobile.hidden = true;
      });
    });
  }

  // ---------- modal / funnel ----------
  function initFunnel() {
    const modal = $("#sparcheckModal");
    if (!modal) return;

    const backdrop = $("#modalBackdrop");
    const closeBtn = $("#modalClose");

    const openTop = $("#openSparCheckTop");
    const openHeroNew = $("#openSparCheckNew");
    const openHeroCheck = $("#openSparCheckCheck");
    const openBottom = $("#openSparCheckBottom");

    const progressBar = $("#progressBar");

    const steps = $$(".step", modal);
    let stepIndex = 0;

    // form + fields
    const form = $("#sparcheckForm");

    const modeRadios = $$('input[name="mode"]', modal);

    const buildingType = $("#buildingType");
    const plz = $("#plz");
    const yearBuilt = $("#yearBuilt");
    const area = $("#area");

    const currentInsurer = $("#currentInsurer");
    const currentAnnual = $("#currentAnnual");
    const increase = $("#increase");

    const firstName = $("#firstName");
    const lastName = $("#lastName");
    const email = $("#email");
    const phone = $("#phone");
    const gdpr = $("#gdpr");

    const errBuildingType = $("#errBuildingType");
    const errPLZ = $("#errPLZ");
    const errYearBuilt = $("#errYearBuilt");
    const errArea = $("#errArea");
    const errAnnual = $("#errAnnual");

    const errName = $("#errName");
    const errEmail = $("#errEmail");
    const errPhone = $("#errPhone");
    const errGDPR = $("#errGDPR");

    // summary elements
    const summaryMode = $("#summaryMode");
    const summaryType = $("#summaryType");
    const summaryPLZ = $("#summaryPLZ");
    const summaryYear = $("#summaryYear");
    const summaryArea = $("#summaryArea");
    const summaryAnnual = $("#summaryAnnual");

    // Buttons step nav
    const next1 = $("#next1");
    const next2 = $("#next2");
    const next3 = $("#next3");
    const next4 = $("#next4");
    const back2 = $("#back2");
    const back3 = $("#back3");
    const back4 = $("#back4");
    const back5 = $("#back5");

    const doneClose = $("#doneClose");

    // mode handling: "new" vs "check"
    function getMode() {
      const checked = modeRadios.find(r => r.checked);
      return checked ? checked.value : "check";
    }

    function updateProgress() {
      const pct = Math.round(((stepIndex + 1) / steps.length) * 100);
      if (progressBar) progressBar.style.width = `${pct}%`;
    }

    function showStep(i) {
      stepIndex = Math.max(0, Math.min(i, steps.length - 1));
      steps.forEach((s, idx) => {
        s.hidden = idx !== stepIndex;
      });
      updateProgress();

      // For step 3 (current policy) we hide if mode=new
      if (stepIndex === 2) {
        const mode = getMode();
        if (mode === "new") {
          // skip current policy step
          showStep(3);
          return;
        }
      }

      // populate summary on step 5
      if (stepIndex === 4) fillSummary();
    }

    function openModal(prefMode) {
      if (prefMode) {
        modeRadios.forEach(r => (r.checked = (r.value === prefMode)));
      }
      show(modal);
      lockScroll(true);
      showStep(0);
      clearErrors();
      // focus first actionable input
      setTimeout(() => {
        const first = $('input[name="mode"]:checked', modal);
        if (first) first.focus();
      }, 50);
    }

    function closeModal() {
      hide(modal);
      lockScroll(false);
    }

    // close events
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !modal.hidden) closeModal();
    });

    // open events (all are buttons type=button, so no scroll-to-top)
    if (openTop) openTop.addEventListener("click", () => openModal("check"));
    if (openBottom) openBottom.addEventListener("click", () => openModal("check"));
    if (openHeroNew) openHeroNew.addEventListener("click", () => openModal("new"));
    if (openHeroCheck) openHeroCheck.addEventListener("click", () => openModal("check"));

    // also allow open via any [data-open-sparcheck]
    $$("[data-open-sparcheck]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const m = el.getAttribute("data-open-sparcheck");
        openModal(m || "check");
      });
    });

    // navigation buttons
    function clearErrors() {
      [errBuildingType, errPLZ, errYearBuilt, errArea, errAnnual, errName, errEmail, errPhone, errGDPR].forEach(el => setText(el, ""));
    }

    function vStep2() {
      let ok = true;
      setText(errBuildingType, "");
      setText(errPLZ, "");
      setText(errYearBuilt, "");
      setText(errArea, "");

      if (!buildingType || !buildingType.value) {
        setText(errBuildingType, "Bitte Gebäudetyp auswählen.");
        ok = false;
      }
      if (!isPLZ(plz?.value)) {
        setText(errPLZ, "Bitte gültige PLZ (5-stellig) eingeben.");
        ok = false;
      }
      const y = parseInt(yearBuilt?.value, 10);
      if (!y || y < 1800 || y > new Date().getFullYear()) {
        setText(errYearBuilt, "Bitte Baujahr (z. B. 1998) eingeben.");
        ok = false;
      }
      const a = parseFloat(String(area?.value || "").replace(",", "."));
      if (!a || a < 10 || a > 2000) {
        setText(errArea, "Bitte Wohnfläche in m² (z. B. 120) eingeben.");
        ok = false;
      }
      return ok;
    }

    function vStep3() {
      // Only if mode=check; otherwise skipped
      const mode = getMode();
      if (mode === "new") return true;

      setText(errAnnual, "");
      const v = parseFloat(String(currentAnnual?.value || "").replace(",", "."));
      if (!v || v < 50 || v > 20000) {
        setText(errAnnual, "Bitte aktuellen Jahresbeitrag in € angeben (z. B. 800).");
        return false;
      }
      return true;
    }

    function vStep4() {
      let ok = true;
      setText(errName, "");
      setText(errEmail, "");
      setText(errPhone, "");

      if (!String(firstName?.value || "").trim() || !String(lastName?.value || "").trim()) {
        setText(errName, "Bitte Vor- und Nachname eingeben.");
        ok = false;
      }
      if (!isEmail(email?.value)) {
        setText(errEmail, "Bitte gültige E-Mail eingeben.");
        ok = false;
      }
      if (!isPhone(phone?.value)) {
        setText(errPhone, "Bitte gültige Telefonnummer eingeben.");
        ok = false;
      }
      return ok;
    }

    function vStep5() {
      setText(errGDPR, "");
      if (!gdpr?.checked) {
        setText(errGDPR, "Bitte Datenschutz bestätigen.");
        return false;
      }
      return true;
    }

    function fillSummary() {
      const mode = getMode();
      setText(summaryMode, mode === "new" ? "Neu abschließen" : "Beitrag prüfen");
      setText(summaryType, buildingType?.value || "—");
      setText(summaryPLZ, plz?.value || "—");
      setText(summaryYear, yearBuilt?.value || "—");
      setText(summaryArea, (area?.value || "—") + " m²");

      if (mode === "new") {
        setText(summaryAnnual, "— (Neuabschluss)");
      } else {
        setText(summaryAnnual, (currentAnnual?.value || "—") + " € / Jahr");
      }
    }

    // Step buttons
    if (next1) next1.addEventListener("click", () => showStep(1));

    if (back2) back2.addEventListener("click", () => showStep(0));
    if (next2) next2.addEventListener("click", () => {
      clearErrors();
      if (!vStep2()) return;
      showStep(2);
    });

    if (back3) back3.addEventListener("click", () => showStep(1));
    if (next3) next3.addEventListener("click", () => {
      clearErrors();
      if (!vStep3()) return;
      showStep(3);
    });

    if (back4) back4.addEventListener("click", () => {
      // if mode=new, step 3 is skipped, so go back to step 2
      const mode = getMode();
      showStep(mode === "new" ? 1 : 2);
    });
    if (next4) next4.addEventListener("click", () => {
      clearErrors();
      if (!vStep4()) return;
      showStep(4);
    });

    if (back5) back5.addEventListener("click", () => showStep(3));

    // Submit: Preview mode -> show thanks (no request)
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        clearErrors();
        if (!vStep5()) return;

        // Here you can later switch to "real send" (Formspree)
        // For now: Preview-only thanks screen
        showStep(5);
      });
    }

    if (doneClose) doneClose.addEventListener("click", closeModal);

    // If user changes mode on step 1, keep flow consistent
    modeRadios.forEach(r => {
      r.addEventListener("change", () => {
        // if user is in current policy step and chooses "new", we auto-skip
        if (stepIndex === 2 && getMode() === "new") showStep(3);
      });
    });
  }

  // ---------- boot ----------
  document.addEventListener("DOMContentLoaded", () => {
    initDropdown();
    initMobileMenu();
    initFunnel();
  });

})();
