// 파일 경로: /js/sections/smart-assist.js

const SmartAssistSection = (() => {
  const selectors = {
    grid: "#smart-assist .feature-grid",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const createCard = (item) => {
    const article = document.createElement("article");
    article.className = "feature-card glass-card reveal-up";

    article.innerHTML = `
      <span class="feature-tag">${item.tag}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;

    return article;
  };

  const render = () => {
    const container = getEl(selectors.grid);
    const data = window.projectData?.smartAssist;

    if (!container || !Array.isArray(data) || !data.length) return;

    container.innerHTML = "";
    data.forEach((item) => {
      container.appendChild(createCard(item));
    });
  };

  const init = () => {
    render();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  SmartAssistSection.init();
});