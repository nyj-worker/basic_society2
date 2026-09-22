import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/basicSocietyData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const allAnswered = QUIZ_QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="space-y-8">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              학습 점검 및 자가 진단
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              기본사회 & 지방정부 핵심 이해도 퀴즈
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              강남훈 교수의 강연과 지방정부 정책 제안서의 핵심 5대 문항을 풀어보세요.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            다시 풀기
          </button>
        </div>

        {/* Score Banner when completed */}
        {showResults && (
          <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-sky-950/60 to-emerald-950/60 border border-emerald-500/40 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-white">
                  진단 결과: {QUIZ_QUESTIONS.length}문항 중 {score}문항 정답!
                </h3>
                <p className="text-xs text-slate-300">
                  {score === 5 
                    ? '완벽합니다! 기본사회와 지방정부의 핵심 철학과 원리를 모두 마스터하셨습니다.' 
                    : '틀린 문제의 해설을 확인하고 기본사회 개념을 확실히 정리해 보세요.'}
                </p>
              </div>
            </div>
            <span className="text-2xl font-black text-emerald-400">
              {Math.round((score / QUIZ_QUESTIONS.length) * 100)}점
            </span>
          </div>
        )}
      </div>

      {/* Quiz List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correctIndex;

          return (
            <div 
              key={q.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 transition"
            >
              <div className="flex items-start gap-3 mb-4">
                <span className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {q.question}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-2.5 pl-0 sm:pl-10">
                {q.options.map((opt, oIdx) => {
                  const isOptionSelected = userAnswer === oIdx;
                  let btnStyle = 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300';

                  if (showResults) {
                    if (oIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isOptionSelected && !isCorrect) {
                      btnStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                    }
                  } else if (isOptionSelected) {
                    btnStyle = 'bg-sky-600/20 border-sky-500 text-white font-semibold ring-1 ring-sky-500/40';
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full p-3.5 rounded-xl text-left border transition text-xs sm:text-sm flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResults && oIdx === q.correctIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                      )}
                      {showResults && isOptionSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation when submitted */}
              {showResults && (
                <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300 pl-4 sm:ml-10">
                  <strong className="text-sky-400 block mb-1">상세 해설:</strong>
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit button */}
      {!showResults && (
        <div className="text-center pt-4">
          <button
            onClick={() => setShowResults(true)}
            disabled={!allAnswered}
            className={`px-8 py-3 rounded-xl font-bold text-sm transition shadow-lg ${
              allAnswered
                ? 'bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-500 hover:to-teal-500 text-white cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
            }`}
          >
            {allAnswered ? '결과 채점하기' : '모든 문항을 선택해 주세요'}
          </button>
        </div>
      )}
    </div>
  );
};
