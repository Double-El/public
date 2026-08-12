import React from 'react';
import { ShieldCheck, RefreshCw } from 'lucide-react';

export default function Header({ currentStep, onReset }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0c091d]/85 backdrop-blur-xl border-b border-[#b3a3f8]/20 px-4 py-3 shadow-lg shadow-black/40">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Signs AI Style Modern Header */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#3c2895] to-[#674ddb] flex items-center justify-center text-[#eeeaff] shadow-md shadow-[#674ddb]/30 border border-[#b3a3f8]/30">
            <ShieldCheck className="w-5 h-5 text-[#b3a3f8]" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-[#eeeaff] tracking-tight flex items-center gap-1.5 font-sans">
              Shinhan BIZ SCANNER <span className="text-[10px] font-normal text-[#b3a3f8]">by myungmin</span>
            </h1>
            <p className="text-[11px] text-[#b3a3f8]/80 mt-0.5 font-medium">사업자등록증 기반 맞춤형 금융 업무 추천 에이전트</p>
          </div>
        </div>

        {/* Reset button when not on initial view */}
        {currentStep > 1 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs font-semibold text-[#b3a3f8] hover:text-[#eeeaff] px-3 py-1.5 rounded-xl bg-[#1e1740]/80 border border-[#b3a3f8]/30 hover:border-[#b3a3f8]/60 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>처음으로</span>
          </button>
        )}
      </div>
    </header>
  );
}

