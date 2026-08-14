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
  const [isAutoMode, setIsAutoMode] = useState(false); // Default to Manual Verification Step
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

  // Run pipeline: Save OCR scan data -> Step 2 (Information Verification & Edit)
  const runAutoPipeline = async (parsedData, imageUrl) => {
    setCertData(parsedData);
    setScannedImage(imageUrl);

    const finList = getRecommendedFinancialServices(parsedData);
    const indData = getIndustryIssueData(parsedData.businessType, parsedData.itemType);
    setFinancialList(finList);
    setIndustryData(indData);

    // ALWAYS navigate to Step 2 so user can verify & edit parsed fields first
    setCurrentStep(2);
  };

  // Step 1 -> Step 2
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
            scannedImage={scannedImage}
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

