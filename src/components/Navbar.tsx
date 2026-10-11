import React, { useState, useEffect } from 'react';
import { Screen, ZoneId, DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';
import { getMuteState, toggleMute, playClickSound } from '../utils/audio';

interface NavbarProps {
  currentScreen: Screen;
  selectedZoneId: ZoneId | null;
  difficulty: DifficultyLevel;
  onNavigateHome: () => void;
  onNavigateMap: () => void;
  onOpenGuide: () => void;
  onOpenGallery: () => void;
  onOpenDifficultyModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  selectedZoneId,
  difficulty,
  onNavigateHome,
  onNavigateMap,
  onOpenGuide,
  onOpenGallery,
  onOpenDifficultyModal,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(getMuteState());
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
    };
  }, []);

  const handleToggleSound = () => {
    const next = toggleMute();
    setIsMuted(next);
    if (!next) {
      playClickSound();
    }
  };

  const handleToggleFullscreen = () => {
    playClickSound();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-200/80 px-3 md:px-6 py-2.5 transition-colors">
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
            <span className="text-lg md:text-xl font-extrabold text-amber-950 font-display tracking-tight whitespace-nowrap">
              FAUNART<span className="text-emerald-600">venture</span>
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-xs md:text-sm font-semibold text-slate-600">
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
              onOpenGallery();
            }}
            className="hover:text-amber-800 transition-colors cursor-pointer flex items-center gap-1"
          >
            <span>🖼️</span>
            <span>Galeri Fauna</span>
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

        {/* Zone 3: Primary Actions (Difficulty, Audio toggle, Fullscreen 16:9, Quick Map) */}
        <div className="flex items-center gap-2">
          {/* Difficulty Level Switcher Button */}
          <button
            onClick={() => {
              playClickSound();
              onOpenDifficultyModal();
            }}
            className={`px-2.5 py-1.5 rounded-xl border font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:scale-105 active:scale-95 font-display ${DIFFICULTY_CONFIGS[difficulty].badgeClass}`}
            title={`Tingkat Kesulitan: ${DIFFICULTY_CONFIGS[difficulty].name}. Klik untuk mengganti.`}
          >
            <span>{DIFFICULTY_CONFIGS[difficulty].icon}</span>
            <span className="hidden sm:inline font-black">{DIFFICULTY_CONFIGS[difficulty].shortLabel}</span>
            <span className="text-[10px] opacity-70">▼</span>
          </button>

          <button
            onClick={() => {
              playClickSound();
              onOpenGallery();
            }}
            className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs rounded-xl border border-emerald-300 transition-colors flex items-center gap-1 cursor-pointer font-display"
            title="Buka Galeri Gambar Fauna"
          >
            <span>🖼️</span>
            <span className="hidden sm:inline">Galeri</span>
          </button>

          {/* 16:9 Fullscreen Toggle Button */}
          <button
            onClick={handleToggleFullscreen}
            aria-label={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh 16:9 Landscape'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs flex items-center gap-1 font-bold"
            title={isFullscreen ? 'Keluar Layar Penuh' : 'Layar Penuh (16:9 Landscape)'}
          >
            <span className="text-sm">{isFullscreen ? '🗗' : '⛶'}</span>
            <span className="hidden xl:inline">{isFullscreen ? 'Normal' : '16:9 Fullscreen'}</span>
          </button>

          {/* Sound Mute / Unmute Toggle Button */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-sm"
            title={isMuted ? 'Nyalakan Musik' : 'Matikan Musik'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>

          {currentScreen !== 'MAP' && currentScreen !== 'WELCOME' && (
            <button
              onClick={() => {
                playClickSound();
                onNavigateMap();
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow transition-all flex items-center gap-1.5 cursor-pointer font-display whitespace-nowrap"
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
