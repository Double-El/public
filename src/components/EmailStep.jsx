import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, Copy, Download, ExternalLink, Sparkles, ArrowLeft, RefreshCw, FileText, Key, AlertCircle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { generateEmailReportBody, getMailtoUrl } from '../utils/emailService';

export default function EmailStep({ certData, financialList, industryData, autoSentMessage, onBack, onReset }) {
  const DEFAULT_EMAIL = 'e.factorials@gmail.com';
  const [email, setEmail] = useState(DEFAULT_EMAIL);
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(Boolean(autoSentMessage));
  const [copied, setCopied] = useState(false);
  const [statusMessage, setStatusMessage] = useState(autoSentMessage || '');

  // Trigger confetti on mount if auto-sent
  React.useEffect(() => {
    if (autoSentMessage) {
      triggerConfetti();
    }
  }, [autoSentMessage]);
  
  // Gmail SMTP credentials input state
  const [showSmtpSetup, setShowSmtpSetup] = useState(false);
  const [smtpUser, setSmtpUser] = useState('');
  const [smtpPass, setSmtpPass] = useState('');

  const reportText = generateEmailReportBody(certData, financialList, industryData);
  const mailtoUrl = getMailtoUrl(email || DEFAULT_EMAIL, certData, financialList, industryData);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  const handleLaunchMailApp = () => {
    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setStatusMessage(`${DEFAULT_EMAIL} 수신자 메일 앱 연결 완료! 메일 앱에서 [전송]을 누르세요.`);
    triggerConfetti();
  };

  const handleSmtpSend = async (e) => {
    e.preventDefault();
    if (!smtpUser || !smtpPass) {
      alert('Gmail 주소와 16자리 앱 비밀번호를 입력해 주세요.');
      return;
    }

    setIsSending(true);

    try {
      const host = window.location.hostname || 'localhost';
      const res = await fetch(`http://${host}:3001/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: email || DEFAULT_EMAIL,
          subject: `[STITCH INSIGHTS] ${certData?.companyName} 분석 리포트`,
          text: reportText,
          smtpUser,
          smtpPass
        })
      });

      const result = await res.json();
      if (result.success && !result.requiresAuth) {
        setSentSuccess(true);
        setStatusMessage(result.message);
        triggerConfetti();
      } else {
        alert(result.message || '인증 오류가 발생했습니다.');
      }
    } catch (err) {
      console.error(err);
      alert('서버 발송 오류입니다. [Gmail 메일 앱으로 발송] 버튼을 눌러주세요.');
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyReport = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = `STITCH_사업자분석리포트_${certData?.companyName}_${new Date().toISOString().slice(0,10)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-5">
      {/* Top Controls & Telemetry Badge */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-[#b3a3f8] hover:text-[#eeeaff] px-3.5 py-1.5 rounded-xl bg-[#1e1740]/80 border border-[#b3a3f8]/30 shadow-sm transition-all"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> 상세 분석 보기
        </button>

        <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-[#674ddb]/20 text-[#b3a3f8] border border-[#b3a3f8]/30 flex items-center gap-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b3a3f8] animate-ping inline-block" />
          SYSTEM: COMPLETED
        </span>
      </div>

      {/* Main High-Tech Dispatch HUD Card */}
      <div className="relative overflow-hidden card-clean rounded-3xl p-6 border-2 border-[#b3a3f8]/30 bg-[#0c091d]/90 scanner-grid-bg space-y-4 shadow-2xl shadow-[#674ddb]/20">
        {/* 4-Corner Viewfinder Reticles HUD */}
        <div className="corner-reticle top-3 left-3 border-t-2 border-l-2 border-[#b3a3f8]" />
        <div className="corner-reticle top-3 right-3 border-t-2 border-r-2 border-[#b3a3f8]" />
        <div className="corner-reticle bottom-3 left-3 border-b-2 border-l-2 border-[#b3a3f8]" />
        <div className="corner-reticle bottom-3 right-3 border-b-2 border-r-2 border-[#b3a3f8]" />

        {/* Telemetry Header */}
        <div className="flex items-center justify-between text-[10px] font-mono text-[#b3a3f8]/80 pb-3 border-b border-[#b3a3f8]/15">
          <span className="font-bold text-[#eeeaff]">● AUTOMATED DISPATCH SYSTEM</span>
          <span>100% VERIFIED</span>
        </div>

        {sentSuccess ? (
          <div className="text-center py-4 space-y-4 relative z-10">
            {/* Shutter Checkmark Lens Icon */}
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#674ddb] to-[#9884f1] opacity-30 blur-md animate-pulse" />
              <div className="w-20 h-20 rounded-3xl bg-[#140f2d]/90 border border-[#b3a3f8]/40 flex items-center justify-center text-[#eeeaff] shadow-xl backdrop-blur-md">
                <CheckCircle2 className="w-10 h-10 text-[#b3a3f8] animate-bounce" />
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-extrabold text-[#eeeaff] font-sans">이메일 발송 연결 완료!</h3>
              <p className="text-xs text-[#b3a3f8] font-medium px-2">{statusMessage}</p>
            </div>

            <div className="pt-2 flex justify-center">
              <button
                onClick={onReset}
                className="w-full py-3.5 px-4 rounded-2xl btn-primary text-xs font-black text-[#eeeaff] flex items-center justify-center gap-2 shadow-lg shadow-[#674ddb]/30"
              >
                <RefreshCw className="w-4 h-4 text-[#eeeaff]" />
                <span>새 스캔 시작</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#eeeaff]">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-[#b3a3f8]" /> 수신자: {DEFAULT_EMAIL}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#674ddb]/20 text-[#b3a3f8] border border-[#b3a3f8]/30">
                  READY
                </span>
              </div>

              <a
                href={mailtoUrl}
                onClick={handleLaunchMailApp}
                className="w-full py-4 px-4 rounded-2xl btn-primary text-[#eeeaff] font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#674ddb]/30 hover:shadow-[#674ddb]/50 transition-all"
              >
                <ExternalLink className="w-4.5 h-4.5" />
                <span>Gmail / 메일 앱으로 바로 발송하기</span>
              </a>
            </div>

            {/* Toggle Background SMTP Config */}
            <div className="pt-2 border-t border-[#b3a3f8]/15">
              <button
                onClick={() => setShowSmtpSetup(!showSmtpSetup)}
                className="text-xs text-[#b3a3f8] hover:text-[#eeeaff] font-bold flex items-center gap-1 mx-auto transition-colors"
              >
                <Key className="w-3.5 h-3.5" />
                <span>{showSmtpSetup ? 'Gmail SMTP 연동 닫기' : 'Gmail SMTP 자동 서버발송 설정'}</span>
              </button>

              {showSmtpSetup && (
                <form onSubmit={handleSmtpSend} className="mt-3 p-3.5 rounded-2xl bg-[#140f2d] border border-[#b3a3f8]/20 space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#b3a3f8]">
                    <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Google 정책으로 자동 서버 발송 시 Gmail 앱 비밀번호가 필요합니다.</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#b3a3f8]/80">발신 Gmail 주소</label>
                    <input
                      type="email"
                      required
                      placeholder="myaccount@gmail.com"
                      value={smtpUser}
                      onChange={(e) => setSmtpUser(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl input-clean"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-[#b3a3f8]/80">Gmail 16자리 앱 비밀번호</label>
                    <input
                      type="password"
                      required
                      placeholder="xxxx xxxx xxxx xxxx"
                      value={smtpPass}
                      onChange={(e) => setSmtpPass(e.target.value)}
                      className="w-full text-xs px-3.5 py-2.5 rounded-xl input-clean"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full py-2.5 px-3 rounded-xl btn-primary font-extrabold text-xs flex items-center justify-center gap-1 text-[#eeeaff]"
                  >
                    {isSending ? '서버 전송 중...' : '서버 직접 자동 발송'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Bottom Telemetry Bar */}
        <div className="flex items-center justify-between text-[9px] font-mono text-[#b3a3f8]/40 pt-2 border-t border-[#b3a3f8]/15">
          <span>[DISPATCH PROTOCOL ENCRYPTED]</span>
          <span>SMTP SECURE READY</span>
        </div>
      </div>

      {/* High-Tech Terminal Report Preview */}
      <div className="card-clean rounded-2xl p-4 border border-[#b3a3f8]/30 bg-[#080614]/95 space-y-2 shadow-xl">
        <div className="flex items-center justify-between pb-2 border-b border-[#b3a3f8]/15">
          <h4 className="text-xs font-mono font-bold text-[#b3a3f8] flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#b3a3f8]" />
            [AI GENERATED REPORT TERMINAL]
          </h4>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
        <pre className="text-[11px] font-mono text-[#eeeaff]/90 bg-[#0a0818] p-3.5 rounded-xl border border-[#b3a3f8]/15 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
          {reportText}
        </pre>
      </div>
    </div>
  );
}
