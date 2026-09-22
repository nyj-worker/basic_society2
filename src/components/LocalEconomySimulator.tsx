import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  Store, 
  Users, 
  Coins, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Building,
  Sparkles,
  Zap
} from 'lucide-react';

interface ScenarioPreset {
  name: string;
  badge: string;
  population: number;
  monthlyAmount: number;
  paymentType: 'local_currency' | 'cash';
  householdSize: number;
  description: string;
}

const PRESETS: ScenarioPreset[] = [
  {
    name: "신안·영광 해상에너지 모델",
    badge: "도서·어촌형",
    population: 38000,
    monthlyAmount: 15,
    paymentType: "local_currency",
    householdSize: 2.1,
    description: "해상풍력 및 태양광 바다사용료·발전수익을 지역화폐로 100% 지급하여 인구소멸을 반등시킨 선순환 모델"
  },
  {
    name: "완주·부안 자립순환 모델",
    badge: "도농복합형",
    population: 55000,
    monthlyAmount: 20,
    paymentType: "local_currency",
    householdSize: 2.2,
    description: "공공 유휴부지 200MW + 영농형 태양광 결합, 전 군민 월 20만 원 배당으로 골목상권 승수효과 극대화"
  },
  {
    name: "남양주 도시 마이크로그리드",
    badge: "대도시 아파트형",
    population: 120000,
    monthlyAmount: 8,
    paymentType: "local_currency",
    householdSize: 2.6,
    description: "아파트 옥상·방음벽 태양광과 전기차 V2G 가상 ESS 결합으로 세대당 월 8만 원 관리비 절감 및 상권 환원"
  },
  {
    name: "단순 현금 지급 비교군",
    badge: "비교 시나리오",
    population: 50000,
    monthlyAmount: 15,
    paymentType: "cash",
    householdSize: 2.2,
    description: "지역화폐 대신 일반 현금으로 지급 시, 대형 온라인 플랫폼 및 수도권으로의 역외 유출 비교 분석"
  }
];

export const LocalEconomySimulator: React.FC = () => {
  const [population, setPopulation] = useState<number>(45000);
  const [monthlyAmount, setMonthlyAmount] = useState<number>(15); // 만원
  const [householdSize, setHouseholdSize] = useState<number>(2.2); // 명
  const [paymentType, setPaymentType] = useState<'local_currency' | 'cash'>('local_currency');
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Apply Preset
  const handleApplyPreset = (preset: ScenarioPreset) => {
    setActivePreset(preset.name);
    setPopulation(preset.population);
    setMonthlyAmount(preset.monthlyAmount);
    setHouseholdSize(preset.householdSize);
    setPaymentType(preset.paymentType);
  };

  // Calculations
  const households = Math.round(population / householdSize);
  const annualPerCapitaWon = monthlyAmount * 10000 * 12; // 1인당 연간 배당액 (원)
  const annualHouseholdWon = annualPerCapitaWon * householdSize; // 가구당 연간 혜택 (원)
  const totalAnnualBudgetWon = annualPerCapitaWon * population; // 총 연간 역내 투입 자본 (원)
  const totalAnnualBudgetBillion = (totalAnnualBudgetWon / 100000000).toFixed(1); // 억 원

  // 역내 소비 유지율 & 승수효과 계수 (자료집 및 거시경제 분석 준용)
  // 지역화폐: 92% 역내 유지, 승수효과 1.48배 (소상공인 2차 순환)
  // 현금: 52% 역내 유지 (48%는 대형 이커머스·카드사·수도권 역외 유출), 승수효과 1.12배
  const retentionRate = paymentType === 'local_currency' ? 0.92 : 0.52;
  const multiplier = paymentType === 'local_currency' ? 1.48 : 1.12;

  const retainedDirectWon = totalAnnualBudgetWon * retentionRate;
  const totalEconomicImpactWon = retainedDirectWon * multiplier;
  const totalEconomicImpactBillion = (totalEconomicImpactWon / 100000000).toFixed(1);

  // 골목상권·소상공인 연간 매출 증대 추정치
  const smallBusinessSalesGainBillion = ((retainedDirectWon * 0.85) / 100000000).toFixed(1);

  // 지방세수 간접 환원 효과 (취득세, 지방소득세, 주민세 등 약 3.8% 회수)
  const taxFeedbackBillion = ((totalEconomicImpactWon * 0.038) / 100000000).toFixed(1);

  // 정주 유입 및 가계부채 경감 체감도 지수
  const disposableIncomeBoostPercent = (
    (annualHouseholdWon / (42000000)) * 100 // 중위가구 연소득 4,200만원 기준
  ).toFixed(1);

  return (
    <div id="local-economy-simulator" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-8">
      {/* Simulator Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Zap className="w-3.5 h-3.5" />
            기본사회 거시경제 파급효과 시뮬레이터
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            지역 경제 배당금 시뮬레이터
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            공유부 배당 정책 도입 시, 우리 지자체의 <strong>역내 소비 승수효과 · 골목상권 매출 증대 · 인구 유지력</strong>을 정량 분석합니다.
          </p>
        </div>

        <button
          onClick={() => handleApplyPreset(PRESETS[0])}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold border border-slate-700 transition self-start md:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
          기본값 초기화
        </button>
      </div>

      {/* Preset Scenarios */}
      <div>
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2.5">
          대표 실천 시나리오 프리셋 (클릭 시 자동 적용)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESETS.map((preset) => {
            const isSelected = activePreset === preset.name;
            return (
              <button
                key={preset.name}
                onClick={() => handleApplyPreset(preset)}
                className={`p-3.5 rounded-xl text-left border transition flex flex-col justify-between ${
                  isSelected
                    ? 'bg-sky-600/20 border-sky-500 shadow-md ring-1 ring-sky-500/40'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {preset.badge}
                    </span>
                    <span className="text-xs font-bold text-sky-400">
                      월 {preset.monthlyAmount}만 원
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white mb-1">{preset.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                    {preset.description}
                  </p>
                </div>
                <span className="text-[11px] text-emerald-400 font-semibold mt-2.5 block">
                  인구 {preset.population.toLocaleString()}명 적용 →
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Controls & Sliders */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5 rounded-2xl bg-slate-950 border border-slate-800/90">
        {/* 1. 인구수 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-200">지자체 인구 수</label>
            <span className="text-xs font-extrabold text-sky-400">
              {population.toLocaleString()} 명
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="300000"
            step="5000"
            value={population}
            onChange={(e) => {
              setPopulation(Number(e.target.value));
              setActivePreset(null);
            }}
            className="w-full accent-sky-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>1만 (면·군단위)</span>
            <span>15만 (중소도시)</span>
            <span>30만 (대도시)</span>
          </div>
        </div>

        {/* 2. 1인당 월 배당금 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-200">1인당 월 배당금</label>
            <span className="text-xs font-extrabold text-amber-400">
              월 {monthlyAmount} 만 원
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="1"
            value={monthlyAmount}
            onChange={(e) => {
              setMonthlyAmount(Number(e.target.value));
              setActivePreset(null);
            }}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>5만원</span>
            <span>20만원 (부안2단계)</span>
            <span>50만원</span>
          </div>
        </div>

        {/* 3. 평균 가구원수 */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-slate-200">가구당 평균 인원</label>
            <span className="text-xs font-extrabold text-slate-300">
              {householdSize} 명
            </span>
          </div>
          <input
            type="range"
            min="1.5"
            max="3.5"
            step="0.1"
            value={householdSize}
            onChange={(e) => {
              setHouseholdSize(Number(e.target.value));
              setActivePreset(null);
            }}
            className="w-full accent-slate-400 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 mt-1">
            <span>1.5명 (1인가구 多)</span>
            <span>2.2명 (전국평균)</span>
            <span>3.5명</span>
          </div>
        </div>

        {/* 4. 지급 수단 (지역화폐 vs 현금) */}
        <div>
          <label className="text-xs font-bold text-slate-200 block mb-1.5">
            배당 지급 방식 (역내 순환)
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setPaymentType('local_currency');
                setActivePreset(null);
              }}
              className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                paymentType === 'local_currency'
                  ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              지역화폐 (권고)
            </button>
            <button
              onClick={() => {
                setPaymentType('cash');
                setActivePreset(null);
              }}
              className={`p-2 rounded-lg text-xs font-bold border transition text-center ${
                paymentType === 'cash'
                  ? 'bg-rose-600/30 border-rose-500 text-rose-300 ring-1 ring-rose-500/50'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              일반 현금
            </button>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            {paymentType === 'local_currency' 
              ? '✓ 역내 골목상권 92% 이상 잔류 및 2차 순환' 
              : '⚠️ 약 48%가 대형 e커머스·수도권으로 역외 유출'}
          </span>
        </div>
      </div>

      {/* Primary Simulation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. 연간 총 투입 자본 */}
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <span className="text-xs text-slate-400 block mb-1">지자체 연간 총 배당 투입</span>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {totalAnnualBudgetBillion} 억 원
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
            주민 1인당 연 {(annualPerCapitaWon / 10000).toLocaleString()}만 원 (가구당 연 {(annualHouseholdWon / 10000).toFixed(0)}만 원)
          </div>
        </div>

        {/* 2. 지역경제 총 부가가치 유발액 */}
        <div className="bg-slate-950 p-5 rounded-xl border border-sky-500/40 shadow-lg shadow-sky-500/5 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-sky-400 block mb-1">
              지역경제 총 부가가치 유발액 (승수효과)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-sky-400">
              {totalEconomicImpactBillion} 억 원
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-sky-300 font-semibold">
            {paymentType === 'local_currency' 
              ? `승수효과 1.48배 적용 (역내 잔류율 92%)` 
              : `역외 유출로 승수효과 1.12배로 급감`}
          </div>
        </div>

        {/* 3. 소상공인 골목상권 매출 증대 */}
        <div className="bg-slate-950 p-5 rounded-xl border border-emerald-500/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-emerald-400 block mb-1">
              관내 소상공인 직접 매출 증대
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">
              +{smallBusinessSalesGainBillion} 억 원
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-emerald-300">
            전통시장, 음식점, 학원, 로컬푸드 직매장 체감 경기 회복
          </div>
        </div>

        {/* 4. 지방세수 선순환 환류액 */}
        <div className="bg-slate-950 p-5 rounded-xl border border-amber-500/40 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 block mb-1">
              지자체 세수 환류 기대액 (선순환)
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-400">
              +{taxFeedbackBillion} 억 원
            </div>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-amber-300">
            거래 활성화로 지방소득세·주민세 회수
          </div>
        </div>
      </div>

      {/* Detailed Economic Insights & Macro Mechanism */}
      <div className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4">
        <h4 className="text-sm font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          기본사회 배당이 지역 소멸을 막아내는 3단계 선순환 메커니즘
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <span className="text-xs font-bold text-sky-400 block mb-1">1단계: 공유부 발굴 & 지대 환수</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              햇빛, 바람, 공공토지, AI 인프라 등 지역의 자연·사회 자산을 사유화 투기자본에 빼앗기지 않고 지자체가 공공 지분과 사용료로 환수합니다.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <span className="text-xs font-bold text-emerald-400 block mb-1">2단계: 지역화폐 보편 배당</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              환수한 지대를 '지역화폐'로 전 주민에게 1/n 무조건 지급하여 역외 유출을 원천 차단하고, 골목상권과 전통시장의 소비로 강제 직결시킵니다.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80">
            <span className="text-xs font-bold text-amber-400 block mb-1">3단계: 가계 안정과 인구 유입 반등</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              가구 가처분소득이 약 <strong>{disposableIncomeBoostPercent}%</strong> 신장되며, 신안군 사례처럼 청년과 은퇴세대가 돌아오는 지속가능한 자립 도시로 도약합니다.
            </p>
          </div>
        </div>

        {paymentType === 'cash' && (
          <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>
              <strong>경고:</strong> 현금 지급 방식은 지역 주민의 소비 중 약 48%가 수도권 백화점, 온라인 대기업 플랫폼으로 유출되어 지역순환경제 구축 효과가 반감됩니다. 기본사회의 배당은 반드시 '지역화폐'와 결합되어야 합니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
