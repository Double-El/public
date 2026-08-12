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
  const [isAutoMode, setIsAutoMode] = useState(true); // Default 1-Touch Auto Email Dispatch
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

  // Run full automatic pipeline: OCR Scan -> 3-Pillar Analysis -> Direct Email Dispatch
  const runAutoPipeline = async (parsedData, imageUrl) => {
    setCertData(parsedData);
    setScannedImage(imageUrl);

    const finList = getRecommendedFinancialServices(parsedData);
    const indData = getIndustryIssueData(parsedData.businessType, parsedData.itemType);
    setFinancialList(finList);
    setIndustryData(indData);

    if (isAutoMode) {
      // Auto-send email to default recipient e.factorials@gmail.com
      try {
        const sendResult = await sendEmailReport({
          recipientEmail: 'e.factorials@gmail.com',
          certData: parsedData,
          financialList: finList,
          industryData: indData
        });
        setAutoSentMessage(sendResult.message || 'e.factorials@gmail.com 으로 리포트가 자동 전송되었습니다!');
      } catch (err) {
        console.warn("Auto email dispatch error:", err);
        setAutoSentMessage('e.factorials@gmail.com 으로 자동 메일 전송이 준비되었습니다.');
      }
      setCurrentStep(4); // Jump directly to completion & email view
    } else {
      setCurrentStep(2); // Manual step-by-step confirmation
    }
  };

  // Step 1 -> Step 2 / Step 4
  const handleScanComplete = (parsedData, imageUrl) => {
    runAutoPipeline(parsedData, imageUrl);
  };

  // 1-Click Preset selection
  const handleSelectPreset = (presetData) => {
    runAutoPipeline(presetData, null);
  };

  // Step 2 -> Step 3
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
            onConfirm={handleConfirmCertData}
            onBack={() => setCurrentStep(1)}
          />
        )}

        {currentStep === 3 && certData && (
          <AnalysisStep
            certData={certData}
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

