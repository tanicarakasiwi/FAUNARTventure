import React, { useState } from 'react';
import { GeometricShape, ZoneConfig } from '../../types/game';
import { AnimalIllustration } from '../AnimalIllustration';
import { playClickSound, playSuccessChime, playSoftThump } from '../../utils/audio';

interface ShapeMissionProps {
  zone: ZoneConfig;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

const AVAILABLE_SHAPES: { shape: GeometricShape; symbol: string }[] = [
  { shape: 'Lingkaran', symbol: '○' },
  { shape: 'Oval', symbol: '⬭' },
  { shape: 'Segitiga', symbol: '△' },
  { shape: 'Persegi', symbol: '□' },
  { shape: 'Persegi panjang', symbol: '▭' },
];

export const ShapeMission: React.FC<ShapeMissionProps> = ({
  zone,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const parts = zone.shapes;

  // Selected shape for each part
  const [answers, setAnswers] = useState<Record<string, GeometricShape>>(() => {
    if (isAlreadyCompleted) {
      const initial: Record<string, GeometricShape> = {};
      parts.forEach((p) => {
        initial[p.partName] = p.correctShape;
      });
      return initial;
    }
    return {};
  });

  const [activePartIndex, setActivePartIndex] = useState<number>(0);
  const [isChecked, setIsChecked] = useState<boolean>(isAlreadyCompleted);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  const currentPart = parts[activePartIndex];

  const handleSelectShape = (shape: GeometricShape) => {
    playClickSound();
    setAnswers((prev) => ({
      ...prev,
      [currentPart.partName]: shape,
    }));

    // Auto-advance to next unanswered part if available
    if (activePartIndex < parts.length - 1) {
      setTimeout(() => {
        setActivePartIndex((prev) => prev + 1);
      }, 250);
    }
  };

  const handleCheckAnswers = () => {
    playClickSound();

    let allCorrect = true;
    for (const part of parts) {
      if (answers[part.partName] !== part.correctShape) {
        allCorrect = false;
        break;
      }
    }

    setIsChecked(true);
    setHasErrors(!allCorrect);

    if (allCorrect) {
      playSuccessChime();
    } else {
      playSoftThump();
    }
  };

  const handleRetry = () => {
    playClickSound();
    setIsChecked(false);
    setHasErrors(false);
  };

  const isAllAnswered = parts.every((p) => answers[p.partName] !== undefined);

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Mission Header */}
      <div className="w-full text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-1">
          <span>🔷 MISI 2</span>
          <span>·</span>
          <span>TEMUKAN BENTUK DASAR</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
          Sederhanakan Tubuh {zone.animal} ke Bentuk Geometri
        </h3>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Dalam seni rupa, setiap hewan dapat disederhanakan menjadi bentuk geometris dasar sebelum digambar secara detail.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: Visual Animal with active highlighted part */}
        <div className="md:col-span-7 bg-white rounded-3xl p-4 shadow-xl border-4 border-amber-200 flex flex-col items-center">
          <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
            <AnimalIllustration
              zoneId={zone.id}
              highlightPart={currentPart.partName}
              showShapeOverlay={isChecked && !hasErrors}
              className="w-full h-full"
            />

            {/* Current analyzing tag */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl shadow border border-amber-300 text-xs font-bold text-slate-800">
              Sedang Mengamati: <span className="text-emerald-700 underline">{currentPart.partName}</span>
            </div>
          </div>

          {/* Part Selection Carousel Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 w-full">
            {parts.map((p, idx) => {
              const ans = answers[p.partName];
              const isSelected = activePartIndex === idx;
              const isPartCorrect = isChecked && ans === p.correctShape;
              const isPartWrong = isChecked && ans && ans !== p.correctShape;

              return (
                <button
                  key={p.partName}
                  onClick={() => {
                    playClickSound();
                    setActivePartIndex(idx);
                  }}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md scale-105'
                      : isPartWrong
                      ? 'bg-red-50 text-red-700 border-red-300'
                      : isPartCorrect
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : ans
                      ? 'bg-slate-100 text-slate-800 border-slate-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span>{p.partName}</span>
                  {ans && <span className="opacity-80">({ans.slice(0, 4)}.)</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Shape Selector for the active part */}
        <div className="md:col-span-5 bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-slate-400">Bagian {activePartIndex + 1} dari {parts.length}</span>
                <h4 className="text-lg font-extrabold text-slate-900 font-display">
                  {currentPart.partName}
                </h4>
              </div>
              <span className="text-2xl">{zone.badgeIcon}</span>
            </div>

            <p className="text-xs text-slate-600 my-3">
              Pilih bentuk geometris yang paling tepat untuk mendasari <strong className="text-slate-800">{currentPart.partName.toLowerCase()}</strong>:
            </p>

            {/* 5 Shape Options */}
            <div className="space-y-2">
              {AVAILABLE_SHAPES.map(({ shape, symbol }) => {
                const isChosen = answers[currentPart.partName] === shape;
                return (
                  <button
                    key={shape}
                    onClick={() => handleSelectShape(shape)}
                    className={`w-full p-2.5 rounded-xl border text-sm font-bold flex items-center justify-between transition-all cursor-pointer ${
                      isChosen
                        ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm ring-2 ring-amber-400'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-white border border-slate-300 flex items-center justify-center text-lg font-bold text-slate-800">
                        {symbol}
                      </span>
                      <span>{shape}</span>
                    </div>
                    {isChosen && <span className="text-amber-700 font-bold text-xs">Dipilih ✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action & Feedback Area */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            {!isChecked ? (
              <button
                disabled={!isAllAnswered}
                onClick={handleCheckAnswers}
                className={`w-full py-3 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-display ${
                  isAllAnswered
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>🔍 PERIKSA SEMUA BENTUK DASAR</span>
              </button>
            ) : !hasErrors ? (
              <div className="space-y-3 animate-fade-in">
                <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800">
                  <p className="font-extrabold text-sm text-emerald-900 font-display">
                    🎉 Hebat! Kamu berhasil menemukan bentuk dasar {zone.animal.toLowerCase()}.
                  </p>
                  <p className="mt-1">{currentPart.explanation}</p>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    onComplete();
                  }}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
                >
                  <span>LANJUTKAN KE MISI 3: PROPORSI</span>
                  <span>→</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2 animate-fade-in">
                <div className="p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-800">
                  <p className="font-extrabold text-red-900">
                    Ternyata ada bentuk yang perlu diamati kembali.
                  </p>
                  <p className="mt-0.5">
                    Periksa kembali bagian bertanda merah pada daftar di atas.
                  </p>
                </div>
                <button
                  onClick={handleRetry}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-1.5 cursor-pointer font-display"
                >
                  <span>🔄 COBA AMATI LAGI</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
