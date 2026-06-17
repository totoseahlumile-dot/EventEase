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
