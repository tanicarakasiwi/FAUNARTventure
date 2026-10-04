import React, { useState } from 'react';
import { Screen, ZoneId } from '../types/game';
import { getMuteState, toggleMute, playClickSound } from '../utils/audio';

interface NavbarProps {
  currentScreen: Screen;
  selectedZoneId: ZoneId | null;
  onNavigateHome: () => void;
  onNavigateMap: () => void;
  onOpenGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  selectedZoneId,
  onNavigateHome,
  onNavigateMap,
  onOpenGuide,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());

  const handleToggleSound = () => {
    const next = toggleMute();
    setIsMuted(next);
    if (!next) {
      playClickSound();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-4 md:px-8 py-3 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              onNavigateHome();
            }}
            className="flex items-center gap-2 text-left cursor-pointer group"
          >
            <span className="text-2xl transition-transform group-hover:scale-110">🦁</span>
            <span className="text-xl md:text-2xl font-extrabold text-amber-950 font-display tracking-tight whitespace-nowrap">
              FAUNART<span className="text-emerald-600">venture</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs md:text-sm font-semibold text-slate-600">
          <button
            onClick={() => {
              playClickSound();
              onNavigateHome();
            }}
            className={`hover:text-amber-800 transition-colors cursor-pointer ${
              currentScreen === 'WELCOME' ? 'text-amber-800 font-bold' : ''
            }`}
          >
            Gerbang Depan
          </button>

          <button
            onClick={() => {
              playClickSound();
              onNavigateMap();
            }}
            className={`hover:text-amber-800 transition-colors cursor-pointer ${
              currentScreen === 'MAP' ? 'text-amber-800 font-bold' : ''
            }`}
          >
            Peta Satwa
          </button>

          <button
            onClick={() => {
              playClickSound();
              onOpenGuide();
            }}
            className="hover:text-amber-800 transition-colors cursor-pointer"
          >
            Panduan Seni Rupa
          </button>
        </nav>

        {/* Zone 3: Primary Actions (Audio toggle & Quick Map) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sound Mute / Unmute Toggle Button */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-sm"
            title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {currentScreen !== 'MAP' && currentScreen !== 'WELCOME' && (
            <button
              onClick={() => {
                playClickSound();
                onNavigateMap();
              }}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer font-display whitespace-nowrap"
            >
              <span>🗺️</span>
              <span className="hidden sm:inline">Ke Peta</span>
            </button>
          )}

          <button
            onClick={() => {
              playClickSound();
              onOpenGuide();
            }}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-700 text-sm cursor-pointer"
            title="Panduan"
          >
            ℹ️
          </button>
        </div>
      </div>
    </header>
  );
};
