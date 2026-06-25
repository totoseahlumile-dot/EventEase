const icons = {
  calendar:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>',
  menu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12h16"/><path d="M4 18h16"/><path d="M4 6h16"/></svg>',
  moon:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
  sparkles:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9.94 14.56 8 22l-1.94-7.44L0 12l6.06-2.56L8 2l1.94 7.44L16 12l-6.06 2.56Z" transform="translate(4 0) scale(.8)"/><path d="M19 3v4"/><path d="M21 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>',
  sun:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
  users:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  x:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>',
};

const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
const savedTheme = localStorage.getItem("eventease-theme");
const shouldUseDark = savedTheme ? savedTheme === "dark" : prefersDark.matches;

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
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";

  document.querySelectorAll("[data-theme-icon]").forEach((icon) => {
    icon.dataset.icon = isDark ? "sun" : "moon";
  });
  document.querySelectorAll("[data-theme-toggle]").forEach((toggle) => {
    toggle.setAttribute("aria-label", label);
    toggle.setAttribute("title", label);
    toggle.setAttribute("aria-pressed", String(isDark));
  });
  injectIcons();
}

function setMenu(open) {
  const mobileNav = document.querySelector("[data-mobile-nav]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const menuIcon = document.querySelector("[data-menu-icon]");

  if (!mobileNav || !menuToggle || !menuIcon) return;

  mobileNav.hidden = !open;
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  menuIcon.dataset.icon = open ? "x" : "menu";
  document.body.classList.toggle("menu-open", open);
  injectIcons(menuToggle);
}

function setupRevealAnimations() {
  const revealItems = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupHeaderState() {
  const header = document.querySelector("[data-header]");
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

document.querySelector("[data-menu-toggle]")?.addEventListener("click", () => {
  const isOpen = document.querySelector("[data-menu-toggle]").getAttribute("aria-expanded") === "true";
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
setupRevealAnimations();
setupHeaderState();
