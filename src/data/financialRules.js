// 사업자 맞춤형 금융 업무 및 혜택 DB
export const FINANCIAL_SERVICES_DB = [
  {
    id: "policy_loan_sojin",
    title: "소상공인 정책자금 (소진공 융자)",
    category: "정책자금 / 대출",
    badge: "초저금리 우대",
    target: "전업종",
    minAgeMonths: 0,
    summary: "소상공인시장진흥공단에서 지원하는 연 2~3%대 저금리 운전자금 및 대환대출 지원",
    details: [
      "청년고용연계 자금: 대표자 만 39세 이하 또는 청년 근로자 고용 시 금리 추가 우대",
      "혁신성장촉진자금: 스마트 기술 도입 및 수출 기업 대상 최대 1억원 지원",
      "대환대출: 고금리(7% 이상) 대출을 저금리 민간/정부 융자로 전환 지원"
    ],
    linkText: "소상공인 정책자금 공식 신청",
    url: "https://ols.semas.or.kr/"
  },
  {
    id: "shinbo_guarantee",
    title: "지역 신용보증재단 100% 보증서 대출",
    category: "보증 / 대출",
    badge: "담보 없이 가능",
    target: "전업종",
    minAgeMonths: 0,
    summary: "부동산 담보가 부족한 사업자를 위해 지자체 신용보증재단이 85~100% 신용을 보증해주는 보증서 대출",
    details: [
      "지자체 이차보전 사업과 연계 시 1.5%~2.5%p 이자 보조 혜택 제공",
      "창업 후 3년 이내 신규 사업자 대상 초기 자금 3,000만원~5,000만원 한도 우선 부여",
      "사업자등록증, 부가가치세 과세표준증명원(신규는 매출 증빙) 제출"
    ],
    linkText: "지역신용보증재단 통합안내",
    url: "https://www.koreg.or.kr/"
  },
  {
    id: "card_vat_account",
    title: "사업자 전용 통장 및 VAT 매입세액 자동 안심계좌",
    category: "금융 계좌 / 세무",
    badge: "세무 필수",
    target: "전업종",
    minAgeMonths: 0,
    summary: "카드 매출 정산 계좌 지정 및 부가가치세 납부용 전용 계좌 세팅으로 종합소득세/VAT 혜택 누적",
    details: [
      "국세청 홈택스에 사업용 계좌 및 사업자 카드 사전 등록 필수",
      "신규 개업 사업자 우대 카드 수수료율 소급 적용 및 차액 세액공제",
      "주요 시중은행(신한, KB, 하나, 우리, IBK) 소상공인 우대 금융 수수료 면제"
    ],
    linkText: "국세청 홈택스 사업용계좌 등록",
    url: "https://www.hometax.go.kr/"
  },
  {
    id: "tech_guarantee_kibo",
    title: "기술보증기금(KIBO) IT·제조 R&D 보증",
    category: "IT / 제조 특화",
    badge: "최대 5억원",
    target: "정보통신, 제조",
    minAgeMonths: 0,
    summary: "특허, 특화 기술력, 연구개발(R&D) 실적 또는 IT 소프트웨어 개발력을 갖춘 기술형 창업기업 특례",
    details: [
      "벤처기업 확인 및 INNO-BIZ(기술혁신형 중소기업) 인증 우대 연계",
      "IP(지식재산권) 담보대출 및 기술평가 보증으로 높은 한도 지원",
      "개발 인력 4대보험 가입 이력 및 사업계획서 심사"
    ],
    linkText: "기술보증기금 Cyber 영업점",
    url: "https://www.kibo.or.kr/"
  },
  {
    id: "food_cost_loan",
    title: "외식업 식재료 구매자금 및 시설 개선 저리 대출",
    category: "음식점업 특화",
    badge: "금리 1.5%",
    target: "음식",
    minAgeMonths: 0,
    summary: "농림축산식품부 및 지자체 연계 외식업체 식재료 공동구매 및 주방 시설 개보수 자금 지원",
    details: [
      "국산 농수축산물 구매 실적 증빙 시 연 1.5~2.0% 고정금리 융자",
      "음식점 위생등급제 지정업소 대상 환경개선 보조금 지원 (지자체별 최대 200만원)",
      "의제매입세액 공제율(음식점업 개인 8/108, 법인 6/106) 한도 최대 활용 세무 세팅"
    ],
    linkText: "AT 농식품수출지원정보센터",
    url: "https://www.at.or.kr/"
  },
  {
    id: "noran_woosan",
    title: "노란우산공제 절세 및 희망드림 장려금",
    category: "절세 / 노후",
    badge: "연 500만원 소득공제",
    target: "전업종",
    minAgeMonths: 0,
    summary: "소상공인·소기업 대표자의 목돈 마련, 사업 부도 시 압류 방지 및 연간 최대 500만원 소득공제 혜택",
    details: [
      "지자체별 소상공인 희망드림 장려금 지원 (1년 간 매월 1~2만원 추가 적립 지원)",
      "공제금 복리 이자 적용 및 협약 은행 잔액 기반 저리 무담보 대출 활용",
      "종합소득세 신고 시 법정 절세 효과 최대화"
    ],
    linkText: "노란우산공제 공식 웹사이트",
    url: "https://www.8888.or.kr/"
  }
];

export function getRecommendedFinancialServices(parsedCert) {
  const { businessType, itemType, registrationDate } = parsedCert;
  const combinedType = `${businessType || ''} ${itemType || ''}`;

  // Calculate business age in months
  let ageInMonths = 12;
  if (registrationDate && registrationDate.length === 8) {
    const year = parseInt(registrationDate.substring(0, 4), 10);
    const month = parseInt(registrationDate.substring(4, 6), 10);
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    ageInMonths = (currentYear - year) * 12 + (currentMonth - month);
  }

  return FINANCIAL_SERVICES_DB.map(service => {
    let relevanceScore = 80;
    let matchReason = "전업종 공통 필수 금융 항목입니다.";

    if (service.target === "전업종") {
      relevanceScore = 90;
    } else if (service.target.includes("정보통신") && (combinedType.includes("정보") || combinedType.includes("소프트웨어") || combinedType.includes("IT"))) {
      relevanceScore = 99;
      matchReason = "정보통신/소프트웨어 업태에 최적화된 기술보증 특례 자금입니다.";
    } else if (service.target.includes("제조") && (combinedType.includes("제조") || combinedType.includes("공업"))) {
      relevanceScore = 98;
      matchReason = "제조업 공정 및 시설 자금 우대 금융 상품입니다.";
    } else if (service.target.includes("음식") && (combinedType.includes("음식") || combinedType.includes("외식") || combinedType.includes("식당"))) {
      relevanceScore = 98;
      matchReason = "외식업체 식재료 및 매장 위생 환경 개선 세무/금융 혜택입니다.";
    }

    if (ageInMonths <= 36) {
      if (service.id === "shinbo_guarantee" || service.id === "policy_loan_sojin") {
        relevanceScore += 5;
        matchReason += " (창업 3년 이내 초기 사업자 우선 지원 대상)";
      }
    }

    return {
      ...service,
      relevanceScore,
      matchReason
    };
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);
}
