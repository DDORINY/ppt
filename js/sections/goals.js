// 파일 경로: /js/sections/goals.js

const GoalsSection = (() => {
  const selectors = {
    goalsGrid: "#goals .feature-grid",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const createGoalCard = (item) => {
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
    const container = getEl(selectors.goalsGrid);
    const data = window.projectData?.goals;

    if (!container || !Array.isArray(data) || !data.length) return;

    container.innerHTML = "";
    data.forEach((item) => {
      container.appendChild(createGoalCard(item));
    });
  };

  const init = () => {
    render();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  GoalsSection.init();
});