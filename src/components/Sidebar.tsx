import React from 'react';
import { TabType } from '../types';
import { 
  BookOpen, 
  Scale, 
  Layers, 
  Cpu, 
  SunMedium, 
  Building2, 
  MapPin, 
  Calculator, 
  HelpCircle,
  ExternalLink,
  Download,
  ShieldCheck,
  ChevronRight,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { generateStandaloneHtml } from './StandaloneHtmlExporter';
import { useTheme } from '../context/ThemeContext';

interface SidebarProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const tabsConfig = [
  { 
    id: 'overview' as TabType, 
    num: '01',
    label: '기본사회 비전', 
    icon: BookOpen, 
    sub: '헌법 제10조 · 5대 원칙 · 18대 부문' 
  },
  { 
    id: 'rights' as TabType, 
    num: '02',
    label: '4대 기본권 체계', 
    icon: Scale, 
    sub: '공유부 배당권의 헌법적 신설' 
  },
  { 
    id: 'commons' as TabType, 
    num: '03',
    label: '공유부 & 커머닝', 
    icon: Layers, 
    sub: '3대 공유부 · 오스트롬 8원칙 · 빙산' 
  },
  { 
    id: 'ai-shift' as TabType, 
    num: '04',
    label: 'AI 대전환 충격', 
    icon: Cpu, 
    sub: '불안정노동 54.1% · 반도체 국부펀드' 
  },
  { 
    id: 'climate-energy' as TabType, 
    num: '05',
    label: '기후·햇빛바람소득', 
    icon: SunMedium, 
    sub: 'OECD 꼴등 탈피 · 2대 배당 모델' 
  },
  { 
    id: 'local-roles' as TabType, 
    num: '06',
    label: '지방정부 5대 역할', 
    icon: Building2, 
    sub: '수탁자 · 환수자 · 공급자 · 설계자' 
  },
  { 
    id: 'case-studies' as TabType, 
    num: '07',
    label: '국내외 혁신 사례', 
    icon: MapPin, 
    sub: '신안 · 완주 · 광주 · 남양주 등 11선' 
  },
  { 
    id: 'simulator' as TabType, 
    num: '08',
    label: '지역경제 배당 시뮬레이터', 
    icon: Calculator, 
    sub: '승수효과 1.48배 · 골목상권 분석' 
  },
  { 
    id: 'quiz' as TabType, 
    num: '09',
    label: '핵심 퀴즈 & 자가진단', 
    icon: HelpCircle, 
    sub: '5문항으로 핵심 개념 마스터' 
  }
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile
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
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        id="app-left-sidebar"
        aria-label="보고서 탐색 사이드바"
        className={`fixed md:sticky top-0 left-0 z-50 h-screen w-72 lg:w-80 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out shrink-0 overflow-hidden ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header of Sidebar */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-950/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-sm">
                基
              </span>
              <div>
                <h2 className="font-extrabold text-white text-base tracking-tight">
                  기본사회와 지방정부
                </h2>
                <span className="text-[11px] text-sky-400 font-medium block">
                  지방정부 중심 정책 가이드
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 md:hidden"
              aria-label="사이드바 닫기"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Menu List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 custom-scrollbar">
          <div className="px-3 py-2 text-[11px] font-bold tracking-wider uppercase text-slate-400 flex items-center justify-between">
            <span>목차 탐색 (Navigation)</span>
            <span className="text-[10px] text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded border border-sky-500/20">
              9개 챕터
            </span>
          </div>

          {tabsConfig.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                id={`sidebar-tab-${tab.id}`}
                onClick={() => {
                  onSelectTab(tab.id);
                  onCloseMobile();
                }}
                className={`w-full text-left p-2.5 rounded-xl transition flex items-start gap-3 cursor-pointer group ${
                  isActive
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/25 ring-1 ring-sky-400/40'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 mt-0.5 transition ${
                  isActive 
                    ? 'bg-white/20 text-white' 
                    : 'bg-slate-800 text-slate-400 group-hover:text-sky-400 group-hover:bg-slate-700'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {tab.num}. {tab.label}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 text-white/80 shrink-0 ml-1" />
                    )}
                  </div>
                  <span className={`text-[11px] block truncate mt-0.5 ${
                    isActive ? 'text-sky-100' : 'text-slate-400'
                  }`}>
                    {tab.sub}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Sidebar Bottom Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/70 space-y-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer"
            title={theme === 'dark' ? '밝은 라이트 모드로 전환' : '편안한 다크 모드로 전환'}
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-sky-400" />
              )}
              <span>화면 모드</span>
            </div>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-700/80 text-sky-300">
              {theme === 'dark' ? '다크 모드' : '라이트 모드'}
            </span>
          </button>

          <button
            onClick={handleDownloadSingleHtml}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white shadow-sm transition cursor-pointer"
            title="인터넷 없이도 열리는 독립된 단일 HTML 파일로 저장"
          >
            <Download className="w-4 h-4" />
            <span>단일 HTML 다운로드</span>
          </button>

          <button
            onClick={handleOpenStandaloneTab}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition cursor-pointer"
            title="독립 새 창에서 열기"
          >
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
            <span>단일 HTML 새창 열기</span>
          </button>
        </div>
      </aside>
    </>
  );
};
