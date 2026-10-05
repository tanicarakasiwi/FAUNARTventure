import React, { useState } from 'react';
import { ZoneConfig } from '../../types/game';
import { AnimalIllustration } from '../AnimalIllustration';
import { playClickSound, playSuccessChime } from '../../utils/audio';

interface FeatureMissionProps {
  zone: ZoneConfig;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

export const FeatureMission: React.FC<FeatureMissionProps> = ({
  zone,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  const { features } = zone;
  const [selectedOptions, setSelectedOptions] = useState<string[]>(() =>
    isAlreadyCompleted ? features.options.map((o) => o.id) : []
  );
  const [isAnswered, setIsAnswered] = useState<boolean>(isAlreadyCompleted);

  const handleToggleOption = (optId: string) => {
    playClickSound();

    if (optId === 'all') {
      // Toggle all options
      if (selectedOptions.includes('all')) {
        setSelectedOptions([]);
      } else {
        setSelectedOptions(features.options.map((o) => o.id));
      }
      return;
    }

    if (selectedOptions.includes(optId)) {
      setSelectedOptions((prev) => prev.filter((id) => id !== optId && id !== 'all'));
    } else {
      const next = [...selectedOptions, optId];
      if (next.length === features.options.length - 1) {
        // If all individual options are selected, include 'all'
        setSelectedOptions(features.options.map((o) => o.id));
      } else {
        setSelectedOptions(next);
      }
    }
  };

  const handleCheckAnswer = () => {
    playClickSound();
    setIsAnswered(true);
    playSuccessChime();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Mission Header */}
      <div className="w-full text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-1">
          <span>🔎 MISI 4</span>
          <span>·</span>
          <span>TEMUKAN CIRI KHAS</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
          Karakter Visual Pembeda {zone.animal}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Ciri khas adalah detail unik yang membuat penikmat seni langsung tahu hewan apa yang kamu gambar tanpa harus diberi tahu judulnya.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left Column: Fauna Spotlight */}
        <div className="md:col-span-6 bg-white rounded-3xl p-4 shadow-xl border-4 border-amber-200 flex flex-col items-center">
          <div className="relative w-full aspect-[3/2] flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
            <AnimalIllustration zoneId={zone.id} className="w-full h-full drop-shadow-md" />

            <div className="absolute top-3 right-3 bg-emerald-600 text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow">
              Identitas Visual
            </div>
          </div>

          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 w-full mt-3 text-xs text-amber-950 text-center">
            💡 <strong>Prinsip Menggambar:</strong> Gambar bentuk dasarnya dulu, perhatikan proporsi, baru sematkan ciri khas di atasnya!
          </div>
        </div>

        {/* Right Column: Feature Checklist Options */}
        <div className="md:col-span-6 bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 flex flex-col justify-between min-h-[360px]">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                Observasi Karakter
              </span>
              <span className="text-2xl">{zone.badgeIcon}</span>
            </div>

            <h4 className="text-base md:text-lg font-extrabold text-slate-900 font-display mt-3 leading-snug">
              {features.question}
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Beri tanda centang pada semua ciri khas yang kamu temukan:
            </p>

            {/* Checklist options */}
            <div className="space-y-2.5 mt-3.5">
              {features.options.map((opt) => {
                const isSelected = selectedOptions.includes(opt.id);

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleToggleOption(opt.id)}
                    className={`w-full p-3 rounded-2xl border text-left text-xs md:text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300'
                        : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center text-xs font-bold ${
                          isSelected
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        {isSelected && '✓'}
                      </div>
                      <span>{opt.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Success Feedback Announcement */}
            {isAnswered && (
              <div className="mt-4 p-3.5 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 animate-fade-in leading-relaxed">
                <p className="font-extrabold text-sm font-display flex items-center gap-1.5 text-emerald-950">
                  <span>🎉</span>
                  <span>Kamu sudah mengenali ciri khas {zone.animal.toLowerCase()}!</span>
                </p>
                <p className="mt-1">{features.explanation}</p>
              </div>
            )}
          </div>

          {/* Action Button */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            {!isAnswered ? (
              <button
                disabled={selectedOptions.length === 0}
                onClick={handleCheckAnswer}
                className={`w-full py-3 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer font-display ${
                  selectedOptions.length > 0
                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>🔍 KONFIRMASI CIRI KHAS</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  playClickSound();
                  onComplete();
                }}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <span>LANJUTKAN KE MISI 5: SIAP MENGGAMBAR</span>
                <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
