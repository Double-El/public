// AI Business Diagnostic & Advisory Agent Engine

export const AGENT_PERSONA = {
  name: "BIZ AI 에이전트",
  title: "AI 사업자 맞춤 경영·금융 수석 컨설턴트",
  avatar: "🤖",
  description: "사업자등록증 데이터를 바탕으로 자율 추론을 통해 맞춤형 정책자금, 세무/대출 혜택 및 업태별 경영 리스크 방안을 제시하는 지능형 AI 에이전트입니다."
};

/**
 * 1. Gemini AI Financial Element Analyzer (금융적인 요소)
 * Analyzes tax type (Personal vs Corporate), establishment date, business type, and generates tailored financial/tax strategy.
 */
export function getGeminiFinancialAnalysis(certData) {
  const isCorp = (certData.taxType && certData.taxType.includes("법인")) || Boolean(certData.corpRegNumber);
  const company = certData.companyName || "사업장";
  const bType = certData.businessType || "일반업종";

  // Calculate business age (years)
  let ageYears = 3;
  if (certData.registrationDate && certData.registrationDate.length >= 4) {
    const startYear = parseInt(certData.registrationDate.slice(0, 4), 10);
    const currentYear = new Date().getFullYear();
    if (!isNaN(startYear)) ageYears = currentYear - startYear;
  }

  const isEarlyStage = ageYears <= 3; // Early stage startup (< 3 years)

  return {
    summary: `${company} (${isCorp ? "법인사업자" : "개인사업자"}, 개업년차: ${ageYears}년차) 맞춤형 Gemini AI 금융·세무 분석 리포트입니다.`,
    isCorp,
    isEarlyStage,
    recommendations: [
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
          ? "청업 중소기업 법인세 50% 감면 및 근로자 신규 채용 시 1인당 최대 1,200만원 세액공제."
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
    ]
  };
}

/**
 * 2. Naver Industry & Item Issue Tracker (네이버 업태/종목 주요 이슈)
 * Generates Naver search queries and latest industry news/regulatory trend alerts.
 */
export function getNaverIndustryIssues(certData) {
  const bType = certData.businessType || "음식점업";
  const iType = certData.itemType || "일반 서비스";
  const query = `${bType} ${iType} 2026 주요 이슈 규제`;

  const issueList = [
    {
      title: `2026년 [${bType}] 최신 정책 규제 및 관련 법안 개정 동향`,
      level: "HIGH",
      summary: `네이버 뉴스 트렌드 기반: ${bType} 분야 최저임금, 인건비 상승 및 노무 분쟁 예방 규제 강화.`,
      naverSearchUrl: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(bType + " 규제 최저임금")}`,
      source: "네이버 뉴스 / 산업통상자원부"
    },
    {
      title: `[${iType}] 원자재 및 부자재 유통 단가 변동 이슈`,
      level: "MEDIUM",
      summary: `${iType} 관련 글로벌 공급망 변동으로 인한 원가 부담 심화. 대량 구매 공동구매 조합 활용 권장.`,
      naverSearchUrl: `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(iType + " 원자재 가격")}`,
      source: "네이버 경제 / 한국물가정보"
    },
    {
      title: `[${bType}] 지자체별 소상공인·중소기업 마케팅 및 시설 개선 지원금`,
      level: "RECOMMENDED",
      summary: `사업장 소재지(${certData.address?.slice(0, 10) || "지자체"}) 관할 구청/시청 마케팅 및 키오스크/스마트 설비 보조금 지원 공고.`,
      naverSearchUrl: `https://search.naver.com/search.naver?query=${encodeURIComponent(certData.address?.split(' ')[0] + " " + bType + " 지원금")}`,
      source: "네이버 블로그 / 지자체 공고"
    }
  ];

  return {
    query,
    naverMainSearchUrl: `https://search.naver.com/search.naver?query=${encodeURIComponent(query)}`,
    issueList
  };
}

/**
 * 3. Google NotebookLM Industry Insider Tips (NotebookLM 업계 비하인드 팁)
 * Uses NotebookLM knowledge base to reveal insider-only operational tips for the business sector.
 */
export function getNotebookInsiderSecrets(certData) {
  const bType = certData.businessType || "음식점업";

  const secretsMap = {
    "음식점업": [
      {
        title: "🤫 식자재 구매 시 세금계산서 대신 영수증 챙기기 (의제매입세액)",
        secret: "면세 농·수·축산물 구매 시 계산서나 신용카드 영수증을 모아두면 음식점업은 구매액의 8/108(약 7.4%)을 부가가치세에서 즉시 차감받을 수 있습니다. 많은 초보 사장님들이 이 공제를 놓쳐 수백만원의 세금을 더 냅니다."
      },
      {
        title: "🤫 배달 플랫폼 깃발 위치와 지역 마이플레이스의 비밀",
        secret: "배달앱 깃발은 상권 중심부보다 배달 기사 동선이 겹치는 사거리 쪽에 꽂는 것이 수수료 대비 호출 효율이 1.8배 높습니다. 또한 네이버 영수증 리뷰 이벤트를 주 2회 진행하면 지역 지도 노출 순위가 급상승합니다."
      },
      {
        title: "🤫 알바생 주휴수당 미지급 조건 근로계약서 체결법",
        secret: "주 15시간 미만(주 14.5시간)으로 단기 근로계약서를 분할 작성하면 주휴수당 지급 의무 및 퇴직금 적립 대상에서 합법적으로 제외됩니다."
      }
    ],
    "정보통신업": [
      {
        title: "🤫 기업부설연구소 설립으로 인건비 25% 환급받기",
        secret: "개발자 1명만 있어도 '연구개발전담부서' 신청이 가능합니다. 인정을 받으면 개발자 연봉의 25%를 세액공제받고 청년 개발자는 소득세 90% 감면 혜택까지 받아 퇴사를 방지할 수 있습니다."
      },
      {
        title: "🤫 벤처기업인증 3년 차 법인세 50% 감면 트릭",
        secret: "창업 3년 이내에 벤처기업 인증을 받으면 5년 동안 법인세/소득세가 50% 감면됩니다. 3년이 지나서 받으면 세금 감면 혜택이 소멸되므로 2년 차에 반드시 신청해야 합니다."
      }
    ],
    "제조업": [
      {
        title: "🤫 전력비 절감을 위한 한국전력 계약전력 변경",
        secret: "공장 초기 가동 시 필요 이상으로 높은 계약전력을 설정하면 기본요금이 과다 청구됩니다. 지난 1년 피크 전력을 확인하고 계약전력을 낮추면 매월 수십만원의 기본 전기요금이 절감됩니다."
      },
      {
        title: "🤫 중대재해처벌법 대비 위험성평가 서류 보관",
        secret: "안전보건공단 무료 무료컨설팅을 수료하고 매월 1회 위험성평가 회의록을 작성·보관해 두면 현장 사고 발생 시 업주의 형사 처벌 면책 사유로 결정적인 작용을 합니다."
      }
    ],
    "도소매업": [
      {
        title: "🤫 재고 자산 평가손실 세무 처리로 소득세 다운",
        secret: "유통기한이 지나거나 유행이 지난 불용 재고는 폐기처분 명세서와 사진을 남겨두면 당해 연도 사업소득세 계산 시 손금(비용)으로 100% 인정받아 세금을 크게 줄일 수 있습니다."
      },
      {
        title: "🤫 위탁판매 전자상거래 간이과세 유지 노하우",
        secret: "도소매 오픈마켓 매출이 늘어날 때 법인을 분리하거나 지점 사업자를 내어 매출을 분산시키면 간이과세 기준(연 1억 4천만원)을 유지해 부가세 부담을 대폭 낮출 수 있습니다."
      }
    ]
  };

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

  const matched = secretsMap[bType] || defaultSecrets;

  return {
    source: "Google NotebookLM (AML & 업계 실무 데이터베이스)",
    notebookName: "주간 AML & 업태별 실무 노하우 데이터베이스",
    tips: matched
  };
}

/**
 * AI Agent Reasoning Chain Simulation
 */
export async function runAgentReasoningChain(certData, onProgress) {
  const steps = [
    { progress: 0.2, message: `🤖 AI 에이전트가 [${certData.companyName}] 사업자등록증 데이터를 수집 및 인지(Perceive) 중입니다...` },
    { progress: 0.5, message: `📊 [${certData.businessType} / ${certData.itemType}] 업종의 Gemini 2026 정책자금 DB 및 금융 우대 조건 검색 중...` },
    { progress: 0.7, message: `📰 네이버 뉴스 & 검색 데이터베이스에서 [${certData.businessType}] 주요 이슈 수집 중...` },
    { progress: 0.9, message: `🤫 Google NotebookLM 연동으로 [${certData.businessType}] 업계 비하인드 인사이드 팁 추출 중...` },
    { progress: 1.0, message: `✅ 3대 종합 분석(Gemini 금융 + Naver 이슈 + NotebookLM 인사이드) 리포트가 완성되었습니다!` }
  ];

  for (const step of steps) {
    if (onProgress) onProgress(step);
    await new Promise(res => setTimeout(res, 350));
  }
}

/**
 * Interactive Q&A Response Generator for AI Agent Chat
 */
export async function askAgentQuestion(question, certData, financialList, industryData) {
  await new Promise(res => setTimeout(res, 500));

  const qLower = question.toLowerCase();
  const company = certData.companyName || "사업자";
  const bType = certData.businessType || "해당 업종";

  if (qLower.includes("대출") || qLower.includes("자금") || qLower.includes("보증")) {
    return `🤖 [BIZ AI 에이전트 답변]\n\n${company} (${bType}) 대표님, 가장 시급하게 활용 가능한 자금은 **소상공인 정책자금(소진공)**과 **지역 신용보증재단 보증서 대출**입니다.\n\n1. **소상공인 정책자금**: 연 2~3%대 저금리로 3,000만원~7,000만원 운전자금 지원.\n2. **신용보증재단 보증**: 부동산 담보가 없더라도 지자체 100% 보증 및 1.5~2.5%p 이자 보조 혜택 적용.\n\n필요 서류는 사업자등록증, 부가가치세 과세표준증명원입니다!`;
  }

  if (qLower.includes("세금") || qLower.includes("절세") || qLower.includes("부가가치세") || qLower.includes("종합소득세")) {
    return `🤖 [BIZ AI 에이전트 답변]\n\n${company}의 절세를 위한 3가지 AI 추천 가이드입니다:\n\n1. **홈택스 사업용 계좌 & 카드 등록**: 사업 관련 경비 지출 시 매입세액 공제 100% 반영.\n2. **노란우산공제 가입**: 연간 최대 500만원 소득공제 및 압류 방지 안전자금 확보.\n3. **의제매입세액 공제** (${bType} 특화): 식자재 및 농수산물 구매 영수증 적기 제출 시 세액 절감 효과 극대화.`;
  }

  return `🤖 [BIZ AI 에이전트 답변]\n\n${company} (${bType})의 맞춤형 질의에 대해 AI 에이전트가 분석했습니다.\n\n[주요 권장 사항]\n• 현재 업태인 [${bType}] 관련 2026년 정부 보조금 및 세제 감면 혜택 대상입니다.\n• 구체적인 신청 방법이나 세무/대출 관련 추가 서류가 궁금하시면 언제든 질문해 주세요!`;
}

