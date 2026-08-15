import { getGeminiFinancialAnalysis, getNaverIndustryIssues, getNotebookInsiderSecrets, getAMLComplianceChecklist, getYouTubeIndustryVideos } from './aiAgentEngine';

const DEFAULT_TARGET_EMAIL = 'e.factorials@gmail.com, myungmin@shinhan.com';

// Generate Clean Text Summary for Email & Export
export function generateEmailReportBody(certData, financialList, industryData) {
  const now = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  
  const geminiFin = getGeminiFinancialAnalysis(certData);
  const naverIss = getNaverIndustryIssues(certData);
  const notebookSec = getNotebookInsiderSecrets(certData);
  const amlCheck = getAMLComplianceChecklist(certData);
  const youtubeVid = getYouTubeIndustryVideos(certData);

  const geminiStr = geminiFin.recommendations.map((rec, idx) => {
    return `${idx + 1}. [${rec.tag}] ${rec.title} (${rec.amount})
   - 내용: ${rec.description}
   - 실행 팁: ${rec.actionTip}`;
  }).join('\n\n');

  const naverStr = naverIss.issueList.map((iss, idx) => {
    return `${idx + 1}. [${iss.level}] ${iss.title}
   - 요약: ${iss.summary}
   - 기사/검색 링크: ${iss.naverSearchUrl}`;
  }).join('\n\n');

  const notebookStr = notebookSec.tips.map((tip, idx) => {
    return `${idx + 1}. ${tip.title}
   - 노하우: ${tip.secret}`;
  }).join('\n\n');

  const amlStr = amlCheck.checkpoints.map((check, idx) => {
    return `${idx + 1}. [${check.status}] ${check.title}
   - 점검 내용: ${check.desc}
   - 조치 가이드: ${check.guideline}`;
  }).join('\n\n');

  const youtubeStr = youtubeVid.videos.map((vid, idx) => {
    return `${idx + 1}. ${vid.title} (${vid.channel} · ${vid.views})
   - 핵심 요약: ${vid.summary}
   - 유튜브 링크: ${vid.youtubeUrl}`;
  }).join('\n\n');

  return `=================================================
[Shinhan BIZ SCANNER] 사업자 맞춤형 4대 종합 분석 & AI 리포트
발행일자: ${now}
수신자: ${DEFAULT_TARGET_EMAIL}
=================================================

1. 사업자등록증 취합 기본 정보
-------------------------------------------------
• 상호 / 법인명 : ${certData?.companyName || '미지정'}
• 대표자 성명   : ${certData?.representative || '미지정'}
• 사업자등록번호: ${certData?.regNumber || '미지정'}
• 법인등록번호  : ${certData?.corpRegNumber || '해당 없음'}
• 개업 연월일   : ${certData?.formattedDate || certData?.registrationDate || '미지정'}
• 업태 / 세부종목: ${certData?.businessType || '기타'} / ${certData?.itemType || '기타'}
• 과세 및 사업유형: ${certData?.taxType || '일반과세'}
• 사업장 소재지 : ${certData?.address || '미지정'}

2. 💰 [Gemini AI] 대표자 맞춤 금융·절세·보증 솔루션 (${certData?.businessType || '업태'} 특화)
-------------------------------------------------
${geminiStr}

3. 📰 [Naver] 업태 직접 관련 최신 규제 이슈 & 기사 요약
-------------------------------------------------
${naverStr}

4. 🤫 [Google NotebookLM] 업계 실무 비하인드 인사이드 팁
-------------------------------------------------
${notebookStr}

5. 🛡️ [AML] 업종별 자금세탁방지 점검사항 (위험도: ${amlCheck.riskLevel})
-------------------------------------------------
• 분야: ${amlCheck.sector} (${amlCheck.riskLabel})
• 고객확인 의무(CDD/EDD): ${amlCheck.cddType}

${amlStr}

6. 📺 [AI Q&A] ${certData?.businessType || '업태'} 사장님 대표 관심 추천 유튜브 영상 Top 3
-------------------------------------------------
${youtubeStr}

-------------------------------------------------
본 리포트는 Shinhan BIZ SCANNER 모바일 서비스를 통해 자동 생성 및 발송된 리포트입니다.
수신 이메일: ${DEFAULT_TARGET_EMAIL}
=================================================`;
}

// Send Email Function with Real API & Server Dispatch
export async function sendEmailReport({ recipientEmail, certData, financialList, industryData }) {
  const targetEmail = recipientEmail || DEFAULT_TARGET_EMAIL;
  const reportBody = generateEmailReportBody(certData, financialList, industryData);
  const subject = `[Shinhan BIZ SCANNER] ${certData?.companyName || '사업자'} 맞춤형 금융·경영이슈·AML 분석 리포트`;
  const mailtoUrl = getMailtoUrl(targetEmail, certData, financialList, industryData);

  // 1. Try Vercel Serverless Function & Local Backend API (/api/send-email)
  try {
    const endpoints = [
      '/api/send-email',
      `http://${window.location.hostname || 'localhost'}:3001/api/send-email`
    ];

    for (const serverUrl of endpoints) {
      try {
        const res = await fetch(serverUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: targetEmail,
            subject,
            text: reportBody
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && !data.requiresAuth) {
            return {
              success: true,
              method: 'backend_server',
              message: `${targetEmail} 주소로 실제 리포트 이메일이 발송되었습니다!`,
              previewUrl: data.previewUrl || null
            };
          }
        }
      } catch (e) {
        // Continue to next endpoint
      }
    }
  } catch (err) {
    console.warn("Backend server API unreachable, attempting mobile mail dispatch:", err);
  }

  // 2. Return fallback mailto readiness status without unloading page
  return {
    success: true,
    method: 'ready',
    message: `${targetEmail} 수신용 4대 맞춤 분석 리포트가 완성되었습니다!`,
    mailtoUrl: mailtoUrl
  };
}

// Generate Mailto URL for native email app launch
export function getMailtoUrl(recipientEmail, certData, financialList, industryData) {
  const targetEmail = recipientEmail || DEFAULT_TARGET_EMAIL;
  const subject = encodeURIComponent(`[BIZ SCANNER] ${certData?.companyName || '사업자'} 맞춤형 금융·경영이슈·AML 분석 리포트`);
  const body = encodeURIComponent(generateEmailReportBody(certData, financialList, industryData));
  return `mailto:${targetEmail}?subject=${subject}&body=${body}`;
}
