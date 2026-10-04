import React, { useState } from 'react';
import { AllZonesProgress, ZoneId } from '../types/game';
import { ZONES_CONFIG } from '../data/zones';
import { playClickSound } from '../utils/audio';

interface ZooMapProps {
  progress: AllZonesProgress;
  onSelectZone: (zoneId: ZoneId) => void;
  onFinishExploration: () => void;
}

export const ZooMap: React.FC<ZooMapProps> = ({
  progress,
  onSelectZone,
  onFinishExploration,
}) => {
  const [hoveredZone, setHoveredZone] = useState<ZoneId | null>(null);

  const zonesList = Object.values(ZONES_CONFIG);
  const completedCount = Object.values(progress).filter((p) => p.zoneCompleted).length;

  const handleZoneClick = (zoneId: ZoneId) => {
    playClickSound();
    onSelectZone(zoneId);
  };

  return (
    <div className="relative w-full min-h-[92vh] bg-gradient-to-br from-emerald-100 via-amber-50 to-teal-100 flex flex-col p-4 md:p-6 overflow-hidden">
      {/* Top Map HUD Bar */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-amber-200/80 shadow-md mb-4 max-w-6xl mx-auto w-full">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
            Peta Kebun Binatang Artventure
          </span>
          <h2 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
            Pilih Satu Zona yang Ingin Kamu Jelajahi
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-slate-500 font-medium">Progress Eksplorasi</p>
            <p className="text-sm font-bold text-slate-800">
              {completedCount} dari 6 Zona Selesai
            </p>
          </div>

          {completedCount > 0 && (
            <button
              onClick={() => {
                playClickSound();
                onFinishExploration();
              }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-md text-sm transition-all flex items-center gap-2 cursor-pointer font-display"
            >
              <span>🏁</span>
              <span>SELESAI PETUALANGAN</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Adventure Map Canvas */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 min-h-[560px] md:min-h-[640px] bg-[#E2E8CE] rounded-3xl border-4 border-amber-300 shadow-2xl overflow-hidden relative">
        {/* SVG Decorative Background: Pathways, Grass textures, Water, Trees */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern id="grass-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1.5" fill="#A3B18A" opacity="0.4" />
              <circle cx="30" cy="25" r="1.5" fill="#A3B18A" opacity="0.4" />
            </pattern>
            <linearGradient id="pond-water" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7DD3FC" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="ocean-water" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1E3A8A" />
            </linearGradient>
          </defs>

          {/* Grass Field Base */}
          <rect width="1000" height="650" fill="#D8E2DC" />
          <rect width="1000" height="650" fill="url(#grass-pattern)" />

          {/* Central Fountain / Plaza */}
          <ellipse cx="500" cy="330" rx="90" ry="60" fill="#E9ECEF" stroke="#CED4DA" strokeWidth="4" />
          <ellipse cx="500" cy="330" rx="50" ry="32" fill="#7DD3FC" stroke="#0284C7" strokeWidth="3" />
          <ellipse cx="500" cy="330" rx="20" ry="12" fill="#BAE6FD" />
          <text x="500" y="325" fontSize="20" textAnchor="middle">⛲</text>
          <text x="500" y="348" fontSize="11" fontWeight="bold" fill="#0369A1" textAnchor="middle" fontFamily="'Fredoka', sans-serif">
            PLAZA SENTRAL
          </text>

          {/* Winding Cobblestone Paths (Jalan Setapak) */}
          <path
            d="M 500 330 Q 380 320 250 200"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 500 330 Q 500 240 500 180"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 500 330 Q 640 280 750 180"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 500 330 Q 360 410 240 480"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 500 330 Q 500 440 500 520"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 500 330 Q 640 400 750 460"
            stroke="#FFE8D6"
            strokeWidth="32"
            fill="none"
            strokeLinecap="round"
          />

          {/* Path border dashes */}
          <path
            d="M 500 330 Q 380 320 250 200 M 500 330 Q 500 240 500 180 M 500 330 Q 640 280 750 180 M 500 330 Q 360 410 240 480 M 500 330 Q 500 440 500 520 M 500 330 Q 640 400 750 460"
            stroke="#DDBEA9"
            strokeWidth="3"
            strokeDasharray="6 6"
            fill="none"
          />

          {/* Habitat Decor: Duck Pond */}
          <ellipse cx="500" cy="140" rx="90" ry="50" fill="url(#pond-water)" stroke="#0284C7" strokeWidth="4" />
          <ellipse cx="480" cy="135" rx="14" ry="7" fill="#86EFAC" stroke="#15803D" strokeWidth="1.5" />
          <ellipse cx="530" cy="145" rx="16" ry="8" fill="#86EFAC" stroke="#15803D" strokeWidth="1.5" />

          {/* Habitat Decor: Marine Lagoon */}
          <path
            d="M 400 540 C 430 500 570 500 600 540 C 620 590 380 590 400 540 Z"
            fill="url(#ocean-water)"
            stroke="#0369A1"
            strokeWidth="4"
          />
          <path d="M 460 530 Q 500 520 540 530" stroke="#BAE6FD" strokeWidth="3" fill="none" opacity="0.8" />

          {/* Clustered Trees & Bushes across the park */}
          <g fill="#588157" opacity="0.9">
            {/* Top Left Trees */}
            <circle cx="120" cy="80" r="30" />
            <circle cx="150" cy="90" r="24" />
            <circle cx="100" cy="110" r="26" />
            {/* Top Right Trees */}
            <circle cx="880" cy="80" r="32" />
            <circle cx="910" cy="110" r="26" />
            <circle cx="850" cy="100" r="28" />
            {/* Center Left Trees */}
            <circle cx="120" cy="310" r="28" />
            <circle cx="140" cy="335" r="22" />
            {/* Bottom Right Trees */}
            <circle cx="890" cy="540" r="34" />
            <circle cx="850" cy="560" r="26" />
            {/* Mid Trees */}
            <circle cx="340" cy="180" r="22" />
            <circle cx="660" cy="180" r="22" />
            <circle cx="350" cy="460" r="24" />
            <circle cx="660" cy="450" r="24" />
          </g>

          {/* Wood Fences around zones */}
          <g stroke="#854D0E" strokeWidth="2.5" strokeLinecap="round">
            {/* Mini Park Fence */}
            <line x1="160" y1="210" x2="220" y2="210" />
            <line x1="170" y1="202" x2="170" y2="218" />
            <line x1="190" y1="202" x2="190" y2="218" />
            <line x1="210" y1="202" x2="210" y2="218" />
            {/* Land Zone Fence */}
            <line x1="770" y1="420" x2="840" y2="420" />
            <line x1="780" y1="412" x2="780" y2="428" />
            <line x1="805" y1="412" x2="805" y2="428" />
            <line x1="830" y1="412" x2="830" y2="428" />
          </g>
        </svg>

        {/* 6 Scattered Zone Spots (Interactive Cards & Signboards) */}
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
              className="absolute z-20 transition-all duration-300 ease-out"
              onMouseEnter={() => setHoveredZone(z.id)}
              onMouseLeave={() => setHoveredZone(null)}
            >
              <div
                onClick={() => handleZoneClick(z.id)}
                className={`group cursor-pointer rounded-3xl p-3 md:p-4 text-center transition-all duration-300 select-none ${
                  isHovered
                    ? 'scale-110 z-30 shadow-2xl ring-4 ring-amber-400 bg-white'
                    : 'scale-100 bg-white/95 shadow-lg hover:shadow-xl'
                } border-2 ${isDone ? 'border-emerald-500' : 'border-amber-300'} min-w-[150px] md:min-w-[180px] max-w-[210px]`}
              >
                {/* Completed Badge Stamp */}
                {isDone && (
                  <div className="absolute -top-3 -right-2 bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1 border border-white">
                    <span>✓</span>
                    <span>SELESAI</span>
                  </div>
                )}

                {/* Fauna Habitat Icon Avatar */}
                <div
                  className={`w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl md:text-4xl shadow-inner mb-2 transition-transform duration-300 ${
                    isHovered ? 'rotate-6 scale-110' : ''
                  }`}
                  style={{ backgroundColor: `${z.accentColor}20` }}
                >
                  <span>{z.badgeIcon}</span>
                </div>

                {/* Zone Signboard Title */}
                <h3 className="font-extrabold text-slate-800 text-sm md:text-base font-display leading-tight">
                  {z.habitat.toUpperCase()}
                </h3>

                {/* Fauna discovery label */}
                <p className="text-xs font-semibold text-slate-500 mt-0.5">
                  {z.subtitle}
                </p>

                {/* Interactive Action Button on Hover */}
                <div
                  className={`mt-2.5 transition-all duration-200 overflow-hidden ${
                    isHovered ? 'max-h-12 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleZoneClick(z.id);
                    }}
                    className="w-full py-1.5 px-3 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1 cursor-pointer font-display"
                  >
                    <span>JELAJAHI</span>
                    <span>▶</span>
                  </button>
                </div>
              </div>

              {/* Wooden pole underneath signboard */}
              <div className="w-2.5 h-5 bg-amber-800 mx-auto rounded-b shadow-sm -mt-0.5" />
            </div>
          );
        })}
      </div>

      {/* Exploration instruction footer banner */}
      <div className="relative z-20 mt-3 text-center text-xs md:text-sm text-slate-600 font-medium">
        💡 <span className="font-semibold text-slate-800">Eksplorasi Bebas:</span> Kamu boleh memilih zona mana pun yang ingin kamu amati lebih dulu. Selesaikan misi untuk mendapatkan Lencana Penjelajah!
      </div>
    </div>
  );
};
