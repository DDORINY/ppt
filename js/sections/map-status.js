// 파일 경로: /js/sections/map-status.js

const MapStatusSection = (() => {
  const selectors = {
    mapSection: "#map-status",
    leftPanel: "#map-status .compare-panel",
    rightPanel: "#map-status .compare-summary",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const mapData = {
    left: {
      title: "지도 기반 시각화",
      items: [
        "탐지 위치를 지도 위 마커로 표현",
        "위험도에 따라 상태 시각화",
        "관리자가 현황을 한눈에 파악 가능",
      ],
    },
    right: {
      title: "확장 포인트",
      items: [
        "사고 다발 구역 통계화",
        "예방 정책용 시각 자료 활용",
        "향후 경로 기반 알림 기능 확장",
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
    const section = getEl(selectors.mapSection);
    if (!section) return;

    renderPanel(getEl(selectors.leftPanel), mapData.left);
    renderPanel(getEl(selectors.rightPanel), mapData.right);
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  MapStatusSection.init();
});