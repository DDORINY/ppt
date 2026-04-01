// 파일 경로: /js/sections/research.js

const ResearchSection = (() => {
  const selectors = {
    researchSection: "#research",
    leftPanel: "#research .compare-panel",
    rightPanel: "#research .compare-summary",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const researchData = {
    left: {
      title: "현실적 문제 상황",
      items: [
        "고속도로와 일반도로에서 낙하물 사고가 반복적으로 발생",
        "현장 관제 인력만으로 모든 구간을 즉시 확인하기 어려움",
        "사고 발생 후 대응이 중심이 되어 예방적 관리가 부족함",
      ],
    },
    right: {
      title: "공공 수요 관점",
      items: [
        "도로 관리 기관의 실시간 모니터링 자동화 수요 증가",
        "위험 지역 통계화와 정책 지원 시스템 필요",
        "사고 예방 중심의 스마트 도로 인프라 확장 가능성",
      ],
    },
  };

  const renderPanel = (element, data) => {
    if (!element || !data) return;

    element.innerHTML = `
      <h3>${data.title}</h3>
      <ul class="compare-summary-list">
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  };

  const init = () => {
    const section = getEl(selectors.researchSection);
    if (!section) return;

    renderPanel(getEl(selectors.leftPanel), researchData.left);
    renderPanel(getEl(selectors.rightPanel), researchData.right);
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  ResearchSection.init();
});