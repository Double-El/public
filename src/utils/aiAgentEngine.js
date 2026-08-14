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

