import React from 'react';
import { Download, ExternalLink, ShieldCheck, Menu, Sun, Moon } from 'lucide-react';
import { generateStandaloneHtml } from './StandaloneHtmlExporter';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  activeTab: string;
  onSelectTab: (tab: any) => void;
  onToggleMobileSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  activeTab, 
  onSelectTab,
  onToggleMobileSidebar 
}) => {
  const { theme, toggleTheme } = useTheme();

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

  const handleOpenStandaloneTab = () => {
    window.open('/basic_society.html', '_blank');
  };

  return (
    <header id="main-header" className="relative border-b border-slate-800 bg-slate-900/95 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Hamburger button for mobile */}
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 md:hidden border border-slate-700 focus:outline-none cursor-pointer"
              aria-label="사이드바 메뉴 열기"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  기본사회위원회 강남훈 교수 발표자료 종합
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  지방정부 중심 모델
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>기본사회와 지방정부</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                공유부를 지역의 권리로 — 중앙정부의 권한 이양과 지방정부의 5대 역할
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle Button */}
            <button
              id="btn-theme-toggle-header"
              onClick={toggleTheme}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title={theme === 'dark' ? '밝은 라이트 모드로 전환' : '편안한 다크 모드로 전환'}
              aria-label="화면 모드 전환"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">라이트 모드</span>
                </>
              ) : (
                <>
                  <Moon className="w-4 h-4 text-sky-500" />
                  <span className="hidden sm:inline">다크 모드</span>
                </>
              )}
            </button>

            <button
              id="btn-open-standalone"
              onClick={handleOpenStandaloneTab}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 sm:py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
              title="독립된 새 탭에서 단일 HTML 파일 열기"
            >
              <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
              새창 열기
            </button>

            <button
              id="btn-download-single-html"
              onClick={handleDownloadSingleHtml}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white shadow-sm hover:shadow transition cursor-pointer"
              title="인터넷 없이도 열리는 단일 HTML 파일로 저장"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">단일 HTML 파일 다운로드</span>
              <span className="sm:hidden">HTML 저장</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
