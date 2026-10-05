import React, { useState, useEffect } from 'react';
import { Screen, ZoneId, AllZonesProgress, MissionStep } from './types/game';
import { ZONES_CONFIG } from './data/zones';
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
import { playClickSound, startZoneAmbienceLoop } from './utils/audio';

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
  const [progress, setProgress] = useState<AllZonesProgress>(INITIAL_PROGRESS);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [showGuideModal, setShowGuideModal] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);

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
    setCurrentScreen('MISSIONS');
  };

  const handleMission1Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], puzzleCompleted: true },
    }));
    setCurrentMissionStep(2);
  };

  const handleMission2Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], shapeCompleted: true },
    }));
    setCurrentMissionStep(3);
  };

  const handleMission3Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], proportionCompleted: true },
    }));
    setCurrentMissionStep(4);
  };

  const handleMission4Complete = () => {
    if (!selectedZoneId) return;
    setProgress((prev) => ({
      ...prev,
      [selectedZoneId]: { ...prev[selectedZoneId], featureCompleted: true },
    }));
    setCurrentMissionStep(5);
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
    <div className="min-h-screen flex flex-col bg-amber-50/40 text-slate-800">
      {/* 3-Zone Top Navigation Contract */}
      <Navbar
        currentScreen={currentScreen}
        selectedZoneId={selectedZoneId}
        onNavigateHome={() => setCurrentScreen('WELCOME')}
        onNavigateMap={() => setCurrentScreen('MAP')}
        onOpenGuide={() => setShowGuideModal(true)}
        onOpenGallery={() => setShowGalleryModal(true)}
      />

      {/* Main Screen Router */}
      <main className="flex-1 flex flex-col">
        {currentScreen === 'WELCOME' && (
          <WelcomeScreen onEnterMap={handleEnterMapFromWelcome} />
        )}

        {currentScreen === 'MAP' && (
          <ZooMap
            progress={progress}
            onSelectZone={handleSelectZone}
            onFinishExploration={handleFinishExploration}
            onOpenGallery={() => setShowGalleryModal(true)}
          />
        )}

        {currentScreen === 'HABITAT' && selectedZone && (
          <HabitatView
            zone={selectedZone}
            onStartMissions={handleStartMissions}
            onBackToMap={() => setCurrentScreen('MAP')}
          />
        )}

        {currentScreen === 'MISSIONS' && selectedZone && currentZoneProgress && (
          <div className="w-full flex-1 flex flex-col p-4 md:p-6 bg-gradient-to-b from-amber-50/60 to-emerald-50/40">
            {/* Mission Stage Stepper Breadcrumb */}
            <div className="max-w-4xl mx-auto w-full mb-4 bg-white/90 backdrop-blur-sm p-3 rounded-2xl border border-amber-200 shadow-sm flex flex-wrap items-center justify-between gap-2">
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

              {/* Steps pills */}
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { step: 1, label: 'Rakit', icon: '🧩', isDone: currentZoneProgress.puzzleCompleted },
                  { step: 2, label: 'Bentuk', icon: '🔷', isDone: currentZoneProgress.shapeCompleted },
                  { step: 3, label: 'Proporsi', icon: '📏', isDone: currentZoneProgress.proportionCompleted },
                  { step: 4, label: 'Ciri Khas', icon: '🔎', isDone: currentZoneProgress.featureCompleted },
                  { step: 5, label: 'Gambar', icon: '✏️', isDone: currentZoneProgress.zoneCompleted },
                ].map((s) => {
                  const isCurrent = currentMissionStep === s.step;
                  return (
                    <button
                      key={s.step}
                      disabled={!s.isDone && s.step > currentMissionStep}
                      onClick={() => {
                        playClickSound();
                        setCurrentMissionStep(s.step as MissionStep);
                      }}
                      className={`px-2 sm:px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer border ${
                        isCurrent
                          ? 'bg-amber-500 text-white border-amber-600 shadow'
                          : s.isDone
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render Current Mission */}
            <div className="flex-1 flex flex-col justify-center">
              {currentMissionStep === 1 && (
                <PuzzleMission
                  zone={selectedZone}
                  onComplete={handleMission1Complete}
                  isAlreadyCompleted={currentZoneProgress.puzzleCompleted}
                />
              )}

              {currentMissionStep === 2 && (
                <ShapeMission
                  zone={selectedZone}
                  onComplete={handleMission2Complete}
                  isAlreadyCompleted={currentZoneProgress.shapeCompleted}
                />
              )}

              {currentMissionStep === 3 && (
                <ProportionMission
                  zone={selectedZone}
                  onComplete={handleMission3Complete}
                  isAlreadyCompleted={currentZoneProgress.proportionCompleted}
                />
              )}

              {currentMissionStep === 4 && (
                <FeatureMission
                  zone={selectedZone}
                  onComplete={handleMission4Complete}
                  isAlreadyCompleted={currentZoneProgress.featureCompleted}
                />
              )}

              {currentMissionStep === 5 && (
                <DrawingMission
                  zone={selectedZone}
                  onAwardBadge={handleMission5Complete}
                  isAlreadyCompleted={currentZoneProgress.zoneCompleted}
                />
              )}
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
    </div>
  );
}
