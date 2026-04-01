// 파일 경로: /js/sections/vision.js

const VisionSection = (() => {
  const selectors = {
    container: "#visionGrid",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const createVisionCard = (item) => {
    const article = document.createElement("article");
    article.className = `vision-card glass-card reveal-up${item.highlight ? " highlight-card" : ""}`;

    article.innerHTML = `
      <span class="vision-index">${item.no}</span>
      <h3>${item.title}</h3>
      <p class="vision-subtitle">${item.subtitle}</p>
      <ul>
        ${item.items.map((text) => `<li>${text}</li>`).join("")}
      </ul>
    `;

    return article;
  };

  const render = () => {
    const container = getEl(selectors.container);
    const data = window.visionData;

    if (!container || !Array.isArray(data) || !data.length) return;

    container.innerHTML = "";
    data.forEach((item) => {
      container.appendChild(createVisionCard(item));
    });
  };

  const init = () => {
    render();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  VisionSection.init();
});