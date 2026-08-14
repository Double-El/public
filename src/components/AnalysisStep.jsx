import React, { useState, useEffect } from 'react';
import { Landmark, TrendingUp, ShieldCheck, ExternalLink, ArrowRight, Sparkles, CheckCircle2, Bot, Send, Search, Lock, RefreshCw } from 'lucide-react';
import { getRecommendedFinancialServices } from '../data/financialRules';
import { getIndustryIssueData } from '../data/industryIssues';
import { AGENT_PERSONA, runAgentReasoningChain, askAgentQuestion, getGeminiFinancialAnalysis, getNaverIndustryIssues, getNotebookInsiderSecrets } from '../utils/aiAgentEngine';

export default function AnalysisStep({ certData, onProceedToEmail }) {
  const [activeTab, setActiveTab] = useState('gemini_financial'); // 'gemini_financial' | 'naver_issues' | 'notebook_insider' | 'chat'
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
          text: `안녕하세요 ${certData.representative} 대표님! 🤖 ${AGENT_PERSONA.name}입니다.\n\n[${certData.companyName}] (${certData.businessType})의 3대 맞춤 분석(Gemini 금융 + Naver 이슈 + NotebookLM 인사이드 팁)이 준비되었습니다.\n\n궁금한 세무, 노무, 대출 자격 등을 질문해 주시면 실시간으로 컨설팅해 드립니다!`,
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
    const currentQ = userQuery;
    setUserQuery('');
    setIsAiReplying(true);

    try {
      const aiReplyText = await askAgentQuestion(currentQ, certData, financialList, industryData);
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

  const filteredFinancials = financialList.filter(item => {
    if (selectedFilter === 'ALL') return true;
    return item.category.includes(selectedFilter);
  });

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-28">
      {/* AI Agent Reasoning Status Banner */}
      <div className="glass-panel rounded-2xl p-4 border border-indigo-500/40 bg-indigo-950/30 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-primary flex items-center justify-center shadow-md">
              <Bot className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-amber-400" /> AI 3대 지능형 종합 분석
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
              Gemini 금융 분석 + 네이버 실시간 뉴스 + NotebookLM 인사이드 노하우가 결합되었습니다.
            </p>
          </div>
        )}
      </div>

      {/* Main 4 Navigation Tabs */}
      <div className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-slate-900 border border-slate-800 text-[10px] font-bold">
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

      {/* PILLAR 1: Gemini AI 금융 요소 분석 */}
      {activeTab === 'gemini_financial' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-blue-500/30 bg-blue-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-blue-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" /> Gemini AI 금융 맞춤 솔루션
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

      {/* PILLAR 2: 네이버 업태와 종목의 주요 이슈 */}
      {activeTab === 'naver_issues' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 bg-emerald-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-emerald-400 flex items-center gap-1">
                <Search className="w-3 h-3 text-emerald-300" /> Naver 실시간 업종 뉴스 & 이슈
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
              [{certData.businessType} / {certData.itemType}] 관련 2026년 네이버 최신 이슈 및 규제 뉴스입니다.
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

            {/* Static Industry Issues */}
            {industryData.keyIssues.slice(0, 2).map((issue, idx) => (
              <div key={`static-${idx}`} className="glass-card rounded-2xl p-4 space-y-2 border border-slate-800">
                <h5 className="text-xs font-bold text-white">{issue.title}</h5>
                <p className="text-xs text-slate-300">{issue.description}</p>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-indigo-300">권장 조치: </span>{issue.actionPlan}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PILLAR 3: Google NotebookLM 업태의 사람들만 아는 비하인드 팁 */}
      {activeTab === 'notebook_insider' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-4 border border-purple-500/30 bg-purple-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase text-purple-400 flex items-center gap-1">
                <Lock className="w-3 h-3 text-purple-300" /> Google NotebookLM 비하인드 노하우
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-200">
                연동 상태: 인증 완료 ✅
              </span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              [{notebookSecrets.sector || certData.businessType}] 분야 현장 실무자들과 업계 베테랑들의 NotebookLM 수집 분석 인사이트 팁입니다.
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

      {/* TAB 4: 🤖 AI 에이전트 실시간 대화 & Q&A */}
      {activeTab === 'chat' && (
        <div className="space-y-4">
          <div className="glass-panel rounded-2xl p-3 border border-indigo-500/30 bg-indigo-950/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <div>
                <h4 className="text-xs font-bold text-white">{AGENT_PERSONA.name} 실시간 상담</h4>
                <p className="text-[10px] text-slate-400">대출, 세제, 노무 등 궁금하신 내용을 질문하세요</p>
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
            {['정책대출 신청 조건', '의제매입세액 절세법', '노란우산공제 세액공제'].map((q) => (
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
            <span>3대 종합 분석 리포트 메일로 발송받기</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
