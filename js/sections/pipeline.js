// 파일 경로: /js/sections/pipeline.js

const PipelineSection = (() => {
  const selectors = {
    scheduleTrack: "#schedule .schedule-track",
    structureTrack: "#structure .structure-track",
    aiFlowTrack: "#ai-flow .ai-flow-track",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const createStepCard = (item) => {
    const article = document.createElement("article");
    article.className = "pipeline-step glass-card reveal-up";

    article.innerHTML = `
      <span class="step-no">${item.step}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;

    return article;
  };

  const createInlineStepCard = (item) => {
    const article = document.createElement("article");
    article.className = "pipeline-step glass-card reveal-up";

    article.innerHTML = `
      <span class="step-no">${item.no}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
    `;

    return article;
  };

  const renderSchedule = () => {
    const container = getEl(selectors.scheduleTrack);
    const data = window.projectData?.schedule;

    if (!container || !Array.isArray(data) || !data.length) return;

    container.innerHTML = "";
    data.forEach((item) => {
      container.appendChild(createStepCard(item));
    });
  };

  const renderStructure = () => {
    const container = getEl(selectors.structureTrack);
    if (!container) return;

    const structureData = [
      {
        no: "01",
        title: "User Report",
        desc: "이미지·영상 업로드 및 신고 정보 입력"
      },
      {
        no: "02",
        title: "AI Detection",
        desc: "YOLO / RT-DETR 기반 탐지 및 신뢰도 판별"
      },
      {
        no: "03",
        title: "Database",
        desc: "Report, File, Detection, Alert 데이터 저장"
      },
      {
        no: "04",
        title: "Admin Response",
        desc: "실시간 알림 확인과 상태 처리, 분석 이력 관리"
      },
      {
        no: "05",
        title: "Compare & Expand",
        desc: "모델 비교분석과 위치 기반 확장 기능 연결"
      }
    ];

    container.innerHTML = "";
    structureData.forEach((item) => {
      container.appendChild(createInlineStepCard(item));
    });
  };

  const renderAiFlow = () => {
    const container = getEl(selectors.aiFlowTrack);
    if (!container) return;

    const aiFlowData = [
      {
        no: "STEP 1",
        title: "Input",
        desc: "사용자가 이미지 또는 영상을 업로드합니다."
      },
      {
        no: "STEP 2",
        title: "Inference",
        desc: "AI 모델이 객체를 탐지하고 신뢰도를 계산합니다."
      },
      {
        no: "STEP 3",
        title: "Persistence",
        desc: "탐지 결과와 상태 정보를 DB에 구조화 저장합니다."
      },
      {
        no: "STEP 4",
        title: "Response",
        desc: "관리자 페이지에 알림과 분석 결과가 전달됩니다."
      },
      {
        no: "STEP 5",
        title: "Expansion",
        desc: "비교분석과 통계 기반 예방 기능으로 확장됩니다."
      }
    ];

    container.innerHTML = "";
    aiFlowData.forEach((item) => {
      container.appendChild(createInlineStepCard(item));
    });
  };

  const init = () => {
    renderSchedule();
    renderStructure();
    renderAiFlow();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  PipelineSection.init();
});