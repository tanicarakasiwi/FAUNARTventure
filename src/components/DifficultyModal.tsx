import React from 'react';
import { DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';
import { playClickSound, playSuccessChime } from '../utils/audio';

interface DifficultyModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentDifficulty: DifficultyLevel;
  onSelectDifficulty: (difficulty: DifficultyLevel) => void;
}

export const DifficultyModal: React.FC<DifficultyModalProps> = ({
  isOpen,
  onClose,
  currentDifficulty,
  onSelectDifficulty,
}) => {
  if (!isOpen) return null;

  const difficulties: DifficultyLevel[] = ['EASY', 'MEDIUM', 'HARD'];

  const handlePick = (diff: DifficultyLevel) => {
    playSuccessChime();
    onSelectDifficulty(diff);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in select-none">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border-4 border-amber-400 relative max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-amber-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-2xl shadow-inner">
              ⚙️
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2.5 py-0.5 rounded-full">
                Pengaturan Tantangan Belajar
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">
                Pilih Tingkat Kesulitan
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 text-sm font-bold transition-colors cursor-pointer"
            title="Tutup"
          >
            ✕
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 mt-3 mb-4 leading-relaxed">
          Tentukan level petualanganmu! Kamu dapat mengganti tingkat kesulitan kapan saja selama permainan berlangsung melalui bilah navigasi atas.
        </p>

        {/* 3 Level Cards */}
        <div className="space-y-3">
          {difficulties.map((diffKey) => {
            const config = DIFFICULTY_CONFIGS[diffKey];
            const isSelected = currentDifficulty === diffKey;

            return (
              <div
                key={diffKey}
                onClick={() => handlePick(diffKey)}
                className={`group cursor-pointer rounded-2xl p-3.5 sm:p-4 border-2 transition-all relative ${
                  isSelected
                    ? `${config.borderClass} shadow-lg ring-2 ring-amber-400/50 scale-[1.01]`
                    : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/30'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl filter drop-shadow">
                      {config.icon}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-slate-900 text-base sm:text-lg font-display">
                          {config.name}
                        </h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${config.badgeClass}`}>
                          {config.badge}
                        </span>
                        {isSelected && (
                          <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 font-display">
                            ✓ Aktif
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-slate-700 mt-0.5">
                        {config.summary}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePick(diffKey);
                    }}
                    className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer font-display ${
                      isSelected
                        ? 'bg-slate-900 text-white shadow'
                        : 'bg-amber-100 hover:bg-amber-500 hover:text-white text-amber-900'
                    }`}
                  >
                    {isSelected ? 'Terpilih' : 'Pilih Level'}
                  </button>
                </div>

                {/* Features list */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 font-medium">
                  {config.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 text-xs font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>💡</span>
            <span>Level aktif saat ini: <strong>{DIFFICULTY_CONFIGS[currentDifficulty].name}</strong></span>
          </div>
          <button
            onClick={() => {
              playClickSound();
              onClose();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
