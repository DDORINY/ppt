// 파일 경로: /js/sections/features.js
// 파일 전체 교체

const FeaturesSection = (() => {
  const selectors = {
    contentsGrid: "#contents .contents-grid",
    goalsGrid: "#goals .feature-grid",
    differentiatorGrid: "#differentiator #featureGrid",
    smartAssistGrid: "#smart-assist .feature-grid",
    demoGrid: "#demo .feature-grid",
    siteHeader: "#siteHeader",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const scrollToTarget = (targetSelector) => {
    const target = document.querySelector(targetSelector);
    const header = getEl(selectors.siteHeader);

    if (!target) return;

    const headerHeight = header ? header.offsetHeight : 0;
    const top =
      target.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

    window.scrollTo({
      top,
      behavior: "smooth",
    });
  };

  const bindContentsCardAction = (card, item) => {
    if (!item.target) return;

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `${item.title} 섹션으로 이동`);
    card.dataset.target = item.target;

    card.addEventListener("click", () => {
      scrollToTarget(item.target);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        scrollToTarget(item.target);
      }
    });
  };

  const createFeatureCard = (item, isContents = false) => {
    const article = document.createElement("article");
    article.className = `feature-card glass-card reveal-up${item.highlight ? " highlight-card" : ""}`;

    if (isContents && item.target) {
      article.classList.add("contents-link-card");
    }

    article.innerHTML = `
      <span class="feature-tag">${item.no || item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;

    if (isContents) {
      bindContentsCardAction(article, item);
    }

    return article;
  };

  const renderList = (container, items, isContents = false) => {
    if (!container || !Array.isArray(items) || !items.length) return;

    container.innerHTML = "";
    items.forEach((item) => {
      container.appendChild(createFeatureCard(item, isContents));
    });
  };

  const init = () => {
    const data = window.projectData;
    if (!data) return;

    renderList(getEl(selectors.contentsGrid), data.contents, true);
    renderList(getEl(selectors.goalsGrid), data.goals);
    renderList(getEl(selectors.differentiatorGrid), data.differentiators);
    renderList(getEl(selectors.smartAssistGrid), data.smartAssist);
    renderList(getEl(selectors.demoGrid), data.demo);
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  FeaturesSection.init();
});