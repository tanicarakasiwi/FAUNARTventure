import React from 'react';
import { ZoneConfig } from '../types/game';
import { playClickSound } from '../utils/audio';

interface ZoneCompleteModalProps {
  zone: ZoneConfig;
  onBackToMap: () => void;
  onFinishApp: () => void;
}

export const ZoneCompleteModal: React.FC<ZoneCompleteModalProps> = ({
  zone,
  onBackToMap,
  onFinishApp,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-4 border-amber-400 text-center relative overflow-hidden">
        {/* Confetti & Golden Glow Background */}
        <div className="absolute -top-20 -left-20 w-48 h-48 bg-amber-300/30 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-emerald-300/30 rounded-full blur-2xl pointer-events-none" />

        {/* Big Golden Zone Badge (Requirement) */}
        <div className="relative mx-auto w-28 h-28 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-500 p-1.5 shadow-2xl animate-pulse-glow mb-4">
          <div className="w-full h-full rounded-full bg-white flex flex-col items-center justify-center border-2 border-amber-400 shadow-inner">
            <span className="text-4xl">{zone.badgeIcon}</span>
            <span className="text-[10px] font-extrabold text-amber-900 tracking-wider uppercase mt-0.5">
              LENCANA
            </span>
          </div>
        </div>

        <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display">
          🎉 PETUALANGANMU DI ZONA INI SELESAI!
        </h3>

        <div className="mt-1 text-sm font-bold text-amber-800 bg-amber-50 inline-block px-4 py-1 rounded-full border border-amber-200">
          🏅 {zone.badge.toUpperCase()}
        </div>

        {/* 5-Item Checklist Ringkasan (Requirement) */}
        <div className="mt-5 bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left max-w-sm mx-auto space-y-2 text-xs md:text-sm font-semibold text-slate-700">
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
            <span>Rakit Fauna</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
            <span>Temukan Bentuk Dasar</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
            <span>Amati Proporsi</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
            <span>Temukan Ciri Khas</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700">
            <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
            <span>Siap Menggambar</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-4">
          Kamu bebas kembali ke peta untuk mengamati fauna habitat lain, atau mengakhiri petualangan.
        </p>

        {/* Two Buttons (Requirement) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => {
              playClickSound();
              onBackToMap();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🗺️</span>
            <span>KEMBALI KE PETA</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onFinishApp();
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-extrabold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
          >
            <span>🏁</span>
            <span>SELESAI</span>
          </button>
        </div>
      </div>
    </div>
  );
};
