// 파일 경로: /js/sections/contents-nav.js

const ContentsNavSection = (() => {
  const selectors = {
    sections: "main section[id]",
    desktopLinks: ".gnb a[href^='#']",
    mobileLinks: ".mobile-nav a[href^='#']",
  };

  const getEls = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const initActiveNav = () => {
    const sections = getEls(selectors.sections);
    const desktopLinks = getEls(selectors.desktopLinks);
    const mobileLinks = getEls(selectors.mobileLinks);
    const allLinks = [...desktopLinks, ...mobileLinks];

    if (!sections.length || !allLinks.length) return;

    const setActiveLink = (currentId) => {
      allLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${currentId}`) {
          link.classList.add("is-current");
        } else {
          link.classList.remove("is-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (!visibleEntries.length) return;

        const currentSection = visibleEntries.sort(
          (a, b) => b.intersectionRatio - a.intersectionRatio
        )[0];

        if (currentSection?.target?.id) {
          setActiveLink(currentSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach((section) => observer.observe(section));

    if (sections[0]?.id) {
      setActiveLink(sections[0].id);
    }
  };

  const init = () => {
    initActiveNav();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  ContentsNavSection.init();
});