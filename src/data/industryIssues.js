// 업태 및 종목별 주요 이슈 및 2026 트렌드 DB
export const INDUSTRY_ISSUES_DB = {
  "음식": {
    category: "음식점업 / 외식업",
    icon: "Utensils",
    summary: "인건비·원가 상승에 따른 수익성 악화 및 디지털 배달·스마트 매장 전환이 핵심 화두입니다.",
    keywords: ["최저임금", "식자재 원가", "배달 수수료", "노무 관리", "위생 등급"],
    keyIssues: [
      {
        title: "최저임금 상승 및 시급 부담 심화",
        level: "HIGH",
        description: "주휴수당 및 4대보험 포함 시 실질 시급이 증가하여 주휴수당 미지급 조건 수시 근로자 채용 및 무인 키오스크 도입 확대 추세.",
        actionPlan: "두루누리 사회보험료 지원사업 활용 및 단기 근로계약서 표준 서식 필수 작성."
      },
      {
        title: "배달 플랫폼 수수료 및 배달팁 갈등",
        level: "HIGH",
        description: "주요 배달앱 중개 수수료 및 카드 수수료 누적으로 인한 이익률 감소. 포장 주문 우대 혜택 및 자체 마케팅 채널 확보 필요.",
        actionPlan: "자체 네이버 마이플레이스 및 당근마켓 지역광고 등 가성비 높은 지역 기반 마케팅 전환."
      },
      {
        title: "식자재 수급 불안정 및 원가 급등",
        level: "MEDIUM",
        description: "기후 변화 및 수입 원자재 가격 변동으로 인한 기본 식자재 단가 상승. 메뉴별 원가율(Food Cost) 재산정 필수.",
        actionPlan: "외식업체 식재료 구매자금 지원사업(농림축산식품부) 신청으로 구매자금 저리 대출 활용."
      },
      {
        title: "식품위생법 개정 및 위생등급제 의무화 분위기",
        level: "MEDIUM",
        description: "배달 전문 매장 위생점검 강화 및 음식점 위생등급제 지정 시 신용보증재단 금리 우대 혜택 제공.",
        actionPlan: "식품의약품안전처 음식점 위생등급제 신청을 통해 지정 시 주방 개선 자금 혜택 수령."
      }
    ],
    growthStrategy: "단골 고객 혜택 프로그램(스탬프/적립) 및 세무사 전담을 통한 음식점 의제매입세액 공제 극대화가 필요합니다."
  },

  "정보통신": {
    category: "정보통신업 / IT / 소프트웨어",
    icon: "Code",
    summary: "R&D 세액공제, 생성형 AI 기술 도입, 정보보호 인증 및 핵심 개발인력 유치가 성장의 핵심입니다.",
    keywords: ["R&D 세액공제", "생성형 AI", "정보보호 ISMS", "스톡옵션", "벤처기업인증"],
    keyIssues: [
      {
        title: "연구개발(R&D) 투자 세액공제 및 비과세 혜택",
        level: "HIGH",
        description: "소프트웨어 개발비 및 전담요원 인건비에 대한 R&D 세액공제(최대 25%) 적용 및 세무조사 대비 연구노트 작성 필수.",
        actionPlan: "기업부설연구소 또는 연구개발전담부서 인정 신청(KOITA)을 통해 조세특례 수혜 확보."
      },
      {
        title: "개인정보보호법 강화 및 보안 가이드라인 준수",
        level: "HIGH",
        description: "고객 데이터 유출 시 과징금 부과 기준이 전체 매출액 3%로 강화되어 서비스 초기부터 보안 조치 및 백업 필수.",
        actionPlan: "ISMS-P 인증 컨설팅 지원 사업 신청 및 클라우드 보안 세팅 검증."
      },
      {
        title: "개발 인력 이탈 및 급여 인플레이션",
        level: "MEDIUM",
        description: "우수 개발자 유치를 위해 주식매수선택권(스톡옵션) 및 성과공유제 도입 수요 증가.",
        actionPlan: "벤처기업 확인을 통한 스톡옵션 비과세 한도(연간 2억원) 활용 및 내일채움공제 연계."
      },
      {
        title: "생성형 AI API 및 클라우드 인프라 비용 부담",
        level: "MEDIUM",
        description: "서버 비용(AWS/GCP) 및 AI 모델 API 호출 비용 증가에 따른 초기 캐시카우 및 자금 조달 전략 필요.",
        actionPlan: "K-바우처 지원사업(AI 바우처, 클라우드 바우처)을 통해 최대 80% 인프라 비용 지원 신청."
      }
    ],
    growthStrategy: "벤처기업 확인 및 혁신성장유형 인증을 받아 기술보증기금(KIBO) 보증 및 법인세 50% 감면 혜택을 챙기세요."
  },

  "제조": {
    category: "제조업 / 공업",
    icon: "Factory",
    summary: "스마트 공장 전환, 원자재 가격 변동, 중대재해처벌법 대응 및 ESG/탄소중립 준수가 요구됩니다.",
    keywords: ["스마트공장", "중대재해처벌법", "원자재가", "ESG 규제", "공장 자동화"],
    keyIssues: [
      {
        title: "5인 이상 사업장 중대재해처벌법 전면 적용",
        level: "HIGH",
        description: "안전보건관리체계 구축 미비 시 사업주 처벌 위험. 위험성 평가 실시 및 안전보건 교육 이력 관리가 필수적임.",
        actionPlan: "안전보건공단 50인 미만 사업장 안전보건 체계 구축 무료 컨설팅 지원 사업 즉시 신청."
      },
      {
        title: "전력비·원자재 가격 상승으로 인한 제조원가 증가",
        level: "HIGH",
        description: "산업용 전기요금 인상 및 원자재 환율 영향으로 공정효율화 및 고효율 설비 교체 필요성 증대.",
        actionPlan: "한국에너지공단 에너지이용합리화 자금(저리 융자)을 활용한 고효율 설비 교체."
      },
      {
        title: "스마트공장 및 공정 자동화 지원 정책",
        level: "MEDIUM",
        description: "생산성 향상 및 구인난 해소를 위해 MES(생산관리시스템) 및 로봇 자동화 라인 구축 보조금 확대.",
        actionPlan: "중소벤처기업부 스마트공장 구축 지원사업 신청 (최대 1억~2억원 국비 지원)."
      },
      {
        title: "글로벌 공급망 ESG 및 탄소 배출 규제",
        level: "MEDIUM",
        description: "대기업 납품 시 탄소배출량 측정 및 공급망 ESG 실사 요구 증가.",
        actionPlan: "중소기업 탄소중립 전환지원 사업(에너지 진단 및 설비 개선 보조금) 참여."
      }
    ],
    growthStrategy: "중소벤처기업진흥공단(KOSME) 시설자금 융자 및 산업단지 내 세제 혜택(취득세 감면)을 적극 활용하십시오."
  },

  "도소매": {
    category: "도소매업 / 유통 / 이커머스",
    icon: "ShoppingBag",
    summary: "온·오프라인 옴니채널 통합, 재고 회전율 관리, 종합몰 정산 주기 관리 및 해외 직구 이슈 대응이 중요합니다.",
    keywords: ["재고 회전율", "플랫폼 정산", "부가가치세", "해외직구", "물류 최적화"],
    keyIssues: [
      {
        title: "이커머스 플랫폼 정산 주기 불안 및 자금 압박",
        level: "HIGH",
        description: "일부 오픈마켓 정산 지연 사태 이후 빠른 정산 서비스 및 전자상거래 구매자금 대출 활용 필요.",
        actionPlan: "금융사 연계 카드/매출 정산 선지급(Fast Pay) 서비스 및 소상공인 매출채권 보험 가입."
      },
      {
        title: "해외 직구 규제 및 C-커머스(알리/테무) 가격 경쟁",
        level: "HIGH",
        description: "중국 직구 플랫폼의 초저가 공세로 인한 국내 유통사 마진 감소. 차별화된 브랜딩 및 빠른 배송 경쟁력 필수.",
        actionPlan: "자사 브랜드(PB) 개발 또는 KC인증 지원사업 활용으로 안전성 및 신뢰도 검증 마케팅."
      },
      {
        title: "재고 자금 정체 및 부가가치세 신고 부담",
        level: "MEDIUM",
        description: "계절 상품 및 불용 재고 누적으로 인한 현금 흐름 악화. 매 분기 매입세액 공제 자료 철저 관리.",
        actionPlan: "재고 자산 기반 동산담보대출 또는 전자세금계산서 매입세액 적기 반영으로 VAT 절세."
      }
    ],
    growthStrategy: "스마트슈퍼 지원사업 및 온누리상품권 가맹점 등록을 통해 동네 유통 및 온라인 판매망 확대를 도모하세요."
  },

  "건설": {
    category: "건설업 / 건축 / 인테리어",
    icon: "Building",
    summary: "건설 경기 자금 압박, 건설자재 단가 상승, 하자보수보증 및 산업안전보건비 투입 강화가 핵심입니다.",
    keywords: ["하자보수보증", "원자재단가", "산업안전보건비", "건설공제조합", "PF리스크"],
    keyIssues: [
      {
        title: "건설 자재비 단가 상승 및 기성금 지연 리스크",
        level: "HIGH",
        description: "시멘트·철근 등 자재가 급등으로 공사 원가율 악화. 발주처 공사비 증액 증명서 및 계약 변경 서면화 필요.",
        actionPlan: "건설분쟁조정위원회 자문 및 공사대금 연체 시 법적 채권 보전 조치 준비."
      },
      {
        title: "산업안전보건비 계상 의무 및 현장 조치 강화",
        level: "HIGH",
        description: "소규모 건축 현장 포함 안전관리비 집행 이력 미비 시 과태료 및 입찰 제한.",
        actionPlan: "건설업 산업안전보건관리비 사용기준 준수 및 안전장비 구매 영수증 전수 관리."
      },
      {
        title: "건설공제조합 보증서 발급 한도 및 신용평가",
        level: "MEDIUM",
        description: "계약보증·하자보수보증서 발급을 위한 기업 신용등급 관리 및 재무제표 개선 필요.",
        actionPlan: "결산 전 부채비율 및 유동비율 관리를 위한 세무사 합동 사전 재무 컨설팅."
      }
    ],
    growthStrategy: "전문건설공제조합 금융 지원 및 그린리모델링 사업자 등록을 통한 정부 보조금 연계 공사를 수주하세요."
  },

  "서비스": {
    category: "서비스업 / 미용 / 교육 / 기타",
    icon: "Briefcase",
    summary: "고객 맞춤형 세무 혜택, 노란우산공제, 카드 가맹점 수수료 환급 및 지역 기반 마케팅이 성패를 좌우합니다.",
    keywords: ["노란우산공제", "카드수수료환급", "지역사랑상품권", "부가가치세", "고용창출기금"],
    keyIssues: [
      {
        title: "신규 사업자 우대 카드 수수료 차액 환급금 신청",
        level: "HIGH",
        description: "개업 초기 일반 수수료율이 적용된 후 소상공인 우대 수수료율 소급 적용 시 발생하는 차액 환급 혜택.",
        actionPlan: "여신금융협회(카드매출정보 통합조회)를 통해 매반기 우대수수료 환급 계좌 확인 및 신청."
      },
      {
        title: "소상공인 노란우산공제 절세 및 소득공제 혜택",
        level: "HIGH",
        description: "연간 최대 500만원 소득공제 및 압류 금지 자금 마련 혜택. 지자체별 가입 장려금(월 1~2만원) 추가 제공.",
        actionPlan: "노란우산공제 신규 가입 및 희망드림 장려금 함께 신청."
      },
      {
        title: "청년 고용 및 정규직 채용 지원금 지원",
        level: "MEDIUM",
        description: "청년 일자리 도약 장려금 등 정규직 채용 시 1인당 최대 연 720만원 지원 혜택.",
        actionPlan: "고용노동부 워크넷 승인 후 인력 채용 진행하여 기금 수령."
      }
    ],
    growthStrategy: "지역 신용보증재단 100% 보증 특례대출 및 지자체 이차보전(이과지원 2~3% p) 대출을 우선으로 신청하세요."
  }
};

// 기본 업태 fallback
export function getIndustryIssueData(businessTypeStr, itemTypeStr) {
  const combinedStr = `${businessTypeStr || ''} ${itemTypeStr || ''}`.trim();
  
  if (combinedStr.includes("음식") || combinedStr.includes("식당") || combinedStr.includes("외식") || combinedStr.includes("카페") || combinedStr.includes("베이커리")) {
    return INDUSTRY_ISSUES_DB["음식"];
  }
  if (combinedStr.includes("정보") || combinedStr.includes("소프트웨어") || combinedStr.includes("개발") || combinedStr.includes("IT") || combinedStr.includes("통신") || combinedStr.includes("포털")) {
    return INDUSTRY_ISSUES_DB["정보통신"];
  }
  if (combinedStr.includes("제조") || combinedStr.includes("공업") || combinedStr.includes("생산") || combinedStr.includes("가공") || combinedStr.includes("조립")) {
    return INDUSTRY_ISSUES_DB["제조"];
  }
  if (combinedStr.includes("도소매") || combinedStr.includes("소매") || combinedStr.includes("도매") || combinedStr.includes("유통") || combinedStr.includes("무역") || combinedStr.includes("전자상거래") || combinedStr.includes("통신판매")) {
    return INDUSTRY_ISSUES_DB["도소매"];
  }
  if (combinedStr.includes("건설") || combinedStr.includes("건축") || combinedStr.includes("토목") || combinedStr.includes("인테리어") || combinedStr.includes("시공")) {
    return INDUSTRY_ISSUES_DB["건설"];
  }
  
  // Default to Service industry
  return {
    ...INDUSTRY_ISSUES_DB["서비스"],
    category: businessTypeStr ? `${businessTypeStr} (${itemTypeStr || '일반'})` : "일반 서비스 및 경영",
  };
}
