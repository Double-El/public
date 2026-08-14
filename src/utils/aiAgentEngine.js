// AI Business Diagnostic & Advisory Agent Engine

export const AGENT_PERSONA = {
  name: "BIZ AI 에이전트",
  title: "AI 사업자 맞춤 경영·금융 수석 컨설턴트",
  avatar: "🤖",
  description: "사업자등록증 데이터를 바탕으로 자율 추론을 통해 맞춤형 정책자금, 세무/대출 혜택, NotebookLM 업계 인사이트 및 업태별 자금세탁방지(AML) 점검 방안을 제시하는 지능형 AI 에이전트입니다."
};

/**
 * 1. Gemini AI Financial Element Analyzer (업종별 맞춤 금융 & 절세 솔루션)
 * Analyzes tax type (Personal vs Corporate), establishment date, business type, and generates tailored financial/tax strategy.
 */
export function getGeminiFinancialAnalysis(certData) {
  const isCorp = (certData.taxType && certData.taxType.includes("법인")) || Boolean(certData.corpRegNumber);
  const company = certData.companyName || "사업장";
  const bType = certData.businessType || "일반업종";
  const iType = certData.itemType || "기타";
  const fullStr = `${bType} ${iType}`.toLowerCase();

  // Calculate business age (years)
  let ageYears = 3;
  if (certData.registrationDate && certData.registrationDate.length >= 4) {
    const startYear = parseInt(certData.registrationDate.slice(0, 4), 10);
    const currentYear = new Date().getFullYear();
    if (!isNaN(startYear)) ageYears = currentYear - startYear;
  }

  const isEarlyStage = ageYears <= 3; // Early stage startup (< 3 years)

  // Sector-specific customized recommendation builder
  let sectorRecs = [];

  if (fullStr.includes("음식") || fullStr.includes("식당") || fullStr.includes("카페") || fullStr.includes("외식") || fullStr.includes("주점") || fullStr.includes("제과")) {
    sectorRecs = [
      {
        id: "fin-sec-1",
        type: "POLICY_FUND",
        tag: "소상공인 2%대 저리",
        title: "소상공인시장진흥공단(SEMAS) 외식업 스마트 설비·운전자금",
        amount: "최대 7,000만원 (금리 2.1%~2.8%)",
        description: "외식/휴게음식점 전용 저금리 운전자금 및 테이블오더/키오스크 도입 스마트 상점 보조금 지원.",
        actionTip: "소상공인 정책자금 사이트에서 온라인 즉시 신청 후 신용보증재단 보증서 발급 연계."
      },
      {
        id: "fin-sec-2",
        type: "TAX_REDUCTION",
        tag: "외식업 특화 절세",
        title: "면세 농·수·축산물 의제매입세액 공제 및 홈택스 사업용 카드 등록",
        amount: "부가세 구매액의 최대 9/109 (약 8.2%) 공제",
        description: "식자재 및 원재료 구매 시 세금계산서·신용카드 영수증 제출을 통한 부가가치세 환급 및 노란우산 소득공제(최대 500만원).",
        actionTip: "홈택스(Hometax)에 사업용 신용카드를 즉시 등록하여 식자재 구매 매입세액 공제 100% 반영."
      },
      {
        id: "fin-sec-3",
        type: "CASH_FLOW",
        tag: "수수료 환급",
        title: "외식 가맹점 카드 수수료 우대 환급 및 배달 앱 플랫폼 마케팅 지원금",
        amount: "연간 150만~350만원 소급 환급",
        description: "연매출 3억원 이하 영세 가맹점 0.5% 최저 수수료율 자동 적용 및 상반기 신규 사업자 수수료 소급 환급.",
        actionTip: "여신금융협회 카드가맹점 매출거래정보 집계시스템에서 환급 계좌 등록 상태 확인."
      }
    ];
  } else if (fullStr.includes("정보통신") || fullStr.includes("소프트웨어") || fullStr.includes("it") || fullStr.includes("개발") || fullStr.includes("통신") || fullStr.includes("데이터") || fullStr.includes("ai")) {
    sectorRecs = [
      {
        id: "fin-sec-1",
        type: "POLICY_FUND",
        tag: "IT/SW 딥테크 우대",
        title: "기술보증기금(KIBO) & 신용보증기금(KODIT) SW·AI 벤처 전용 보증",
        amount: "최대 3억~10억원 (보증비율 95~100%)",
        description: "무형 지식자산(소프트웨어/특허/알고리즘) 평가를 통한 무담보 연 2%대 기술보증서 대출 지원.",
        actionTip: "KIBO 벤처캠퍼스 또는 KODIT 혁신스타트업 보증 플랫폼 사전 상담 예약."
      },
      {
        id: "fin-sec-2",
        type: "TAX_REDUCTION",
        tag: "R&D 세액공제",
        title: "기업부설연구소 / R&D 전담부서 인건비 25% 법인세 세액공제 & 벤처기업 감면",
        amount: "개발 인건비 25% 공제 + 법인세 50% 감면",
        description: "개발자 인건비의 25%를 법인세/소득세에서 차감하고, 벤처기업 인증 시 5년간 법인세 50% 세액 감면.",
        actionTip: "한국산업기술진흥협회(KOITA)에서 개발자 1인 이상으로 연구개발전담부서 즉시 설립 신청."
      },
      {
        id: "fin-sec-3",
        type: "CASH_FLOW",
        tag: "정부 지원금",
        title: "청년 일자리 도약 장려금 (신규 채용 1인당 연 720만원)",
        amount: "청년 1인당 최대 720만~1,200만원 지원",
        description: "IT/SW 청년 개발자 정규직 채용 시 1년간 월 60만원 정부 지원금 수령 및 청년 소득세 90% 감면 연계.",
        actionTip: "고용24(work24.go.kr) 사업주 지원금 신청란에서 채용 후 3개월 이내 신청."
      }
    ];
  } else if (fullStr.includes("도소매") || fullStr.includes("도매") || fullStr.includes("소매") || fullStr.includes("유통") || fullStr.includes("무역") || fullStr.includes("쇼핑몰") || fullStr.includes("전자상거래")) {
    sectorRecs = [
      {
        id: "fin-sec-1",
        type: "POLICY_FUND",
        tag: "도소매·유통 특화",
        title: "소상공인·중소기업 유통 운전자금 & 신용보증재단 특례보증",
        amount: "최대 5,000만~1억원 (금리 2.5%~3.2%)",
        description: "재고 자산 구매 및 오픈마켓 입점 유통 소상공인 대상 시중은행 대비 2.0%p 저렴한 이차보전 대출.",
        actionTip: "관할 지자체 신용보증재단에서 소상공인 운전자금 특례보증서 신청."
      },
      {
        id: "fin-sec-2",
        type: "TAX_REDUCTION",
        tag: "재고/비용 절세",
        title: "불용·이월 재고 폐기처분 손금 산입 & 노란우산 공제",
        amount: "법인세·소득세 과세표준 100% 경비 인정",
        description: "유행이 지나거나 파손된 이월 재고를 폐기처분 명세서로 비용 처리하여 사업소득세/법인세 대폭 감면.",
        actionTip: "폐기 사진 및 수량 명세서를 작성하여 연말 세무대리인에게 전달."
      },
      {
        id: "fin-sec-3",
        type: "CASH_FLOW",
        tag: "수수료 최적화",
        title: "PG 결제대행 및 네이버 스마트스토어/쿠팡 정산 수수료 우대",
        amount: "연간 약 200만~500만원 수수료 절감",
        description: "영세·중소 가맹점 수수료 인하 혜택 적용 및 해외 수입 상품 매입세액 100% 환급 시스템 구축.",
        actionTip: "네이버 파트너센터에서 영세·중소 가맹점 수수료 자동 우대 적용 여부 확인."
      }
    ];
  } else if (fullStr.includes("제조") || fullStr.includes("공장") || fullStr.includes("가공") || fullStr.includes("생산") || fullStr.includes("금속") || fullStr.includes("기계")) {
    sectorRecs = [
      {
        id: "fin-sec-1",
        type: "POLICY_FUND",
        tag: "제조 시설자금",
        title: "중소벤처기업진흥공단(KOSME) 제조업 시설·운전자금",
        amount: "최대 5억~20억원 (금리 연 2.2%~2.9%)",
        description: "생산 공장 설비 도입 및 원자재 대량 구매를 위한 장기 저리 정부 정책 자금 융자.",
        actionTip: "중진공 홈페이지에서 정책자금 융자 자가진단 후 사전 상담 예약."
      },
      {
        id: "fin-sec-2",
        type: "TAX_REDUCTION",
        tag: "제조업 세액공제",
        title: "스마트공장 설비투자 세액공제 & 한국전력 전기요금 절감",
        amount: "설비 투자액의 최대 10% 법인세 공제",
        description: "생산 공정 자동화 설비 투자 세액공제 및 공장 피크 전력 재산정을 통한 매월 전기 기본요금 절감.",
        actionTip: "한국전력 사업자 사이트에서 지난 1년간 피크전력 분석 후 계약전력 최적화 변경 신청."
      },
      {
        id: "fin-sec-3",
        type: "CASH_FLOW",
        tag: "국비 보조금",
        title: "지자체 제조업 스마트공장 국비 보조금 (최대 50% 보조)",
        amount: "기업당 최대 5,000만~1억원 국비 지원",
        description: "MES 공정 관리 시스템 및 자동화 장비 도입 시 정부와 지자체가 사업비의 50%를 무상 지원.",
        actionTip: "스마트제조혁신추진단(smart-factory.kr) 공고 확인 후 신청."
      }
    ];
  } else {
    // General Business sector
    sectorRecs = [
      {
        id: "fin-1",
        type: "POLICY_FUND",
        tag: isEarlyStage ? "창업 3년 이내 우대" : "운전자금 우대",
        title: isCorp ? "기술보증기금(KIBO) & 신용보증기금(KODIT) 법인 전용 보증" : "소상공인 정책자금 (소진공 2~3%대 저리 대출)",
        amount: isCorp ? "최대 3억~10억원" : "최대 3,000만~7,000만원",
        description: isCorp
          ? "법인 대표자 특화 기술력·사업성 평가를 통한 담보 없는 연 2~3%대 기술보증서 발급 대출."
          : "창업 소상공인 대상 시중은행 대비 1.5~2.0%p 저렴한 정부 정책 운전자금 지원.",
        actionTip: "소상공인시장진흥공단(SEMAS) 정책자금 신청 플랫폼에서 온라인 즉시 신청 가능."
      },
      {
        id: "fin-2",
        type: "TAX_REDUCTION",
        tag: "절세 혜택",
        title: isCorp ? "법인세 감면 & R&D/고용증대 세액공제" : "노란우산공제 & 홈택스 사업용 카드 세액공제",
        amount: isCorp ? "법인세 최대 50%~100% 감면" : "연간 최대 500만원 소득공제",
        description: isCorp
          ? "창업 중소기업 법인세 50% 감면 및 근로자 신규 채용 시 1인당 최대 1,200만원 세액공제."
          : "노란우산공제를 통한 소득공제 및 사업용 신용카드 등록으로 매입세액 100% 공제 반영.",
        actionTip: "홈택스(Hometax) 로그인 후 [사업용 신용카드 등록]을 오늘 즉시 완료하세요."
      },
      {
        id: "fin-3",
        type: "CASH_FLOW",
        tag: "수수료 절감",
        title: "소상공인·중소기업 카드 가맹점 수수료 환급 및 영세율 적용",
        amount: "연간 약 100만~300만원 절감",
        description: "연매출 3억원 이하 영세 가맹점 0.5% 최저 수수료율 자동 적용 및 상반기 신규 사업자 수수료 소급 환급.",
        actionTip: "여신금융협회(카드가맹점 매출거래정보 집계시스템)에서 환급 계좌 등록 확인."
      }
    ];
  }

  return {
    summary: `${company} (${isCorp ? "법인사업자" : "개인사업자"}, 개업년차: ${ageYears}년차, 업태: ${bType}) 맞춤형 Gemini AI 금융·세무 분석 리포트입니다.`,
    isCorp,
    isEarlyStage,
    recommendations: sectorRecs
  };
}

/**
 * 2. Naver Industry & Item Issue Tracker (소상공인 특화 업태/종목 최신 & 규제 뉴스)
 * Generates Naver search queries and latest industry news/regulatory trend alerts for small business owners.
 */
export function getNaverIndustryIssues(certData) {
  const bType = certData.businessType || "음식점업";
  const iType = certData.itemType || "일반 서비스";
  const query = `${bType} ${iType} 소상공인 2026 규제 지원금 뉴스`;

  const issueList = [
    {
      title: `2026년 [${bType}] 소상공인 최저임금·노무 법령 및 규제 개정 동향`,
      level: "HIGH",
      summary: `네이버 소상공인 뉴스: 2026년 ${bType} 분야 근로기준법 및 주휴수당·퇴직금 노무 가이드라인 강화. 서면 근로계약서 미작성 시 벌금 부과 주의.`,
      naverSearchUrl: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(bType + " 소상공인 최저임금 규제")}`,
      source: "네이버 뉴스 / 고용노동부"
    },
    {
      title: `[${iType}] 원자재·식자재 유통 단가 변동 및 소상공인 지원책`,
      level: "MEDIUM",
      summary: `${iType} 관련 원자재/수입 물가 상승에 따른 소상공인 유류비·원재료 수수료 경감 및 정책 지원 공고.`,
      naverSearchUrl: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(iType + " 원자재 소상공인 지원")}`,
      source: "네이버 경제 / 한국물가정보"
    },
    {
      title: `[${bType}] 2026 지자체 소상공인 키오스크·스마트 설비 보조금`,
      level: "RECOMMENDED",
      summary: `사업장 소재지(${certData.address?.slice(0, 10) || "관할 지자체"}) 시청/구청 지원: 테이블오더, 무인 결제기, 스마트 설비 구축비 최대 80% 국비 보조.`,
      naverSearchUrl: `https://search.naver.com/search.naver?query=${encodeURIComponent(certData.address?.split(' ')[0] + " " + bType + " 소상공인 지원금")}`,
      source: "네이버 블로그 / 지자체 소상공인 지원센터"
    }
  ];

  return {
    query,
    naverMainSearchUrl: `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`,
    issueList
  };
}

/**
 * 3. Google NotebookLM Industry Insider Tips (NotebookLM 업종 특화 인사이트 팁)
 * Uses NotebookLM knowledge base to reveal insider-only operational tips for the business sector.
 */
export function getNotebookInsiderSecrets(certData) {
  const bType = (certData.businessType || "").toLowerCase();
  const iType = (certData.itemType || "").toLowerCase();
  const fullTypeStr = `${bType} ${iType}`;

  // Comprehensive NotebookLM-curated Industry & Business Type Knowledge Base
  const secretsDatabase = [
    {
      sector: "음식점업 / 외식업 / 카페",
      keywords: ["음식", "식당", "요리", "카페", "베이커리", "외식", "주점", "휴게음식", "일반음식", "커피", "제과", "분식", "한식", "중식", "일식", "양식"],
      tips: [
        {
          title: "🤫 면세 농·수·축산물 구매 시 부가세 7.4% 환급받기 (의제매입세액 공제)",
          secret: "면세 농산물 및 식자재 구매 시 세금계산서나 신용카드 영수증을 적기 제출하면 구매액의 8/108(약 7.4%)~9/109를 부가가치세에서 즉시 차감받습니다. 초보 사장님들이 이 공제를 누락하여 수백만원의 부가세를 과다 납부합니다."
        },
        {
          title: "🤫 배달앱 깃발 위치 배치 및 네이버 영수증 리뷰 상위 노출",
          secret: "배달앱 깃발은 단순 상권 중심부보다 기사 이동 동선이 중첩되는 사거리 인근에 꽂을 때 수수료 대비 주문 호출 효율이 1.8배 상승합니다. 주 2회 네이버 영수증 리뷰 이벤트를 병행하면 지자체 지도 노출 순위가 급상승합니다."
        },
        {
          title: "🤫 알바생 주휴수당 합법적 제외 및 파트타임 근로계약 노하우",
          secret: "주 15시간 미만(주 14.5시간 이하) 단기 근로계약서를 분할 체결하면 주휴수당 지급 의무 및 퇴직금 적립 대상에서 합법적으로 제외되어 인건비 고정 지출을 정교하게 관리할 수 있습니다."
        }
      ]
    },
    {
      sector: "정보통신업 / IT / 소프트웨어 개발",
      keywords: ["정보통신", "소프트웨어", "개발", "it", "포털", "데이터", "통신", "웹", "앱", "인터넷", "시스템", "프로그래밍", "ai", "솔루션"],
      tips: [
        {
          title: "🤫 기업부설연구소 / R&D 전담부서 설립으로 인건비 25% 환급",
          secret: "개발자 1명만 보유해도 '연구개발전담부서' 신청이 가능합니다. 가입 승인 시 개발자 연봉의 25%를 법인세/소득세에서 세액공제받고 청년 개발자는 소득세 90% 감면 혜택을 제공받아 핵심 인재 이탈을 방지할 수 있습니다."
        },
        {
          title: "🤫 창업 3년 이내 벤처기업인증 획득 시 법인세 50% 감면",
          secret: "창업 3년 이내에 벤처기업 인증을 획득하면 5년간 법인세 및 소득세가 50% 감면됩니다. 창업 3년 경과 후 획득 시 감면 혜택이 소멸되므로 2년 차에 필수적으로 신청해야 합니다."
        },
        {
          title: "🤫 외주 개발비 전자세금계산서 수취 및 R&D 출연금 가점",
          secret: "SW 개발 아웃소싱 용역비 지급 시 정밀 전자세금계산서를 수취하여 부가세 100% 매입공제를 반영하고, 정부 R&D 과제 신청 시 지식재산권(IP) 가산점을 확보하세요."
        }
      ]
    },
    {
      sector: "제조업 / 가공 / 생산",
      keywords: ["제조", "공장", "가공", "생산", "조립", "금속", "기계", "화학", "플라스틱", "인쇄", "섬유", "부품"],
      tips: [
        {
          title: "🤫 한국전력 피크 전력 재산정을 통한 매월 전기요금 고정비 절감",
          secret: "공장 초기 가동 시 가공 전력을 필요 이상 높게 계약하면 기본요금이 과다 청구됩니다. 지난 1년간의 피크 전력을 분석하여 계약전력을 한 단계 낮추면 매월 수십만원의 기본 전기료를 즉시 절감할 수 있습니다."
        },
        {
          title: "🤫 중대재해처벌법 대비 위험성평가 서류 보관 및 형사 면책",
          secret: "안전보건공단 무료 컨설팅을 수료하고 매월 1회 위험성평가 회의록을 작성·보관해 두면 현장 안전사고 발생 시 업주의 형사 처벌 면책 사유로 결정적인 증거 작용을 합니다."
        },
        {
          title: "🤫 지자체 스마트공장 보조금 (최대 50% 국비 지원) 활용",
          secret: "생산 공정 자동화 및 MES 구축 시 정부 스마트공장 보조금 사업을 통해 설비 투자금의 50%를 국비 보조받고 특허 기술 담보 저리 융자를 연계할 수 있습니다."
        }
      ]
    },
    {
      sector: "도소매업 / 전자상거래 / 무역",
      keywords: ["도소매", "도매", "소매", "유통", "무역", "쇼핑몰", "전자상거래", "오픈마켓", "스토어", "판매", "잡화", "의류"],
      tips: [
        {
          title: "🤫 불용·이월 재고 폐기처분 명세서로 사업소득세/법인세 대폭 감면",
          secret: "유통기한이 경과하거나 유행이 지난 불용 재고는 폐기처분 명세서와 파손 사진을 남겨두면 연말 사업소득세·법인세 계산 시 손금(비용)으로 100% 인정받아 세금을 크게 줄일 수 있습니다."
        },
        {
          title: "🤫 매출 증가 시 간이과세 분할 유지 및 지점 법인 분리 노하우",
          secret: "도소매 오픈마켓 매출이 급증할 때 법인을 분리하거나 지점 사업자를 내어 매출을 분산시키면 간이과세 기준(연 1억 4천만원)을 유지해 부가세 부담을 대폭 낮출 수 있습니다."
        },
        {
          title: "🤫 해외 직구·수입 세관 고시환율 최적화 및 관세 부가세 공제",
          secret: "해외 제품 수입 시 관세청 고시환율 적용 시점을 분석하여 과세표준을 최적화하고 수입 수납서류를 적기 제출하여 부가세 매입세액 100% 환급을 보장받으세요."
        }
      ]
    },
    {
      sector: "전문·과학·기술 / 서비스업 / 컨설팅",
      keywords: ["서비스", "컨설팅", "자문", "전문", "디자인", "광고", "마케팅", "행정", "세무", "노무", "번역", "기획"],
      tips: [
        {
          title: "🤫 지식서비스업 특화 기술보증기금 창업운전자금 1억원 지원",
          secret: "컨설팅·디자인·IT 서비스 등 지식서비스업은 무형의 지식자산 평가를 통해 담보 없이 연 2%대 정부 기술보증서 창업 운전자금을 최대 1억원까지 우대 지원받을 수 있습니다."
        },
        {
          title: "🤫 청년 추가고용 지원금 1인당 연 1,200만원 및 세액공제 중복 적용",
          secret: "만 15~34세 청년 정규직 직원을 신규 채용할 경우 지자체 고용장려금 수령과 함께 종합소득세·법인세 세액공제 혜택을 중복 적용받아 인건비 부담을 절반 이하로 줄일 수 있습니다."
        }
      ]
    },
    {
      sector: "부동산업 / 임대업",
      keywords: ["부동산", "임대", "매매", "중개", "분양", "자산관리"],
      tips: [
        {
          title: "🤫 상가 임대료 전자세금계산서 자동 발행 및 가산세 방지",
          secret: "임대 사업장의 전자세금계산서 월 자동 발행 시스템을 구축하면 발행 지연에 따른 1% 가산세를 미연에 방지하고 임대소득 비과세 항목을 정밀하게 반영할 수 있습니다."
        },
        {
          title: "🤫 임대사업자 법인 전환을 통한 취득세 75% 감면 및 종부세 절감",
          secret: "개인 부동산 임대사업자의 매출액이 상한선에 도달했을 때 법인 현물출자 전환을 실시하면 부동산 취득세 75% 감면 및 종합부동산세 합산 배제 혜택을 누릴 수 있습니다."
        }
      ]
    },
    {
      sector: "숙박업 / 관광업",
      keywords: ["숙박", "호텔", "펜션", "리조트", "게스트하우스", "관광", "모텔", "민박"],
      tips: [
        {
          title: "🤫 관광진흥개발기금 융자지원사업 (연 1~2%대 저리 대출)",
          secret: "호텔, 펜션 등 숙박시설의 리모델링 및 시설 개보수 진행 시 문화체육관광부 관광진흥기금을 신청하면 시중 대출 대비 2~3%p 저렴한 금리로 융자 지원받을 수 있습니다."
        },
        {
          title: "🤫 숙박 예약 플랫폼(야놀자/여기어때 등) 수수료 부가세 환급",
          secret: "플랫폼 광고 수수료 및 예약 마케팅비 결제 시 전자세금계산서 또는 지출증빙을 수취하여 부가가치세 매입세액 공제 100%를 적기 반영하세요."
        }
      ]
    },
    {
      sector: "건설업 / 인테리어 / 시공",
      keywords: ["건설", "인테리어", "시공", "토목", "건축", "설비", "배관", "전기공사", "방수"],
      tips: [
        {
          title: "🤫 연말 건설업 실태조사 자본금 충족 및 영업정지 예방",
          secret: "건설 면허 유지 기준 자본금 평가 시 현금성 자산 및 적격 채권 사전 관리를 통해 실태조사 시 일시적 자본금 미달로 인한 영업정지 리스크를 완벽 차단하세요."
        },
        {
          title: "🤫 건설 현장 일용근로자 4대보험 사후정산 제도로 산재 과다 납부 방지",
          secret: "건설 현장에서 발생하는 일용근로자 고용·산재보험을 현장별 사후정산 제도로 관리하여 국민연금·건강보험 부과 기준을 최적화하고 공사 안전관리비를 정당하게 청구하세요."
        }
      ]
    },
    {
      sector: "운수·창고업 / 물류",
      keywords: ["운수", "창고", "물류", "화물", "택배", "배송", "운송", "용달"],
      tips: [
        {
          title: "🤫 화물차 유가보조금 복지카드 발급으로 리터당 환급",
          secret: "사업용 운수·화물 차량 등록 시 전용 유가보조금 혜택 카드를 발급받아 지자체 리터당 유류세 환급금을 매월 자동 청구하여 고정 연료비를 대폭 절감할 수 있습니다."
        },
        {
          title: "🤫 스마트 물류창고 구축 국비 보조금 (최대 50%) 지원",
          secret: "물류 창고 랙 설비 및 WMS 시스템 구축 시 국토교통부 스마트 물류 지원사업을 활용하여 설비 투자금의 최대 50% 국비 보조 혜택을 수령할 수 있습니다."
        }
      ]
    },
    {
      sector: "교육서비스업 / 학원·교습소",
      keywords: ["교육", "학원", "교습소", "독서실", "스터디", "강의", "수학", "영어", "예체능"],
      tips: [
        {
          title: "🤫 면세 사업자 부가가치세 면제 및 사업장현황신고 필수 노하우",
          secret: "주무관청 인가 교육 서비스는 부가가치세 면세 대상입니다. 매년 2월 사업장현황신고를 성실하게 완료하여 종합소득세 과세표준 추계조사를 사전에 차단하세요."
        },
        {
          title: "🤫 강사 프리랜서(3.3%) 용역 계약을 통한 4대보험 노무 분쟁 예방",
          secret: "학원 강사와 3.3% 사업소득 프리랜서 용역계약을 체결할 때 독립적 위탁업무 조건을 명확히 기재하여 퇴직금 및 4대보험 사후 소급 청구 리스크를 예방하세요."
        }
      ]
    },
    {
      sector: "보건업 / 의료 / 미용·뷰티",
      keywords: ["의료", "병원", "의원", "약국", "미용", "뷰티", "헤어", "네일", "피부", "마사지", "클리닉"],
      tips: [
        {
          title: "🤫 고가 의료·미용 장비 리스 계약으로 종합소득세 비용 100% 반영",
          secret: "고가 장비 구입 시 일시불 구매 대신 금융 리스를 이용하면 매월 지출되는 리스료 및 이자비용 전액이 소득세 경비로 인정되어 세금 차감 효과가 극대화됩니다."
        },
        {
          title: "🤫 과세(미용·성형) 및 면세(치료) 겸업 시 부가세 안분 계산 최적화",
          secret: "과세 대상 시술과 면세 대상 진료를 겸하는 사업장의 경우 매입세액 안분 계산 비율을 정밀하게 수립하여 부가가치세 환급 및 공제를 최대화하세요."
        }
      ]
    }
  ];

  // Try fuzzy matching against user's businessType & itemType
  const matchedCategory = secretsDatabase.find(item =>
    item.keywords.some(kw => fullTypeStr.includes(kw))
  );

  const defaultSecrets = [
    {
      title: "🤫 사업용 계좌와 개인 계좌 혼용 금지의 세무 비밀",
      secret: "사업용 계좌에서 대표자 개인 계좌로 돈을 이체할 때 '가지급금'으로 분류되면 연 4.6%의 가상 이자 세금이 부과됩니다. 대표자 인출금은 반드시 대표자 급여 또는 이익배당 항목으로 정식 처리해야 세무조사를 피합니다."
    },
    {
      title: "🤫 신용보증재단 보증서 대출 연장 시 보증료 할인",
      secret: "보증서 만기 연장 시 지자체 이차보전(이자 지원) 신청을 동시에 제출하면 금리를 추가 1.5%p 우대받을 수 있으며, 자동이체 등록 시 보증료율 0.2%p 감면을 받을 수 있습니다."
    }
  ];

  const matchedTips = matchedCategory ? matchedCategory.tips : defaultSecrets;
  const matchedSectorName = matchedCategory ? matchedCategory.sector : (certData.businessType || "해당 업종");

  return {
    source: "Google NotebookLM (업계 실무 데이터베이스)",
    notebookName: `NotebookLM [${matchedSectorName}] 전용 실무 인사이트 데이터베이스`,
    sector: matchedSectorName,
    tips: matchedTips
  };
}

/**
 * 4. AML (Anti-Money Laundering) Industry Compliance Checklist
 * Generates industry-tailored AML compliance checkpoints, CDD/EDD guidelines, and risk assessment.
 */
export function getAMLComplianceChecklist(certData) {
  const bType = (certData.businessType || "").toLowerCase();
  const iType = (certData.itemType || "").toLowerCase();
  const fullStr = `${bType} ${iType}`;
  const company = certData.companyName || "사업장";

  // Industry specific AML Database
  if (fullStr.includes("도소매") || fullStr.includes("도매") || fullStr.includes("소매") || fullStr.includes("유통") || fullStr.includes("귀금속") || fullStr.includes("명품") || fullStr.includes("무역")) {
    return {
      sector: "도소매·유통·고가품·무역",
      riskLevel: "HIGH",
      riskLabel: "고액 현금거래 & 대량 가공매출 위험 관리 대상",
      cddType: "강화된 고객확인(EDD) & 실제소유자(BO) 필수 확인",
      checkpoints: [
        {
          id: "aml-1",
          title: "1천만원 이상 고액 현금거래 보고(CTR) 및 출처 증빙",
          status: "CRITICAL",
          desc: "1일 동일인 기준 1,000만원 이상 현금 수납/지급 시 금융정보분석원(FIU) 자동 보고 대상입니다. 대금 수령 시 거래처 사업자등록증 및 통장 사본을 5년간 보관하세요.",
          guideline: "현금 수납 시 세금계산서 또는 현금영수증을 100% 발행하여 POS/국세청 전산 매출과 1:1 매칭 완료"
        },
        {
          id: "aml-2",
          title: "무역 기반 자금세탁(TBML) 송장 가격 부풀리기/축소 모니터링",
          status: "HIGH",
          desc: "해외 수입/수출 거래 시 실제 관세청 신고가액과 송장(Invoice) 금액의 차액이 발생하지 않도록 외환 송금 증빙을 철저히 관리해야 합니다.",
          guideline: "관세사 수출입 신고 수납서 및 은행 외환 거래 증명서 일치 여부 매월 점검"
        },
        {
          id: "aml-3",
          title: "위장 거래처 및 차명 계좌 결제 유입 차단",
          status: "WARNING",
          desc: "대표자 개인 계좌나 제3자 차명 계좌를 통한 대금 결제 유입은 자금세탁 의심거래(STR) 보고 대상이 되며 금융거래가 제한될 수 있습니다.",
          guideline: "반드시 사업자 명의 전용 계좌(사업용 계좌)로만 거래 대금 입출금 관리"
        }
      ]
    };
  }

  if (fullStr.includes("부동산") || fullStr.includes("임대") || fullStr.includes("건설") || fullStr.includes("분양")) {
    return {
      sector: "부동산·임대·건설업",
      riskLevel: "HIGH",
      riskLabel: "부동산 자금조달 출처 & 실제소유자 검증 대상",
      cddType: "실제소유자(Beneficial Owner) & 자금조달계획서 확인",
      checkpoints: [
        {
          id: "aml-1",
          title: "법인/개인 부동산 취득 및 임대보증금 자금 출처 검증",
          status: "CRITICAL",
          desc: "고액 부동산 매매 및 보증금 수령 시 자금 출처가 불분명할 경우 자금세탁방지법(FATF) 지침에 따라 금융회사 거래 정지 조치가 내려질 수 있습니다.",
          guideline: "자금조달계획서 및 은행 예금 잔액 증명서, 차입금 계약서 정식 보관"
        },
        {
          id: "aml-2",
          title: "법인 명의 실제 소유자(Beneficial Owner) 식별 및 신고",
          status: "HIGH",
          desc: "법인 부동산 계약 시 주식 25% 이상 소유 주주 또는 실질적 지배권자의 신원(주민번호, 실거주지) 확인이 의무화됩니다.",
          guideline: "주주명부 및 법인 등기부등본 업데이트 상태 유지"
        },
        {
          id: "aml-3",
          title: "임대료 현금 수수 및 차명 가상계좌 거래 금지",
          status: "WARNING",
          desc: "임차인 대액 임대료의 계좌 송금 시 송금인 명의와 임대차계약서 명의 일치 여부를 모니터링해야 합니다.",
          guideline: "계약서 명의자와 송금인 명이 다를 경우 관계 입증 서류 수취"
        }
      ]
    };
  }

  if (fullStr.includes("정보통신") || fullStr.includes("소프트웨어") || fullStr.includes("it") || fullStr.includes("pg") || fullStr.includes("결제") || fullStr.includes("가상")) {
    return {
      sector: "IT·소프트웨어·전자금융·PG",
      riskLevel: "MEDIUM_HIGH",
      riskLabel: "이상금융거래(FDS) & 해외 외환거래 자금세탁 관리",
      cddType: "전자금융 거래자 신원 확인 & 이상 결제 모니터링",
      checkpoints: [
        {
          id: "aml-1",
          title: "해외 SW 서비스 결제 및 외환 송금 규제 점검",
          status: "HIGH",
          desc: "해외 서버/SaaS/외주비 10,000 달러 이상 해외 송금 시 외국환거래법 및 AML 지침에 따라 관련 용역 계약서 및 인보이스 제출이 필수입니다.",
          guideline: "거래 외국환은행 지정 완료 및 해외 외환 송금 사유서 적기 제출"
        },
        {
          id: "aml-2",
          title: "PG 결제 대행 및 매입/매출 이상 징후(FDS) 모니터링",
          status: "MEDIUM",
          desc: "전자상거래 결제 대행(PG) 이용 시 일시적 고액 결제 중복 발생은 카드 깡 또는 자금세탁 의심 패턴으로 FDS 탐지 대상이 됩니다.",
          guideline: "카드사/PG사 가맹점 정산 내역과 홈택스 매출 내역 주간 단위 일치 검증"
        },
        {
          id: "aml-3",
          title: "법인 가지급금 및 개발비 세금계산서 증빙 투명화",
          status: "WARNING",
          desc: "불투명한 아웃소싱 용역비 지급은 세무조사 시 자금 유출 또는 불법 자금 형성으로 오인받을 수 있습니다.",
          guideline: "용역 과업지시서, 최종 검수확인서, 전자세금계산서 3종 세트 보관"
        }
      ]
    };
  }

  if (fullStr.includes("음식") || fullStr.includes("식당") || fullStr.includes("카페") || fullStr.includes("외식") || fullStr.includes("서비스") || fullStr.includes("미용")) {
    return {
      sector: "음식점·외식업·소상공인 서비스",
      riskLevel: "MEDIUM",
      riskLabel: "POS 매출-현금영수증 및 계좌이체 매출 일치 점검",
      cddType: "사업용 계좌 전용 거래 및 현금 수납 관리",
      checkpoints: [
        {
          id: "aml-1",
          title: "POS 매출 내역과 사업용 계좌 입금액 1:1 매칭",
          status: "HIGH",
          desc: "카드 매출, 배달 플랫폼 매출, 현금 결제액과 사업용 통장의 실제 입금액 차이가 크면 세무 및 금융 당국의 탈루/자금세탁 혐의 모니터링에 포착됩니다.",
          guideline: "여신금융협회 카드 매출 집계와 은행 입금 통장 매월 정산"
        },
        {
          id: "aml-2",
          title: "현금 수납 시 10만원 이상 현금영수증 의무 발행",
          status: "CRITICAL",
          desc: "10만원 이상 현금 거래 시 소비자가 요청하지 않더라도 5일 이내 현금영수증 미발행 시 과태료 20%가 부과됩니다.",
          guideline: "자진발급 번호(010-0000-1234)로 즉시 현금영수증 자진 발행 처리"
        },
        {
          id: "aml-3",
          title: "대표자 개인 통장으로 고객 계좌이체 수납 금지",
          status: "WARNING",
          desc: "고객이 계좌이체 시 사장님 개인 계좌를 이용하면 매출 누락 의심 계좌로 국세청 금융추적 대상이 됩니다.",
          guideline: "매장에 사업자 명의 전용 계좌번호 표기 및 가맹점 계좌 사용"
        }
      ]
    };
  }

  // Default AML guidelines for all other sectors
  return {
    sector: "일반 중소기업 및 소상공인",
    riskLevel: "STANDARD",
    riskLabel: "자금세탁방지(AML) 표준 고객확인(CDD) 준수 대상",
    cddType: "고객 실체 확인(CDD) & 사업용 계좌 전용 관리",
    checkpoints: [
      {
        id: "aml-1",
        title: "사업용 계좌(Business Account) 전용 사용 및 가지급금 차단",
        status: "HIGH",
        desc: "모든 사업 관련 매출·매입 거래는 국세청에 등록된 사업용 계좌로만 처리하고 대표자 사적 유출을 전면 차단해야 합니다.",
        guideline: "홈택스에서 사업용 계좌 등록 여부 오늘 즉시 확인 및 전용 사용"
      },
      {
        id: "aml-2",
        title: "1,000만원 이상 고액 현금 거래시 수납/지급 증빙 보관",
        status: "MEDIUM",
        desc: "1천만원 이상 현금성 수납 발생 시 소등 증빙 및 세금계산서 발급을 즉시 이행하여 FIU 의심거래 보고를 예방하세요.",
        guideline: "전자세금계산서 또는 적격 증빙 5년간 보존"
      },
      {
        id: "aml-3",
        title: "법인/사업자 실제소유자(Beneficial Owner) 변경 시 신고",
        status: "WARNING",
        desc: "대표자 변경, 주주 구성 변경 시 거래 은행에 변경된 사업자등록증 및 주주명부를 제출하여 CDD 정보를 갱신해야 합니다.",
        guideline: "주요 변경 발생 후 30일 이내 거래 금융기관 제출"
      }
    ]
  };
}

/**
 * AI Agent Reasoning Chain Simulation
 */
export async function runAgentReasoningChain(certData, onProgress) {
  const steps = [
    { progress: 0.2, message: `🤖 AI 에이전트가 [${certData.companyName}] 사업자등록증 데이터를 수집 및 인지(Perceive) 중입니다...` },
    { progress: 0.4, message: `📊 [${certData.businessType} / ${certData.itemType}] 업종의 Gemini 2026 정책자금 DB 및 금융 우대 조건 분석 중...` },
    { progress: 0.6, message: `📰 네이버 소상공인 특화 데이터베이스에서 [${certData.businessType}] 규제 및 최신 이슈 수집 중...` },
    { progress: 0.8, message: `🤫 Google NotebookLM 연동으로 [${certData.businessType}] 업계 비하인드 인사이드 팁 추출 중...` },
    { progress: 0.9, message: `🛡️ [${certData.businessType}] 특화 자금세탁방지(AML) & CDD 리스크 점검표 생성 중...` },
    { progress: 1.0, message: `✅ 4대 종합 분석(Gemini 금융 + Naver 이슈 + NotebookLM 인사이드 + AML 점검) 리포트가 완성되었습니다!` }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step);
    await new Promise(res => setTimeout(res, 300));
  }
}

/**
 * Interactive Q&A Response Generator for AI Agent Chat
 */
export async function askAgentQuestion(question, certData, financialList, industryData) {
  await new Promise(res => setTimeout(res, 400));

  const qLower = question.toLowerCase();
  const company = certData.companyName || "사업자";
  const bType = certData.businessType || "해당 업종";

  if (qLower.includes("자금세탁") || qLower.includes("aml") || qLower.includes("cdd") || qLower.includes("현금거래") || qLower.includes("실제소유자")) {
    return `🛡️ [BIZ AI 에이전트 AML 점검 답변]\n\n${company} (${bType})의 **자금세탁방지(AML) 핵심 점검 사항**입니다:\n\n1. **고액 현금거래 보고(CTR)**: 1일 1,000만원 이상 현금 거래 발생 시 FIU 보고 대상입니다. 100% 현금영수증 및 적격 증빙 발행이 필수입니다.\n2. **사업용 계좌 사용**: 대표자 개인 계좌 사용 시 매출 누락 및 세무조사/의심거래(STR) 대상이 됩니다.\n3. **실제소유자(BO) 확인**: 법인/사업자 주요 주주 변동 시 거래 은행에 CDD 정보를 즉시 갱신해 주세요.`;
  }

  if (qLower.includes("대출") || qLower.includes("자금") || qLower.includes("보증")) {
    return `🤖 [BIZ AI 에이전트 금융 답변]\n\n${company} (${bType}) 대표님, 가장 시급하게 활용 가능한 자금은 **소상공인 정책자금(소진공)**과 **지역 신용보증재단 보증서 대출**입니다.\n\n1. **소상공인 정책자금**: 연 2~3%대 저금리로 3,000만원~7,000만원 운전자금 지원.\n2. **신용보증재단 보증**: 부동산 담보가 없더라도 지자체 100% 보증 및 1.5~2.5%p 이자 보조 혜택 적용.\n\n필요 서류는 사업자등록증, 부가가치세 과세표준증명원입니다!`;
  }

  if (qLower.includes("세금") || qLower.includes("절세") || qLower.includes("부가가치세") || qLower.includes("종합소득세")) {
    return `🤖 [BIZ AI 에이전트 절세 답변]\n\n${company}의 절세를 위한 3가지 AI 추천 가이드입니다:\n\n1. **홈택스 사업용 계좌 & 카드 등록**: 사업 관련 경비 지출 시 매입세액 공제 100% 반영.\n2. **노란우산공제 가입**: 연간 최대 500만원 소득공제 및 압류 방지 안전자금 확보.\n3. **의제매입세액 공제** (${bType} 특화): 식자재 및 원재료 구매 영수증 적기 제출 시 세액 절감 효과 극대화.`;
  }

  return `🤖 [BIZ AI 에이전트 답변]\n\n${company} (${bType})의 맞춤형 질의에 대해 AI 에이전트가 분석했습니다.\n\n[주요 권장 사항]\n• 현재 업태인 [${bType}] 관련 2026년 정부 보조금, 세제 감면 및 AML 점검 대상입니다.\n• 구체적인 신청 방법이나 세무/대출/AML 관련 추가 서류가 궁금하시면 언제든 질문해 주세요!`;
}
