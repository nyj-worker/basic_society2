import React from 'react';
import { AI_SHIFT_STATS } from '../data/basicSocietyData';
import { 
  Bot, 
  TrendingDown, 
  Users, 
  Cpu, 
  Coins, 
  AlertCircle, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';

export const AiShiftSection: React.FC = () => {
  const { unstableWorkers, semiconductorSurplusTax, aiBasicSocietyFourPillars } = AI_SHIFT_STATS;

  return (
    <div className="space-y-8">
      {/* 2024년 8월 노동시장 충격 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <AlertCircle className="w-3.5 h-3.5" />
              AI 대전환과 일자리 위기 진단
            </div>
            <h2 className="text-2xl font-bold text-white">중산층 과반이 '불안정 노동자'로 전락</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              디지털 AI 혁명으로 안정적인 정규직 화이트칼라 일자리가 급감하고 있습니다.
            </p>
          </div>

          <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 text-center min-w-[200px]">
            <span className="text-xs font-bold text-rose-300 uppercase block">불안정 노동자 비율</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 mt-1">
              {unstableWorkers.percentage}
            </div>
            <span className="text-xs text-slate-300">1,697만 명 / 3,134만 명</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {unstableWorkers.breakdown.map((item, idx) => (
            <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 block mb-1">{item.label}</span>
              <div className="text-lg sm:text-xl font-bold text-slate-100">{item.val}</div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-sky-400">맥킨지(McKinsey) & 골드만삭스 분석:</strong> ChatGPT 출시 이후 AI 대체 점수가 높은 산업일수록 고용 감소와 청년(15~29세) 실업률 증가가 가속화되고 있습니다. 따라서 과거의 선별적 빈곤 복지로는 과반수의 불안정 중산층을 지탱할 수 없으며, 중산층까지 순수혜자로 품는 '보편적 기본사회'로의 전환이 불가피합니다.
        </div>
      </div>

      {/* 반도체 초과세수와 3가지 갈림길 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <Coins className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">{semiconductorSurplusTax.title}</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          삼성전자·SK하이닉스 3년간 영업이익 약 2,000조 원 전망. 2027년 두 기업 법인세만 120조 원에 달할 것으로 예상되는 초과세수를 어떻게 써야 하는가?
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {semiconductorSurplusTax.options.map((opt, i) => {
            const isRecommended = i === 2;
            return (
              <div 
                key={opt.title}
                className={`p-5 rounded-xl border flex flex-col justify-between transition ${
                  isRecommended
                    ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isRecommended ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {isRecommended ? '★ 기본사회 핵심 제안' : '기존 대안'}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-2">{opt.title}</h4>
                  <div className="text-xs text-slate-300 mb-3">
                    <strong className="text-sky-400 block mb-0.5">논리:</strong>
                    {opt.logic}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 text-xs">
                  {opt.limit ? (
                    <div className="text-rose-400">
                      <strong>한계:</strong> {opt.limit}
                    </div>
                  ) : (
                    <div className="text-emerald-300 font-semibold">
                      <strong>기대 효과:</strong> {opt.pros}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI 기본사회 4대 요소 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Bot className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl font-bold text-white">AI 기본사회 4대 핵심 구성 요소</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {aiBasicSocietyFourPillars.map((p, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm mb-2">
                <span className="w-6 h-6 rounded-md bg-sky-500/10 flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                {p.title}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-8">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
