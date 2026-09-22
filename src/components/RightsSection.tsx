import React, { useState } from 'react';
import { FOUR_RIGHTS_EVOLUTION, CORE_VISION } from '../data/basicSocietyData';
import { ArrowRight, ShieldCheck, Check, Sparkles, UserCheck, BookOpen } from 'lucide-react';

export const RightsSection: React.FC = () => {
  const [activeRightId, setActiveRightId] = useState<string>('commons');

  const selectedRight = FOUR_RIGHTS_EVOLUTION.find(r => r.id === activeRightId) || FOUR_RIGHTS_EVOLUTION[3];

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            기본권의 현대적 4단계 확장 체계
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            복지국가를 넘어: 공유부 배당권의 헌법적 확립
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            전통 복지국가는 자유권, 참정권, 사회권의 3단계 권리에 머물렀습니다. 기본사회는 
            인간의 노동이 아닌 자연과 사회가 선물한 공공 자산의 몫을 돌려주는 
            <strong className="text-amber-400 font-bold ml-1">"제4의 권리: 공유부 배당권"</strong>을 핵심 축으로 완성합니다.
          </p>
          <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-sm font-semibold text-slate-200">
            {CORE_VISION.quote} — 토마스 마샬의 시민권 이론을 계승하고, 모든 시민을 공유부의 1/n 공동소유자로 인정
          </div>
        </div>
      </div>

      {/* 4대 기본권 탭 & 카드 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FOUR_RIGHTS_EVOLUTION.map((item) => {
          const isSelected = item.id === activeRightId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveRightId(item.id)}
              className={`p-4 rounded-xl text-left border transition relative flex flex-col justify-between ${
                isSelected 
                  ? 'bg-slate-800/90 border-sky-500 shadow-lg shadow-sky-500/10 ring-1 ring-sky-500/50' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider block mb-1 ${
                  item.id === 'commons' ? 'text-amber-400' : 'text-slate-400'
                }`}>
                  {item.id === 'commons' ? '★ 핵심 신설' : '전통 권리의 진화'}
                </span>
                <h3 className="font-bold text-base sm:text-lg text-white">{item.name}</h3>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs font-semibold text-sky-400">
                <span>상세 비교 보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Right Deep Dive Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">권리 심층 분석</span>
            <h3 className="text-2xl font-bold text-white mt-1">{selectedRight.name}</h3>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
            실질적 인간 존엄성을 보장하는 핵심 토대
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div className="bg-slate-950 p-5 rounded-xl border border-rose-500/20">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              기존 관념 (형식적 차원)
            </div>
            <p className="text-base text-slate-300 font-semibold">{selectedRight.before}</p>
          </div>

          <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/30">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              기본사회의 패러다임 (실질적 보장)
            </div>
            <p className="text-base text-white font-bold">{selectedRight.after}</p>
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700/60">
          <h4 className="text-sm font-semibold text-slate-200 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-sky-400" />
            권리의 철학적 배경과 정책적 의미
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            {selectedRight.detail}
          </p>
        </div>
      </div>

      {/* 노벨 경제학자들의 공유부 기본소득 지지 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-amber-400" />
          노벨 경제학상 수상자들의 공유부 기본소득 정당성 논거
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-sky-400">허버트 사이먼 (Herbert Simon)</h4>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">지식 공유부</span>
            </div>
            <blockquote className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
              "모든 고소득자의 소득 중 90% 이상은 본인의 천재성 때문이 아니라, 인류가 축적해 온 사회적 지식과 인프라(사회공유부)를 활용한 결과이다. 따라서 70% 수준으로 과세하여 전 국민에게 기본소득으로 배당하는 것은 완벽히 정당하다."
            </blockquote>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-amber-400">제임스 미드 (James Meade)</h4>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">아가토토피아(Agathotopia)</span>
            </div>
            <blockquote className="text-xs sm:text-sm text-slate-300 italic mb-3 leading-relaxed">
              "정부는 기업의 경영에는 간섭하지 않되, 국가 자본과 국부펀드를 통해 모든 기업 지분의 상당 부분을 공동 소유하고 그 배당금을 전 국민에게 기본소득으로 균등 분배하는 '배당형 기본소득' 체계를 수립해야 한다."
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
};
