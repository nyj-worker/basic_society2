import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/basicSocietyData';
import { CaseStudy } from '../types';
import { 
  MapPin, 
  Building, 
  Globe, 
  CheckCircle, 
  ArrowUpRight, 
  Filter,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const CaseStudiesSection: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'domestic' | 'international'>('all');
  const [expandedId, setExpandedId] = useState<string | null>('shinan');

  const filteredCases = filter === 'all' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(c => c.category === filter);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            현장에서 이미 작동하고 있는 기본사회
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            국내외 11대 선도 혁신 사례
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            재생에너지 배당부터 지역순환경제, 공공주택과 영구기금까지 검증된 실천 모델
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'all' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            전체 (11)
          </button>
          <button
            onClick={() => setFilter('domestic')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'domestic' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            국내 지자체 (6)
          </button>
          <button
            onClick={() => setFilter('international')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filter === 'international' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            해외 선진 도시 (5)
          </button>
        </div>
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCases.map((cs) => {
          const isExpanded = expandedId === cs.id;
          const isDomestic = cs.category === 'domestic';

          return (
            <div 
              key={cs.id}
              className={`bg-slate-900 border rounded-2xl p-5 transition flex flex-col justify-between ${
                isExpanded 
                  ? 'border-sky-500/70 shadow-lg shadow-sky-500/10' 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    isDomestic 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  }`}>
                    {cs.badge}
                  </span>
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    {isDomestic ? <MapPin className="w-3.5 h-3.5 text-emerald-400" /> : <Globe className="w-3.5 h-3.5 text-indigo-400" />}
                    {cs.location}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-1.5">{cs.title}</h3>
                <span className="text-xs font-medium text-sky-400 block mb-3">{cs.type}</span>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {cs.description}
                </p>

                {/* Key Stats Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {cs.keyStats.map((stat, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{stat.label}</span>
                      <span className="text-xs font-bold text-slate-100 mt-0.5 block truncate">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                    <span className="text-xs font-bold text-slate-200 block">핵심 운영 방식 & 로드맵:</span>
                    <ul className="space-y-1.5">
                      {cs.modelDetails.map((det, dIdx) => (
                        <li key={dIdx} className="text-xs text-slate-300 flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                          <span>{det}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 mt-3 text-xs text-emerald-200">
                      <strong>정책 시사점:</strong> {cs.takeaway}
                    </div>
                  </div>
                )}
              </div>

              {/* Accordion Toggle Button */}
              <button
                onClick={() => toggleExpand(cs.id)}
                className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-sky-400 hover:text-sky-300 transition w-full"
              >
                <span>{isExpanded ? '상세 내용 접기' : '운영 모델 및 시사점 보기'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
