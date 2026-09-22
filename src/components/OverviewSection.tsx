import React, { useState } from 'react';
import { 
  CORE_VISION, 
  FIVE_PRINCIPLES, 
  FOUR_STRATEGIES_AND_18_AREAS 
} from '../data/basicSocietyData';
import { 
  Scale, 
  Users, 
  HeartHandshake, 
  Compass, 
  TrendingUp, 
  BookMarked, 
  CheckCircle,
  Quote,
  Sparkles
} from 'lucide-react';

const PRINCIPLE_ICONS = [Scale, Users, HeartHandshake, Compass, TrendingUp];

export const OverviewSection: React.FC = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('all');

  const filteredStrategies = selectedStrategy === 'all' 
    ? FOUR_STRATEGIES_AND_18_AREAS 
    : FOUR_STRATEGIES_AND_18_AREAS.filter(s => s.category === selectedStrategy);

  return (
    <div className="space-y-8">
      {/* Hero Quote & Constitutional Basis */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-300 border border-sky-500/20 mb-4">
            <Quote className="w-3.5 h-3.5" />
            헌법적 철학과 기본사회 선언
          </div>
          
          <blockquote className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed italic border-l-4 border-sky-500 pl-4 py-1 mb-6">
            {CORE_VISION.constitutionalBasis}
          </blockquote>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider block mb-1">기본사회 정의</span>
              <p className="text-sm sm:text-base text-slate-100 font-medium">
                "{CORE_VISION.definition}"
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50 flex flex-col justify-center">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider block mb-1">시대적 비전</span>
              <p className="text-sm sm:text-base text-emerald-100 font-bold">
                "{CORE_VISION.vision}"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5대 원칙 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">기본사회 5대 운영 원칙</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FIVE_PRINCIPLES.map((p, idx) => {
            const Icon = PRINCIPLE_ICONS[idx % PRINCIPLE_ICONS.length];
            return (
              <div 
                key={p.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between transition hover:-translate-y-1 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-sm">
                      0{p.id}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h3 className="font-bold text-base text-white mb-2">{p.name}</h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4대 전략과 18대 핵심 부문 */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-emerald-400" />
              4대 전략과 18대 핵심 부문
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              삶의 전 영역에서 기본적 조건을 차별 없이 보장하는 종합 체계
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedStrategy('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                selectedStrategy === 'all'
                  ? 'bg-sky-600 text-white'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              전체 보기
            </button>
            {FOUR_STRATEGIES_AND_18_AREAS.map(st => (
              <button
                key={st.category}
                onClick={() => setSelectedStrategy(st.category)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  selectedStrategy === st.category
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {st.category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {filteredStrategies.map((strat, sIdx) => (
            <div key={strat.category} className="bg-slate-950/60 rounded-xl p-5 border border-slate-800">
              <div className="flex items-center gap-2 mb-4 pb-2 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <h3 className="font-bold text-base sm:text-lg text-white">
                  전략 {sIdx + 1}: {strat.category}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {strat.areas.map(area => (
                  <div 
                    key={area.name} 
                    className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="font-semibold text-sm text-slate-100">{area.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {area.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
