import React, { useState } from 'react';
import { AllZonesProgress, ZoneId, DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';
import { ZONES_CONFIG } from '../data/zones';
import { playClickSound } from '../utils/audio';
import zooMapImg from '../assets/images/faunart_map_user_1791695152466.jpg';

interface ZooMapProps {
  progress: AllZonesProgress;
  difficulty?: DifficultyLevel;
  onOpenDifficultyModal?: () => void;
  onSelectZone: (zoneId: ZoneId) => void;
  onFinishExploration: () => void;
  onOpenGallery?: () => void;
}

export const ZooMap: React.FC<ZooMapProps> = ({
  progress,
  difficulty = 'MEDIUM',
  onOpenDifficultyModal,
  onSelectZone,
  onFinishExploration,
  onOpenGallery,
}) => {
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);

  const zonesList = Object.values(ZONES_CONFIG);
  const completedCount = Object.values(progress).filter((p) => p.zoneCompleted).length;

  const handleZoneClick = (zoneId: ZoneId) => {
    playClickSound();
    onSelectZone(zoneId);
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col justify-between overflow-hidden bg-emerald-950 select-none">
      {/* 1. FULLSCREEN IMMERSIVE ZOO MAP VISUAL BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={zooMapImg}
          alt="Peta Kebun Binatang FAUNARTventure"
          className="w-full h-full object-cover object-center"
        />
        {/* Soft edge gradient to keep floating HUD elements readable */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      </div>

      {/* 2. FLOATING TOP HUD CONTROL BAR */}
      <header className="relative z-30 w-full px-3 sm:px-6 pt-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Left Title & Status */}
        <div className="pointer-events-auto flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border-2 border-amber-400 shadow-xl">
          <span className="text-xl">🗺️</span>
          <div>
            <h2 className="text-sm sm:text-base font-black text-amber-950 font-display leading-tight">
              Peta Kebun Binatang
            </h2>
            <p className="text-[11px] font-bold text-emerald-800">
              Ketuk salah satu hewan untuk mulai menggambar! 🐾
            </p>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Difficulty Level Button */}
          {onOpenDifficultyModal && (
            <button
              onClick={() => {
                playClickSound();
                onOpenDifficultyModal();
              }}
              className={`px-3 py-2 rounded-2xl border-2 shadow-lg text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer font-display active:scale-95 ${DIFFICULTY_CONFIGS[difficulty].badgeClass}`}
              title="Ganti tingkat kesulitan belajar"
            >
              <span>{DIFFICULTY_CONFIGS[difficulty].icon}</span>
              <span className="hidden sm:inline">Level: {DIFFICULTY_CONFIGS[difficulty].shortLabel}</span>
              <span className="text-[10px] opacity-75">▼</span>
            </button>
          )}

          {onOpenGallery && (
            <button
              onClick={() => {
                playClickSound();
                onOpenGallery();
              }}
              className="px-3.5 py-2 bg-white/95 hover:bg-amber-50 text-amber-950 border-2 border-amber-300 rounded-2xl shadow-lg text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 cursor-pointer font-display active:scale-95"
              title="Buka Galeri Gambar Fauna"
            >
              <span>🖼️</span>
              <span className="hidden sm:inline">Galeri Gambar</span>
            </button>
          )}

          {/* Progress Tracker Pill */}
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-amber-300 shadow-lg text-right hidden sm:block">
            <span className="text-[10px] text-slate-500 font-extrabold uppercase block">Progress</span>
            <span className="text-xs font-black text-emerald-700">
              {completedCount} / 6 Zona Selesai
            </span>
          </div>

          {/* Finish Button when at least 1 mission completed */}
          {completedCount > 0 && (
            <button
              onClick={() => {
                playClickSound();
                onFinishExploration();
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-black rounded-2xl shadow-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer font-display border-2 border-emerald-300"
            >
              <span>🏆</span>
              <span>SELESAI JELAJAH</span>
            </button>
          )}
        </div>
      </header>

      {/* 3. INTERACTIVE ANIMAL-ONLY ICON BUTTONS (OVERLAID OVER THE ANIMALS, SIGNBOARDS UNCOVERED) */}
      <main className="relative z-20 w-full flex-1 pointer-events-none">
        <div className="absolute inset-0 w-full h-full max-w-7xl mx-auto">
          {zonesList.map((z) => {
            const isDone = progress[z.id].zoneCompleted;
            const isHovered = hoveredZone === z.id;

            return (
              <div
                key={z.id}
                style={{
                  left: `${z.mapCoords.x}%`,
                  top: `${z.mapCoords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="absolute pointer-events-auto transition-transform duration-300 ease-out z-20"
                onMouseEnter={() => setHoveredZone(z.id)}
                onMouseLeave={() => setHoveredZone(null)}
              >
                {/* Animal-Only Circular Interactive Button (Direct Click to Habitat Menu) */}
                <button
                  onClick={() => handleZoneClick(z.id)}
                  className={`group relative rounded-full p-2.5 sm:p-3 md:p-3.5 transition-all duration-300 cursor-pointer border-3 sm:border-4 shadow-2xl flex items-center justify-center ${
                    isHovered
                      ? 'scale-125 -translate-y-2 z-40 bg-white ring-4 ring-amber-400 border-amber-500 shadow-[0_14px_35px_rgba(0,0,0,0.5)]'
                      : 'scale-100 bg-white/95 hover:bg-white border-amber-300 shadow-xl'
                  } ${isDone ? 'border-emerald-500 ring-2 ring-emerald-300' : ''}`}
                  style={{
                    backgroundColor: isHovered ? '#FFFFFF' : '#FFFFFFF0',
                    backdropFilter: 'blur(4px)',
                  }}
                  title={`Ketuk untuk menjelajahi ${z.animal} di habitatnya`}
                >
                  {/* Completion Status Badge Checkmark */}
                  {isDone ? (
                    <div className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white text-[10px] sm:text-xs font-black w-5 h-5 sm:w-6 sm:h-6 rounded-full shadow-md flex items-center justify-center border-2 border-white">
                      <span>✓</span>
                    </div>
                  ) : (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                    </span>
                  )}

                  {/* Animal Icon */}
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-3xl sm:text-4xl md:text-5xl shadow-inner transition-transform duration-300 ${
                      isHovered ? 'scale-115 rotate-6' : 'group-hover:scale-110'
                    }`}
                    style={{ backgroundColor: `${z.accentColor}25` }}
                  >
                    <span>{z.badgeIcon}</span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </main>

      {/* 4. BOTTOM FLOATING GUIDE TIP */}
      <footer className="relative z-30 w-full px-4 pb-3 flex justify-center pointer-events-none">
        <div className="pointer-events-auto bg-black/60 backdrop-blur-md text-amber-100 text-xs sm:text-sm font-extrabold px-5 py-1.5 rounded-full shadow-lg border border-amber-300/40 text-center">
          ✨ <strong>Petunjuk:</strong> Ketuk langsung ikon hewan mana saja di peta untuk masuk ke habitat dan menggambar karyamu!
        </div>
      </footer>
    </div>
  );
};
