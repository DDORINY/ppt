// 파일 경로: /js/sections/compare.js

const CompareSection = (() => {
  const compareData = {
    "YOLOv8 (SGD)": {
      summary: {
        title: "YOLOv8 (SGD)",
        description:
          "가장 높은 mAP50-95와 Recall, 가장 빠른 Best Epoch를 보여 최종 기준 모델로 선정했습니다.",
        strengths: [
          "mAP50-95 최고",
          "Recall 최고",
          "Best Epoch 89",
          "운영 기준 모델",
        ],
      },
      evaluation: {
        bestEpoch: 89,
        precision: 0.9197,
        recall: 0.89417,
        map50: 0.94173,
        map5095: 0.66539,
      },
      losses: {
        train: 0.78,
        val: 1.11,
      },
    },

    "YOLOv8 (Adam)": {
      summary: {
        title: "YOLOv8 (Adam)",
        description:
          "최종 Precision은 무난했지만 Best Epoch가 250으로 가장 늦었고, mAP50-95도 가장 낮아 기준 모델로는 불리했습니다.",
        strengths: [
          "Precision 무난",
          "Best Epoch 가장 늦음",
          "mAP50-95 최저",
          "비교용 기준선 역할",
        ],
      },
      evaluation: {
        bestEpoch: 250,
        precision: 0.92089,
        recall: 0.86991,
        map50: 0.93328,
        map5095: 0.64116,
      },
      losses: {
        train: 0.96,
        val: 1.11,
      },
    },

    "YOLOv8 (AdamW)": {
      summary: {
        title: "YOLOv8 (AdamW)",
        description:
          "Precision은 가장 높았지만, mAP50-95와 수렴 속도에서는 SGD보다 소폭 낮아 대안 모델로 유지했습니다.",
        strengths: [
          "Precision 최고",
          "전반적으로 안정적",
          "Best Epoch 113",
          "SGD와 근접",
        ],
      },
      evaluation: {
        bestEpoch: 113,
        precision: 0.92573,
        recall: 0.86814,
        map50: 0.94015,
        map5095: 0.6565,
      },
      losses: {
        train: 0.85,
        val: 1.12,
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
    radarWrap: ".compare-radar-wrap",
    evidenceGrid: "#compareEvidenceGrid",
    evidenceNote: "#compareEvidenceNote",
  };

  let radarChart = null;
  let chartReady = false;

  const getEl = (selector, parent = document) => parent.querySelector(selector);
  const getEls = (selector, parent = document) => [
    ...parent.querySelectorAll(selector),
  ];

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
        existing.addEventListener("error", () => {
          chartReady = false;
          resolve();
        });
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js";
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
              <strong>최종 핵심 지표</strong>
              <span>Precision · Recall · mAP · Convergence</span>
            </div>
            <div class="compare-radar-wrap">
              <canvas id="compareRadarChart"></canvas>
            </div>
          </div>

          <div class="glass-inner-card compare-evidence-box">
            <div class="chart-head">
              <strong>모델 선정 핵심 근거</strong>
              <span>Loss 단독 판단보다 실제 검증 성능 중심</span>
            </div>

            <div class="compare-kpi-grid" id="compareEvidenceGrid"></div>
            <p class="compare-evidence-note" id="compareEvidenceNote"></p>
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
    renderEvidence(modelName, data);

    const radarMetrics = buildRadarMetrics(modelName, data);

    if (chartReady && window.Chart) {
      renderRadarChart(radarMetrics);
    } else {
      renderRadarFallback(radarMetrics);
    }
  };

  const updateSummary = (summary) => {
    const title = getEl(selectors.title);
    const desc = getEl(selectors.desc);
    const list = getEl(selectors.list);

    if (title) title.textContent = summary.title;
    if (desc) desc.textContent = summary.description;

    if (list) {
      list.innerHTML = summary.strengths
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
  };

  const buildRadarMetrics = (modelName, data) => {
    return {
      labels: ["Precision", "Recall", "mAP50", "mAP50-95", "Convergence"],
      values: [
        data.evaluation.precision,
        data.evaluation.recall,
        data.evaluation.map50,
        data.evaluation.map5095,
        getConvergenceScore(modelName),
      ],
    };
  };

  const getConvergenceScore = (modelName) => {
    const epochs = Object.values(compareData).map(
      (item) => item.evaluation.bestEpoch
    );
    const minEpoch = Math.min(...epochs);
    const maxEpoch = Math.max(...epochs);
    const currentEpoch = compareData[modelName].evaluation.bestEpoch;

    if (minEpoch === maxEpoch) return 1;

    // epoch가 낮을수록 높은 점수
    const normalized =
      1 - (currentEpoch - minEpoch) / (maxEpoch - minEpoch);

    // 너무 극단적으로 작아 보이지 않도록 0.35 ~ 1.00 범위로 보정
    return Number((0.35 + normalized * 0.65).toFixed(2));
  };

  const formatPercent = (value) => `${(value * 100).toFixed(2)}%`;

  const renderEvidence = (modelName, data) => {
    const grid = getEl(selectors.evidenceGrid);
    const note = getEl(selectors.evidenceNote);

    if (!grid) return;

    const { bestEpoch, precision, recall, map5095 } = data.evaluation;

    grid.innerHTML = `
      <div class="compare-kpi-card">
        <span class="kpi-label">Best Epoch</span>
        <strong class="kpi-value">${bestEpoch}</strong>
        <em class="kpi-desc">낮을수록 빠른 수렴</em>
      </div>

      <div class="compare-kpi-card">
        <span class="kpi-label">Precision</span>
        <strong class="kpi-value">${formatPercent(precision)}</strong>
        <em class="kpi-desc">정밀 탐지 성능</em>
      </div>

      <div class="compare-kpi-card">
        <span class="kpi-label">Recall</span>
        <strong class="kpi-value">${formatPercent(recall)}</strong>
        <em class="kpi-desc">놓치지 않는 탐지 성능</em>
      </div>

      <div class="compare-kpi-card">
        <span class="kpi-label">mAP50-95</span>
        <strong class="kpi-value">${formatPercent(map5095)}</strong>
        <em class="kpi-desc">종합 검증 성능</em>
      </div>
    `;

    if (note) {
      note.innerHTML = `
        Loss는 참고 지표이며, 최종 기준 모델 선정은
        <strong>mAP50-95</strong>, <strong>Recall</strong>,
        <strong>Best Epoch</strong>를 종합해 판단했습니다.
        <span class="compare-loss-inline">
          참고 Loss: Train ${data.losses.train.toFixed(2)} / Val ${data.losses.val.toFixed(2)}
        </span>
      `;
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
            label: "Final Metrics",
            data: metrics.values,
            fill: true,
            borderWidth: 2,
            tension: 0.25,
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

  const renderRadarFallback = (metrics) => {
    const wrap = getEl(selectors.radarWrap);
    if (!wrap) return;

    wrap.innerHTML = `
      <div class="chart-fallback-box">
        <strong>대표 지표</strong>
        <ul>
          ${metrics.labels
            .map((label, index) => `<li>${label}: ${metrics.values[index]}</li>`)
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