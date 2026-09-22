import React, { useState } from 'react';
import { CLIMATE_ENERGY_DATA } from '../data/basicSocietyData';
import { 
  SunMedium, 
  Wind, 
  Globe2, 
  AlertTriangle, 
  Calculator, 
  Zap, 
  ShieldAlert, 
  CheckCircle,
  Coins
} from 'lucide-react';

export const ClimateEnergySection: React.FC = () => {
  const { koreaStatus, tradeBarriers, costParadox, twoDividends, fourRenewableModels } = CLIMATE_ENERGY_DATA;

  // Simulator State
  const [mw, setMw] = useState<number>(100);
  const [hours, setHours] = useState<number>(3.5);
  const [price, setPrice] = useState<number>(180);
  const [sharePercent, setSharePercent] = useState<number>(20);
  const [population, setPopulation] = useState<number>(40000);

  // Calculations
  const annualMwh = mw * hours * 365;
  const annualKwh = annualMwh * 1000;
  const totalRevenue = annualKwh * price; // 원
  const publicFund = totalRevenue * (sharePercent / 100);
  const perCapitaAnnual = population > 0 ? publicFund / population : 0;
  const perCapitaMonthly = perCapitaAnnual / 12;

  return (
    <div className="space-y-8">
      {/* OECD 꼴찌 현주소 & 기후 무역장벽 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 mb-2">
              <AlertTriangle className="w-3.5 h-3.5" />
              대한민국 에너지 전환 비상 사태
            </div>
            <h2 className="text-2xl font-bold text-white">
              OECD 38개국 중 재생에너지 발전 비중 최하위 (10%)
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              독일 56%, 영국 48%, 미국 24%... 2035년 넷제로 미달성 시 한국 수출 대기업 해외 이전 가속
            </p>
          </div>

          <div className="bg-rose-950/40 border border-rose-500/30 rounded-2xl p-4 text-center min-w-[200px]">
            <span className="text-xs font-bold text-rose-300 uppercase block">한국 재생에너지 비중</span>
            <div className="text-3xl sm:text-4xl font-extrabold text-rose-400 mt-1">10%</div>
            <span className="text-xs text-slate-300">OECD 38개국 중 38위</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tradeBarriers.map(tb => (
            <div key={tb.name} className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                {tb.name}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {tb.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* LCOE vs LFSCOE 역설 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-5 h-5 text-amber-400" />
          <h3 className="text-xl font-bold text-white">{costParadox.title}</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          {costParadox.desc}
        </p>
        <div className="p-4 rounded-xl bg-sky-950/30 border border-sky-500/30 text-xs sm:text-sm text-sky-200">
          <strong className="text-sky-300 block mb-1">국가 및 지방정부의 역할:</strong>
          {costParadox.solution}
        </div>
      </div>

      {/* 2가지 기본소득 비교: 탄소배당 vs 햇빛바람소득 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {twoDividends.map((divi, idx) => (
          <div key={divi.title} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  기본소득 {idx + 1}
                </span>
                {idx === 0 ? <Globe2 className="w-5 h-5 text-sky-400" /> : <SunMedium className="w-5 h-5 text-amber-400" />}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{divi.title}</h3>
              <p className="text-xs text-slate-400 mb-4 font-medium">{divi.source}</p>

              <div className="space-y-3 my-4">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                  <strong className="text-sky-400 block mb-1">환수 및 배당 방식:</strong>
                  {divi.method}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-emerald-300 font-semibold">
              <strong>핵심 효과:</strong> {divi.effect}
            </div>
          </div>
        ))}
      </div>

      {/* 햇빛바람소득 4대 모델 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Wind className="w-5 h-5 text-teal-400" />
          햇빛바람소득 4가지 실현 모델 비교
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fourRenewableModels.map((m, idx) => (
            <div key={idx} className="bg-slate-950 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 mb-2 inline-block">
                  유형 {idx + 1}
                </span>
                <h4 className="font-bold text-sm sm:text-base text-white mb-2">{m.type}</h4>
                <div className="text-xs text-slate-300 space-y-1.5 mb-3">
                  <div><strong className="text-slate-400">적용 대상:</strong> {m.target}</div>
                  <div><strong className="text-slate-400">지분 소유:</strong> {m.holder}</div>
                </div>
              </div>
              <div className="pt-2 border-t border-slate-800 text-xs text-emerald-400 font-medium">
                <strong>이익 공유:</strong> {m.beneficiary}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 대화형 재생에너지 배당 시뮬레이터 */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 text-sky-400 mb-2">
          <Calculator className="w-5 h-5" />
          <h3 className="text-xl font-bold text-white">재생에너지 공유부 배당 시뮬레이터</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          해당 지자체나 마을의 설비 용량, 지분율, 주민 수를 입력하여 예상 배당액을 산출해 보세요.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              발전 설비 용량 (MW)
            </label>
            <input 
              type="number" 
              value={mw} 
              onChange={e => setMw(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">예: 완주 200MW, 신안 해상풍력 400MW</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              일평균 발전시간 (시간/일)
            </label>
            <input 
              type="number" 
              step="0.1"
              value={hours} 
              onChange={e => setHours(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">국내 평균 태양광 약 3.5h, 풍력 4~6h</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              전력 판매단가 (SMP+REC, 원/kWh)
            </label>
            <input 
              type="number" 
              value={price} 
              onChange={e => setPrice(Math.max(50, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">기준 단가 160 ~ 200원</span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              공유부 공공·주민 지분율 (%)
            </label>
            <input 
              type="number" 
              value={sharePercent} 
              onChange={e => setSharePercent(Math.max(1, Math.min(100, Number(e.target.value))))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">해상풍력 20% 이내, 협동조합 30% 등</span>
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              배당 대상 인구 수 (명)
            </label>
            <input 
              type="number" 
              value={population} 
              onChange={e => setPopulation(Math.max(1, Number(e.target.value)))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-sm text-white focus:outline-none focus:border-sky-500"
            />
            <span className="text-[11px] text-slate-500 mt-1 block">예: 군 단위 3~5만 명, 읍면 단위 3천~1만 명</span>
          </div>
        </div>

        {/* Results Card */}
        <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div>
            <span className="text-xs text-slate-400 block mb-1">연간 총 전력 판매매출</span>
            <div className="text-xl sm:text-2xl font-bold text-white">
              약 {(totalRevenue / 100000000).toFixed(1)} 억 원
            </div>
          </div>
          <div>
            <span className="text-xs text-emerald-400 font-semibold block mb-1">
              공공·주민 배당 기금 ({sharePercent}%)
            </span>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400">
              약 {(publicFund / 100000000).toFixed(1)} 억 원
            </div>
          </div>
          <div>
            <span className="text-xs text-amber-300 font-semibold block mb-1">주민 1인당 연간 배당액</span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              {(perCapitaAnnual / 10000).toFixed(1)} 만 원
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              (월 약 {Math.round(perCapitaMonthly).toLocaleString()} 원)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
