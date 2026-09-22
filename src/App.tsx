import React, { useState } from 'react';
import { TabType } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { RightsSection } from './components/RightsSection';
import { CommonsSection } from './components/CommonsSection';
import { AiShiftSection } from './components/AiShiftSection';
import { ClimateEnergySection } from './components/ClimateEnergySection';
import { LocalGovRolesSection } from './components/LocalGovRolesSection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { LocalEconomySimulator } from './components/LocalEconomySimulator';
import { QuizSection } from './components/QuizSection';
import { Info, Download } from 'lucide-react';
import { generateStandaloneHtml } from './components/StandaloneHtmlExporter';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const handleDownloadSingleHtml = () => {
    const htmlContent = generateStandaloneHtml();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '기본사회와_지방정부_단일보고서.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex font-sans selection:bg-sky-500 selection:text-white transition-colors duration-200">
      {/* 1. Left Sidebar (Fixed on Desktop, Drawer on Mobile) */}
      <Sidebar 
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isOpenMobile={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Top Header */}
        <Header 
          activeTab={activeTab} 
          onSelectTab={setActiveTab}
          onToggleMobileSidebar={() => setMobileSidebarOpen(prev => !prev)}
        />

        {/* Hero Notification Banner */}
        <div className="bg-sky-950/40 border-b border-sky-800/30 py-2.5 px-4 text-center text-xs sm:text-sm text-sky-200">
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2 flex-wrap">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <span>
              강남훈 명예교수(기본사회위원회 부위원장)의 강연 및 지방정부 정책 제안서 2건을 종합한 디지털 리포트입니다.
            </span>
            <button
              onClick={handleDownloadSingleHtml}
              className="underline font-bold text-sky-300 hover:text-white ml-1 inline-flex items-center gap-1 cursor-pointer"
            >
              단일 HTML 파일 다운로드 (.html)
            </button>
          </div>
        </div>

        {/* Main Content Sections */}
        <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === 'overview' && <OverviewSection />}
          {activeTab === 'rights' && <RightsSection />}
          {activeTab === 'commons' && <CommonsSection />}
          {activeTab === 'ai-shift' && <AiShiftSection />}
          {activeTab === 'climate-energy' && <ClimateEnergySection />}
          {activeTab === 'local-roles' && <LocalGovRolesSection />}
          {activeTab === 'case-studies' && <CaseStudiesSection />}
          {activeTab === 'simulator' && <LocalEconomySimulator />}
          {activeTab === 'quiz' && (
            <div className="space-y-12">
              <LocalEconomySimulator />
              <div className="pt-8 border-t border-slate-800">
                <QuizSection />
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-900/40 mt-auto py-8 text-center text-xs text-slate-500">
          <div className="max-w-6xl mx-auto px-4 space-y-2">
            <p className="font-medium text-slate-400">
              기본사회와 지방정부 (공유부를 지역의 권리로 — 중앙정부의 권한 이양과 지방정부의 5대 역할)
            </p>
            <p>
              참고자료: 강남훈 명예교수 발표자료 (기본사회위원회), 지방정부 중심의 기본사회 실현 방안 (2026. 9)
            </p>
            <div className="pt-2 flex justify-center gap-4 text-slate-400">
              <a href="/basic_society.html" target="_blank" rel="noreferrer" className="hover:text-sky-400 underline">
                단일 독립 HTML 파일 보기
              </a>
              <span>•</span>
              <button onClick={handleDownloadSingleHtml} className="hover:text-sky-400 underline cursor-pointer">
                오프라인 소장용 단일 HTML 다운로드
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
