import React, { useState } from 'react';
import { Building2, Sparkles, ArrowRight, ArrowLeft, CheckCircle2, ChevronDown } from 'lucide-react';

// 28 Representative Korean Business Types (대한민국 28대 대표 업태 및 세부종목 분류표)
export const REPRESENTATIVE_28_INDUSTRIES = [
  { id: 1, label: "🍱 01. 한식/일식/중식 음식점업", bType: "음식점업", iType: "한식, 일식, 중식 식당 및 외식업" },
  { id: 2, label: "☕ 02. 카페/베이커리/음료점업", bType: "음식점업", iType: "커피전문점, 제과 및 음료 서비스" },
  { id: 3, label: "🍺 03. 주점/포차/외식 서비스", bType: "음식점업", iType: "주점 및 음료출장 외식업" },
  { id: 4, label: "🛵 04. 배달전문/출장음식업", bType: "음식점업", iType: "배달음식 전문 및 출장 연회" },
  { id: 5, label: "💻 05. 소프트웨어 개발/AI/앱", bType: "정보통신업", iType: "소프트웨어 개발 및 AI 플랫폼" },
  { id: 6, label: "🌐 06. 웹디자인/IT시스템/DB", bType: "정보통신업", iType: "웹사이트 구축 및 시스템 통합" },
  { id: 7, label: "🛍️ 07. 전자상거래/인터넷쇼핑몰", bType: "도매 및 소매업", iType: "통신판매업 및 온라인 유통" },
  { id: 8, label: "📦 08. 의류/잡화 도소매업", bType: "도매 및 소매업", iType: "의류, 신발, 패션잡화 도소매" },
  { id: 9, label: "🍎 09. 식품/농수산물 유통업", bType: "도매 및 소매업", iType: "농수축산물 및 식재료 도소매" },
  { id: 10, label: "✈️ 10. 무역/수출입업", bType: "도매 및 소매업", iType: "수출입 무역 및 종합 유통" },
  { id: 11, label: "⚙️ 11. 정밀기계/공업 제조업", bType: "제조업", iType: "정밀기계 부품 및 공업용 제품" },
  { id: 12, label: "👕 12. 섬유/의류/패션 제조업", bType: "제조업", iType: "의류 봉제 및 섬유 제품 제조" },
  { id: 13, label: "🍞 13. 식품/음료 제조업", bType: "제조업", iType: "식품 가공 및 음료 제조" },
  { id: 14, label: "🏠 14. 실내건축/인테리어 시공", bType: "건설업", iType: "실내건축공사업 및 리모델링" },
  { id: 15, label: "🏗️ 15. 건축/토목/전문시공", bType: "건설업", iType: "종합건설업 및 전기·설비공사" },
  { id: 16, label: "💼 16. 경영컨설팅/자문업", bType: "전문·과학·기술 서비스업", iType: "경영 컨설팅 및 마케팅 자문" },
  { id: 17, label: "🎨 17. 광고/마케팅/디자인", bType: "전문·과학·기술 서비스업", iType: "광고 대행 및 종합 디자인" },
  { id: 18, label: "🏢 18. 부동산중개/자산관리", bType: "부동산업", iType: "부동산 중개 및 자산 임대 관리" },
  { id: 19, label: "📚 19. 보습/입시/예체능 학원", bType: "교육서비스업", iType: "전문 학원 및 교습 서비스" },
  { id: 20, label: "🏥 20. 의원/병원/약국", bType: "보건업", iType: "의료 서비스 및 약국 운영" },
  { id: 21, label: "💈 21. 미용실/피부관리/뷰티", bType: "개인서비스업", iType: "헤어미용, 피부관리 및 네일" },
  { id: 22, label: "🚚 22. 화물/운수/택배/물류", bType: "운수 및 창고업", iType: "화물운송 및 물류 대행" },
  { id: 23, label: "🏨 23. 숙박/펜션/게스트하우스", bType: "숙박업", iType: "호텔, 펜션 및 숙박시설" },
  { id: 24, label: "📸 24. 스튜디오/영상/미디어", bType: "정보통신업", iType: "사진 촬영 및 영상 제작" },
  { id: 25, label: "🏋️ 25. 피트니스/스포츠시설", bType: "스포츠업", iType: "헬스장, 체육시설 운영" },
  { id: 26, label: "🚗 26. 자동차정비/부품/세차", bType: "수리 및 개인서비스업", iType: "자동차 정비 및 세차" },
  { id: 27, label: "🧹 27. 청소/방역/시설관리", bType: "사업지원 서비스업", iType: "위생 관리 및 시설 유지" },
  { id: 28, label: "📑 28. 행정/세무/법무 서비스", bType: "전문 서비스업", iType: "행정·법률 자문 서비스" }
];

export default function ResultStep({ initialData, onConfirm, onBack }) {
  // Find matching 28 industry index or default to #1
  const initialIndustryId = REPRESENTATIVE_28_INDUSTRIES.find(
    item => initialData?.businessType && item.bType.includes(initialData.businessType)
  )?.id || 1;

  const [selectedIndustryId, setSelectedIndustryId] = useState(initialIndustryId);
  const selectedInd = REPRESENTATIVE_28_INDUSTRIES.find(item => item.id === Number(selectedIndustryId)) || REPRESENTATIVE_28_INDUSTRIES[0];

  const [companyName, setCompanyName] = useState(initialData?.companyName || "사업장 상호");
  const [representative, setRepresentative] = useState(initialData?.representative || "대표자명");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      ...initialData,
      regNumber: initialData?.regNumber || "214-88-91234",
      companyName: companyName || "스캔 사업장",
      representative: representative || "대표자성명",
      taxType: initialData?.taxType || "부가가치세 일반과세자",
      formattedDate: initialData?.formattedDate || initialData?.registrationDate || "2022년 03월 15일",
      address: initialData?.address || "서울특별시 강남구 테헤란로 152",
      businessType: selectedInd.bType,
      itemType: selectedInd.iType
    });
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5 pb-28">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-800 border border-slate-700 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 다시 스캔
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 28대 업태 1-터치 자동화
        </span>
      </div>

      {/* Main Title */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
          <span>28대 대표 업태 선택 (자동화)</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </h2>
        <p className="text-xs text-slate-400">
          대표 업태 <span className="text-amber-300 font-bold">1개를 선택</span>하시면 금융·절세·뉴스·AML 리포트가 <span className="text-emerald-400 font-bold">100% 자동 생성</span>됩니다.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 28 Representative Industry Dropdown Selector */}
        <div className="glass-panel p-4 rounded-3xl border border-amber-500/40 bg-amber-950/20 space-y-2.5 shadow-lg">
          <label className="text-xs font-bold text-amber-300 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Building2 className="w-4 h-4 text-amber-400" /> 대한민국 28대 대표 업태 분류 (선택) *
            </span>
            <span className="text-[10px] text-amber-400/80 font-normal">원터치 입력 자동화</span>
          </label>

          <div className="relative">
            <select
              value={selectedIndustryId}
              onChange={(e) => setSelectedIndustryId(Number(e.target.value))}
              className="w-full text-xs font-extrabold px-3.5 py-3 rounded-2xl bg-slate-900 text-amber-300 border-2 border-amber-500/50 appearance-none focus:outline-none focus:border-amber-400 shadow-inner"
            >
              {REPRESENTATIVE_28_INDUSTRIES.map((ind) => (
                <option key={ind.id} value={ind.id} className="bg-slate-900 text-white font-bold py-1">
                  {ind.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-amber-400 absolute right-3.5 top-3.5 pointer-events-none" />
          </div>

          {/* Selected Industry Detail Summary */}
          <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">자동 반영 업태:</span>
              <span className="font-bold text-amber-300">{selectedInd.bType}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">자동 반영 세부종목:</span>
              <span className="font-bold text-purple-300">{selectedInd.iType}</span>
            </div>
          </div>
        </div>

        {/* Quick Grid of Top 6 Popular Industries for Fast Touch */}
        <div className="space-y-1.5">
          <span className="text-[10px] text-slate-400 font-bold block">🔥 자주 찾는 인기 업태 빠른 터치:</span>
          <div className="grid grid-cols-2 gap-1.5">
            {REPRESENTATIVE_28_INDUSTRIES.slice(0, 6).map((ind) => (
              <button
                key={ind.id}
                type="button"
                onClick={() => setSelectedIndustryId(ind.id)}
                className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                  selectedIndustryId === ind.id
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500 font-bold shadow-md'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                <span className="font-bold block truncate">{ind.label.split('.')[1] || ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Basic Business Info (Auto-populated, optional edit) */}
        <div className="glass-panel p-4 rounded-3xl border border-slate-800 space-y-3">
          <span className="text-[11px] font-bold text-slate-400 block border-b border-slate-800 pb-2">
            📋 사업장 기본 정보 (자동 채움)
          </span>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400">상호명</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl glass-input text-white border border-slate-700"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] text-slate-400">대표자명</label>
              <input
                type="text"
                value={representative}
                onChange={(e) => setRepresentative(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl glass-input text-white border border-slate-700"
              />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          type="submit"
          className="w-full py-4 px-4 bg-gradient-primary text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-98"
        >
          <span>28대 업태 선택 완료 ➔ 4대 분석 보고서 즉시 생성</span>
          <ArrowRight className="w-4.5 h-4.5" />
        </button>
      </form>
    </div>
  );
}
