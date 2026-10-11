import React, { useState, useEffect } from 'react';
import { ZoneConfig, ZoneProgress, DifficultyLevel } from '../types/game';
import { DIFFICULTY_CONFIGS } from '../data/difficulty';
import { AnimalIllustration } from './AnimalIllustration';
import { StudentAvatar } from './StudentAvatar';
import { playClickSound, playZoneAmbience } from '../utils/audio';
import { speakGuideVoice, stopGuideVoice } from '../utils/speechHelper';

interface HabitatViewProps {
  zone: ZoneConfig;
  progress?: ZoneProgress;
  difficulty?: DifficultyLevel;
  onStartMissions: () => void;
  onBackToMap: () => void;
}

interface ZoneGuidePlacement {
  groundTitle: string;
  standingSurfaceDesc: string;
  shadowColor: string;
  avatarSize: number;
  desktopWrapperClass: string;
  groundShadowClass: string;
}

const ZONE_GUIDE_CONFIG: Record<string, ZoneGuidePlacement> = {
  siput: {
    groundTitle: 'Jalan Setapak Taman Siput',
    standingSurfaceDesc: 'Berdiri di jalan setapak batu alam berlumut 🍄',
    shadowColor: 'rgba(54, 83, 20, 0.55)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-4 lg:ml-12',
    groundShadowClass: 'w-28 h-4 rounded-full blur-[2px]',
  },
  ikan: {
    groundTitle: 'Dek Pengamatan Akuarium',
    standingSurfaceDesc: 'Berdiri di lantai dek pengamatan kaca akuarium 🐟',
    shadowColor: 'rgba(15, 23, 42, 0.65)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-4 lg:ml-8',
    groundShadowClass: 'w-28 h-3.5 rounded-full blur-[1.5px]',
  },
  bebek: {
    groundTitle: 'Tepi Kolam Bebek',
    standingSurfaceDesc: 'Berdiri di jalan setapak tepi air kolam bebek 🦆',
    shadowColor: 'rgba(30, 41, 59, 0.55)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-4 lg:ml-10',
    groundShadowClass: 'w-28 h-4 rounded-full blur-[2px]',
  },
  kucing: {
    groundTitle: 'Jalur Masuk Rumah Kucing',
    standingSurfaceDesc: 'Berdiri di jalur setapak berpasir gapura kucing 🐾',
    shadowColor: 'rgba(120, 53, 15, 0.55)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-8 lg:ml-20',
    groundShadowClass: 'w-28 h-4 rounded-full blur-[2px]',
  },
  lumba: {
    groundTitle: 'Teras Karang Bawah Laut',
    standingSurfaceDesc: 'Berdiri di teras pijakan karang laut jernih 🐬',
    shadowColor: 'rgba(6, 78, 59, 0.55)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-6 lg:ml-14',
    groundShadowClass: 'w-28 h-4 rounded-full blur-[2.5px]',
  },
  burung: {
    groundTitle: 'Jalan Setapak Taman Burung',
    standingSurfaceDesc: 'Berdiri di jalan setapak batu alam kubah aviary 🦜',
    shadowColor: 'rgba(20, 83, 45, 0.55)',
    avatarSize: 145,
    desktopWrapperClass: 'md:self-end md:mb-2 md:ml-4 lg:ml-10',
    groundShadowClass: 'w-28 h-4 rounded-full blur-[2px]',
  },
};

export const HabitatView: React.FC<HabitatViewProps> = ({
  zone,
  progress,
  difficulty = 'MEDIUM',
  onStartMissions,
  onBackToMap,
}) => {
  const diffConfig = DIFFICULTY_CONFIGS[difficulty];
  const [showExplorerModal, setShowExplorerModal] = useState(false);
  const [showGuideTooltip, setShowGuideTooltip] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const guideConfig = ZONE_GUIDE_CONFIG[zone.id] || ZONE_GUIDE_CONFIG.siput;

  // Automatically show the guide tooltip whenever entering a new zone
  useEffect(() => {
    setShowGuideTooltip(true);
    return () => {
      stopGuideVoice();
      setIsSpeaking(false);
    };
  }, [zone.id]);

  const handleAnimalClick = () => {
    playClickSound();
    setShowExplorerModal(true);
  };

  const handleStartMission = () => {
    playClickSound();
    stopGuideVoice();
    setIsSpeaking(false);
    onStartMissions();
  };

  // Determine what next mission step needs to be completed
  const getNextMission = () => {
    if (!progress || !progress.puzzleCompleted) {
      return {
        step: 1,
        name: 'Misi 1: Rakit Tubuh',
        icon: '🧩',
        badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
        headline: 'Mengenal Anatomi Tubuh',
        instruction: `Susun potongan tubuh ${zone.animal} agar kita mengenali bentuk fisiknya dengan jelas!`,
        speechText: `Halo Artventurer! Misi pertamamu di habitat ${zone.habitat} adalah Misi 1: Merakit potongan tubuh ${zone.animal}. Klik hewannya untuk mulai!`,
      };
    }
    if (!progress.shapeCompleted) {
      return {
        step: 2,
        name: 'Misi 2: Bentuk Dasar',
        icon: '🔷',
        badgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
        headline: 'Menemukan Bentuk Geometri',
        instruction: `Temukan bentuk geometri (lingkaran, segitiga, oval) penyusun tubuh ${zone.animal}!`,
        speechText: `Hebat! Misi keduamu adalah menemukan bentuk geometri dasar seperti lingkaran atau segitiga pada tubuh ${zone.animal}.`,
      };
    }
    if (!progress.proportionCompleted) {
      return {
        step: 3,
        name: 'Misi 3: Cek Proporsi',
        icon: '📏',
        badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
        headline: 'Membandingkan Ukuran',
        instruction: `Amati perbandingan proporsi ukuran tubuh ${zone.animal} agar hasil gambarmu seimbang!`,
        speechText: `Lanjut ke Misi 3! Amati perbandingan proporsi ukuran tubuh ${zone.animal} agar gambarmu seimbang dan nyata.`,
      };
    }
    if (!progress.featureCompleted) {
      return {
        step: 4,
        name: 'Misi 4: Ciri Khas Unik',
        icon: '🔎',
        badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
        headline: 'Mengenali Tekstur & Ciri Khas',
        instruction: `Kenali ciri unik dan tekstur khusus pada ${zone.animal} yang membedakannya dari satwa lain!`,
        speechText: `Misi 4! Perhatikan ciri khas unik dan detail istimewa pada ${zone.animal} untuk memperkaya karyamu.`,
      };
    }
    if (!progress.zoneCompleted) {
      return {
        step: 5,
        name: 'Misi 5: Menggambar Kreatif',
        icon: '✏️',
        badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
        headline: 'Menggambar Karya Seni',
        instruction: `Saatnya berkarya! Ikuti langkah terpandu menggambar ${zone.animal} di buku gambarmu!`,
        speechText: `Misi puncak yang ditunggu-tunggu! Saatnya menggambar ${zone.animal} di buku gambarmu mengikuti panduan langkah demi langkah!`,
      };
    }
    return {
      step: 6,
      name: 'Semua Misi Selesai!',
      icon: '🎉',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      headline: 'Zona Selesai Ditaklukkan',
      instruction: `Luar biasa! Seluruh misi di habitat ${zone.habitat} telah tuntas. Kamu bisa berlatih lagi atau kembali ke peta!`,
      speechText: `Selamat! Kamu sudah menyelesaikan seluruh misi di habitat ini. Kamu bisa lanjut menjelajahi zona satwa berikutnya di peta!`,
    };
  };

  const nextMission = getNextMission();

  const handleSpeakGuide = () => {
    playClickSound();
    if (isSpeaking) {
      stopGuideVoice();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speakGuideVoice(
      nextMission.speechText,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false)
    );
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden p-4 md:p-6 bg-slate-900">
      {/* Official Zone Habitat Background from PDF (Vibrant, Unblurred & Instant Zero-Delay) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-slate-900">
        <img
          src={zone.backgroundImage}
          alt={`Background Habitat ${zone.habitat}`}
          className="w-full h-full object-cover object-center"
          loading="eager"
          decoding="sync"
        />
        {/* Subtle, non-blur vignette layer to preserve perfect contrast for navigation & text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35 pointer-events-none" />
      </div>

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

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              playClickSound();
              playZoneAmbience(zone.id);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-all cursor-pointer font-display"
            title="Dengarkan Suara Alam"
          >
            <span>🍃</span>
            <span className="hidden sm:inline">Suara Alam</span>
          </button>
          <div className="text-2xl">{zone.badgeIcon}</div>
        </div>
      </div>

      {/* Main Interactive Stage with Fauna and Student */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center md:items-end justify-between gap-6 my-2 max-w-6xl mx-auto w-full min-h-[62vh]">
        {/* Student Observer Avatar & Guide Mission Tooltip (Positioned naturally on zone terrain) */}
        <div className={`flex flex-col items-center shrink-0 relative z-20 ${guideConfig.desktopWrapperClass} transition-all duration-300`}>
          {/* Tooltip speech bubble placed near the guide character */}
          {showGuideTooltip ? (
            <div className="mb-2 w-64 sm:w-72 md:w-80 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border-2 border-amber-400 shadow-2xl relative animate-pop-in">
              {/* Header */}
              <div className="flex items-center justify-between gap-1 pb-1.5 border-b border-amber-100 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">👩‍🌾</span>
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-950 font-display">
                    Petunjuk Pemandu
                  </span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <button
                  onClick={() => {
                    playClickSound();
                    stopGuideVoice();
                    setIsSpeaking(false);
                    setShowGuideTooltip(false);
                  }}
                  className="w-5 h-5 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                  title="Tutup Petunjuk"
                >
                  ✕
                </button>
              </div>

              {/* Next Mission Pill & Difficulty Badge */}
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${nextMission.badgeColor}`}>
                  {nextMission.icon} {nextMission.name}
                </span>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${diffConfig.badgeClass}`}>
                  {diffConfig.icon} {diffConfig.shortLabel}
                </span>
              </div>

              {/* Mission Instruction */}
              <p className="text-xs md:text-[13px] font-bold text-slate-800 leading-snug mb-3">
                {nextMission.instruction}
              </p>

              {/* Action Buttons: Voice Guide & Direct Start Mission */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-amber-100">
                <button
                  onClick={handleSpeakGuide}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSpeaking
                      ? 'bg-amber-300 text-amber-950 shadow-inner'
                      : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                  }`}
                  title="Dengarkan narasi suara pemandu"
                >
                  <span>{isSpeaking ? '🔊' : '🔈'}</span>
                  <span>{isSpeaking ? 'Bicara...' : 'Dengar Suara'}</span>
                </button>

                <button
                  onClick={handleAnimalClick}
                  className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl text-xs font-extrabold shadow-md hover:shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer font-display"
                  title="Mulai Misi Sekarang"
                >
                  <span>Mulai Misi</span>
                  <span>➔</span>
                </button>
              </div>

              {/* Speech bubble arrow pointer pointing down towards guide's hat */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-b-2 border-r-2 border-amber-400 rotate-45 transform" />
            </div>
          ) : (
            <button
              onClick={() => {
                playClickSound();
                setShowGuideTooltip(true);
              }}
              className="mb-2 group flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-amber-50 backdrop-blur-md rounded-full border-2 border-amber-400 shadow-lg text-xs font-black text-amber-950 transition-all hover:scale-105 active:scale-95 cursor-pointer animate-pulse"
              title="Buka petunjuk misi selanjutnya"
            >
              <span className="text-sm">💡</span>
              <span>Petunjuk Misi: {nextMission.name}</span>
              <span className="text-[10px] text-amber-600 group-hover:translate-x-0.5 transition-transform">▲</span>
            </button>
          )}

          {/* Student Guide Avatar with realistic terrain ground shadow */}
          <div className="relative flex flex-col items-center select-none">
            <StudentAvatar size={guideConfig.avatarSize} speaking={isSpeaking} />
            {/* Terrain contact shadow matching ground */}
            <div
              className={`-mt-3 pointer-events-none transition-all ${guideConfig.groundShadowClass}`}
              style={{ backgroundColor: guideConfig.shadowColor }}
            />
          </div>

          {/* Realistic position indicator on the terrain */}
          <div className="bg-white/95 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-black text-slate-800 shadow-md border border-amber-300 mt-1.5 flex items-center gap-1.5 font-display">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{guideConfig.standingSurfaceDesc}</span>
          </div>
        </div>

        {/* Fauna Spotlight Area - Framed naturally in the scene */}
        <div className="relative flex-1 flex flex-col items-center justify-center self-center md:self-center mb-6 md:mb-10 md:mr-6 z-10">
          {/* Hint speech bubble */}
          <div className="mb-2 animate-float-slow">
            <div
              className="bg-amber-100/95 backdrop-blur-sm text-amber-950 border-2 border-amber-400 font-bold px-4 py-2 rounded-2xl shadow-xl text-sm md:text-base flex items-center gap-2 cursor-pointer hover:bg-amber-200 transition-all hover:scale-105 active:scale-95"
              onClick={handleAnimalClick}
            >
              <span>🔎</span>
              <span>{zone.observationPrompt} <strong>(Klik di sini!)</strong></span>
            </div>
          </div>

          {/* Clickable Animal Card - Semi-transparent glassmorphic background allowing unblurred habitat background to shine through */}
          <div
            onClick={handleAnimalClick}
            className="group cursor-pointer relative bg-white/60 hover:bg-white/85 backdrop-blur-[2px] p-4 md:p-6 rounded-3xl border-3 border-white/80 hover:border-amber-400 transition-all duration-300 shadow-2xl hover:scale-105 active:scale-95"
          >
            <AnimalIllustration
              zoneId={zone.id}
              className="w-[280px] sm:w-[380px] md:w-[440px] h-auto drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
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
