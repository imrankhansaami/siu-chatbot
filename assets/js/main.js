/* ==========================================================================
   SIU — site interactions
   Sticky header, mega menus, mobile drawer, hero slider, counters,
   tabs, marquee, accordions, scroll reveal, smooth scroll helpers.
   ========================================================================== */

(function () {
  "use strict";

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------- sticky header */
  const header = $("[data-header]");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-stuck", window.scrollY > 24);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
  }

  /* --------------------------------------------------------- mega menus */
  const navItems = $$("[data-nav-item]");
  const closeAll = (except) => {
    navItems.forEach((n) => {
      if (n === except) return;
      n.classList.remove("is-open");
      n.querySelector("[data-nav-trigger]")?.setAttribute("aria-expanded", "false");
    });
  };

  navItems.forEach((item) => {
    const trigger = $("[data-nav-trigger]", item);
    if (!trigger) return;

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const willOpen = !item.classList.contains("is-open");
      closeAll(item);
      item.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest("[data-nav-item]")) closeAll(null);
    if (!e.target.closest("[data-search-shell]")) $("[data-search-shell]")?.classList.add("hidden");
    if (!e.target.closest("[data-find-shell]")) $("[data-find-shell]")?.classList.add("hidden");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAll(null);
  });

  /* -------------------------------------------------------- mobile menu */
  const drawer = $("[data-drawer]");
  const drawerBtn = $("[data-drawer-toggle]");
  const drawerClose = $("[data-drawer-close]");

  function setDrawer(open) {
    if (!drawer) return;
    drawer.classList.toggle("translate-x-full", !open);
    drawer.classList.toggle("translate-x-0", open);
    document.body.classList.toggle("overflow-hidden", open);
    drawerBtn?.setAttribute("aria-expanded", String(open));
    const first = s0Open(drawer, open);
    if (first) setTimeout(() => first.focus({ preventScroll: true }), 250);
    if (!open) resetDrawerSections();
  }
  function s0Open(root, open) {
    if (!open) return null;
    return root.querySelector("a,button,[tabindex]:not([tabindex='-1'])");
  }
  function resetDrawerSections() {
    /* Collapse the sub-panels, never the sections themselves. */
    $$("[data-drawer-sec]").forEach((s) => {
      const b = $("[data-drawer-trigger]", s);
      if (!b) return;
      b.setAttribute("aria-expanded", "false");
      b.nextElementSibling?.classList.add("hidden");
    });
  }
  drawerBtn?.addEventListener("click", () => setDrawer(!drawer?.classList.contains("translate-x-0")));
  drawerClose?.addEventListener("click", () => setDrawer(false));
  drawer?.addEventListener("click", (e) => {
    if (e.target === drawer) setDrawer(false);
    const a = e.target.closest("a[href^='#']");
    if (a) setDrawer(false);
  });
  $$("[data-drawer-trigger]").forEach((b) => {
    b.addEventListener("click", () => {
      const panel = b.nextElementSibling;
      if (!panel) return;
      const open = panel.classList.toggle("hidden") === false;
      b.setAttribute("aria-expanded", String(open));
    });
  });

  /* ------------------------------------------------------ hero slider */
  $$("[data-slider]").forEach((root) => {
    const slides = $$(".slide", root);
    const dotsWrap = $("[data-slider-dots]", root);
    const prev = $("[data-slider-prev]", root);
    const next = $("[data-slider-next]", root);
    if (slides.length < 2) return;

    let i = 0;
    let timer = null;
    const DURATION = 6500;

    if (dotsWrap) {
      dotsWrap.innerHTML = "";
      slides.forEach((_, n) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "dot";
        b.setAttribute("aria-label", "Go to slide " + (n + 1));
        b.addEventListener("click", () => go(n, true));
        dotsWrap.appendChild(b);
      });
    }

    function go(n, manual) {
      i = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-active", k === i));
      $$(".dot", dotsWrap || document).forEach((d, k) => d.classList.toggle("is-active", k === i));
      if (manual) restart();
    }
    function restart() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => go(i + 1), DURATION);
    }

    prev?.addEventListener("click", () => go(i - 1, true));
    next?.addEventListener("click", () => go(i + 1, true));
    go(0);
    restart();

    root.addEventListener("mouseenter", () => clearInterval(timer));
    root.addEventListener("mouseleave", restart);

    /* swipe */
    let x0 = null;
    root.addEventListener("touchstart", (e) => (x0 = e.touches[0].clientX), { passive: true });
    root.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 45) go(i + (dx < 0 ? 1 : -1), true);
      x0 = null;
    });
  });

  /* ------------------------------------------------- horizontal marquee */
  $$("[data-marquee]").forEach((track) => {
    if (reduceMotion) return;
    track.innerHTML = track.innerHTML + track.innerHTML; // duplicate for seamless loop
  });

  /* --------------------------------------------------------- tab groups */
  $$("[data-tabs]").forEach((group) => {
    const btns = $$('[role="tab"]', group);
    function select(id, focus) {
      btns.forEach((b) => {
        const on = b.dataset.tab === id;
        b.setAttribute("aria-selected", String(on));
        b.tabIndex = on ? 0 : -1;
        b.classList.toggle("is-active", on);
        if (on && focus) b.focus();
      });
      $$("[role='tabpanel']", group).forEach((p) => {
        p.classList.toggle("is-active", p.dataset.panel === id);
        p.classList.toggle("hidden", p.dataset.panel !== id);
      });
    }
    btns.forEach((b) => {
      b.tabIndex = b.getAttribute("aria-selected") === "true" ? 0 : -1;
      b.addEventListener("click", () => select(b.dataset.tab));
    });
    group.addEventListener("keydown", (e) => {
      const idx = btns.indexOf(document.activeElement);
      if (idx === -1) return;
      let n = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") n = idx + 1;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") n = idx - 1;
      if (e.key === "Home") n = 0;
      if (e.key === "End") n = btns.length - 1;
      if (n === null) return;
      e.preventDefault();
      n = (n + btns.length) % btns.length;
      select(btns[n].dataset.tab, true);
    });
    const initial = btns.find((b) => b.getAttribute("aria-selected") === "true");
    if (initial) select(initial.dataset.tab);
  });

  /* ---------------------------------------------------------- accordion */
  $$("[data-accordion] > [data-acc-item]").forEach((item) => {
    const btn = $("[data-acc-trigger]", item);
    btn?.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
      const panel = $("[data-acc-panel]", item);
      if (panel) panel.style.maxHeight = open ? panel.scrollHeight + "px" : "0px";
    });
  });

  /* -------------------------------------------------------- counters */
  const counters = $$("[data-count]");
  if (counters.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const node = en.target;
          io.unobserve(node);
          const target = parseFloat(node.dataset.count);
          const suffix = node.dataset.suffix || "";
          const dur = 1500;
          const t0 = performance.now();
          const tick = (t) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            const v = target * eased;
            node.textContent =
              (target % 1 === 0 ? Math.round(v).toLocaleString("en-IN") : v.toFixed(1)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* ------------------------------------------------------ scroll reveal */
  const revealables = $$(".reveal");
  if (revealables.length) {
    if (reduceMotion) {
      revealables.forEach((r) => r.classList.add("is-in"));
    } else {
      const rio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            const delay = parseInt(en.target.dataset.delay || "0", 10);
            setTimeout(() => en.target.classList.add("is-in"), delay);
            rio.unobserve(en.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -60px" }
      );
      revealables.forEach((r) => rio.observe(r));
    }
  }

  /* ------------------------------------------------ active nav on scroll */
  const sections = $$("section[id], div[data-section]");
  const navAnchors = $$("[data-scrollspy] a[href^='#']");
  if (sections.length && navAnchors.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          navAnchors.forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ------------------------------------------------------- back to top */
  const top = $("[data-to-top]");
  if (top) {
    const onScroll = () => {
      const show = window.scrollY > 700;
      top.classList.toggle("opacity-0", !show);
      top.classList.toggle("pointer-events-none", !show);
      top.classList.toggle("translate-y-3", !show);
    };
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    top.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  /* -------------------------------------------------------- search box */
  const el = $("[data-search-input]");
  const searchShell = $("[data-search-shell]");
  $("[data-search-toggle]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    searchShell?.classList.toggle("hidden");
    if (!searchShell?.classList.contains("hidden")) searchShell.querySelector("input")?.focus();
  });
  $("[data-search-form]")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = el.value.trim();
    if (!q) return;
    // route the query to the AI assistant, pre-filled
    const input = $("[data-chat-input]");
    if (input) {
      window.SIUAssistant?.open();
      input.value = q;
      const form = $("[data-chat-form]");
      form?.requestSubmit();
    } else {
      location.hash = "contact";
    }
    searchShell?.classList.add("hidden");
  });

  /* ------------------------------------------------- Find a Program UI */
  const findShell = $("[data-find-shell]");
  const findInput = $("[data-find-input]");
  const findResults = $("[data-find-results]");
  $$("[data-find-toggle]").forEach((btn) =>
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      findShell?.classList.toggle("hidden");
      if (!findShell?.classList.contains("hidden")) findInput?.focus();
    })
  );
  $("[data-find-close]")?.addEventListener("click", () => findShell?.classList.add("hidden"));

  if (findInput && findResults && window.SIU_KB) {
    const LEVELS = {
      Undergraduate: ["cse-day","cse-eve","csi-day","csi-eve","ece-day","ece-eve","ba-english","ba-islamic","llb","bba"],
      Graduate: ["ma-english","ma-english-pf","mba-1","mba-exec","mba-regular","llm-1"],
    };
    /* Short badge per programme — derived from the department / degree, not
       from `short`, which leads with "B.Sc.Engg." and reads badly in a tile. */
    const BADGE = {
      "cse-day": "CSE", "cse-eve": "CSE",
      "csi-day": "CSI", "csi-eve": "CSI",
      "ece-day": "ECE", "ece-eve": "ECE",
      "ba-english": "BA", "ba-islamic": "BA",
      llb: "LLB", bba: "BBA",
      "ma-english": "MA", "ma-english-pf": "MA",
      "mba-1": "MBA", "mba-exec": "MBA", "mba-regular": "MBA",
      "llm-1": "LLM",
    };
    let level = "Undergraduate";

    const levelBtns = $$("[data-find-level]");
    const paintLevel = () => {
      levelBtns.forEach((b) => {
        const on = b.dataset.findLevel === level;
        b.classList.toggle("bg-brand-500", on);
        b.classList.toggle("text-white", on);
        b.classList.toggle("bg-white", !on);
        b.classList.toggle("text-slate-600", !on);
      });
      paint("");
    };
    levelBtns.forEach((b) =>
      b.addEventListener("click", () => {
        level = b.dataset.findLevel;
        paintLevel();
      })
    );

    function paint(q) {
      const codes = LEVELS[level] || [];
      const items = codes
        .map((c) => window.SIU_KB.programmes.find((p) => p.code === c))
        .filter(Boolean)
        .filter((p) => {
          if (!q) return true;
          const hay = (p.short + " " + p.name + " " + p.dept + " " + p.duration).toLowerCase();
          return q
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean)
            .every((w) => hay.includes(w));
        });

      findResults.innerHTML = "";
      if (!items.length) {
        findResults.innerHTML = `<p class="rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-500">No programme matches “${q}”. Try <strong>CSE</strong>, <strong>MBA</strong>, <strong>English</strong> or <strong>Law</strong>.</p>`;
        return;
      }
      items.forEach((p) => {
        const row = document.createElement("button");
        row.type = "button";
        row.setAttribute("data-programme", p.code);
        row.className =
          "group flex w-full items-center gap-4 rounded-xl border border-slate-200 p-3 text-left transition-all hover:border-brand-300 hover:bg-brand-50/50";
        row.innerHTML = `
          <span class="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-brand-500/10 font-display text-sm font-bold text-brand-700">${BADGE[p.code] || "SIU"}</span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-semibold text-slate-900">${p.name}</span>
            <span class="block truncate text-xs text-slate-500">${p.short} · ${p.duration} · ${p.mode}</span>
          </span>
          <span class="shrink-0 text-right">
            <span class="block text-sm font-bold text-crimson-500">৳ ${p.total.toLocaleString("en-IN")}</span>
            <span class="block text-[0.6875rem] text-slate-400 group-hover:text-brand-600">details</span>
          </span>
          <svg class="h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-brand-500"><use href="#i-arrow-right" /></svg>`;
        row.addEventListener("click", () => findShell?.classList.add("hidden"));
        findResults.appendChild(row);
      });
    }

    findInput.addEventListener("input", () => paint(findInput.value.trim()));
    paintLevel();
  }

  /* ------------------------------------------------- generic accordions */
  $$("[data-disclosure]").forEach((root) => {
    root.addEventListener("click", (e) => {
      const b = e.target.closest("[data-disclosure-trigger]");
      if (!b) return;
      const p = b.nextElementSibling;
      const open = p.classList.toggle("hidden") === false;
      b.setAttribute("aria-expanded", String(open));
      const chev = b.querySelector("[data-chev]");
      if (chev) chev.classList.toggle("rotate-180", open);
    });
  });

  /* ------------------------------------------------- current-year stamp */
  $$("[data-year]").forEach((n) => (n.textContent = new Date().getFullYear()));

  /* ------------------------------------- in-page "ask the assistant" buttons
     Anything with data-chat-launcher-inline opens the chat panel; main.js
     loads after chatbot.js so window.SIUAssistant already exists.            */
  $$("[data-chat-launcher-inline]").forEach((b) =>
    b.addEventListener("click", () => window.SIUAssistant?.open())
  );

  /* --------------------------------------------------- contact form (demo) */
  const contactForm = $("[data-contact-form]");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const out = $("[data-contact-result]", contactForm);
      if (!out) return;
      const name = contactForm.elements.name?.value.trim();
      const email = contactForm.elements.email?.value.trim();
      if (!name || !email) {
        out.textContent = "Please add your name and email address.";
        out.classList.remove("hidden", "!bg-brand-50", "text-brand-900");
        out.classList.add("!bg-crimson-500/10", "text-crimson-600");
        return;
      }
      out.classList.remove("hidden", "!bg-crimson-500/10", "text-crimson-600");
      out.classList.add("!bg-brand-50", "text-brand-900");
      out.textContent =
        "Thank you, " + name + ". This is a static demonstration, so nothing was sent. " +
        "For a live reply call the PABX on 029966-36771 or 02996633319, or use the Admission Query Form.";
      contactForm.reset();
    });
  }

  /* =========================================================================
     Fee calculator  +  programme detail drawer
     Everything here is derived from window.SIU_KB: the published breakdown
     strings ("20,000 (one-time)", "16,000 × 8 semesters = 128,000") and the
     published waiver rows. An authoritative "→ X BDT" total always wins; a
     percentage is only used when the row has no such figure. Nothing is
     invented — a waiver that cannot be priced is shown as quota-limited.
     ========================================================================= */
  const SIUKB = window.SIU_KB;

  if (SIUKB && Array.isArray(SIUKB.programmes) && SIUKB.programmes.length) {
    const PROGRAMMES = SIUKB.programmes;
    const DETAILS = SIUKB.programmeDetails || {};
    const GRADUATE = ["ma-english", "ma-english-pf", "mba-1", "mba-exec", "mba-regular", "llm-1"];

    const money = (n) => "\u09F3 " + Math.round(n).toLocaleString("en-IN");
    const toNum = (s) => Number(String(s).replace(/[^\d]/g, ""));
    const esc = (s) =>
      String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const byCode = (code) => PROGRAMMES.find((p) => p.code === code) || null;
    const isGraduate = (code) => GRADUATE.indexOf(code) !== -1;

    /* Day/evening pairs and graduate variants share one detail panel. */
    function familyOf(code) {
      if (!code) return null;
      if (/^cse-/.test(code)) return "cse";
      if (/^csi-/.test(code)) return "csi";
      if (/^ece-/.test(code)) return "ece";
      if (/^ma-english/.test(code)) return "ma-english";
      if (/^mba-/.test(code) || code === "bba") return "business";
      if (code === "llb" || code === "llm-1") return "law";
      if (code === "ba-islamic") return "ba-islamic";
      if (code === "ba-english") return "ba-english";
      return null;
    }

    /* ---------- parse the published breakdown into a structure ---------- */
    function feeStructure(p) {
      const oneTime = [];
      const recurring = [];
      let semesters = 0;

      p.breakdown.forEach(([key, raw]) => {
        const m = /^([\d,]+)\s*×\s*(\d+)\s*semesters?/i.exec(raw);
        if (m) {
          const per = toNum(m[1]);
          const n = Number(m[2]);
          semesters = Math.max(semesters, n);
          recurring.push({ key, per, n, total: per * n });
        } else {
          oneTime.push({ key, total: toNum(raw) });
        }
      });

      if (!semesters) {
        const m = /\((\d+)\s*semesters?\)/.exec(p.duration || "");
        semesters = m ? Number(m[1]) : 2;
      }

      const sum = (rows) => rows.reduce((t, r) => t + r.total, 0);
      const oneTimeTotal = sum(oneTime);
      const perSemester = recurring.reduce((t, r) => t + r.per, 0);
      const recurringTotal = sum(recurring);

      let tuitionRows = recurring.filter((r) => /tuition/i.test(r.key));
      if (!tuitionRows.length) {
        tuitionRows = recurring.filter((r) => !/library|activity|registration|semester fees/i.test(r.key));
      }
      const tuition = sum(tuitionRows);
      const admission = sum(oneTime.filter((r) => /admission/i.test(r.key) && !/form/i.test(r.key)));
      const componentSum = oneTimeTotal + recurringTotal;

      return {
        oneTime,
        recurring,
        semesters,
        oneTimeTotal,
        perSemester,
        recurringTotal,
        tuition,
        admission,
        /* The published programme total is what the site and the assistant
           quote, so it is the single source of truth. The itemised rows are
           shown as published; they occasionally omit or round a charge. */
        base: p.total || componentSum,
        componentSum,
        mismatch: Math.abs((p.total || componentSum) - componentSum) > 0,
        upfront: oneTimeTotal + perSemester,
        separableTuition: tuition > 0,
      };
    }

    /* ---------- price one published waiver row ---------- */
    function waiverResult(p, idx) {
      const row = (p.waiver || [])[idx];
      if (!row) return null;
      const [label, text] = row;
      const f = feeStructure(p);

      /* the published "→ 3,19,400 BDT" is authoritative */
      const exact = /→\s*([\d,]+)\s*BDT/i.exec(text);
      if (exact) {
        const total = toNum(exact[1]);
        return { label, text, total, saved: Math.max(0, f.base - total), computed: false };
      }

      const combined = /(\d+)%\s*admission\s*\+\s*(\d+)%\s*tuition/i.exec(text);
      const admOnly = /(\d+)%\s*(?:off\s*)?(?:the\s*)?admission\s*fee/i.exec(text);
      const tuitionOnly = /(\d+)%\s*(?:off\s*)?(?:the\s*)?tuition/i.exec(text);

      let saved = null;
      if (combined) {
        saved = (f.admission * Number(combined[1])) / 100 + (f.tuition * Number(combined[2])) / 100;
      } else if (admOnly) {
        saved = (f.admission * Number(admOnly[1])) / 100;
      } else if (tuitionOnly && f.separableTuition) {
        saved = (f.tuition * Number(tuitionOnly[1])) / 100;
      }

      /* no published figure and no separable tuition component → cannot price */
      if (saved === null) return { label, text, total: null, saved: 0, computed: true };

      return { label, text, total: Math.max(0, f.base - saved), saved, computed: true };
    }

    /* =====================================================================
       Calculator
       ===================================================================== */
    const calcProgramme = $("[data-calc-programme]");
    const calcWaiver = $("[data-calc-waiver]");
    const calcTotalEl = $("[data-calc-total]");
    const calcPerSemEl = $("[data-calc-per-sem]");
    const calcLinesEl = $("[data-calc-lines]");
    const calcFactsEl = $("[data-calc-facts]");
    const calcNoteEl = $("[data-calc-note]");

    let calcCode = "cse-day";

    function paintWaiverOptions() {
      if (!calcWaiver) return;
      const p = byCode(calcCode);
      const rows = (p && p.waiver) || [];
      calcWaiver.innerHTML = "";

      const none = document.createElement("option");
      none.value = "-1";
      none.textContent = "No waiver — full published fee";
      calcWaiver.appendChild(none);

      rows.forEach(([label, text], i) => {
        const o = document.createElement("option");
        o.value = String(i);
        o.textContent = `${label} — ${String(text).replace(/→.*$/, "").trim()}`;
        calcWaiver.appendChild(o);
      });

      if (!rows.length) {
        calcWaiver.value = "-1";
        calcWaiver.disabled = true;
      } else {
        calcWaiver.disabled = false;
        calcWaiver.value = "0"; // the first published row applies to all applicants
      }
    }

    function renderCalc() {
      const p = byCode(calcCode);
      if (!p || !calcTotalEl) return;
      const f = feeStructure(p);
      const idx = calcWaiver && calcWaiver.value !== "" ? Number(calcWaiver.value) : -1;
      const w = idx >= 0 ? waiverResult(p, idx) : null;
      const total = w && w.total != null ? w.total : f.base;

      calcTotalEl.textContent = money(total);

      if (calcPerSemEl) {
        const per = f.semesters ? Math.max(0, Math.round((total - f.oneTimeTotal) / f.semesters)) : 0;
        calcPerSemEl.textContent = f.semesters
          ? `${money(per)} ≈ per semester over ${f.semesters} semester${f.semesters === 1 ? "" : "s"}`
          : "";
      }

      if (calcLinesEl) {
        const rows = [];
        f.oneTime.forEach((r) => rows.push([r.key, money(r.total), "one-time", false]));
        f.recurring.forEach((r) => rows.push([r.key, money(r.total), `${money(r.per)} × ${r.n} semesters`, false]));
        if (f.mismatch) {
          const adj = f.base - f.componentSum;
          rows.push([
            "Published total adjustment",
            (adj > 0 ? "+ " : "− ") + money(Math.abs(adj)),
            "to match the official total",
            false,
          ]);
        }
        if (w && w.saved > 0) rows.push([`Waiver — ${w.label}`, "− " + money(w.saved), "", true]);
        rows.push(["Total", money(total), "", "total"]);

        calcLinesEl.innerHTML = rows
          .map(([k, v, meta, kind]) => {
            const isTotal = kind === "total";
            const isWaiver = kind === true;
            return (
              `<div class="flex items-baseline justify-between gap-3${isTotal ? " border-t border-white/20 pt-2.5 font-bold text-white" : ""}">` +
              `<dt class="${isTotal ? "" : isWaiver ? "text-gold-300" : "text-brand-100/75"}">${esc(k)}` +
              (meta ? `<span class="block text-[0.625rem] font-normal text-brand-100/45">${esc(meta)}</span>` : "") +
              "</dt>" +
              `<dd class="shrink-0 ${isTotal ? "" : isWaiver ? "text-gold-300" : "text-white"}">${esc(v)}</dd>` +
              "</div>"
            );
          })
          .join("");
      }

      if (calcFactsEl) {
        const facts = [
          ["Duration", p.duration],
          ["Study mode", p.mode],
          ["At admission", money(f.upfront)],
        ];
        calcFactsEl.innerHTML = facts
          .map(
            ([k, v]) =>
              `<div class="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">` +
              `<p class="text-[0.625rem] font-bold tracking-[0.1em] text-slate-400 uppercase">${esc(k)}</p>` +
              `<p class="mt-0.5 text-sm font-semibold text-slate-800">${esc(v)}</p></div>`
          )
          .join("");
      }

      if (calcNoteEl) {
        if (w && w.total == null) {
          calcNoteEl.textContent =
            "This waiver is subject to a limited quota, so an exact figure cannot be estimated here. The Admission Office confirms the amount and quota availability.";
        } else {
          calcNoteEl.textContent =
            "Waivers are subject to verification and quota availability. Figures follow the published fee structure (last updated " +
            (SIUKB.facts && SIUKB.facts.feeUpdated ? SIUKB.facts.feeUpdated : "2025") +
            "). Call 029966-36771 to confirm your final amount.";
        }
      }

      window.SIUi18n?.applyTo?.(document.getElementById("fee-calculator") || document);
    }

    function syncCalc(code) {
      if (!calcProgramme) return;
      calcCode = byCode(code) ? code : calcCode;
      calcProgramme.value = calcCode;
      paintWaiverOptions();
      renderCalc();
    }

    if (calcProgramme) {
      const group = (label, list) => {
        const g = document.createElement("optgroup");
        g.label = label;
        list.forEach((p) => {
          const o = document.createElement("option");
          o.value = p.code;
          o.textContent = p.short;
          g.appendChild(o);
        });
        return g;
      };

      calcProgramme.appendChild(group("Undergraduate", PROGRAMMES.filter((p) => !isGraduate(p.code))));
      calcProgramme.appendChild(group("Graduate", PROGRAMMES.filter((p) => isGraduate(p.code))));
      calcProgramme.value = calcCode;
      calcProgramme.addEventListener("change", () => {
        calcCode = calcProgramme.value;
        paintWaiverOptions();
        renderCalc();
      });

      calcWaiver?.addEventListener("change", renderCalc);
      paintWaiverOptions();
      renderCalc();
    }

    $("[data-calc-ask]")?.addEventListener("click", () => {
      const p = byCode(calcCode);
      if (!p) return;
      const idx = calcWaiver && calcWaiver.value !== "" ? Number(calcWaiver.value) : -1;
      const w = idx >= 0 ? waiverResult(p, idx) : null;
      const q = w
        ? `How much is ${p.short} with the "${w.label}" waiver?`
        : `How much is ${p.short}?`;
      window.SIUAssistant?.askOnLoad(q);
    });

    $("[data-calc-details]")?.addEventListener("click", () => openProgramme(calcCode));

    /* =====================================================================
       Programme drawer
       ===================================================================== */
    const drawer = $("[data-prog-drawer]");
    const drawerPanel = $("[data-prog-panel]");
    const drawerBody = $("[data-prog-body]");
    const drawerTitle = $("[data-prog-title]");
    const drawerSub = $("[data-prog-sub]");
    let drawerCode = null;
    let lastFocus = null;

    function drawerHtml(p) {
      const f = feeStructure(p);
      const d = DETAILS[familyOf(p.code)] || {};
      const grad = isGraduate(p.code);

      const tile = (label, value) =>
        `<div class="rounded-xl bg-slate-50 px-3.5 py-2.5">` +
        `<dt class="text-[0.625rem] font-bold tracking-[0.1em] text-slate-400 uppercase">${esc(label)}</dt>` +
        `<dd class="mt-0.5 text-sm font-semibold text-slate-900">${esc(value)}</dd></div>`;

      const feeRow = (k, v, meta, strong) =>
        `<div class="flex items-baseline justify-between gap-3 px-4 py-2.5${strong ? " bg-slate-50" : ""}">` +
        `<dt class="${strong ? "font-bold text-slate-900" : "text-slate-600"}">${esc(k)}` +
        (meta ? `<span class="block text-[0.6875rem] text-slate-400">${esc(meta)}</span>` : "") +
        "</dt>" +
        `<dd class="shrink-0 ${strong ? "font-bold text-crimson-500" : "font-semibold text-slate-800"}">${esc(v)}</dd></div>`;

      const feeList =
        `<dl class="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200">` +
        f.oneTime.map((r) => feeRow(r.key, money(r.total), "one-time", false)).join("") +
        f.recurring
          .map((r) => feeRow(r.key, money(r.total), `${money(r.per)} × ${r.n} semesters`, false))
          .join("") +
        feeRow("Total published fee", money(f.base), `${f.semesters} semesters`, true) +
        "</dl>";

      const feeListNote = f.mismatch
        ? `<p class="mt-2 text-[0.6875rem] leading-snug text-slate-400">Itemised charges are reproduced exactly as published. The official programme total above may include a charge that is not listed as a separate line.</p>`
        : "";

      const perSem =
        `<ul class="space-y-1.5">` +
        f.recurring
          .map(
            (r) =>
              `<li class="flex items-baseline justify-between gap-3"><span class="text-slate-600">${esc(r.key)}</span>` +
              `<span class="shrink-0 font-semibold text-slate-800">${money(r.per)}<span class="text-xs font-normal text-slate-400"> × ${r.n}</span></span></li>`
          )
          .join("") +
        `<li class="flex items-baseline justify-between gap-3 border-t border-slate-200 pt-2 font-semibold text-slate-900">` +
        `<span>Per semester</span><span>${money(f.perSemester)}</span></li>` +
        "</ul>" +
        `<p class="mt-3 rounded-xl bg-brand-50 px-3.5 py-2.5 text-[0.8125rem] text-brand-900">` +
        `<strong>${money(f.upfront)}</strong> is payable at admission — the one-time charges plus the first semester.</p>`;

      const waiverList = (p.waiver || []).length
        ? `<ul class="space-y-2">` +
          (p.waiver || [])
            .map(([label, text], i) => {
              const w = waiverResult(p, i);
              const after =
                w && w.total != null
                  ? `<span class="block text-sm font-bold text-brand-700">${money(w.total)}</span><span class="block text-[0.625rem] text-slate-400">new total</span>`
                  : `<span class="block text-[0.6875rem] font-semibold text-amber-600">Quota-limited</span><span class="block text-[0.625rem] text-slate-400">ask the office</span>`;
              return (
                `<li class="flex items-start justify-between gap-3 rounded-xl border border-slate-200 px-3.5 py-2.5">` +
                `<span class="min-w-0"><span class="block text-sm font-semibold text-slate-900">${esc(label)}</span>` +
                `<span class="mt-0.5 block text-xs leading-snug text-slate-500">${esc(text.replace(/→.*$/, "").trim())}</span></span>` +
                `<span class="shrink-0 text-right">${after}</span></li>`
              );
            })
            .join("") +
          "</ul>"
        : `<p class="text-sm text-slate-500">No waiver is published for this programme. Contact the Admission Office to ask about scholarships.</p>`;

      const eligibility = grad
        ? [
            "A relevant bachelor's degree is normally required — the Admission Office confirms the exact entry requirement for this programme.",
            "Bring your transcripts and certificates to the campus for individual counselling before you apply.",
          ]
        : [
            "At least 2.5 GPA in each of SSC and HSC from a board or equivalent examination.",
            "Or a Diploma in Engineering from BTEB (or a BTEB-recognised diploma) with GPA 2.5 or above out of 4.0 — for the B.Sc. Engineering programmes.",
            "International students must meet the same academic standards, plus English proficiency and proof of adequate financial resources.",
          ];

      const section = (title, inner, iconId) =>
        `<section class="mt-6 border-t border-slate-100 pt-5 first:mt-0 first:border-0 first:pt-0">` +
        `<h4 class="flex items-center gap-2 font-display text-[0.75rem] font-bold tracking-[0.14em] text-slate-900 uppercase">` +
        (iconId ? `<svg class="h-4 w-4 text-brand-500"><use href="#${iconId}" /></svg>` : "") +
        esc(title) +
        "</h4>" +
        `<div class="mt-3 text-sm leading-relaxed text-slate-600">${inner}</div>` +
        "</section>";

      const chips = (list) =>
        `<div class="flex flex-wrap gap-2">${list.map((s) => `<span class="chip cursor-default">${esc(s)}</span>`).join("")}</div>`;

      const fam = familyOf(p.code);
      let related = PROGRAMMES.filter((q) => q.code !== p.code && familyOf(q.code) === fam);
      if (related.length < 2) {
        related = related.concat(
          PROGRAMMES.filter((q) => q.code !== p.code && related.indexOf(q) === -1 && q.dept === p.dept)
        );
      }
      related = related.slice(0, 4);

      return (
        `<p class="text-sm leading-relaxed text-slate-600">${esc(d.overview || "")}</p>` +
        `<dl class="mt-5 grid grid-cols-2 gap-2.5">` +
        tile("Total published fee", money(f.base)) +
        tile("Duration", p.duration) +
        tile("Level", grad ? "Graduate" : "Undergraduate") +
        tile("Study mode", p.mode) +
        "</dl>" +
        section("Fee breakdown", feeList + feeListNote, "i-doc") +
        section("Per-semester charges", perSem, "i-calendar") +
        section("Waivers & scholarships", waiverList, "i-trophy") +
        section(grad ? "Entry requirements" : "Eligibility", `<ul class="space-y-2">${eligibility
          .map(
            (e) =>
              `<li class="flex gap-2.5"><svg class="mt-0.5 h-4 w-4 shrink-0 text-brand-500"><use href="#i-check" /></svg><span>${esc(e)}</span></li>`
          )
          .join("")}</ul>`, "i-check") +
        (d.study && d.study.length ? section("What you study", chips(d.study), "i-book") : "") +
        (d.careers && d.careers.length
          ? section(
              "Typical career paths",
              chips(d.careers) +
                `<p class="mt-2.5 text-[0.6875rem] leading-snug text-slate-400">Indicative paths only — SIU does not publish placement statistics for this programme.</p>`,
              "i-users"
            )
          : "") +
        (d.facilities ? section("Facilities", `<p>${esc(d.facilities)}</p>`, "i-flask") : "") +
        (related.length
          ? section(
              "Other programmes",
              `<div class="flex flex-wrap gap-2">${related
                .map(
                  (q) =>
                    `<button type="button" data-programme="${q.code}" class="chip transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-800">${esc(q.short)}</button>`
                )
                .join("")}</div>`,
              "i-cap"
            )
          : "")
      );
    }

    function openProgramme(code, trigger) {
      const p = byCode(code);
      if (!p || !drawer) return;

      drawerCode = code;
      if (drawerTitle) drawerTitle.textContent = p.name;
      if (drawerSub) drawerSub.textContent = [p.short, p.duration, p.mode].filter(Boolean).join(" · ");
      if (drawerBody) {
        drawerBody.innerHTML = drawerHtml(p);
        drawerBody.scrollTop = 0;
        window.SIUi18n?.applyTo?.(drawerBody);
      }

      if (!drawer.classList.contains("is-open")) {
        lastFocus =
          trigger && typeof trigger.focus === "function"
            ? trigger
            : document.activeElement !== document.body
              ? document.activeElement
              : null;
      }
      drawer.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";

      window.setTimeout(() => {
        drawerPanel?.querySelector("[data-prog-close]")?.focus({ preventScroll: true });
      }, 80);
    }

    function closeProgramme() {
      if (!drawer || !drawer.classList.contains("is-open")) return;
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      if (lastFocus && document.contains(lastFocus)) {
        lastFocus.focus({ preventScroll: true });
      }
      lastFocus = null;
    }

    if (drawer) {
      drawer.querySelector("[data-prog-backdrop]")?.addEventListener("click", closeProgramme);
      drawer.querySelector("[data-prog-close]")?.addEventListener("click", closeProgramme);

      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && drawer.classList.contains("is-open")) closeProgramme();
      });

      /* keep focus inside the open drawer */
      drawerPanel?.addEventListener("keydown", (e) => {
        if (e.key !== "Tab") return;
        const f = $$("a[href], button:not([disabled]), input, select, textarea", drawerPanel).filter(
          (n) => n.offsetParent !== null
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      });

      drawer.querySelector("[data-prog-calc]")?.addEventListener("click", () => {
        const code = drawerCode;
        closeProgramme();
        syncCalc(code);
        const calc = $("#fee-calculator");
        if (calc) calc.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      });

      drawer.querySelector("[data-prog-ask]")?.addEventListener("click", () => {
        const p = byCode(drawerCode);
        closeProgramme();
        if (p) window.SIUAssistant?.askOnLoad(`Tell me about ${p.short}`);
      });

      drawer.querySelector("[data-prog-apply]")?.addEventListener("click", () => {
        closeProgramme(); /* let the #contact anchor proceed */
      });
    }

    /* Any element with data-programme opens the drawer — fee-table rows,
       department cards, find-a-program results and the drawer's own chips. */
    document.addEventListener("click", (e) => {
      const t = e.target.closest("[data-programme]");
      if (!t) return;
      e.preventDefault();
      openProgramme(t.getAttribute("data-programme"), t);
    });

    window.SIUProgrammes = { open: openProgramme, close: closeProgramme, syncCalc };
  }
})();