// 파일 경로: /js/sections/hero.js

const HeroSection = (() => {
  const selectors = {
    title: ".hero-title",
    desc: ".hero-desc",
    primaryBtn: '.hero-actions .btn-primary',
    secondaryBtn: '.hero-actions .btn-secondary',
    metricBoxes: ".hero-metric-group .metric-box",
    statusText: ".status-row span:last-child",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);
  const getEls = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const setHeroContent = () => {
    const title = getEl(selectors.title);
    const desc = getEl(selectors.desc);
    const primaryBtn = getEl(selectors.primaryBtn);
    const secondaryBtn = getEl(selectors.secondaryBtn);
    const statusText = getEl(selectors.statusText);
    const metricBoxes = getEls(selectors.metricBoxes);

    if (title) {
      title.innerHTML = `
        AI 기반 도로 낙하물 탐지 및<br />
        실시간 알림 시스템
      `;
    }

    if (desc) {
      desc.textContent =
        "404 R·N·F AI 팀이 수행한 프로젝트로, 도로 위 낙하물을 이미지·영상 기반으로 탐지하고 관리자 대응, 비교분석, 위치 기반 확장성까지 연결한 통합형 AI 시스템입니다.";
    }

    if (primaryBtn) {
      primaryBtn.textContent = "목차 보기";
      primaryBtn.setAttribute("href", "#contents");
    }

    if (secondaryBtn) {
    secondaryBtn.textContent = "프로젝트 시연";
    secondaryBtn.setAttribute("href", "http://mbc-sw.iptime.org:3201/");
    secondaryBtn.setAttribute("target", "_blank");
    secondaryBtn.setAttribute("rel", "noopener noreferrer");
    }

    if (statusText) {
      statusText.textContent = "Realtime Detection & Admin Alert Active";
    }

    const metricData = [
      { title: "Upload", desc: "Input" },
      { title: "Detect", desc: "AI Analysis" },
      { title: "Respond", desc: "Live Alert" },
    ];

    if (metricBoxes.length) {
      metricBoxes.forEach((box, index) => {
        const strong = box.querySelector("strong");
        const span = box.querySelector("span");

        if (!metricData[index]) return;

        if (strong) strong.textContent = metricData[index].title;
        if (span) span.textContent = metricData[index].desc;
      });
    }
  };

  const init = () => {
    setHeroContent();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  HeroSection.init();
});