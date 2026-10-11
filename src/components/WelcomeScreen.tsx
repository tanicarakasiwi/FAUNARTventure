import React, { useState, useEffect } from 'react';
import { DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';
import { StudentAvatar } from './StudentAvatar';
import { playClickSound, playSuccessChime, startAdventureBGM } from '../utils/audio';
import { speakGuideVoice, stopGuideVoice } from '../utils/speechHelper';
import zooEntranceImg from '../assets/images/faunart_gate_user_1791694315256.jpg';

interface WelcomeScreenProps {
  difficulty?: DifficultyLevel;
  onSelectDifficulty?: (diff: DifficultyLevel) => void;
  onEnterMap: () => void;
}

const GUIDE_SPEECH_TEXT =
  'Halo Artventurer! Selamat datang di FAUNARTventure! Hari ini kamu bebas memilih tempat yang ingin kamu jelajahi lebih dulu. Ada empat langkah seru: Pertama, amati fauna di habitat aslinya. Kedua, temukan bentuk dasar geometrinya seperti lingkaran, oval, dan segitiga. Ketiga, perhatikan proporsi dan ciri khas fisiknya. Dan keempat, ciptakan karya gambarmu di buku sketsa! Yuk, pilih zona satwa favoritmu di Peta Kebun Binatang sekarang!';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  difficulty = 'MEDIUM',
  onSelectDifficulty,
  onEnterMap,
}) => {
  const [showNarration, setShowNarration] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      stopGuideVoice();
    };
  }, []);

  const handleEnterZoo = () => {
    playClickSound();
    startAdventureBGM();
    setIsEntering(true);

    setTimeout(() => {
      setShowNarration(true);
      playSuccessChime();

      // Trigger Indonesian female voice narration
      speakGuideVoice(
        GUIDE_SPEECH_TEXT,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }, 450);
  };

  const handleToggleVoice = () => {
    playClickSound();
    if (isSpeaking) {
      stopGuideVoice();
      setIsSpeaking(false);
    } else {
      speakGuideVoice(
        GUIDE_SPEECH_TEXT,
        () => setIsSpeaking(true),
        () => setIsSpeaking(false)
      );
    }
  };

  const handleOpenMap = () => {
    playClickSound();
    stopGuideVoice();
    setIsSpeaking(false);
    onEnterMap();
  };

  return (
    <div className="relative w-full h-full min-h-[calc(100vh-64px)] md:min-h-screen flex flex-col justify-between items-center overflow-hidden bg-slate-950 select-none">
      {/* 1. FULLSCREEN IMMERSIVE ZOO ENTRANCE GATE BACKGROUND */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          src={zooEntranceImg}
          alt="Gerbang FAUNARTventure Zoo"
          className={`w-full h-full object-cover object-center transition-transform duration-1000 ${
            isEntering ? 'scale-105 filter brightness-105' : 'scale-100'
          }`}
        />
        {/* Subtle vignette for crisp text & button contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25 pointer-events-none" />
      </div>

      {/* 2. TOP FLOATING BADGE */}
      <header className="relative z-20 w-full max-w-4xl pt-3 px-4 flex justify-between items-center pointer-events-none">
        <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border-2 border-amber-400 shadow-lg rounded-full px-4 py-1.5 pointer-events-auto">
          <span className="text-amber-900 font-black text-xs md:text-sm tracking-wide font-display">
            🎨 Seni Rupa SMP Kelas VII · Kurikulum Merdeka
          </span>
        </div>
      </header>

      {/* 3. INTERACTIVE GOLDEN 'MASUK ➔' BUTTON */}
      <main className="relative z-20 w-full flex-1 flex flex-col items-center justify-end pb-8 sm:pb-12 md:pb-16 px-4">
        {/* Interactive glowing golden button exactly over the walkway button area */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleEnterZoo}
            className="group relative px-10 sm:px-14 md:px-20 py-3.5 sm:py-5 md:py-6 bg-gradient-to-b from-yellow-300 via-amber-400 to-amber-500 hover:from-yellow-200 hover:via-amber-300 hover:to-amber-500 active:scale-95 text-amber-950 font-black text-xl sm:text-3xl md:text-4xl rounded-full shadow-[0_12px_40px_rgba(245,158,11,0.9)] hover:shadow-[0_16px_50px_rgba(251,191,36,1)] border-4 md:border-5 border-white transition-all flex items-center justify-center gap-3 md:gap-4 cursor-pointer font-display animate-bounce"
            style={{
              textShadow: '0 2px 4px rgba(255,255,255,0.8)',
            }}
          >
            <span>MASUK</span>
            <span className="text-2xl sm:text-4xl md:text-5xl transition-transform group-hover:translate-x-2">
              ➔
            </span>
          </button>
          <span className="bg-black/60 backdrop-blur-sm text-amber-200 text-xs sm:text-sm font-extrabold px-3.5 py-1 rounded-full shadow border border-amber-300/40">
            👆 Ketuk tombol untuk membuka gerbang & bertemu pemandu
          </span>
        </div>
      </main>

      {/* 4. FEMALE GUIDE FLOATING CORNER GREETING (ON DESKTOP) */}
      <aside aria-label="Pemandu Petualangan" className="hidden md:flex absolute bottom-4 left-6 z-20 items-end gap-3 bg-white/95 backdrop-blur-md p-3 rounded-2xl border-2 border-amber-400 shadow-2xl max-w-sm animate-fade-in">
        <div className="shrink-0">
          <StudentAvatar size={58} />
        </div>
        <div className="text-left">
          <span className="text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            Pemandu Petualangan
          </span>
          <p className="text-xs font-extrabold text-slate-800 mt-1 leading-tight">
            "Halo Artventurer! Yuk ketuk <strong>MASUK</strong> untuk memulai jelajah fauna!"
          </p>
        </div>
      </aside>

      {/* 5. NARRATION DIALOG MODAL WITH SPOKEN VOICE & ZONE INVITATION */}
      {showNarration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-md animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl border-4 md:border-6 border-amber-400 relative text-left overflow-hidden my-auto animate-scale-in">
            {/* Guide Profile Banner with Voice Controller */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 mb-3 border-b-2 border-amber-100">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0 bg-amber-50 p-1.5 rounded-2xl border-2 border-amber-300 shadow-inner">
                  {/* Female Guide with Ponytail & Animated Speaking Mouth */}
                  <StudentAvatar size={68} speaking={isSpeaking} />
                  {isSpeaking && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      Pemandu Artventure
                    </span>
                    {isSpeaking && (
                      <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse border border-emerald-200">
                        <span>🔊</span>
                        <span>Sedang Berbicara...</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
                    Selamat Datang di Kebun Binatang!
                  </h3>
                </div>
              </div>

              {/* Voice Speech Control Toggle */}
              <button
                onClick={handleToggleVoice}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer border ${
                  isSpeaking
                    ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200'
                }`}
                title="Putar atau jeda suara pemandu"
              >
                <span>{isSpeaking ? '⏸️' : '🔊'}</span>
                <span>{isSpeaking ? 'Jeda Suara' : 'Dengarkan Suara'}</span>
              </button>
            </div>

            {/* 4 Steps Educational Briefing */}
            <div className="space-y-3 bg-amber-50/90 p-4 sm:p-5 rounded-2xl border border-amber-200">
              <p className="font-extrabold text-amber-950 text-sm sm:text-base leading-snug">
                Hari ini kamu bebas memilih tempat yang ingin kamu jelajahi lebih dulu!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-800">
                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                  <span className="text-xl shrink-0">🌿</span>
                  <div>
                    <strong className="text-emerald-800 block">1. Amati Fauna</strong>
                    <span className="text-slate-600">Amati satwa di habitat aslinya yang alami.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                  <span className="text-xl shrink-0">📐</span>
                  <div>
                    <strong className="text-cyan-800 block">2. Bentuk Dasar</strong>
                    <span className="text-slate-600">Temukan lingkaran, oval, segitiga, & persegi.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                  <span className="text-xl shrink-0">📏</span>
                  <div>
                    <strong className="text-amber-800 block">3. Amati Proporsi</strong>
                    <span className="text-slate-600">Pahami perbandingan ukuran & ciri fisik khas.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-amber-200/80 shadow-2xs">
                  <span className="text-xl shrink-0">✏️</span>
                  <div>
                    <strong className="text-rose-800 block">4. Ciptakan Karyamu</strong>
                    <span className="text-slate-600">Gambar di buku gambar & simpan ke galeri HP!</span>
                  </div>
                </div>
              </div>

              {/* Special Zone Selection Invitation Callout (User Requirement) */}
              <div className="mt-2 p-3 bg-gradient-to-r from-emerald-100 via-teal-100 to-sky-100 border-2 border-emerald-400 rounded-xl text-center">
                <p className="font-black text-emerald-950 text-sm sm:text-base">
                  ✨ Yuk, pilih zona satwa favoritmu di Peta Kebun Binatang sekarang!
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-800 mt-0.5">
                  Ada Akuarium, Dunia Laut, Darat, Burung, Kolam, dan Taman menantimu!
                </p>
              </div>

              {/* Difficulty Level Selector */}
              <div className="mt-3 p-3 bg-white/95 rounded-2xl border-2 border-amber-300 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>Pilih Tingkat Kesulitan:</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500">
                    (Bisa diubah kapan saja di bilah atas)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['EASY', 'MEDIUM', 'HARD'] as DifficultyLevel[]).map((dKey) => {
                    const cfg = DIFFICULTY_CONFIGS[dKey];
                    const isCur = difficulty === dKey;
                    return (
                      <button
                        key={dKey}
                        onClick={() => {
                          playClickSound();
                          if (onSelectDifficulty) onSelectDifficulty(dKey);
                        }}
                        className={`p-2 rounded-xl border text-xs transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer font-display ${
                          isCur
                            ? `${cfg.badgeClass} ring-2 ring-amber-400 shadow-sm scale-102 font-extrabold`
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                        }`}
                      >
                        <span className="text-base">{cfg.icon}</span>
                        <span>{cfg.shortLabel}</span>
                        <span className="text-[9px] opacity-75">{cfg.badge}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Direct Action Navigation to Zoo Map */}
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleOpenMap}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 active:scale-95 text-white font-black rounded-2xl shadow-xl hover:shadow-emerald-500/40 transition-all flex items-center justify-center gap-3 cursor-pointer font-display text-base sm:text-lg border-2 border-emerald-400"
              >
                <span>🗺️</span>
                <span>PILIH ZONA DI PETA KEBUN BINATANG</span>
                <span>➔</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
