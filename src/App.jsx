import React, { useState } from 'react';
import Header from './components/Header';
import ScannerStep from './components/ScannerStep';
import ResultStep from './components/ResultStep';
import AnalysisStep from './components/AnalysisStep';
import EmailStep from './components/EmailStep';
import { getRecommendedFinancialServices } from './data/financialRules';
import { getIndustryIssueData } from './data/industryIssues';
import { sendEmailReport } from './utils/emailService';

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [certData, setCertData] = useState(null);
  const [scannedImage, setScannedImage] = useState(null);
  const [financialList, setFinancialList] = useState([]);
  const [industryData, setIndustryData] = useState(null);
  const [isAutoMode, setIsAutoMode] = useState(true); // 100% Fully Automated Pipeline Enabled
  const [autoSentMessage, setAutoSentMessage] = useState('');

  // Reset to Step 1
  const handleReset = () => {
    setCurrentStep(1);
    setCertData(null);
    setScannedImage(null);
    setFinancialList([]);
    setIndustryData(null);
    setAutoSentMessage('');
  };

  // 100% Autonomous End-to-End Pipeline (Zero Manual Entry)
  const runAutoPipeline = async (parsedData, imageUrl) => {
    setCertData(parsedData);
    setScannedImage(imageUrl);

    // 1. Synthesize 4-Pillar Financial & Industry Analytics
    const finList = getRecommendedFinancialServices(parsedData);
    const indData = getIndustryIssueData(parsedData.businessType, parsedData.itemType);
    setFinancialList(finList);
    setIndustryData(indData);

    // 2. Background Email Dispatch Status
    try {
      const sendResult = await sendEmailReport({
        recipientEmail: 'e.factorials@gmail.com',
        certData: parsedData,
        financialList: finList,
        industryData: indData
      });
      setAutoSentMessage(sendResult.message || '4대 맞춤 종합 분석 리포트가 완성되었습니다!');
    } catch (err) {
      console.warn("Auto email dispatch error:", err);
      setAutoSentMessage('4대 맞춤 종합 분석 리포트가 완성되었습니다.');
    }

    // 3. Jump directly to Step 3 (4-Pillar Gemini AI Analysis & Interactive Q&A View)
    setCurrentStep(3);
  };

  // Step 1 -> Step 4 (Direct Autonomous Route)
  const handleScanComplete = (parsedData, imageUrl) => {
    runAutoPipeline(parsedData, imageUrl);
  };

  // 1-Click Preset Selection
  const handleSelectPreset = (presetData) => {
    runAutoPipeline(presetData, null);
  };

  // Manual Confirmation Route (if user accesses Step 2)
  const handleConfirmCertData = (confirmedData) => {
    setCertData(confirmedData);
    setCurrentStep(3);
  };

  // Step 3 -> Step 4
  const handleProceedToEmail = (finList, indData) => {
    setFinancialList(finList);
    setIndustryData(indData);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Header with AutoMode Toggle */}
      <Header
        currentStep={currentStep}
        onReset={handleReset}
        isAutoMode={isAutoMode}
        onToggleAutoMode={() => setIsAutoMode(!isAutoMode)}
      />

      {/* Main Content View */}
      <main className="flex-1">
        {currentStep === 1 && (
          <ScannerStep
            onScanComplete={handleScanComplete}
            onSelectPreset={handleSelectPreset}
            isAutoMode={isAutoMode}
          />
        )}

        {currentStep === 2 && certData && (
          <ResultStep
            initialData={certData}
            scannedImage={scannedImage}
            onConfirm={handleConfirmCertData}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && certData && (
          <AnalysisStep
            certData={certData}
            autoSentMessage={autoSentMessage}
            onProceedToEmail={handleProceedToEmail}
          />
        )}

        {currentStep === 4 && certData && (
          <EmailStep
            certData={certData}
            financialList={financialList}
            industryData={industryData}
            autoSentMessage={autoSentMessage}
            onBack={() => setCurrentStep(3)}
            onReset={handleReset}
          />
        )}
      </main>

    </div>
  );
}

