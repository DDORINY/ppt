// 파일 경로: /js/data/projectData.js

const projectData = {
  contents: [
  {
    no: "01",
    title: "프로젝트 개요",
    desc: "개발 배경, 문제 정의, 해결 방향",
    target: "#overview"
  },
  {
    no: "02",
    title: "프로젝트 목표",
    desc: "구현 목표와 서비스 지향점",
    target: "#goals"
  },
  {
    no: "03",
    title: "수요조사",
    desc: "현실적 필요성과 공공 수요 분석",
    target: "#research"
  },
  {
    no: "04",
    title: "4주 프로젝트 일정",
    desc: "기획부터 발표까지의 진행 일정",
    target: "#schedule"
  },
  {
    no: "05",
    title: "시스템 기능 구조",
    desc: "사용자, AI, 관리자 기능 흐름",
    target: "#structure"
  },
  {
    no: "06",
    title: "업무분담",
    desc: "팀원별 역할 및 구현 범위",
    target: "#roles"
  },
  {
    no: "07",
    title: "차별화 요소",
    desc: "기존 탐지형 시스템과의 차이",
    target: "#differentiator"
  },
  {
    no: "08",
    title: "Backend & DB",
    desc: "아키텍처와 데이터 저장 구조",
    target: "#architecture"
  },
  {
    no: "09",
    title: "실시간 알림 & 탐지 현황",
    desc: "WebSocket과 지도 기반 시각화",
    target: "#alerts"
  },
  {
    no: "10",
    title: "AI 모델 개발",
    desc: "학습, 비교분석, 선정 기준",
    target: "#compare"
  },
  {
    no: "11",
    title: "시연",
    desc: "실제 서비스 흐름과 데모",
    target: "#demo"
  },
  {
    no: "12",
    title: "AI 전망",
    desc: "예방 산업과 공공 가치로의 확장",
    target: "#vision",
    highlight: true
  }
],

  goals: [
    {
      tag: "Goal 01",
      title: "실시간 객체 탐지",
      desc: "도로 낙하물을 이미지와 영상에서 탐지할 수 있는 AI 모델을 구현합니다."
    },
    {
      tag: "Goal 02",
      title: "신고-분석 연계",
      desc: "사용자의 업로드 데이터가 AI 분석으로 자동 연결되도록 구성합니다."
    },
    {
      tag: "Goal 03",
      title: "관리자 대응 체계",
      desc: "실시간 알림과 상태 관리가 가능한 관리자 화면을 구축합니다."
    },
    {
      tag: "Goal 04",
      title: "비교분석 기반 판단",
      desc: "여러 모델을 비교하며 운영 기준을 제시할 수 있는 구조를 만듭니다."
    }
  ],

  schedule: [
    {
      step: "WEEK 1",
      title: "기획 · 설계",
      desc: "주제 선정, 역할 분담, DB/API 구조 설계, 화면 기획"
    },
    {
      step: "WEEK 2",
      title: "기능 구현",
      desc: "신고 등록, 관리자 페이지, 기본 프론트/백엔드 연동"
    },
    {
      step: "WEEK 3",
      title: "AI 개발",
      desc: "데이터셋 정리, 학습, 비교분석, 결과 시각화"
    },
    {
      step: "WEEK 4",
      title: "통합 · 발표",
      desc: "시연 준비, 고도화 기능 정리, 발표자료 제작"
    }
  ],

  differentiators: [
    {
      tag: "01",
      title: "LLM + GPS(EXIF)",
      desc: "이미지 메타데이터와 분석 정보를 연결해 신고 내용을 보조 자동화합니다."
    },
    {
      tag: "02",
      title: "실시간 위험 알림",
      desc: "관리자에게 WebSocket 기반 경고를 즉시 전달해 대응 시간을 줄입니다."
    },
    {
      tag: "03",
      title: "탐지 현황 지도 시각화",
      desc: "낙하물 발생 위치를 지도로 시각화하여 현황 파악과 확장 기능의 기반을 만듭니다."
    },
    {
      tag: "04",
      title: "AI 비교분석",
      desc: "단일 모델 결과가 아니라 여러 모델을 비교해 운영 기준을 제시합니다."
    }
  ],

  smartAssist: [
    {
      tag: "Assist 01",
      title: "GPS / EXIF 활용",
      desc: "이미지 메타데이터에서 위치 기반 단서를 추출해 신고 정보와 연결합니다."
    },
    {
      tag: "Assist 02",
      title: "문서 초안 자동화",
      desc: "AI 분석 결과를 기반으로 제목과 내용 초안 생성 흐름을 고려합니다."
    },
    {
      tag: "Assist 03",
      title: "업로드 제한 처리",
      desc: "파일 형식과 크기 제한을 통해 안정적인 서비스 운영을 고려합니다."
    },
    {
      tag: "Assist 04",
      title: "관리 효율 향상",
      desc: "관리자가 빠르게 파악하고 처리할 수 있는 구조를 지원합니다."
    }
  ],

  demo: [
    {
      tag: "Demo 01",
      title: "신고 등록",
      desc: "이미지·영상 업로드와 기본 신고 데이터 입력"
    },
    {
      tag: "Demo 02",
      title: "분석 결과",
      desc: "탐지 결과와 저장 구조 확인"
    },
    {
      tag: "Demo 03",
      title: "실시간 알림",
      desc: "관리자 화면에 전달되는 경고 흐름 확인"
    },
    {
      tag: "Demo 04",
      title: "비교분석",
      desc: "세 모델 비교 차트와 요약 화면 시연"
    }
  ]
};

window.projectData = projectData;