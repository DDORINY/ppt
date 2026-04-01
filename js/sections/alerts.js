// 파일 경로: /js/sections/alerts.js

const AlertsSection = (() => {
  const selectors = {
    alertsSection: "#alerts",
    leftCard: "#alerts .problem-card:first-of-type",
    rightCard: "#alerts .problem-card:last-of-type",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const alertFlowData = {
    before: {
      title: "기존 대응 흐름",
      items: [
        "신고 접수",
        "수동 확인",
        "순차 처리",
        "대응 지연",
        "2차 사고 위험",
      ],
    },
    after: {
      title: "개선 대응 흐름",
      items: [
        "신고 접수",
        "AI 분석",
        "WebSocket 알림",
        "관리자 즉각 대응",
        "사고 예방 가능성 확대",
      ],
    },
  };

  const renderCard = (element, data) => {
    if (!element || !data) return;

    element.innerHTML = `
      <h3>${data.title}</h3>
      <ul>
        ${data.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    `;
  };

  const init = () => {
    const section = getEl(selectors.alertsSection);
    if (!section) return;

    renderCard(getEl(selectors.leftCard), alertFlowData.before);
    renderCard(getEl(selectors.rightCard), alertFlowData.after);
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  AlertsSection.init();
});