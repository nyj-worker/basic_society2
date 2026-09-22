import React, { useState } from 'react';
import { LOCAL_GOV_FIVE_ROLES, THREE_TIER_GOVERNANCE } from '../data/basicSocietyData';
import { 
  Building2, 
  Landmark, 
  MapPin, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  GitFork
} from 'lucide-react';

export const LocalGovRolesSection: React.FC = () => {
  const [activeRoleIndex, setActiveRoleIndex] = useState<number>(0);

  const activeRole = LOCAL_GOV_FIVE_ROLES[activeRoleIndex];

  return (
    <div className="space-y-8">
      {/* 왜 지방정부인가? 진단 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-3">
            <Building2 className="w-3.5 h-3.5" />
            패러다임의 대전환
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            왜 지방정부가 기본사회의 주체여야 하는가?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            지방정부는 중앙이 획일적으로 설계한 복지를 단순히 집행·전달하는 하부 기관이 아닙니다. 
            지역의 고유한 <strong className="text-sky-400 font-bold">공유부를 직접 발굴·환수하고, 주민에게 배당하는 능동적 주체</strong>로 거듭나야 합니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-rose-400 block mb-1">1. 부의 역외 유출 차단</span>
              <p className="text-xs text-slate-400">
                지역에서 창출된 부와 예금이 수도권 독점자본으로 빠져나가지 않고 지역에 재투자되도록 통제.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-amber-400 block mb-1">2. 인구소멸 & 공간 불평등 해소</span>
              <p className="text-xs text-slate-400">
                서울 집중 시스템을 깨고 기본서비스와 소득 안전망을 결합해 정주 여건을 보장.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs font-bold text-emerald-400 block mb-1">3. 풀뿌리 정책 실험성 확보</span>
              <p className="text-xs text-slate-400">
                무상급식과 햇빛연금처럼 지역에서 성공한 모델이 선의의 경쟁을 거쳐 전국 표준으로 상향식 확산.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5대 역할 인터랙티브 카드 */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-sky-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-white">지방정부의 5대 핵심 역할 매트릭스</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-6">
          {LOCAL_GOV_FIVE_ROLES.map((r, idx) => {
            const isSelected = idx === activeRoleIndex;
            return (
              <button
                key={r.role}
                onClick={() => setActiveRoleIndex(idx)}
                className={`p-3.5 rounded-xl text-left border transition ${
                  isSelected
                    ? 'bg-sky-600/20 border-sky-500 shadow-md ring-1 ring-sky-500/50'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-xs font-bold text-sky-400 block mb-1">역할 0{idx + 1}</span>
                <h4 className="text-sm sm:text-base font-bold text-white">{r.role.split(' ')[1]}</h4>
                <span className="text-[11px] text-slate-400 block truncate mt-1">{r.subtitle}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Role Detailed Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">지방정부 행동 지침</span>
              <h3 className="text-2xl font-extrabold text-white mt-0.5">{activeRole.role}</h3>
              <p className="text-sm font-semibold text-emerald-400 mt-0.5">{activeRole.subtitle}</p>
            </div>
            <div className="px-3 py-1 rounded-lg bg-slate-800 text-xs text-slate-300">
              실천 핵심 지침
            </div>
          </div>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {activeRole.desc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {activeRole.points.map((pt, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 광역 - 기초 - 읍·면·동 3단계 계층별 역할 분담 */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-2">
          <GitFork className="w-5 h-5 text-indigo-400" />
          <h3 className="text-xl font-bold text-white">광역 · 기초 · 읍·면·동 3단계 역할 분담</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 mb-6">
          광역은 재정 조정과 규모의 경제, 기초는 배당과 주거·돌봄 공급, 읍·면·동은 일상 현장 전달과 주민 직접 결정을 담당합니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {THREE_TIER_GOVERNANCE.map((tier, idx) => (
            <div key={idx} className="bg-slate-950 rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
                  <span className="w-6 h-6 rounded-md bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xs font-bold">
                    0{idx + 1}
                  </span>
                  <h4 className="font-bold text-base text-white">{tier.tier}</h4>
                </div>
                <ul className="space-y-2.5">
                  {tier.roles.map((r, rIdx) => (
                    <li key={rIdx} className="text-xs text-slate-300 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 중앙정부의 지원과 토지가치세 이원화 */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <Landmark className="w-5 h-5 text-amber-400" />
          중앙정부의 책무: 자율성 보장과 토지가치세 이원화
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          중앙정부는 사회보장기본법 상의 획일적 사전협의 규제를 '사전 통보제'로 완화하고, 정책 샌드박스를 열어주어야 합니다.
          또한 <strong>토지가치세(국토보유세)를 이원화</strong>하여 전면 지방세화로 인한 강남 등 지가 높은 지역의 세수 편중을 막고, 
          일부는 국세로 걷어 전 국민 균등 배당으로 분배하고, 일부는 지방세로 지역 기본사회 재원으로 활용해야 합니다.
        </p>
      </div>
    </div>
  );
};
