import React, { useState } from 'react';
import { ZoneConfig } from '../../types/game';
import { AnimalIllustration } from '../AnimalIllustration';
import { playClickSound, playSuccessChime, playSoftThump } from '../../utils/audio';

interface ProportionMissionProps {
  zone: ZoneConfig;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

export const ProportionMission: React.FC<ProportionMissionProps> = ({
  zone,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const questions = zone.proportions;
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answeredState, setAnsweredState] = useState<{ [qIndex: number]: { isCorrect: boolean; feedback: string } }>({});
  const [isAllFinished, setIsAllFinished] = useState<boolean>(isAlreadyCompleted);

  const currentQ = questions[currentIdx];
  const currentResult = answeredState[currentIdx];

  const handleSelectOption = (optId: string) => {
    if (currentResult?.isCorrect) return; // already solved

    playClickSound();
    setSelectedOptionId(optId);

    const chosen = currentQ.options.find((o) => o.id === optId);
    if (!chosen) return;

    if (chosen.isCorrect) {
      playSuccessChime();
      setAnsweredState((prev) => ({
        ...prev,
        [currentIdx]: { isCorrect: true, feedback: chosen.explanation },
      }));

      // Check if all questions are finished
      const updated = {
        ...answeredState,
        [currentIdx]: { isCorrect: true, feedback: chosen.explanation },
      };
      if (questions.every((_, idx) => updated[idx]?.isCorrect)) {
        setIsAllFinished(true);
      }
    } else {
      playSoftThump();
      setAnsweredState((prev) => ({
        ...prev,
        [currentIdx]: { isCorrect: false, feedback: chosen.explanation },
      }));
    }
  };

  const handleNextQuestion = () => {
    playClickSound();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOptionId(null);
    }
  };

  const handlePrevQuestion = () => {
    playClickSound();
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setSelectedOptionId(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Mission Header */}
      <div className="w-full text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-1">
          <span>📏 MISI 3</span>
          <span>·</span>
          <span>AMATI PROPORSI</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
          Perbandingan Ukuran & Letak Anatomi {zone.animal}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Proporsi adalah kunci utama agar gambar tampak seimbang, alami, dan tidak janggal saat dilihat.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: Visual Animal with Proportion Guide Lines */}
        <div className="md:col-span-6 bg-white rounded-3xl p-4 shadow-xl border-4 border-amber-200 flex flex-col items-center">
          <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
            <AnimalIllustration zoneId={zone.id} className="w-full h-full" />

            {/* Visual Ruler & Grid Indicator */}
            <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-amber-300/40 m-3 rounded-xl flex flex-col justify-between p-2">
              <div className="flex justify-between text-[10px] font-mono text-amber-700/60 font-bold">
                <span>0 cm</span>
                <span>1/2</span>
                <span>Max</span>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-amber-700/60 font-bold">
                <span>Skala Proporsi</span>
                <span>1 : 1</span>
              </div>
            </div>
          </div>

          {/* Question Index Progress Pills */}
          <div className="flex items-center gap-2 mt-3">
            {questions.map((_, idx) => {
              const res = answeredState[idx];
              const isCurrent = currentIdx === idx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    playClickSound();
                    setCurrentIdx(idx);
                    setSelectedOptionId(null);
                  }}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all flex items-center justify-center cursor-pointer border ${
                    isCurrent
                      ? 'bg-amber-500 text-white border-amber-600 scale-110 shadow'
                      : res?.isCorrect
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-400'
                      : 'bg-slate-100 text-slate-600 border-slate-300'
                  }`}
                >
                  {res?.isCorrect ? '✓' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Proportion Question Cards */}
        <div className="md:col-span-6 bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
                Observasi Proporsi {currentIdx + 1}/{questions.length}
              </span>
              <span className="text-sm font-semibold text-slate-400">SMP Kelas VII</span>
            </div>

            <h4 className="text-base md:text-lg font-extrabold text-slate-900 font-display mt-3 leading-snug">
              {currentQ.question}
            </h4>

            {/* Visual Options */}
            <div className="space-y-2.5 mt-4">
              {currentQ.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isAnswerCorrect = currentResult?.isCorrect && opt.isCorrect;
                const isAnswerWrong = !currentResult?.isCorrect && currentResult && isSelected;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt.id)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all cursor-pointer flex items-start gap-3 ${
                      isAnswerCorrect
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-400'
                        : isAnswerWrong
                        ? 'bg-red-50 border-red-400 text-red-900 ring-2 ring-red-300'
                        : isSelected
                        ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-white border border-slate-300 shrink-0 flex items-center justify-center font-bold text-xs">
                      {opt.id.toUpperCase()}
                    </span>
                    <span className="flex-1 leading-snug">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback Callout */}
            {currentResult && (
              <div
                className={`mt-3.5 p-3 rounded-xl border text-xs leading-relaxed animate-fade-in ${
                  currentResult.isCorrect
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                    : 'bg-red-50 border-red-300 text-red-800'
                }`}
              >
                <div className="font-bold flex items-center gap-1.5 mb-0.5">
                  <span>{currentResult.isCorrect ? '🎉 Tepat Sekali!' : '⚠️ Perlu Diamati Kembali:'}</span>
                </div>
                <p>{currentResult.feedback}</p>
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              disabled={currentIdx === 0}
              onClick={handlePrevQuestion}
              className={`px-3 py-2 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                currentIdx === 0
                  ? 'text-slate-300 cursor-not-allowed'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              ← Soal Sebelumnya
            </button>

            {isAllFinished ? (
              <button
                onClick={() => {
                  playClickSound();
                  onComplete();
                }}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-xs md:text-sm rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer font-display"
              >
                <span>LANJUTKAN KE CIRI KHAS</span>
                <span>→</span>
              </button>
            ) : currentIdx < questions.length - 1 ? (
              <button
                disabled={!currentResult?.isCorrect}
                onClick={handleNextQuestion}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer font-display ${
                  currentResult?.isCorrect
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Soal Berikutnya</span>
                <span>→</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
