import React, { useState } from 'react';
import { Building2, User, FileCode, MapPin, Calendar, Tag, Check, Edit3, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function ResultStep({ initialData, onConfirm, onBack }) {
  const [formData, setFormData] = useState({ ...initialData });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 다시 스캔
        </button>

        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" /> 추출 완료
        </span>
      </div>

      <div className="text-center space-y-1">
        <h2 className="text-lg font-bold text-white">사업자 정보 확인</h2>
        <p className="text-xs text-slate-400">추출된 정보를 확인하시고 진행해 주세요.</p>
      </div>

      {/* Clean Certificate Card */}
      <div className="card-clean p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-semibold text-blue-400 uppercase tracking-wider">사업자 등록 증명</span>
              <h3 className="text-sm font-bold text-white leading-tight">{formData.companyName || '사업자명'}</h3>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            {isEditing ? '완료' : '수정'}
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 flex items-center gap-1">
              <FileCode className="w-3 h-3 text-blue-400" /> 사업자등록번호
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.regNumber}
                onChange={(e) => handleChange('regNumber', e.target.value)}
                className="w-full text-xs font-mono px-3 py-2 input-clean"
              />
            ) : (
              <div className="text-xs font-mono font-bold text-blue-400 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                {formData.regNumber}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">상호 / 법인명</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => handleChange('companyName', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-slate-200 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 truncate">
                  {formData.companyName}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">대표자명</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.representative}
                  onChange={(e) => handleChange('representative', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-slate-200 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 truncate">
                  {formData.representative}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">업태 (주업종)</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.businessType}
                  onChange={(e) => handleChange('businessType', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-amber-300 px-3 py-2 rounded-xl bg-amber-950/20 border border-amber-500/20 truncate">
                  {formData.businessType}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">세부 종목</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.itemType}
                  onChange={(e) => handleChange('itemType', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-purple-300 px-3 py-2 rounded-xl bg-purple-950/20 border border-purple-500/20 truncate">
                  {formData.itemType}
                </div>
              )}
            </div>
          </div>

          {/* Tax Type & Corp Reg Number */}
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">과세 및 사업자 유형</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.taxType}
                  onChange={(e) => handleChange('taxType', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-emerald-300 px-3 py-2 rounded-xl bg-emerald-950/20 border border-emerald-500/20 truncate">
                  {formData.taxType || "일반과세자"}
                </div>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">개업연월일</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.formattedDate || formData.registrationDate}
                  onChange={(e) => handleChange('formattedDate', e.target.value)}
                  className="w-full text-xs px-3 py-2 input-clean"
                />
              ) : (
                <div className="text-xs font-semibold text-slate-200 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 truncate">
                  {formData.formattedDate || formData.registrationDate}
                </div>
              )}
            </div>
          </div>

          {/* Address Field */}
          <div className="space-y-1">
            <label className="text-[11px] text-slate-400 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-red-400" /> 사업장 소재지 주소
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full text-xs px-3 py-2 input-clean"
              />
            ) : (
              <div className="text-xs font-medium text-slate-300 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800">
                {formData.address}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 btn-primary text-xs font-bold flex items-center justify-center gap-1.5 mt-2"
          >
            <span>3대 핵심 분석(Gemini/Naver/NotebookLM) 시작하기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
