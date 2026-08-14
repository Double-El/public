import React, { useState } from 'react';
import { Building2, User, FileCode, MapPin, Calendar, Edit3, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, Sparkles, Image as ImageIcon } from 'lucide-react';

export default function ResultStep({ initialData, onConfirm, onBack, scannedImage }) {
  const [formData, setFormData] = useState({
    regNumber: initialData?.regNumber || "",
    companyName: initialData?.companyName || "",
    representative: initialData?.representative || "",
    businessType: initialData?.businessType || "",
    itemType: initialData?.itemType || "",
    taxType: initialData?.taxType || "부가가치세 일반과세자",
    formattedDate: initialData?.formattedDate || initialData?.registrationDate || "2022년 03월 15일",
    address: initialData?.address || "",
    ...initialData
  });

  const [showImagePreview, setShowImagePreview] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Quick Pick Industry presets
  const handleQuickPickIndustry = (bType, iType) => {
    setFormData(prev => ({
      ...prev,
      businessType: bType,
      itemType: iType
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  const QUICK_INDUSTRIES = [
    { label: "🍽️ 음식/외식업", bType: "음식점업", iType: "한식 및 외식 서비스" },
    { label: "💻 IT/소프트웨어", bType: "정보통신업", iType: "소프트웨어 개발 및 공급" },
    { label: "🛍️ 도소매/유통", bType: "도매 및 소매업", iType: "전자상거래 및 생활유통" },
    { label: "🏭 제조업/공업", bType: "제조업", iType: "정밀 기계 및 산업 부품" },
    { label: "🏗️ 건설업/인테리어", bType: "건설업", iType: "실내건축 및 시설물유지" },
    { label: "💼 서비스/컨설팅", bType: "전문·과학·기술 서비스업", iType: "경영 컨설팅 및 자문" },
    { label: "🏢 부동산업/임대", bType: "부동산업", iType: "부동산 자산관리 및 임대" },
    { label: "💈 미용/의료/뷰티", bType: "보건업 및 미용업", iType: "전문 의료 및 미용 서비스" }
  ];

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5 pb-28">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 다시 스캔
        </button>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" /> 스캔 정보 검토 단계 (Step 2/3)
        </span>
      </div>

      {/* Main Step Title & Subtitle */}
      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-white flex items-center justify-center gap-1.5">
          <span>사업자등록증 판독 및 수정</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </h2>
        <p className="text-xs text-slate-400">
          스캔된 내용을 확인하시고 <span className="text-amber-300 font-semibold">업태</span>와 <span className="text-purple-300 font-semibold">종목</span>을 확인·수정해 주세요.
        </p>
      </div>

      {/* Image Preview Toggle (if image exists) */}
      {scannedImage && (
        <div className="glass-panel p-3 rounded-2xl border border-slate-800 space-y-2">
          <button
            type="button"
            onClick={() => setShowImagePreview(!showImagePreview)}
            className="w-full flex items-center justify-between text-xs font-bold text-slate-300 hover:text-white"
          >
            <span className="flex items-center gap-1.5">
              <ImageIcon className="w-4 h-4 text-blue-400" />
              <span>촬영/스캔한 사업자등록증 사진 원본 보기</span>
            </span>
            <span className="text-[10px] text-blue-400 underline">
              {showImagePreview ? '접기 ▲' : '원본 펼치기 ▼'}
            </span>
          </button>

          {showImagePreview && (
            <div className="mt-2 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 max-h-60 flex items-center justify-center">
              <img src={scannedImage} alt="Scanned Certificate" className="object-contain max-h-60 w-full" />
            </div>
          )}
        </div>
      )}

      {/* Interactive Form Card */}
      <div className="glass-panel p-5 rounded-3xl space-y-4 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center text-white font-bold shadow-md">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">국세청 사업자등록증 판독 데이터</span>
              <h3 className="text-sm font-bold text-white leading-tight">{formData.companyName || '사업장 상호를 입력하세요'}</h3>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Company Name & Representative */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>상호 / 법인명 *</span>
                {formData.companyName && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="예: (주)신한테크"
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl glass-input text-white border border-slate-700 focus:border-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 flex items-center justify-between">
                <span>대표자 성명 *</span>
                {formData.representative && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
              </label>
              <input
                type="text"
                value={formData.representative}
                onChange={(e) => handleChange('representative', e.target.value)}
                placeholder="예: 홍길동"
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl glass-input text-white border border-slate-700 focus:border-blue-500"
                required
              />
            </div>
          </div>

          {/* Business Type (업태) & Item Type (종목) - Highlighted */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-amber-300 flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                <span>업태 및 세부 종목 (수정 및 직접선택)</span>
              </span>
              <span className="text-[9px] text-amber-400/80 font-medium">실시간 분석의 핵심 데이터</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-amber-200">업태 (주업종) *</label>
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) => handleChange('businessType', e.target.value)}
                  placeholder="예: 음식점업, 정보통신업"
                  className="w-full text-xs font-bold text-amber-300 px-3 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/40 focus:border-amber-400"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-purple-200">세부 종목 *</label>
                <input
                  type="text"
                  value={formData.itemType}
                  onChange={(e) => handleChange('itemType', e.target.value)}
                  placeholder="예: 소프트웨어 개발, 한식"
                  className="w-full text-xs font-bold text-purple-300 px-3 py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/40 focus:border-purple-400"
                  required
                />
              </div>
            </div>

            {/* Quick Pick Industry Chips */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-400 block font-medium">💡 원클릭 업종 간편 선택 (원하는 업종을 터치하세요):</span>
              <div className="flex flex-wrap gap-1">
                {QUICK_INDUSTRIES.map((ind) => (
                  <button
                    key={ind.label}
                    type="button"
                    onClick={() => handleQuickPickIndustry(ind.bType, ind.iType)}
                    className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-all ${
                      formData.businessType === ind.bType
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold shadow-sm'
                        : 'bg-slate-800/90 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {ind.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Business Reg Number */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <FileCode className="w-3.5 h-3.5 text-blue-400" /> 사업자등록번호
            </label>
            <input
              type="text"
              value={formData.regNumber}
              onChange={(e) => handleChange('regNumber', e.target.value)}
              placeholder="예: 123-45-67890"
              className="w-full text-xs font-mono font-bold text-blue-300 px-3 py-2.5 rounded-xl glass-input border border-slate-700"
            />
          </div>

          {/* Tax Type & Registration Date */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">과세 및 사업자 유형</label>
              <select
                value={formData.taxType}
                onChange={(e) => handleChange('taxType', e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl glass-input text-emerald-300 bg-slate-900 border border-slate-700"
              >
                <option value="부가가치세 일반과세자">부가가치세 일반과세자</option>
                <option value="부가가치세 간이과세자">부가가치세 간이과세자</option>
                <option value="법인사업자 (일반과세)">법인사업자 (일반과세)</option>
                <option value="부가가치세 면세사업자">부가가치세 면세사업자</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300">개업연월일</label>
              <input
                type="text"
                value={formData.formattedDate || formData.registrationDate}
                onChange={(e) => handleChange('formattedDate', e.target.value)}
                placeholder="예: 2022년 03월 15일"
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl glass-input text-slate-200 border border-slate-700"
              />
            </div>
          </div>

          {/* Business Address */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> 사업장 소재지 주소
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="예: 서울특별시 강남구 테헤란로 152"
              className="w-full text-xs font-medium px-3 py-2.5 rounded-xl glass-input text-slate-200 border border-slate-700"
            />
          </div>

          {/* Final Step Confirm Button */}
          <button
            type="submit"
            className="w-full py-4 px-4 bg-gradient-primary text-white font-extrabold text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-98 mt-2"
          >
            <span>스캔 정보 확인 완료 ➔ 4대 맞춤 리포트 생성</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
