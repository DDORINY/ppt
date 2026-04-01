// 파일 경로: /js/sections/architecture.js

const ArchitectureSection = (() => {
  const selectors = {
    architectureSection: "#architecture",
    leftPanel: "#architecture .compare-panel",
    rightPanel: "#architecture .compare-summary",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const techStackData = {
    title: "기술 스택",
    items: [
      "Frontend: HTML, CSS, JavaScript",
      "Backend: Flask, Flask-SQLAlchemy, Flask-Migrate",
      "Database: MySQL, PyMySQL",
      "AI: YOLOv8, RT-DETR, OpenCV",
      "Realtime: Flask-SocketIO",
    ],
  };

  const tableData = {
    title: "핵심 테이블 구조",
    items: [
      "users / role_requests",
      "reports / report_files",
      "detections / alerts",
      "report_status_logs / admin_logs",
      "ai_compare_runs / ai_compare_results",
    ],
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
    const section = getEl(selectors.architectureSection);
    if (!section) return;

    renderPanel(getEl(selectors.leftPanel), techStackData);
    renderPanel(getEl(selectors.rightPanel), tableData);
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  ArchitectureSection.init();
});