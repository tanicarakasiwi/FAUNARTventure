import React from 'react';
import { AllZonesProgress } from '../types/game';
import { ZONES_CONFIG } from '../data/zones';
import { playClickSound } from '../utils/audio';

interface SummaryScreenProps {
  progress: AllZonesProgress;
  onReplay: () => void;
  onBackToMap: () => void;
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({
  progress,
  onReplay,
  onBackToMap,
}) => {
  const zones = Object.values(ZONES_CONFIG);
  const earnedBadges = zones.filter((z) => progress[z.id].zoneCompleted);

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-between p-4 md:p-8 bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-100 overflow-hidden">
      {/* Decorative foliage background elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-3xl p-6 md:p-10 shadow-2xl border-4 border-amber-300 text-center my-auto">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Seni Rupa SMP Kelas VII · Refleksi Pembelajaran
        </span>

        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 font-display mt-3">
          🎉 PETUALANGAN SELESAI!
        </h2>

        <p className="text-lg md:text-xl font-bold text-amber-800 font-display mt-1">
          “Hebat, Penjelajah Fauna!”
        </p>

        <p className="text-sm md:text-base text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
          “Kamu telah memilih habitat, mengamati fauna, menemukan bentuk dasar, memperhatikan proporsi, dan mengenali ciri khasnya.”
        </p>

        {/* 4-Step Diagram Flow (Requirement) */}
        <div className="my-6 bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 rounded-2xl p-5 border border-amber-200 shadow-inner">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Alur Proses Menggambar Fauna
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs md:text-sm font-extrabold text-slate-800">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-base">👀</span>
              <span>AMATI</span>
            </div>

            <span className="text-slate-400 font-bold hidden sm:inline">→</span>
            <span className="text-slate-400 font-bold sm:hidden">↓</span>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-base">🔷</span>
              <span>SEDERHANAKAN</span>
            </div>

            <span className="text-slate-400 font-bold hidden sm:inline">→</span>
            <span className="text-slate-400 font-bold sm:hidden">↓</span>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-base">📏</span>
              <span>PERHATIKAN PROPORSI</span>
            </div>

            <span className="text-slate-400 font-bold hidden sm:inline">→</span>
            <span className="text-slate-400 font-bold sm:hidden">↓</span>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm">
              <span className="text-base">✏️</span>
              <span>GAMBAR</span>
            </div>
          </div>
        </div>

        {/* Teacher Callout / Message (Requirement) */}
        <div className="p-4 bg-amber-100/70 border border-amber-300 rounded-2xl text-amber-950 font-medium text-xs md:text-sm leading-relaxed mb-6">
          “Sekarang buktikan hasil pengamatanmu melalui gambar di buku sketsamu!”
        </div>

        {/* Collected Badges Showcase */}
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Lencana Penjelajah yang Diperoleh ({earnedBadges.length} dari 6)
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {zones.map((z) => {
              const isDone = progress[z.id].zoneCompleted;
              return (
                <div
                  key={z.id}
                  className={`p-2.5 rounded-2xl border text-center transition-all ${
                    isDone
                      ? 'bg-amber-50 border-amber-300 shadow-sm'
                      : 'bg-slate-100 border-slate-200 opacity-40 grayscale'
                  }`}
                >
                  <div className="text-2xl mb-1">{z.badgeIcon}</div>
                  <p className="text-[10px] font-bold text-slate-800 leading-tight">
                    {z.animal}
                  </p>
                  <span className="text-[9px] font-semibold text-emerald-700 block mt-0.5">
                    {isDone ? '✓ Dapat' : 'Belum'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons (Requirement) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              playClickSound();
              onReplay();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🔄</span>
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onBackToMap();
            }}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🗺️</span>
            <span>KEMBALI KE PETA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
