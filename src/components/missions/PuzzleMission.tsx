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

export const PuzzleMission: React.FC<PuzzleMissionProps> = ({
  zone,
  onComplete,
  isAlreadyCompleted = false,
}) => {
  // Scramble initial piece positions in the tray (tray is located underneath or around the board)
  const getInitialPieceStates = (): PieceState[] => {
    return JIGSAW_PIECES.map((piece, index) => {
      if (isAlreadyCompleted) {
        return {
          id: piece.id,
          currentX: piece.targetX,
          currentY: piece.targetY,
          isSnapped: true,
        };
      }

      // Initial scrambled tray coordinates
      // Place into 2 rows of 3 columns in the lower tray
      const trayCol = index % 3;
      const trayRow = Math.floor(index / 3);
      // Place with slight jitter
      const jitterX = ((index * 37) % 25) - 12;
      const jitterY = ((index * 43) % 20) - 10;

      return {
        id: piece.id,
        currentX: trayCol * 200 + jitterX,
        currentY: 420 + trayRow * 150 + jitterY,
        isSnapped: false,
      };
    });
  };

  const [pieces, setPieces] = useState<PieceState[]>(getInitialPieceStates);
  const [activeDragId, setActiveDragId] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [allCompleted, setAllCompleted] = useState<boolean>(isAlreadyCompleted);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);

  const svgRef = useRef<SVGSVGElement | null>(null);

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

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    const piece = pieces.find((p) => p.id === id);
    if (!piece || piece.isSnapped) return;

    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const coords = getSvgCoordinates(e.clientX, e.clientY);
    setActiveDragId(id);
    setSelectedPieceId(id);
    setDragOffset({
      x: coords.x - piece.currentX,
      y: coords.y - piece.currentY,
    });
    playClickSound();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (activeDragId === null) return;
    const coords = getSvgCoordinates(e.clientX, e.clientY);

    const newX = coords.x - dragOffset.x;
    const newY = coords.y - dragOffset.y;

    setPieces((prev) =>
      prev.map((p) => (p.id === activeDragId ? { ...p, currentX: newX, currentY: newY } : p))
    );
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (activeDragId === null) return;

    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }

    const pieceDef = JIGSAW_PIECES.find((p) => p.id === activeDragId);
    const pieceState = pieces.find((p) => p.id === activeDragId);

    if (pieceDef && pieceState) {
      // Check distance to target snap position (threshold 50 units)
      const dist = Math.hypot(
        pieceState.currentX - pieceDef.targetX,
        pieceState.currentY - pieceDef.targetY
      );

      if (dist < 55) {
        // SNAP SUCCESS!
        setPieces((prev) =>
          prev.map((p) =>
            p.id === activeDragId
              ? { ...p, currentX: pieceDef.targetX, currentY: pieceDef.targetY, isSnapped: true }
              : p
          )
        );
        playSnapSound();
      }
    }

    setActiveDragId(null);
  };

  // Click on board to snap selected piece if reasonably close
  const handleBoardClick = () => {
    if (selectedPieceId !== null) {
      const pieceDef = JIGSAW_PIECES.find((p) => p.id === selectedPieceId);
      if (pieceDef) {
        setPieces((prev) =>
          prev.map((p) =>
            p.id === selectedPieceId
              ? { ...p, currentX: pieceDef.targetX, currentY: pieceDef.targetY, isSnapped: true }
              : p
          )
        );
        playSnapSound();
        setSelectedPieceId(null);
      }
    }
  };

  const handleReset = () => {
    playClickSound();
    setPieces(getInitialPieceStates());
    setAllCompleted(false);
  };

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
          Tarik kepingan jigsaw ke area bingkai yang sesuai. Saat posisinya sudah tepat, kepingan akan otomatis saling mengunci!
        </p>
      </div>

      {/* Main Interactive Jigsaw Board */}
      <div className="relative w-full max-w-[680px] bg-white rounded-3xl p-3 md:p-5 shadow-xl border-4 border-amber-200">
        <svg
          ref={svgRef}
          viewBox="0 0 600 730"
          className="w-full h-auto select-none touch-none overflow-visible cursor-grab active:cursor-grabbing"
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onClick={handleBoardClick}
        >
          <defs>
            {/* Filter for puzzle piece 3D bevel & drop shadow */}
            <filter id="piece-shadow" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="2" dy="3" stdDeviation="3" floodOpacity="0.35" />
            </filter>

            {/* ClipPath for each of the 6 interlocking pieces */}
            {JIGSAW_PIECES.map((pieceDef) => (
              <clipPath id={`puzzle-clip-${zone.id}-${pieceDef.id}`} key={pieceDef.id}>
                <path d={pieceDef.pathD} />
              </clipPath>
            ))}
          </defs>

          {/* 1. Target Puzzle Frame (0,0 to 600,400) */}
          <g id="puzzle-board">
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

            {/* Faint watermark illustration so students can guide observation */}
            <g opacity="0.18">
              <AnimalIllustration zoneId={zone.id} width={PUZZLE_WIDTH} height={PUZZLE_HEIGHT} />
            </g>

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
              ▼ AREA KEPINGAN PUZZLE (SERET KE BINGKAI DI ATAS) ▼
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

          {/* 3. Render Unsnapped Pieces (Interactive Drag Layer) */}
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
                  onPointerDown={(e) => handlePointerDown(p.id, e)}
                  filter={isDragging ? 'url(#piece-shadow)' : undefined}
                  className="cursor-grab active:cursor-grabbing transition-opacity"
                  opacity={isDragging ? 0.95 : 1}
                >
                  {/* Clipped Fauna Visual */}
                  <g clipPath={`url(#puzzle-clip-${zone.id}-${def.id})`}>
                    <AnimalIllustration zoneId={zone.id} width={PUZZLE_WIDTH} height={PUZZLE_HEIGHT} />
                  </g>

                  {/* Interlocking Edge Stroke and Bevel Highlight */}
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke={isSelected || isDragging ? '#F59E0B' : '#0284C7'}
                    strokeWidth={isDragging ? '3.5' : '2'}
                  />
                  <path
                    d={def.pathD}
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                    opacity="0.6"
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
              💡 Masih ada keping yang belum tepat. Coba amati kembali bentuk gambarnya.
            </span>
            <button
              onClick={handleReset}
              className="px-2.5 py-1 text-slate-500 hover:text-slate-800 underline cursor-pointer"
            >
              Acak Ulang Posisi
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
