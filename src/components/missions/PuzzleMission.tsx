import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ZoneConfig } from '../../types/game';
import { JIGSAW_PIECES, PUZZLE_WIDTH, PUZZLE_HEIGHT, JigsawPieceDef } from '../../utils/puzzlePaths';
import { AnimalIllustration } from '../AnimalIllustration';
import { playSnapSound, playSuccessChime, playClickSound } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface PuzzleMissionProps {
  zone: ZoneConfig;
  onComplete: () => void;
  isAlreadyCompleted?: boolean;
}

interface PieceState {
  id: number;
  currentX: number; // in board coordinate space (0..600, 0..400) or tray offset
  currentY: number;
  isSnapped: boolean;
}

// Fisher-Yates shuffle generator for slot distribution
function getShuffledSlotIndices(): number[] {
  const slots = [0, 1, 2, 3, 4, 5];
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [slots[i], slots[j]] = [slots[j], slots[i]];
  }
  // Ensure the pieces are never in sequential [0, 1, 2, 3, 4, 5] order
  if (slots.every((val, idx) => val === idx)) {
    [slots[0], slots[4]] = [slots[4], slots[0]];
    [slots[1], slots[3]] = [slots[3], slots[1]];
  }
  return slots;
}

export const PuzzleMission: React.FC<PuzzleMissionProps> = ({
  zone,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  // Scramble initial piece positions in the tray with authentic randomized slot assignment
  const getInitialPieceStates = (): PieceState[] => {
    const shuffledSlots = getShuffledSlotIndices();

    return JIGSAW_PIECES.map((piece, index) => {
      if (isAlreadyCompleted) {
        return {
          id: piece.id,
          currentX: piece.targetX,
          currentY: piece.targetY,
          isSnapped: true,
        };
      }

      // Assign each piece to a randomized shuffled slot in the lower tray
      const slotIndex = shuffledSlots[index];
      const trayCol = slotIndex % 3;
      const trayRow = Math.floor(slotIndex / 3);

      // Random jitter inside the slot for natural tabletop puzzle feel
      const jitterX = ((index * 47 + slotIndex * 23) % 25) - 12;
      const jitterY = ((index * 31 + slotIndex * 19) % 18) - 9;

      return {
        id: piece.id,
        currentX: trayCol * 195 + 10 + jitterX,
        currentY: 430 + trayRow * 145 + jitterY,
        isSnapped: false,
      };
    });
  };

  const [pieces, setPieces] = useState<PieceState[]>(getInitialPieceStates);
  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [allCompleted, setAllCompleted] = useState<boolean>(isAlreadyCompleted);
  const [showHint, setShowHint] = useState<boolean>(false);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const activeDragIdRef = useRef<number | null>(null);
  const hasMovedRef = useRef<boolean>(false);

  // Check completion
  useEffect(() => {
    const allSnapped = pieces.every((p) => p.isSnapped);
    if (allSnapped && !allCompleted) {
      setAllCompleted(true);
      playSuccessChime();
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [pieces, allCompleted]);

  // Convert client mouse/touch point to SVG coordinate space
  const getSvgCoordinates = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const pt = svgRef.current.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svgRef.current.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const svgPoint = pt.matrixTransform(ctm.inverse());
    return { x: svgPoint.x, y: svgPoint.y };
  }, []);

  // Global window listeners for silky-smooth drag tracking on desktop & mobile touchscreens
  useEffect(() => {
    if (activeDragId === null) return;
    activeDragIdRef.current = activeDragId;

    const onPointerMove = (e: PointerEvent) => {
      if (activeDragIdRef.current === null) return;
      hasMovedRef.current = true;
      e.preventDefault();

      const coords = getSvgCoordinates(e.clientX, e.clientY);
      const newX = coords.x - dragOffsetRef.current.x;
      const newY = coords.y - dragOffsetRef.current.y;

      setPieces((prev) =>
        prev.map((p) =>
          p.id === activeDragIdRef.current ? { ...p, currentX: newX, currentY: newY } : p
        )
      );
    };

    const onPointerUp = (e: PointerEvent) => {
      const currentDragId = activeDragIdRef.current;
      if (currentDragId === null) return;

      const pieceDef = JIGSAW_PIECES.find((p) => p.id === currentDragId);
      const pieceState = pieces.find((p) => p.id === currentDragId);

      if (pieceDef && pieceState) {
        // Generous magnetic snap distance (75 units) for easy touch interaction
        const dist = Math.hypot(
          pieceState.currentX - pieceDef.targetX,
          pieceState.currentY - pieceDef.targetY
        );

        if (dist < 75) {
          // Snap to target!
          setPieces((prev) =>
            prev.map((p) =>
              p.id === currentDragId
                ? { ...p, currentX: pieceDef.targetX, currentY: pieceDef.targetY, isSnapped: true }
                : p
            )
          );
          playSnapSound();
          setSelectedPieceId(null);
        } else if (!hasMovedRef.current) {
          // If the user simply tapped without dragging, select this piece for tap-to-place!
          setSelectedPieceId(currentDragId);
        }
      }

      setActiveDragId(null);
      activeDragIdRef.current = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [activeDragId, getSvgCoordinates, pieces]);

  const handlePiecePointerDown = (id: number, e: React.PointerEvent) => {
    const piece = pieces.find((p) => p.id === id);
    if (!piece || piece.isSnapped) return;

    e.preventDefault();
    e.stopPropagation();

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    dragOffsetRef.current = {
      x: coords.x - piece.currentX,
      y: coords.y - piece.currentY,
    };
    hasMovedRef.current = false;
    setActiveDragId(id);
    setSelectedPieceId(id);
    playClickSound();
  };

  // Tap-to-Place feature: Tap on the board to place the selected piece!
  const handleBoardClick = (e: React.MouseEvent) => {
    if (selectedPieceId === null) return;

    const pieceDef = JIGSAW_PIECES.find((p) => p.id === selectedPieceId);
    const pieceState = pieces.find((p) => p.id === selectedPieceId);
    if (!pieceDef || !pieceState || pieceState.isSnapped) return;

    const coords = getSvgCoordinates(e.clientX, e.clientY);

    // If clicked inside the board area (Y < 420)
    if (coords.y <= 420) {
      // Check if tap was near the target slot or on board
      const dist = Math.hypot(coords.x - (pieceDef.targetX + 100), coords.y - (pieceDef.targetY + 100));

      // If clicked reasonably near the correct sector, or if tapped anywhere on board
      if (dist < 180) {
        setPieces((prev) =>
          prev.map((p) =>
            p.id === selectedPieceId
              ? { ...p, currentX: pieceDef.targetX, currentY: pieceDef.targetY, isSnapped: true }
              : p
          )
        );
        playSnapSound();
        setSelectedPieceId(null);
      } else {
        // Move the piece to where the student clicked
        setPieces((prev) =>
          prev.map((p) =>
            p.id === selectedPieceId
              ? { ...p, currentX: Math.max(0, Math.min(400, coords.x - 100)), currentY: Math.max(0, Math.min(200, coords.y - 100)) }
              : p
          )
        );
        playClickSound();
      }
    }
  };

  const handleShuffleUnsnapped = () => {
    playClickSound();
    const shuffledSlots = getShuffledSlotIndices();
    let slotCounter = 0;

    setPieces((prev) =>
      prev.map((p) => {
        if (p.isSnapped) return p;
        const slot = shuffledSlots[slotCounter % 6];
        slotCounter++;
        const trayCol = slot % 3;
        const trayRow = Math.floor(slot / 3);
        const jitterX = Math.floor(Math.random() * 32) - 16;
        const jitterY = Math.floor(Math.random() * 24) - 12;

        return {
          ...p,
          currentX: trayCol * 195 + 10 + jitterX,
          currentY: 430 + trayRow * 145 + jitterY,
        };
      })
    );
    setSelectedPieceId(null);
  };

  const handleReset = () => {
    playClickSound();
    setPieces(getInitialPieceStates());
    setAllCompleted(false);
    setSelectedPieceId(null);
  };

  const snappedCount = pieces.filter((p) => p.isSnapped).length;

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Mission Header */}
      <div className="w-full text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-1">
          <span>🧩 MISI 1</span>
          <span>·</span>
          <span>RAKIT FAUNA</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
          Rakit 6 Keping Jigsaw {zone.animal}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Sentuh & geser kepingan ke bingkai atas, atau <strong>ketuk kepingan lalu ketuk bingkai</strong> untuk memasang!
        </p>
      </div>

      {/* Main Interactive Jigsaw Board */}
      <div className="relative w-full max-w-[680px] bg-white rounded-3xl p-3 md:p-5 shadow-xl border-4 border-amber-200">
        {/* Challenge Control Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 shadow-xs">
              Keping Terpasang: <strong className="text-emerald-700 font-extrabold">{snappedCount}</strong> / 6
            </span>

            {selectedPieceId !== null && (
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-xl animate-pulse">
                👆 Keping {selectedPieceId + 1} aktif! Ketuk bingkai untuk pasang
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playClickSound();
                setShowHint(!showHint);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer border flex items-center gap-1.5 ${
                showHint
                  ? 'bg-amber-100 text-amber-950 border-amber-400 shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
              title="Tampilkan siluet bayangan fauna sebagai petunjuk bantuan"
            >
              <span>💡</span>
              <span>{showHint ? 'Sembunyikan Bantuan' : 'Bantuan Bayangan'}</span>
            </button>

            {!allCompleted && (
              <button
                onClick={handleShuffleUnsnapped}
                className="px-3.5 py-1 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer font-display"
                title="Acak ulang posisi kepingan di baki bawah"
              >
                <span>🔀</span>
                <span>Acak Kepingan</span>
              </button>
            )}
          </div>
        </div>

        <svg
          ref={svgRef}
          viewBox="0 0 600 730"
          className="w-full h-auto select-none overflow-visible touch-none"
          style={{ touchAction: 'none' }}
          onClick={handleBoardClick}
        >
          <defs>
            {/* Filter for puzzle piece 3D bevel & drop shadow */}
            <filter id="piece-shadow" x="-15%" y="-15%" width="130%" height="130%">
              <feDropShadow dx="3" dy="4" stdDeviation="4" floodOpacity="0.45" />
            </filter>

            {/* ClipPath for each of the 6 interlocking pieces */}
            {JIGSAW_PIECES.map((pieceDef) => (
              <clipPath id={`puzzle-clip-${zone.id}-${pieceDef.id}`} key={pieceDef.id}>
                <path d={pieceDef.pathD} />
              </clipPath>
            ))}
          </defs>

          {/* 1. Target Puzzle Frame (0,0 to 600,400) */}
          <g id="puzzle-board" className="cursor-pointer">
            {/* Background canvas of the puzzle board */}
            <rect
              x="0"
              y="0"
              width={PUZZLE_WIDTH}
              height={PUZZLE_HEIGHT}
              rx="12"
              fill="#F8FAFC"
              stroke="#CBD5E1"
              strokeWidth="3"
            />

            {/* Optional Hint Watermark Illustration */}
            {showHint && (
              <g opacity="0.22" className="transition-opacity duration-300">
                <AnimalIllustration zoneId={zone.id} width={PUZZLE_WIDTH} height={PUZZLE_HEIGHT} />
              </g>
            )}

            {/* Interlocking Puzzle Cut Outlines on board */}
            {JIGSAW_PIECES.map((pieceDef) => (
              <path
                key={`outline-${pieceDef.id}`}
                d={pieceDef.pathD}
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            ))}
          </g>

          {/* Divider between Board and Tray */}
          <g transform="translate(0, 408)">
            <rect x="0" y="0" width={PUZZLE_WIDTH} height="3" fill="#E2E8F0" rx="1.5" />
            <text x="300" y="-3" fill="#94A3B8" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="'Fredoka', sans-serif">
              ▼ AREA KEPINGAN PUZZLE (SENTUH / GESER KE ATAS) ▼
            </text>
          </g>

          {/* Tray background */}
          <rect
            x="0"
            y="415"
            width={PUZZLE_WIDTH}
            height="310"
            rx="12"
            fill="#F1F5F9"
            stroke="#E2E8F0"
            strokeWidth="2"
          />

          {/* 2. Render Snapped Pieces First (Lower Layer) */}
          {pieces
            .filter((p) => p.isSnapped)
            .map((p) => {
              const def = JIGSAW_PIECES.find((item) => item.id === p.id)!;
              return (
                <g key={`snapped-${p.id}`} id={`piece-${p.id}`}>
                  {/* Base invisible path to prevent transparency click-through */}
                  <path d={def.pathD} fill="#FFFFFF" opacity="0.001" />

                  {/* Clipped Animal Illustration */}
                  <g clipPath={`url(#puzzle-clip-${zone.id}-${def.id})`}>
                    <AnimalIllustration zoneId={zone.id} width={PUZZLE_WIDTH} height={PUZZLE_HEIGHT} />
                  </g>
                  {/* Outer Interlocking Border */}
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke="#334155"
                    strokeWidth="1"
                    opacity="0.35"
                  />
                </g>
              );
            })}

          {/* 3. Render Unsnapped Pieces (Interactive Drag & Touch Layer) */}
          {pieces
            .filter((p) => !p.isSnapped)
            .sort((a, b) => (a.id === activeDragId ? 1 : b.id === activeDragId ? -1 : 0))
            .map((p) => {
              const def = JIGSAW_PIECES.find((item) => item.id === p.id)!;
              const isDragging = p.id === activeDragId;
              const isSelected = p.id === selectedPieceId;

              // Calculate translation delta from origin targetX/targetY
              const dx = p.currentX - def.targetX;
              const dy = p.currentY - def.targetY;

              return (
                <g
                  key={`unsnapped-${p.id}`}
                  transform={`translate(${dx}, ${dy})`}
                  onPointerDown={(e) => handlePiecePointerDown(p.id, e)}
                  filter={isDragging ? 'url(#piece-shadow)' : undefined}
                  className="cursor-pointer"
                  style={{ touchAction: 'none' }}
                  opacity={isDragging ? 0.96 : 1}
                >
                  {/* CRITICAL: 100% Solid Hit-Area Path covering entire puzzle piece tab boundaries */}
                  <path
                    d={def.pathD}
                    fill="#FFFFFF"
                    opacity="0.001"
                    style={{ pointerEvents: 'all' }}
                  />

                  {/* Clipped Fauna Visual */}
                  <g clipPath={`url(#puzzle-clip-${zone.id}-${def.id})`}>
                    <AnimalIllustration zoneId={zone.id} width={PUZZLE_WIDTH} height={PUZZLE_HEIGHT} />
                  </g>

                  {/* Interlocking Edge Stroke and Bevel Highlight */}
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke={isSelected || isDragging ? '#F59E0B' : '#0284C7'}
                    strokeWidth={isSelected || isDragging ? '4' : '2.5'}
                  />
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    opacity="0.75"
                  />
                </g>
              );
            })}
        </svg>

        {/* Completion Announcement Banner */}
        {allCompleted ? (
          <div className="mt-4 p-4 bg-emerald-50 border-2 border-emerald-400 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 animate-fade-in">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🎉</span>
              <div>
                <h4 className="font-extrabold text-emerald-900 font-display text-base md:text-lg">
                  {zone.animal} berhasil dirakit!
                </h4>
                <p className="text-xs md:text-sm text-emerald-700">
                  Kamu telah menyatukan keenam keping menjadi bentuk fauna yang utuh.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                playClickSound();
                onComplete();
              }}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-sm md:text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer font-display whitespace-nowrap"
            >
              <span>LANJUTKAN</span>
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span>
              💡 Amati pola warna dan sambungan kepingan puzzle untuk menemukan posisi yang pas.
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffleUnsnapped}
                className="px-2.5 py-1 text-amber-700 hover:text-amber-900 font-bold underline cursor-pointer"
              >
                🔀 Acak Ulang Keping
              </button>
              <span>·</span>
              <button
                onClick={handleReset}
                className="px-2.5 py-1 text-slate-500 hover:text-slate-800 underline cursor-pointer"
              >
                Reset dari Awal
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
