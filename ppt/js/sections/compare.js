// 파일 경로: /js/sections/compare.js
const CompareSection = (() => {
  const compareData = {
    "YOLOv8 (SGD)": {
      summary: {
        title: "YOLOv8 (SGD)",
        description:
          "속도와 안정성의 균형이 좋은 모델로, 실시간 운영 환경에서 가장 실용적인 기준 모델로 설정할 수 있습니다.",
        strengths: [
          "실시간 처리에 유리한 추론 속도",
          "전반적으로 안정적인 탐지 성능",
          "운영 기준 모델로 활용하기 적합",
        ],
      },
      metrics: {
        labels: ["Precision", "Recall", "mAP50", "mAP50-95", "Speed"],
        values: [0.86, 0.82, 0.88, 0.71, 0.91],
      },
      bars: {
        labels: ["bag", "box", "rock", "tire"],
        values: [38, 52, 34, 41],
      },
    },
    "RT-DETR": {
      summary: {
        title: "RT-DETR",
        description:
          "구조적으로 다른 탐지 접근을 제공하는 비교 대상 모델로, 정교한 검출과 대안적 성능 분석에 강점이 있습니다.",
        strengths: [
          "대안 모델로서 비교 가치가 높음",
          "정교한 객체 검출 관점 제공",
          "비교분석 화면의 설득력 강화",
        ],
      },
      metrics: {
        labels: ["Precision", "Recall", "mAP50", "mAP50-95", "Speed"],
        values: [0.83, 0.8, 0.85, 0.69, 0.72],
      },
      bars: {
        labels: ["bag", "box", "rock", "tire"],
        values: [35, 49, 32, 39],
      },
    },
    "YOLOv8-p2": {
      summary: {
        title: "YOLOv8-p2",
        description:
          "작은 객체 탐지에 유리한 특성을 가진 모델로, 도로 위 소형 낙하물이나 먼 거리 객체 분석에 강점을 기대할 수 있습니다.",
        strengths: [
          "작은 객체 탐지에 상대적 강점",
          "세밀한 피처 추출에 유리",
          "고난도 장면 비교용으로 적합",
        ],
      },
      metrics: {
        labels: ["Precision", "Recall", "mAP50", "mAP50-95", "Speed"],
        values: [0.84, 0.81, 0.87, 0.7, 0.79],
      },
      bars: {
        labels: ["bag", "box", "rock", "tire"],
        values: [37, 50, 36, 40],
      },
    },
  };

  const selectors = {
    section: "#compare",
    tabs: ".model-tab",
    title: ".compare-summary-title",
    desc: ".compare-summary-desc",
    list: ".compare-summary-list",
    radarCanvas: "#compareRadarChart",
    barCanvas: "#compareBarChart",
  };

  let radarChart = null;
  let barChart = null;
  let chartReady = false;

  const getEl = (selector, parent = document) => parent.querySelector(selector);
  const getEls = (selector, parent = document) => [...parent.querySelectorAll(selector)];

  const init = async () => {
    const section = getEl(selectors.section);
    if (!section) return;

    await loadChartJS();
    setupMarkup();
    bindTabs();
    renderModel("YOLOv8 (SGD)");
  };

  const loadChartJS = () => {
    return new Promise((resolve) => {
      if (window.Chart) {
        chartReady = true;
        resolve();
        return;
      }

      const existing = document.querySelector('script[data-chartjs="true"]');
      if (existing) {
        existing.addEventListener("load", () => {
          chartReady = true;
          resolve();
        });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/chart.js";
      script.defer = true;
      script.dataset.chartjs = "true";
      script.onload = () => {
        chartReady = true;
        resolve();
      };
      script.onerror = () => {
        chartReady = false;
        resolve();
      };
      document.head.appendChild(script);
    });
  };

  const setupMarkup = () => {
    const panel = document.querySelector(".compare-panel .chart-placeholder");
    const summary = document.querySelector(".compare-summary");

    if (panel) {
      panel.innerHTML = `
        <div class="compare-chart-stack">
          <div class="chart-box glass-inner-card">
            <div class="chart-head">
              <strong>성능 비교 레이더</strong>
              <span>모델 특성 비교</span>
            </div>
            <canvas id="compareRadarChart"></canvas>
          </div>
          <div class="chart-box glass-inner-card">
            <div class="chart-head">
              <strong>클래스별 탐지 수</strong>
              <span>객체 분포 비교</span>
            </div>
            <canvas id="compareBarChart"></canvas>
          </div>
        </div>
      `;
    }

    if (summary) {
      summary.innerHTML = `
        <h3 class="compare-summary-title">YOLOv8 (SGD)</h3>
        <p class="compare-summary-desc"></p>
        <ul class="compare-summary-list"></ul>
      `;
    }
  };

  const bindTabs = () => {
    const tabs = getEls(selectors.tabs);
    if (!tabs.length) return;

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const modelName = tab.textContent.trim();
        tabs.forEach((button) => button.classList.remove("is-active"));
        tab.classList.add("is-active");
        renderModel(modelName);
      });
    });
  };

  const renderModel = (modelName) => {
    const data = compareData[modelName];
    if (!data) return;

    updateSummary(data.summary);

    if (chartReady && window.Chart) {
      renderRadarChart(data.metrics);
      renderBarChart(data.bars);
    } else {
      renderChartFallback(data);
    }
  };

  const updateSummary = (summary) => {
    const title = getEl(selectors.title);
    const desc = getEl(selectors.desc);
    const list = getEl(selectors.list);

    if (title) title.textContent = summary.title;
    if (desc) desc.textContent = summary.description;

    if (list) {
      list.innerHTML = summary.strengths.map((item) => `<li>${item}</li>`).join("");
    }
  };

  const renderRadarChart = (metrics) => {
    const canvas = getEl(selectors.radarCanvas);
    if (!canvas) return;

    if (radarChart) radarChart.destroy();

    radarChart = new window.Chart(canvas, {
      type: "radar",
      data: {
        labels: metrics.labels,
        datasets: [
          {
            label: "Model Metrics",
            data: metrics.values,
            fill: true,
            borderWidth: 2,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "rgba(243,247,255,0.9)",
              font: { size: 12, weight: 600 },
            },
          },
        },
        scales: {
          r: {
            min: 0,
            max: 1,
            ticks: {
              stepSize: 0.2,
              backdropColor: "transparent",
              color: "rgba(168,182,204,0.8)",
            },
            grid: {
              color: "rgba(255,255,255,0.12)",
            },
            angleLines: {
              color: "rgba(255,255,255,0.12)",
            },
            pointLabels: {
              color: "rgba(243,247,255,0.88)",
              font: { size: 12, weight: 600 },
            },
          },
        },
      },
    });
  };

  const renderBarChart = (bars) => {
    const canvas = getEl(selectors.barCanvas);
    if (!canvas) return;

    if (barChart) barChart.destroy();

    barChart = new window.Chart(canvas, {
      type: "bar",
      data: {
        labels: bars.labels,
        datasets: [
          {
            label: "Detection Count",
            data: bars.values,
            borderWidth: 1,
            borderRadius: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: "rgba(243,247,255,0.9)",
              font: { size: 12, weight: 600 },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "rgba(243,247,255,0.88)",
              font: { size: 12, weight: 600 },
            },
            grid: {
              display: false,
            },
          },
          y: {
            ticks: {
              color: "rgba(168,182,204,0.84)",
              precision: 0,
            },
            grid: {
              color: "rgba(255,255,255,0.1)",
            },
            beginAtZero: true,
          },
        },
      },
    });
  };

  const renderChartFallback = (data) => {
    const radarWrap = getEl(".compare-chart-stack");
    if (!radarWrap) return;

    radarWrap.innerHTML = `
      <div class="chart-fallback-box">
        <strong>${data.summary.title}</strong>
        <p>차트 라이브러리를 불러오지 못했지만, 모델 데이터는 정상 연결되었습니다.</p>
        <ul>
          ${data.metrics.labels
            .map((label, index) => `<li>${label}: ${data.metrics.values[index]}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  };

  return { init };
})();

window.addEventListener("DOMContentLoaded", () => {
  CompareSection.init();
});