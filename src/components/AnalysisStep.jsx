import React, { useState, useEffect } from 'react';
import { Landmark, TrendingUp, ShieldCheck, ShieldAlert, ExternalLink, ArrowRight, Sparkles, CheckCircle2, Bot, Send, Search, Lock, RefreshCw } from 'lucide-react';
import { getRecommendedFinancialServices } from '../data/financialRules';
import { getIndustryIssueData } from '../data/industryIssues';
import { AGENT_PERSONA, runAgentReasoningChain, askAgentQuestion, getGeminiFinancialAnalysis, getNaverIndustryIssues, getNotebookInsiderSecrets, getAMLComplianceChecklist } from '../utils/aiAgentEngine';

export default function AnalysisStep({ certData, scannedImage, autoSentMessage, onProceedToEmail }) {
  const [activeTab, setActiveTab] = useState('gemini_financial'); // 'gemini_financial' | 'naver_issues' | 'notebook_insider' | 'aml_checklist' | 'chat'
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  
  // AI Reasoning State
  const [isAgentReasoning, setIsAgentReasoning] = useState(true);
  const [reasoningProgress, setReasoningProgress] = useState({ progress: 0, message: '' });

  // AI Chat Messages State
  const [chatMessages, setChatMessages] = useState([]);
  const [userQuery, setUserQuery] = useState('');
  const [isAiReplying, setIsAiReplying] = useState(false);

  const financialList = getRecommendedFinancialServices(certData);
  const industryData = getIndustryIssueData(certData.businessType, certData.itemType);
  const geminiFinancial = getGeminiFinancialAnalysis(certData);
  const naverIssues = getNaverIndustryIssues(certData);
  const notebookSecrets = getNotebookInsiderSecrets(certData);
  const amlChecklist = getAMLComplianceChecklist(certData);

  // Run AI reasoning chain on load
  useEffect(() => {
    setIsAgentReasoning(true);
    runAgentReasoningChain(certData, (prog) => {
      setReasoningProgress(prog);
    }).then(() => {
      setIsAgentReasoning(false);
      setChatMessages([
        {
          id: 1,
          sender: 'agent',
          text: `안녕하세요 ${certData.representative} 대표님! 🤖 ${AGENT_PERSONA.name}입니다.\n\n[${certData.companyName}] (${certData.businessType})의 4대 맞춤 분석(Gemini 금융 + Naver 이슈 + NotebookLM 인사이드 + AML 점검)이 준비되었습니다.\n\n궁금한 세무, 절세, 자금세탁방지(AML), 대출 자격 등을 질문해 주시면 실시간으로 컨설팅해 드립니다!`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    });
  }, [certData]);

  // Handle user Q&A submission to AI Agent
  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!userQuery.trim() || isAiReplying) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    const currentQuery = userQuery;
    setUserQuery('');
    setIsAiReplying(true);

    try {
      const aiReplyText = await askAgentQuestion(certData, currentQuery, chatMessages);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'agent',
        text: aiReplyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiReplying(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-28">
      {/* Uploaded Business Registration Certificate Image Display Card */}
      {scannedImage && (
        <div className="glass-panel rounded-2xl p-4 border border-[#b3a3f8]/40 bg-[#0c091d]/90 space-y-2.5 shadow-2xl shadow-[#674ddb]/20">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#eeeaff] flex items-center gap-2">
              📸 스캔 판독된 원본 사업자등록증 사진
            </span>
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-[#674ddb]/30 text-[#b3a3f8] border border-[#b3a3f8]/30">
              GEMINI 3.6 VISION TARGET
            </span>
          </div>
          <div className="relative rounded-xl overflow-hidden border border-[#b3a3f8]/30 bg-black/60 max-h-80 flex items-center justify-center p-1 group">
            <img
              src={scannedImage}
              alt="촬영/업로드된 사업자등록증 원본 사진"
              className="w-full h-auto max-h-80 object-contain rounded-lg shadow-lg group-hover:scale-[1.02] transition-transform duration-300"
            />
          </div>
        </div>
      )}

      {/* Auto Email Dispatch Notification Banner */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-3 shadow-lg shadow-emerald-950/30">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 animate-pulse" />
        <div>
          <span className="font-bold text-white block text-xs">
            {autoSentMessage || 'e.factorials@gmail.com 및 담당 수신함으로 4대 종합 리포트 자동 발송 완료!'}
          </span>
          <span className="text-[10px] text-emerald-300/80 font-normal">
            별도 클릭 없이 배경에서 즉시 실시간 이메일 전송이 처리되었습니다.
          </span>
        </div>
      </div>

      {/* AI Agent Reasoning Status Banner */}
      <div className="glass-panel rounded-2xl p-4 border border-indigo-500/40 bg-indigo-950/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> AI 4대 지능형 종합 분석
              </span>
              <h2 className="text-sm font-bold text-white leading-tight">
                {certData.companyName} <span className="text-xs font-normal text-slate-400">({certData.representative} 대표)</span>
              </h2>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            진단 완료
          </span>
        </div>

        {isAgentReasoning ? (
          <div className="space-y-2 py-1">
            <p className="text-xs font-semibold text-blue-300 animate-pulse">{reasoningProgress.message}</p>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-300"
                style={{ width: `${(reasoningProgress.progress || 0.5) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-300 space-y-1">
            <p className="font-semibold text-indigo-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              업태: <span className="text-amber-300">{certData.businessType}</span> · 종목: <span className="text-purple-300">{certData.itemType}</span>
            </p>
            <p className="text-[11px] text-slate-400">
              Gemini 금융 분석 + 네이버 소상공인 뉴스 + NotebookLM 노하우 + AML 자금세탁방지 점검이 완성되었습니다.
            </p>
          </div>
        )}
      </div>

      {/* Main 5 Navigation Tabs */}
      <div className="grid grid-cols-5 gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-bold">
        <button
          onClick={() => setActiveTab('gemini_financial')}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'gemini_financial'
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Gemini 금융</span>
        </button>

        <button
          onClick={() => setActiveTab('naver_issues')}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'naver_issues'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Search className="w-3.5 h-3.5 text-emerald-300" />
          <span>네이버 이슈</span>
        </button>

        <button
          onClick={() => setActiveTab('notebook_insider')}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'notebook_insider'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Lock className="w-3.5 h-3.5 text-purple-300" />
          <span>Notebook 팁</span>
        </button>

        <button
          onClick={() => setActiveTab('aml_checklist')}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'aml_checklist'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-300" />
          <span>AML 점검</span>
        </button>

        <button
          onClick={() => setActiveTab('chat')}
          className={`py-2 px-1 rounded-xl transition-all flex flex-col items-center justify-center gap-1 ${
            activeTab === 'chat'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Bot className="w-3.5 h-3.5 text-indigo-300" />
          <span>AI Q&A</span>
        </button>
      </div>

      {/* PILLAR 1: Gemini 2.5 AI 업종별 맞춤 금융·절세 솔루션 */}
      {activeTab === 'gemini_financial' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-blue-500/30 bg-blue-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Gemini 2.5 AI 업종별 맞춤 금융·절세 솔루션
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/30 text-blue-200">
                {geminiFinancial.isCorp ? "법인사업자 우대" : "개인사업자 우대"}
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium leading-relaxed">
              {geminiFinancial.summary}
            </p>
          </div>

          <div className="space-y-3">
            {geminiFinancial.recommendations.map((rec) => (
              <div key={rec.id} className="glass-card rounded-2xl p-4 space-y-3 border border-slate-800">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {rec.tag}
                  </span>
                  <span className="text-xs font-black text-emerald-400">{rec.amount}</span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{rec.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                  {rec.description}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-amber-300 font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>실행 팁: {rec.actionTip}</span>
                </div>
              </div>
            ))}

            {/* Standard Financial Services List */}
            {financialList.slice(0, 2).map((item) => (
              <div key={item.id} className="glass-card rounded-2xl p-4 space-y-2 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">{item.category}</span>
                  <span className="text-xs font-bold text-blue-400">적합도 {item.relevanceScore}%</span>
                </div>
                <h5 className="text-xs font-bold text-white">{item.title}</h5>
                <p className="text-xs text-slate-300">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PILLAR 2: 네이버 소상공인 특화 업태 및 종목 최신 & 규제 뉴스 */}
      {activeTab === 'naver_issues' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                <Search className="w-3 h-3 text-emerald-300" /> Naver 소상공인 특화 업종 규제 & 이슈
              </span>
              <a
                href={naverIssues.naverMainSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/30 text-emerald-200 hover:underline flex items-center gap-1"
              >
                네이버 검색결과 <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              [{certData.businessType} / {certData.itemType}] 소상공인을 위한 2026년 규제, 노무 법률 및 지원금 뉴스입니다.
            </p>
          </div>

          <div className="space-y-3">
            {naverIssues.issueList.map((issue, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-4 space-y-2.5 border border-slate-800">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center text-[10px] font-mono">
                      0{idx + 1}
                    </span>
                    {issue.title}
                  </h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {issue.level}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{issue.summary}</p>
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-400">{issue.source}</span>
                  <a
                    href={issue.naverSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>네이버 기사 검색</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PILLAR 3: Google NotebookLM 업종 특화 인사이트 팁 */}
      {activeTab === 'notebook_insider' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-purple-500/30 bg-purple-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-purple-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-300" /> Google NotebookLM 업종 특화 인사이트
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">
                연동 상태: 인증 완료 ✅
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              [{notebookSecrets.sector || certData.businessType}] 업계 사람들에게 가장 중요한 무형의 실무 노하우 데이터베이스입니다.
            </p>
          </div>

          <div className="space-y-3">
            {notebookSecrets.tips.map((tip, idx) => (
              <div key={idx} className="glass-card rounded-2xl p-4 space-y-2.5 border border-purple-500/20 bg-purple-950/10">
                <h4 className="text-xs font-bold text-purple-200 flex items-center gap-1.5">
                  {tip.title}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  {tip.secret}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PILLAR 4: 🛡️ AML 자금세탁방지 업종별 맞춤 점검사항 */}
      {activeTab === 'aml_checklist' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-rose-500/30 bg-rose-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-rose-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-400" /> AML 자금세탁방지 업종별 점검 솔루션
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/30 text-rose-200">
                위험도: {amlChecklist.riskLevel}
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              [{amlChecklist.sector}] 대표님이 필수적으로 준수해야 할 자금세탁방지(AML) 및 금융 점검 항목입니다.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-amber-300 font-medium">
              💡 고객확인 의무 (CDD/EDD): <span className="text-slate-200">{amlChecklist.cddType}</span>
            </div>
          </div>

          <div className="space-y-3">
            {amlChecklist.checkpoints.map((check) => (
              <div key={check.id} className="glass-card rounded-2xl p-4 space-y-3 border border-slate-800">
                <div className="flex items-start justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    check.status === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                      : check.status === 'HIGH'
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                      : 'bg-blue-500/20 text-blue-300 border-blue-500/30'
                  }`}>
                    {check.status === 'CRITICAL' ? '필수 점검 (CRITICAL)' : check.status === 'HIGH' ? '중요 권고 (HIGH)' : '주의 (WARNING)'}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white leading-snug">{check.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-xl border border-slate-800">
                  {check.desc}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 font-medium pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                  <span>조치 가이드: {check.guideline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: 🤖 AI 에이전트 실시간 대화 & Q&A */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-3 border border-indigo-500/30 bg-indigo-950/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{AGENT_PERSONA.name} 실시간 상담</h4>
                <p className="text-[10px] text-slate-400">대출, 절세, AML 점검, 노무 등 질문해 주세요</p>
              </div>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="space-y-3 max-h-80 overflow-y-auto p-1">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-1 ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                      : 'glass-card border border-indigo-500/30 text-slate-200 rounded-bl-none'
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-sans">{msg.text}</pre>
                  <span className="text-[9px] text-slate-400 block text-right">{msg.time}</span>
                </div>
              </div>
            ))}

            {isAiReplying && (
              <div className="flex items-center gap-2 text-xs text-indigo-300 bg-slate-900/60 p-3 rounded-2xl border border-slate-800 w-fit">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                <span>AI 에이전트가 답변을 작성 중입니다...</span>
              </div>
            )}
          </div>

          {/* Quick Question Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {['자금세탁방지 점검법', '의제매입세액 절세법', '정책대출 신청 조건', '노란우산공제 세액공제'].map((q) => (
              <button
                key={q}
                onClick={() => setUserQuery(q)}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800/80 text-indigo-300 border border-indigo-500/20 whitespace-nowrap hover:bg-slate-800"
              >
                💡 {q}
              </button>
            ))}
          </div>

          {/* User Input Form */}
          <form onSubmit={handleSendChat} className="flex gap-2">
            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              placeholder="AI 에이전트에게 추가 질문하기..."
              className="flex-1 text-xs px-3.5 py-3 rounded-2xl glass-input"
            />
            <button
              type="submit"
              disabled={isAiReplying || !userQuery.trim()}
              className="py-3 px-4 rounded-2xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 glass-panel border-t border-slate-800 p-4 z-30">
        <div className="max-w-md mx-auto">
          <button
            onClick={() => onProceedToEmail(financialList, industryData)}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-primary text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all active:scale-98"
          >
            <span>4대 종합 분석 리포트 메일로 발송받기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
