// 파일 경로: /js/sections/roles.js

const RolesSection = (() => {
  const selectors = {
    rolesGrid: "#roles .roles-grid",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const rolesData = [
    {
      no: "01",
      name: "김도하",
      subtitle: "기획 · 관리자 · DB · AI",
      items: [
        "프로젝트 기획 및 전체 구조 설계",
        "관리자 페이지 화면 및 기능 구현",
        "DB 설계 및 비교분석 기능 구현",
        "AI 학습 결과 정리 및 발표 구성",
      ],
    },
    {
      no: "02",
      name: "송명근",
      subtitle: "백엔드 · 신고 기능 · API",
      items: [
        "신고 등록 프로세스 백엔드 구현",
        "서비스 로직 및 API 연동",
        "파일 업로드 및 데이터 처리 기능",
        "기능 통합 및 오류 수정 지원",
      ],
    },
    {
      no: "03",
      name: "임효정",
      subtitle: "프론트엔드 · UI/UX",
      items: [
        "사용자 페이지 UI 구성 및 스타일링",
        "화면 레이아웃 및 디자인 정리",
        "발표용 웹 화면 시각 요소 구성",
        "프론트 동작 테스트 및 보완",
      ],
    },
    {
      no: "04",
      name: "김도균",
      subtitle: "AI 개발 · 데이터셋 · 모델 비교",
      items: [
        "AI 모델 학습 및 성능 비교 지원",
        "데이터셋 정리 및 라벨링 보조",
        "모델 결과 분석 및 비교 자료 정리",
        "AI 개발 파트 협업 및 검토",
      ],
    },
  ];

  const createRoleCard = (item) => {
    const article = document.createElement("article");
    article.className = "vision-card glass-card reveal-up";

    article.innerHTML = `
      <span class="vision-index">${item.no}</span>
      <h3>${item.name}</h3>
      <p class="vision-subtitle">${item.subtitle}</p>
      <ul>
        ${item.items.map((text) => `<li>${text}</li>`).join("")}
      </ul>
    `;

    return article;
  };

  const render = () => {
    const container = getEl(selectors.rolesGrid);
    if (!container) return;

    container.innerHTML = "";
    rolesData.forEach((item) => {
      container.appendChild(createRoleCard(item));
    });
  };

  const init = () => {
    render();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  RolesSection.init();
});