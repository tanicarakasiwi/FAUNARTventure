import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Screen, ZoneId, AllZonesProgress, MissionStep, DifficultyLevel } from './types/game';
import { ZONES_CONFIG } from './data/zones';
import { DIFFICULTY_CONFIGS } from './data/difficulty';
import { Navbar } from './components/Navbar';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ZooMap } from './components/ZooMap';
import { HabitatView } from './components/HabitatView';
import { PuzzleMission } from './components/missions/PuzzleMission';
import { ShapeMission } from './components/missions/ShapeMission';
import { ProportionMission } from './components/missions/ProportionMission';
import { FeatureMission } from './components/missions/FeatureMission';
import { DrawingMission } from './components/missions/DrawingMission';
import { ZoneCompleteModal } from './components/ZoneCompleteModal';
import { SummaryScreen } from './components/SummaryScreen';
import { GuideModal } from './components/GuideModal';
import { GalleryModal } from './components/GalleryModal';
import { DifficultyModal } from './components/DifficultyModal';
import {
  playClickSound,
  playStepTransitionSound,
  startZoneAmbienceLoop,
  startAdventureBGM,
  stopAdventureBGM,
} from './utils/audio';

const INITIAL_PROGRESS: AllZonesProgress = {
  ikan: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
  lumba: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
  kucing: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
  burung: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
  bebek: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
  siput: { zoneStarted: false, puzzleCompleted: false, shapeCompleted: false, proportionCompleted: false, featureCompleted: false, zoneCompleted: false },
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('WELCOME');
  const [selectedZoneId, setSelectedZoneId] = useState<ZoneId | null>(null);
  const [currentMissionStep, setCurrentMissionStep] = useState<MissionStep>(1);
  const [slideDirection, setSlideDirection] = useState<'forward' | 'backward'>('forward');
  const [transitionPhase, setTransitionPhase] = useState<'idle' | 'sliding-out' | 'sliding-in'>('idle');
  const transitionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [progress, setProgress] = useState<AllZonesProgress>(INITIAL_PROGRESS);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState<boolean>(false);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('faunart_difficulty');
      if (saved === 'EASY' || saved === 'MEDIUM' || saved === 'HARD') {
        return saved as DifficultyLevel;
      }
    }
    return 'MEDIUM';
  });

  const handleSelectDifficulty = (newDiff: DifficultyLevel) => {
    setDifficulty(newDiff);
    if (typeof window !== 'undefined') {
      localStorage.setItem('faunart_difficulty', newDiff);
    }
  };

  const selectedZone = selectedZoneId ? ZONES_CONFIG[selectedZoneId] : null;
  const currentZoneProgress = selectedZoneId ? progress[selectedZoneId] : null;

  // Gentle, periodic natural ambient soundscape (suara alam) when inside habitat or doing missions
  useEffect(() => {
    if (!selectedZoneId || (currentScreen !== 'HABITAT' && currentScreen !== 'MISSIONS')) {
      return;
    }

    const stopAmbience = startZoneAmbienceLoop(selectedZoneId);
    return () => {
      stopAmbience();
    };
  }, [selectedZoneId, currentScreen]);

  // Cheerful adventure game instrumental BGM plays continuously across ALL game menus and missions
  useEffect(() => {
    startAdventureBGM();

    // Resume/start on first interaction in case browser audio was suspended
    const handleUserInteraction = () => {
      startAdventureBGM();
    };
    window.addEventListener('click', handleUserInteraction, { once: true });
    window.addEventListener('touchstart', handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  // Eager preloader and bitmap decoder for all zone backgrounds for instant zero-delay display
  useEffect(() => {
    Object.values(ZONES_CONFIG).forEach((zone) => {
      const bgImg = new Image();
      bgImg.src = zone.backgroundImage;
      if (typeof bgImg.decode === 'function') {
        bgImg.decode().catch(() => {});
      }
      const refImg = new Image();
      refImg.src = zone.referenceImage;
      if (typeof refImg.decode === 'function') {
        refImg.decode().catch(() => {});
      }
    });
  }, []);

  // Responsive 16:9 Landscape orientation detection for mobile/tablet screens
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [dismissRotatePrompt, setDismissRotatePrompt] = useState<boolean>(false);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        const portrait = window.innerHeight > window.innerWidth && window.innerWidth < 850;
        setIsPortrait(portrait);
      }
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);

  // Handlers
  const handleEnterMapFromWelcome = () => {
    setCurrentScreen('MAP');
  };

  const handleSelectZone = (zoneId: ZoneId) => {
    setSelectedZoneId(zoneId);
    setProgress((prev) => ({
      ...prev,
      [zoneId]: { ...prev[zoneId], zoneStarted: true },
    }));
    setCurrentScreen('HABITAT');
  };

  const transitionToMissionStep = useCallback((targetStep: MissionStep) => {
    if (targetStep === currentMissionStep) return;
    if (transitionPhase === 'sliding-out') return;

    const direction: 'forward' | 'backward' = targetStep > currentMissionStep ? 'forward' : 'backward';
    setSlideDirection(direction);
    setTransitionPhase('sliding-out');
    playStepTransitionSound();

    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentMissionStep(targetStep);
      setTransitionPhase('sliding-in');

      transitionTimeoutRef.current = setTimeout(() => {
        setTransitionPhase('idle');
      }, 260);
    }, 190);
  }, [currentMissionStep, transitionPhase]);

  const handleStartMissions = () => {
    if (!selectedZoneId) return;
    // Resume at the first incomplete mission step, or default to 1
    const p = progress[selectedZoneId];
    let nextStep: MissionStep = 1;
    if (!p.puzzleCompleted) nextStep = 1;
    else if (!p.shapeCompleted) nextStep = 2;
    else if (!p.proportionCompleted) nextStep = 3;
    else if (!p.featureCompleted) nextStep = 4;
    else nextStep = 5;

    setCurrentMissionStep(nextStep);
    setSlideDirection('forward');
    setTransitionPhase('sliding-in');
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }
    transitionTimeoutRef.current = setTimeout(() => {
      setTransitionPhase('idle');
    }, 260);
    setCurrentScreen('MISSIONS');
  };

  const handleMission1Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], puzzleCompleted: true },
    }));
    transitionToMissionStep(2);
  };

  const handleMission2Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], shapeCompleted: true },
    }));
    transitionToMissionStep(3);
  };

  const handleMission3Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], proportionCompleted: true },
    }));
    transitionToMissionStep(4);
  };

  const handleMission4Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], featureCompleted: true },
    }));
    transitionToMissionStep(5);
  };

  const handleMission5Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], zoneCompleted: true },
    }));
    setShowCompletionModal(true);
  };

  const handleBackToMap = () => {
    setShowCompletionModal(false);
    setCurrentScreen('MAP');
  };

  const handleFinishExploration = () => {
    setShowCompletionModal(false);
    setCurrentScreen('SUMMARY');
  };

  const handleReplayAll = () => {
    setProgress(INITIAL_PROGRESS);
    setSelectedZoneId(null);
    setCurrentScreen('WELCOME');
  };

  const handleGoToZoneFromGallery = (zoneId: ZoneId) => {
    setSelectedZoneId(zoneId);
    setProgress((prev) => ({
      ...prev,
      [zoneId]: { ...prev[zoneId], zoneStarted: true },
    }));
    setShowGalleryModal(false);
    setCurrentScreen('HABITAT');
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center overflow-x-hidden relative">
      {/* Mobile/Tablet Portrait Rotate Notice */}
      {isPortrait && !dismissRotatePrompt && (
        <div className="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-fade-in select-none">
          <div className="w-20 h-20 mb-4 rounded-3xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-4xl animate-bounce">
            🔄
          </div>
          <h3 className="text-xl md:text-2xl font-black text-white font-display mb-2">
            Putar ke Posisi Mendatar (Landscape 16:9)
          </h3>
          <p className="text-amber-200/90 text-sm max-w-sm mb-6 leading-relaxed">
            Game <strong>FAUNARTventure</strong> dirancang untuk dimainkan dalam posisi <strong>16:9 Landscape Fullscreen</strong> agar eksplorasi satwa dan menggambar terasa maksimal!
          </p>
          <button
            onClick={() => setDismissRotatePrompt(true)}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl shadow cursor-pointer font-display"
          >
            Lanjutkan di Mode Ini
          </button>
        </div>
      )}

      {/* 16:9 Landscape Fullscreen Stage Container */}
      <div className="w-full max-w-[177.78vh] min-h-screen flex flex-col bg-amber-50/40 text-slate-800 relative shadow-2xl overflow-y-auto">
        {/* 3-Zone Top Navigation Contract */}
        <Navbar
          currentScreen={currentScreen}
          selectedZoneId={selectedZoneId}
          difficulty={difficulty}
          onNavigateHome={() => setCurrentScreen('WELCOME')}
          onNavigateMap={() => setCurrentScreen('MAP')}
          onOpenGuide={() => setShowGuideModal(true)}
          onOpenGallery={() => setShowGalleryModal(true)}
          onOpenDifficultyModal={() => setShowDifficultyModal(true)}
        />

        {/* Main Screen Router */}
        <main className="flex-1 flex flex-col">
        {currentScreen === 'WELCOME' && (
          <WelcomeScreen
            difficulty={difficulty}
            onSelectDifficulty={handleSelectDifficulty}
            onEnterMap={handleEnterMapFromWelcome}
          />
        )}

        {currentScreen === 'MAP' && (
          <ZooMap
            progress={progress}
            difficulty={difficulty}
            onOpenDifficultyModal={() => setShowDifficultyModal(true)}
            onSelectZone={handleSelectZone}
            onFinishExploration={handleFinishExploration}
            onOpenGallery={() => setShowGalleryModal(true)}
          />
        )}

        {currentScreen === 'HABITAT' && selectedZone && (
          <HabitatView
            zone={selectedZone}
            progress={currentZoneProgress || undefined}
            difficulty={difficulty}
            onStartMissions={handleStartMissions}
            onBackToMap={() => setCurrentScreen('MAP')}
          />
        )}

        {currentScreen === 'MISSIONS' && selectedZone && currentZoneProgress && (
          <div className="w-full flex-1 flex flex-col p-4 md:p-6 relative overflow-hidden bg-slate-900">
            {/* Official Zone Background Image from PDF (Unblurred & Instant Zero-Delay) across all 5 Mission Steps */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0 bg-slate-900">
              <img
                src={selectedZone.backgroundImage}
                alt={`Background Habitat ${selectedZone.habitat}`}
                className="w-full h-full object-cover object-center"
                loading="eager"
                decoding="sync"
              />
              {/* Subtle non-blur ambient tint to maintain comfortable contrast for UI & text */}
              <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
            </div>

            {/* Stepper and interactive missions layered above background */}
            <div className="relative z-10 flex-1 flex flex-col w-full">
              {/* Mission Stage Stepper Breadcrumb */}
              <div className="max-w-4xl mx-auto w-full mb-3 bg-white/95 p-3 rounded-2xl border border-amber-200 shadow-md flex flex-col gap-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      playClickSound();
                      setCurrentScreen('HABITAT');
                    }}
                    className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <span>←</span>
                    <span>Kembali ke Habitat {selectedZone.animal}</span>
                  </button>

                  {/* Steps pills and Difficulty badge */}
                  <div className="flex items-center gap-1 sm:gap-2">
                    {/* Difficulty Switcher inside Mission */}
                    <button
                      onClick={() => {
                        playClickSound();
                        setShowDifficultyModal(true);
                      }}
                      className={`px-2 sm:px-2.5 py-1 rounded-xl text-xs font-black transition-all flex items-center gap-1 cursor-pointer border shadow-xs ${DIFFICULTY_CONFIGS[difficulty].badgeClass}`}
                      title="Klik untuk mengganti tingkat kesulitan"
                    >
                      <span>{DIFFICULTY_CONFIGS[difficulty].icon}</span>
                      <span className="hidden sm:inline">{DIFFICULTY_CONFIGS[difficulty].shortLabel}</span>
                      <span className="text-[10px] opacity-75">▼</span>
                    </button>

                    {[
                      { step: 1, label: 'Rakit', icon: '🧩', isDone: currentZoneProgress.puzzleCompleted },
                      { step: 2, label: 'Bentuk', icon: '🔷', isDone: currentZoneProgress.shapeCompleted },
                      { step: 3, label: 'Proporsi', icon: '📏', isDone: currentZoneProgress.proportionCompleted },
                      { step: 4, label: 'Ciri Khas', icon: '🔎', isDone: currentZoneProgress.featureCompleted },
                      { step: 5, label: 'Gambar', icon: '✏️', isDone: currentZoneProgress.zoneCompleted },
                    ].map((s) => {
                      const isCurrent = currentMissionStep === s.step;
                      const isAccessible = s.isDone || s.step <= currentMissionStep || (s.step === 1) || (s.step === 2 && currentZoneProgress.puzzleCompleted) || (s.step === 3 && currentZoneProgress.shapeCompleted) || (s.step === 4 && currentZoneProgress.proportionCompleted) || (s.step === 5 && currentZoneProgress.featureCompleted);

                      return (
                        <button
                          key={s.step}
                          disabled={!isAccessible || transitionPhase === 'sliding-out'}
                          onClick={() => {
                            transitionToMissionStep(s.step as MissionStep);
                          }}
                          className={`px-2 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                            isCurrent
                              ? 'bg-amber-500 text-white border-amber-600 shadow ring-2 ring-amber-300'
                              : s.isDone
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <span>{s.icon}</span>
                          <span className="hidden sm:inline">{s.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Progress bar across 5 mission steps */}
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${(currentMissionStep / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Mission Title & Dynamic Transition State Label */}
              <div className="max-w-4xl mx-auto w-full flex items-center justify-between text-xs px-3 py-1.5 rounded-xl bg-white/95 border border-amber-200/80 shadow-xs mb-2 font-medium">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200">
                    Langkah {currentMissionStep} dari 5
                  </span>
                  <span className="font-semibold text-slate-800 hidden sm:inline">
                    {currentMissionStep === 1 && 'Misi 1: Rakit Anatomi Puzzle'}
                    {currentMissionStep === 2 && 'Misi 2: Identifikasi Bentuk Geometris'}
                    {currentMissionStep === 3 && 'Misi 3: Ukur Rasio Proporsi Tubuh'}
                    {currentMissionStep === 4 && 'Misi 4: Analisis Ciri Khas Unik Fauna'}
                    {currentMissionStep === 5 && 'Misi 5: Menggambar Sketsa & Detail'}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {transitionPhase !== 'idle' ? (
                    <span className="text-[11px] font-bold text-amber-600 animate-pulse flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <span>{slideDirection === 'forward' ? 'Meluncur ke langkah berikutnya ➔' : '⬅ Meluncur kembali'}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] text-slate-500 font-semibold">
                      Langkah aktif
                    </span>
                  )}
                </div>
              </div>

              {/* Render Current Mission with Dynamic Slide-in / Slide-out Animation */}
              <div className="flex-1 flex flex-col justify-center overflow-hidden relative">
                <div
                  key={`step-${currentMissionStep}`}
                  className={`w-full flex-1 flex flex-col justify-center will-change-transform ${
                    transitionPhase === 'sliding-out'
                      ? slideDirection === 'forward'
                        ? 'animate-slide-out-left'
                        : 'animate-slide-out-right'
                      : transitionPhase === 'sliding-in'
                      ? slideDirection === 'forward'
                        ? 'animate-slide-in-right'
                        : 'animate-slide-in-left'
                      : ''
                  }`}
                >
                  {currentMissionStep === 1 && (
                    <PuzzleMission
                      zone={selectedZone}
                      difficulty={difficulty}
                      onComplete={handleMission1Complete}
                      isAlreadyCompleted={currentZoneProgress.puzzleCompleted}
                    />
                  )}

                  {currentMissionStep === 2 && (
                    <ShapeMission
                      zone={selectedZone}
                      difficulty={difficulty}
                      onComplete={handleMission2Complete}
                      isAlreadyCompleted={currentZoneProgress.shapeCompleted}
                    />
                  )}

                  {currentMissionStep === 3 && (
                    <ProportionMission
                      zone={selectedZone}
                      difficulty={difficulty}
                      onComplete={handleMission3Complete}
                      isAlreadyCompleted={currentZoneProgress.proportionCompleted}
                    />
                  )}

                  {currentMissionStep === 4 && (
                    <FeatureMission
                      zone={selectedZone}
                      difficulty={difficulty}
                      onComplete={handleMission4Complete}
                      isAlreadyCompleted={currentZoneProgress.featureCompleted}
                    />
                  )}

                  {currentMissionStep === 5 && (
                    <DrawingMission
                      zone={selectedZone}
                      difficulty={difficulty}
                      onAwardBadge={handleMission5Complete}
                      isAlreadyCompleted={currentZoneProgress.zoneCompleted}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {currentScreen === 'SUMMARY' && (
          <SummaryScreen
            progress={progress}
            onReplay={handleReplayAll}
            onBackToMap={() => setCurrentScreen('MAP')}
            onOpenGallery={() => setShowGalleryModal(true)}
          />
        )}
      </main>

      {/* Zone Completion Celebration Modal */}
      {showCompletionModal && selectedZone && (
        <ZoneCompleteModal
          zone={selectedZone}
          onBackToMap={handleBackToMap}
          onFinishApp={handleFinishExploration}
          onOpenGallery={() => {
            setShowCompletionModal(false);
            setShowGalleryModal(true);
          }}
        />
      )}

      {/* Pedagogical Art Guide Modal */}
      <GuideModal
        isOpen={showGuideModal}
        onClose={() => setShowGuideModal(false)}
      />

      {/* Fauna Artwork Gallery Modal */}
      <GalleryModal
        isOpen={showGalleryModal}
        onClose={() => setShowGalleryModal(false)}
        progress={progress}
        onGoToZone={handleGoToZoneFromGallery}
      />

      {/* Challenge Difficulty Level Selection Modal */}
      <DifficultyModal
        isOpen={showDifficultyModal}
        onClose={() => setShowDifficultyModal(false)}
        currentDifficulty={difficulty}
        onSelectDifficulty={handleSelectDifficulty}
      />

      {/* Zero-delay persistent DOM image cache for all zone backgrounds & reference images */}
      <div className="hidden pointer-events-none select-none" aria-hidden="true">
        {Object.values(ZONES_CONFIG).map((z) => (
          <React.Fragment key={z.id}>
            <img
              src={z.backgroundImage}
              alt="preloaded background"
              loading="eager"
              decoding="sync"
            />
            <img
              src={z.referenceImage}
              alt="preloaded reference"
              loading="eager"
              decoding="sync"
            />
          </React.Fragment>
        ))}
      </div>
      </div>
    </div>
  );
}
