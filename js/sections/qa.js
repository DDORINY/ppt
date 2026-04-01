// 파일 경로: /js/sections/qa.js

const QaSection = (() => {
  const selectors = {
    section: "#qa",
    title: "#qa .ending-box h2",
    desc: "#qa .ending-box p:last-child",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const qaData = {
    title: `
      저희 프로젝트는 탐지에서 끝나는 AI가 아니라,<br />
      분석과 예방까지 이어지는 AI 시스템입니다.
    `,
    desc: "감사합니다. 질문 부탁드립니다.",
  };

  const render = () => {
    const title = getEl(selectors.title);
    const desc = getEl(selectors.desc);

    if (title) {
      title.innerHTML = qaData.title;
    }

    if (desc) {
      desc.textContent = qaData.desc;
    }
  };

  const init = () => {
    const section = getEl(selectors.section);
    if (!section) return;

    render();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  QaSection.init();
});