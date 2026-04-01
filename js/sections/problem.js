// 파일 경로: /js/sections/problem.js

const ProblemSection = (() => {
  const selectors = {
    overviewSection: "#overview",
    leftCard: "#overview .problem-card:first-of-type",
    rightCard: "#overview .problem-card:last-of-type",
  };

  const getEl = (selector, parent = document) => parent.querySelector(selector);

  const renderOverviewCards = () => {
    const leftCard = getEl(selectors.leftCard);
    const rightCard = getEl(selectors.rightCard);

    if (leftCard) {
      leftCard.innerHTML = `
        <h3>기존 문제</h3>
        <ul>
          <li>시민 신고 또는 수동 관제 중심</li>
          <li>탐지부터 판단까지 시간이 오래 걸림</li>
          <li>현장 상황 공유가 늦어짐</li>
          <li>2차 사고로 이어질 가능성 존재</li>
        </ul>
      `;
    }

    if (rightCard) {
      rightCard.innerHTML = `
        <h3>해결 방향</h3>
        <ul>
          <li>이미지·영상 기반 도로 낙하물 자동 탐지</li>
          <li>AI 분석 결과의 구조화 저장</li>
          <li>관리자 페이지 실시간 알림 연동</li>
          <li>비교분석과 예방 확장까지 가능한 구조 설계</li>
        </ul>
      `;
    }
  };

  const init = () => {
    const section = getEl(selectors.overviewSection);
    if (!section) return;

    renderOverviewCards();
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  ProblemSection.init();
});