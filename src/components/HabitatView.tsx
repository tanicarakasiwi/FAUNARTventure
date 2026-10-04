import React, { useState } from 'react';
import { ZoneConfig } from '../types/game';
import { AnimalIllustration } from './AnimalIllustration';
import { StudentAvatar } from './StudentAvatar';
import { playClickSound } from '../utils/audio';

interface HabitatViewProps {
  zone: ZoneConfig;
  onStartMissions: () => void;
  onBackToMap: () => void;
}

export const HabitatView: React.FC<HabitatViewProps> = ({
  zone,
  onStartMissions,
  onBackToMap,
}) => {
  const [showExplorerModal, setShowExplorerModal] = useState(false);

  const handleAnimalClick = () => {
    playClickSound();
    setShowExplorerModal(true);
  };

  const handleStartMission = () => {
    playClickSound();
    onStartMissions();
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden p-4 md:p-6">
      {/* Dynamic Habitat Atmosphere Background */}
      {zone.id === 'ikan' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-cyan-800 to-blue-950 overflow-hidden pointer-events-none">
          {/* Light rays from water surface */}
          <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-cyan-300/25 to-transparent blur-xl" />
          {/* Glass glare */}
          <div className="absolute top-0 right-10 w-96 h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12 pointer-events-none" />
          {/* Floating water bubbles */}
          <div className="absolute bottom-10 left-1/4 w-6 h-6 rounded-full bg-cyan-200/40 border border-cyan-100/60 animate-bounce" />
          <div className="absolute bottom-20 left-1/3 w-4 h-4 rounded-full bg-cyan-200/30 border border-cyan-100/50 animate-bounce [animation-delay:0.7s]" />
          <div className="absolute bottom-32 right-1/4 w-8 h-8 rounded-full bg-cyan-200/40 border border-cyan-100/60 animate-bounce [animation-delay:1.2s]" />
          {/* Aquarium Rocks & Seaweeds */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-slate-900 via-stone-800 to-transparent flex items-end justify-between px-10 opacity-80">
            <div className="w-48 h-20 bg-stone-700 rounded-t-full" />
            <div className="w-64 h-24 bg-stone-800 rounded-t-full" />
            <div className="w-40 h-16 bg-stone-700 rounded-t-full" />
          </div>
        </div>
      )}

      {zone.id === 'lumba' && (
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950 via-sky-800 to-indigo-950 overflow-hidden pointer-events-none">
          <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-200/30 to-transparent blur-lg" />
          <div className="absolute bottom-8 left-1/5 w-6 h-6 rounded-full bg-sky-200/30 border border-sky-100/40 animate-bounce" />
          <div className="absolute bottom-24 right-1/3 w-5 h-5 rounded-full bg-sky-200/30 border border-sky-100/40 animate-bounce [animation-delay:0.5s]" />
          {/* Coral reef silhouette */}
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-indigo-950 to-transparent flex items-end justify-around opacity-70">
            <div className="w-32 h-16 bg-indigo-900 rounded-t-2xl" />
            <div className="w-48 h-20 bg-indigo-950 rounded-t-full" />
          </div>
        </div>
      )}

      {zone.id === 'kucing' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-200 overflow-hidden pointer-events-none">
          {/* Sunny meadow, trees, fence */}
          <div className="absolute top-8 right-16 w-20 h-20 rounded-full bg-amber-300 blur-sm opacity-60" />
          <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-emerald-600 via-emerald-500 to-emerald-400" />
          {/* Habitat wooden fence */}
          <div className="absolute bottom-32 inset-x-0 h-16 flex items-center justify-around opacity-60">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="w-4 h-16 bg-amber-800 rounded-t" />
            ))}
          </div>
          {/* Cat scratching toy */}
          <div className="absolute bottom-16 right-24 w-12 h-36 bg-amber-700 rounded-t-lg opacity-80" />
        </div>
      )}

      {zone.id === 'burung' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-emerald-100 to-teal-800 overflow-hidden pointer-events-none">
          {/* Aviary dome lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 800 600">
            <ellipse cx="400" cy="500" rx="380" ry="420" fill="none" stroke="#FFFFFF" strokeWidth="4" />
            <ellipse cx="400" cy="500" rx="280" ry="380" fill="none" stroke="#FFFFFF" strokeWidth="3" />
            <ellipse cx="400" cy="500" rx="180" ry="340" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          </svg>
          {/* Lush foliage hanging */}
          <div className="absolute -top-6 inset-x-0 h-32 flex justify-between px-10 opacity-70">
            <div className="w-48 h-28 bg-emerald-700 rounded-b-full" />
            <div className="w-64 h-32 bg-teal-800 rounded-b-full" />
            <div className="w-40 h-24 bg-emerald-600 rounded-b-full" />
          </div>
        </div>
      )}

      {zone.id === 'bebek' && (
        <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-teal-100 to-teal-800 overflow-hidden pointer-events-none">
          {/* Water lily pond */}
          <div className="absolute bottom-0 inset-x-0 h-56 bg-gradient-to-t from-teal-900 via-teal-700 to-cyan-600" />
          {/* Ripple lines */}
          <div className="absolute bottom-28 left-1/4 w-72 h-1 bg-cyan-200/40 rounded-full blur-[1px]" />
          <div className="absolute bottom-40 right-1/4 w-80 h-1 bg-cyan-200/40 rounded-full blur-[1px]" />
          {/* Water lily pad */}
          <div className="absolute bottom-16 left-20 w-24 h-12 rounded-full bg-emerald-500/80 border border-emerald-400" />
          <div className="absolute bottom-20 right-28 w-28 h-14 rounded-full bg-emerald-600/80 border border-emerald-400" />
        </div>
      )}

      {zone.id === 'siput' && (
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-stone-800 to-amber-950 overflow-hidden pointer-events-none">
          {/* Micro-world: Giant foliage and moist soil */}
          <div className="absolute -top-12 left-10 w-96 h-96 rounded-full bg-emerald-600/40 blur-2xl" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-stone-900 via-amber-950 to-stone-800" />
          {/* Giant leaf background */}
          <svg className="absolute bottom-8 inset-x-0 w-full h-48 opacity-60" viewBox="0 0 1000 200">
            <path d="M 0 160 Q 500 50 1000 160 L 1000 200 L 0 200 Z" fill="#15803D" />
            <path d="M 200 180 Q 500 80 800 180" stroke="#4ADE80" strokeWidth="4" fill="none" opacity="0.4" />
          </svg>
          {/* Dew droplets */}
          <div className="absolute bottom-36 left-1/3 w-5 h-5 rounded-full bg-white/60 blur-[1px] animate-pulse" />
          <div className="absolute bottom-44 right-1/3 w-4 h-4 rounded-full bg-white/50 blur-[1px] animate-pulse" />
        </div>
      )}

      {/* Top Habitat Navigation Bar */}
      <div className="relative z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-200/80 shadow-lg max-w-4xl mx-auto w-full">
        <button
          onClick={() => {
            playClickSound();
            onBackToMap();
          }}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 text-xs md:text-sm font-bold rounded-xl transition-colors cursor-pointer"
        >
          <span>←</span>
          <span>Kembali ke Peta</span>
        </button>

        <div className="text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Habitat {zone.habitat}
          </span>
          <h2 className="text-lg md:text-xl font-extrabold text-slate-900 font-display">
            {zone.greeting}
          </h2>
        </div>

        <div className="text-2xl">{zone.badgeIcon}</div>
      </div>

      {/* Main Interactive Stage with Fauna and Student */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-6 my-4 max-w-5xl mx-auto w-full">
        {/* Student Observer Avatar */}
        <div className="flex flex-col items-center shrink-0">
          <StudentAvatar size={150} />
          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800 shadow border border-amber-200 mt-2">
            Artventurer sedang mengamati...
          </div>
        </div>

        {/* Fauna Spotlight Area */}
        <div className="relative flex-1 flex flex-col items-center justify-center">
          {/* Hint speech bubble */}
          <div className="mb-2 animate-float-slow">
            <div className="bg-amber-100 text-amber-950 border-2 border-amber-400 font-bold px-4 py-2 rounded-2xl shadow-lg text-sm md:text-base flex items-center gap-2 cursor-pointer hover:bg-amber-200 transition-colors" onClick={handleAnimalClick}>
              <span>🔎</span>
              <span>{zone.observationPrompt} <strong>(Klik di sini!)</strong></span>
            </div>
          </div>

          {/* Clickable Animal Card */}
          <div
            onClick={handleAnimalClick}
            className="group cursor-pointer relative bg-white/40 hover:bg-white/70 backdrop-blur-sm p-4 md:p-6 rounded-3xl border-4 border-white/60 hover:border-amber-400 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <AnimalIllustration
              zoneId={zone.id}
              className="w-[320px] sm:w-[420px] md:w-[480px] h-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
            />

            {/* Click affordance badge */}
            <div className="absolute -bottom-3 inset-x-0 flex justify-center">
              <span className="bg-emerald-600 group-hover:bg-emerald-500 text-white font-extrabold text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg border border-white flex items-center gap-1.5 transition-colors font-display">
                <span>🔍</span>
                <span>AMATI {zone.animal.toUpperCase()}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Explorer Modal Dialog when Fauna is clicked */}
      {showExplorerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border-4 border-amber-400 text-center relative">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-5xl shadow-inner mb-3">
              {zone.badgeIcon}
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Pusat Pengamatan {zone.habitat}
            </span>

            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-display mt-2">
              MISI PENJELAJAH {zone.animal.toUpperCase()}
            </h3>

            <p className="text-slate-600 text-base md:text-lg font-medium mt-2">
              Siap mengamati {zone.animal.toLowerCase()} secara bertahap?
            </p>

            {/* 5-step overview indicator */}
            <div className="grid grid-cols-5 gap-1.5 my-5 text-center text-[10px] md:text-xs font-bold text-slate-600">
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="block text-base">🧩</span> Rakit
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="block text-base">🔷</span> Bentuk
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="block text-base">📏</span> Proporsi
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="block text-base">🔎</span> Ciri Khas
              </div>
              <div className="bg-amber-50 p-2 rounded-xl border border-amber-200">
                <span className="block text-base">✏️</span> Gambar
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <button
                onClick={() => setShowExplorerModal(false)}
                className="w-full sm:w-auto px-5 py-3 text-slate-600 hover:bg-slate-100 font-bold rounded-xl text-sm transition-colors cursor-pointer"
              >
                Batal
              </button>

              <button
                onClick={handleStartMission}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-display"
              >
                <span>▶</span>
                <span>MULAI MISI SEKARANG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
