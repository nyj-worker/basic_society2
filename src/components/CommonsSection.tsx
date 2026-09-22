import React, { useState } from 'react';
import { 
  COMMONS_CATEGORIES, 
  OSTROM_EIGHT_PRINCIPLES, 
  ICEBERG_MODEL 
} from '../data/basicSocietyData';
import { 
  Compass, 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  Maximize2, 
  Sliders, 
  Users, 
  Eye, 
  ShieldAlert, 
  Scale, 
  ChevronRight,
  TrendingDown
} from 'lucide-react';

const OSTROM_ICONS: Record<string, any> = {
  Maximize2,
  Sliders,
  Users,
  Eye,
  ShieldAlert,
  Scale,
  CheckCircle2,
  Layers
};

export const CommonsSection: React.FC = () => {
  const [selectedOstrom, setSelectedOstrom] = useState<number>(1);
  const currentOstrom = OSTROM_EIGHT_PRINCIPLES.find(o => o.number === selectedOstrom) || OSTROM_EIGHT_PRINCIPLES[0];

  return (
    <div className="space-y-8">
      {/* 3대 공유부 분류 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-5 h-5 text-sky-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">공유부(Common Wealth)의 3대 범주</h2>
        </div>
        <p className="text-slate-400 text-sm mb-6">
          특정 개인의 기여만으로 발생하지 않은 가치를 인클로저(사유화 독점)로부터 지켜내어 공동체 모두의 자산으로 승화시킵니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {COMMONS_CATEGORIES.map((c, i) => (
            <div 
              key={i} 
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-lg"
            >
              <div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  공유부 범주 {i + 1}
                </span>
                <h3 className="text-lg font-bold text-white mt-3 mb-2">{c.title}</h3>
                <p className="text-xs text-sky-300 font-medium mb-3">{c.source}</p>
                
                <div className="space-y-1.5 my-3">
                  <span className="text-xs font-semibold text-slate-400 block">주요 구성 요소:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {c.examples.map(ex => (
                      <span key={ex} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-emerald-400 block mb-1">가치 평가:</strong>
                  {c.value}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <span className="text-xs font-bold text-amber-400 block mb-1">기본사회 정책 대안:</span>
                <p className="text-xs text-slate-300">{c.policy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 자연공유부 4분면 배당 원칙 매트릭스 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Scale className="w-5 h-5 text-emerald-400" />
          자연공유부 4분면 배당 원칙 매트릭스
        </h3>
        <p className="text-slate-400 text-xs sm:text-sm mb-6">
          희소성과 재생 가능 여부에 따라 환수와 배당의 방식이 달라집니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-slate-950 border border-amber-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">A. 재생 가능 + 상대적 희소</span>
              <span className="text-xs text-slate-400">지대 환수 배당</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">주거용·산업용 토지, 물 부족 국가의 담수</h4>
            <p className="text-xs text-slate-400 mb-3">한계비용으로 공급 충당이 불가능하여 막대한 위치적 지대 발생</p>
            <div className="p-2.5 rounded bg-slate-900 text-xs font-semibold text-amber-300 border border-amber-500/20">
              ▶ 해법: 국토보유세/토지가치세를 징수하여 전 국민 공유부 배당
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-sky-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/10 text-sky-300">C. 재생 가능 + 상대적 풍부</span>
              <span className="text-xs text-slate-400">무상 접근 관리</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">산소, 햇빛, 바람, 풍부한 수자원</h4>
            <p className="text-xs text-slate-400 mb-3">일정한 한계비용으로 수요 충당이 가능하고 고갈되지 않음</p>
            <div className="p-2.5 rounded bg-slate-900 text-xs font-semibold text-sky-300 border border-sky-500/20">
              ▶ 해법: 비시장화하고 공공 무상 접근 보장 및 지속가능한 재생 관리
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-rose-500/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300">B. 재생 불가능(고갈성) + 상대적 희소</span>
              <span className="text-xs text-slate-400">영구기금 배당</span>
            </div>
            <h4 className="text-base font-bold text-white mb-1">금, 리튬, 희토류, 석유 (수요 있는 광물)</h4>
            <p className="text-xs text-slate-400 mb-3">채굴할수록 고갈되므로 미래 세대 몫을 보존해야 함</p>
            <div className="p-2.5 rounded bg-slate-900 text-xs font-semibold text-rose-300 border border-rose-500/20">
              ▶ 해법: 채굴 지대를 환수해 알래스카형 '영구기금'을 만들고 수익만 배당
            </div>
          </div>

          <div className="p-5 rounded-xl bg-slate-950 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">D. 재생 불가능 + 수요 없음</span>
              <span className="text-xs text-slate-500">배당 대상 아님</span>
            </div>
            <h4 className="text-base font-bold text-slate-300 mb-1">석면, 방사성 폐기물 원료</h4>
            <p className="text-xs text-slate-400 mb-3">경제적 가치가 없거나 인체에 유해하여 사용 금지 대상</p>
            <div className="p-2.5 rounded bg-slate-900 text-xs text-slate-400 border border-slate-800">
              ▶ 안전한 차단 및 생태적 폐기 관리
            </div>
          </div>
        </div>
      </div>

      {/* 오스트롬 8대 원칙 인터랙티브 탐색기 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">노벨 경제학상 엘리너 오스트롬</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              공유지의 비극을 극복하는 8대 커머닝(Commoning) 원칙
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List of 8 Principles */}
          <div className="lg:col-span-1 space-y-2 max-h-96 overflow-y-auto pr-1">
            {OSTROM_EIGHT_PRINCIPLES.map(p => {
              const isSelected = p.number === selectedOstrom;
              return (
                <button
                  key={p.number}
                  onClick={() => setSelectedOstrom(p.number)}
                  className={`w-full p-3 rounded-xl text-left border transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-sky-600/20 border-sky-500 text-white font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-xs font-bold text-sky-400">
                      {p.number}
                    </span>
                    <span className="text-xs sm:text-sm">{p.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              );
            })}
          </div>

          {/* Detailed view of active principle */}
          <div className="lg:col-span-2 bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  제 {currentOstrom.number} 원칙
                </span>
                <span className="text-xs text-slate-400 italic">{currentOstrom.enTitle}</span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{currentOstrom.title}</h4>
              <p className="text-sm font-medium text-sky-300 mb-4">{currentOstrom.summary}</p>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {currentOstrom.description}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide block mb-1">
                대한민국 지방정부 실천 적용점
              </span>
              <p className="text-xs sm:text-sm text-emerald-100 font-medium">
                {currentOstrom.actionPoint}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 시스템 사고의 빙산 모델 (Iceberg Model) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-2">
          시스템 사고의 빙산 모델 (Iceberg Model)
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          도넬라 메도우스(Donella Meadows)의 레버리지 포인트 이론: 아래로 내려갈수록 바꾸기 어렵지만, 바뀌면 영구히 지속됩니다.
        </p>

        <div className="space-y-3">
          {ICEBERG_MODEL.map((layer, index) => {
            const isDeepest = index === 3;
            return (
              <div 
                key={layer.level}
                className={`p-4 rounded-xl border transition ${
                  isDeepest
                    ? 'bg-amber-500/10 border-amber-500/50 shadow-md shadow-amber-500/5'
                    : 'bg-slate-950 border-slate-800'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      isDeepest ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {layer.level}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{layer.depth}</span>
                  </div>
                  <span className="text-xs text-sky-400 font-semibold">{layer.action}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-1">{layer.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
