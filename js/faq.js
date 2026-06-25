(function () {
  "use strict";

  const searchInput = document.getElementById("faq-search");
  const countEl = document.getElementById("question-count");
  const noResults = document.getElementById("no-results");
  const chips = Array.from(document.querySelectorAll(".chip"));
  const groups = Array.from(document.querySelectorAll(".faq-group"));
  const items = Array.from(document.querySelectorAll(".faq-item"));

  let activeFilter = "all";

  /* Accordion */
  items.forEach(function (item) {
    const btn = item.querySelector(".faq-q");
    const answer = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      const isOpen = item.classList.contains("open");
      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* Filtering + search */
  function normalize(str) {
    return str.toLowerCase().trim();
  }

  function applyFilters() {
    const term = normalize(searchInput.value);
    let visibleCount = 0;

    groups.forEach(function (group) {
      const category = group.getAttribute("data-category");
      const matchesCategory = activeFilter === "all" || activeFilter === category;
      let groupVisible = 0;

      group.querySelectorAll(".faq-item").forEach(function (item) {
        const text = normalize(item.querySelector(".faq-q span").textContent +
          " " + item.querySelector(".faq-a").textContent);
        const matchesTerm = term === "" || text.indexOf(term) !== -1;
        const show = matchesCategory && matchesTerm;
        item.classList.toggle("hidden", !show);
        if (show) {
          groupVisible++;
          visibleCount++;
        }
      });

      group.classList.toggle("hidden", groupVisible === 0);
    });

    countEl.textContent = visibleCount + (visibleCount === 1 ? " question" : " questions");
    noResults.hidden = visibleCount !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) { c.classList.remove("active"); });
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-filter");
      applyFilters();
    });
  });

  searchInput.addEventListener("input", applyFilters);

  /* Mobile nav */
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      const open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  applyFilters();
})();
const icons = {
          menu:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>',
          moon:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
          sparkles:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.94 14.56 8 22l-1.94-7.44L0 12l6.06-2.56L8 2l1.94 7.44L16 12l-6.06 2.56Z" transform="translate(4 0) scale(.8)"/><path d="M19 3v4"/><path d="M21 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
          sun:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
          x:
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
            };

        const savedTheme = localStorage.getItem("eventease-theme");
        const shouldUseDark = savedTheme === "dark";

        document.body.classList.toggle("dark-mode", shouldUseDark);

        function injectIcons(root = document) {
          root.querySelectorAll("[data-icon]").forEach((element) => {
            const iconName = element.dataset.icon;
            if (icons[iconName]) {
              element.innerHTML = icons[iconName];
            }
          });
        }

        function updateThemeIcons() {
          const isDark = document.body.classList.contains("dark-mode");
          document.querySelectorAll("[data-theme-icon]").forEach((icon) => {
            icon.dataset.icon = isDark ? "sun" : "moon";
          });
          injectIcons();
        }

        function setMenu(open) {
          const mobileNav = document.querySelector("[data-mobile-nav]");
          const menuToggle = document.querySelector("[data-menu-toggle]");
          const menuIcon = document.querySelector("[data-menu-icon]");

          if (!mobileNav || !menuToggle || !menuIcon) {
            return;
          }

          mobileNav.hidden = !open;
          menuToggle.setAttribute("aria-expanded", String(open));
          menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
          menuIcon.dataset.icon = open ? "x" : "menu";
          document.body.classList.toggle("menu-open", open);
          injectIcons(menuToggle);
        }

        function setupHeaderState() {
          const header = document.querySelector("[data-header]");
          if (!header) {
            return;
          }
          const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
          update();
          window.addEventListener("scroll", update, { passive: true });
        }

        document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
          button.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark-mode");
            localStorage.setItem("eventease-theme", isDark ? "dark" : "light");
            updateThemeIcons();
          });
        });

        const menuToggleButton = document.querySelector("[data-menu-toggle]");
        menuToggleButton?.addEventListener("click", () => {
          const isOpen = menuToggleButton.getAttribute("aria-expanded") === "true";
          setMenu(!isOpen);
        });

        document.querySelector("[data-mobile-nav]")?.addEventListener("click", (event) => {
          if (event.target.closest("a")) {
            setMenu(false);
          }
        });

        document.addEventListener("keydown", (event) => {
          if (event.key === "Escape") {
            setMenu(false);
          }
        });

        injectIcons();
        updateThemeIcons();
        setupHeaderState();