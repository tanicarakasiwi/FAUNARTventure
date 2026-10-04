import React, { useRef, useState, useEffect } from 'react';
import { ZoneConfig } from '../../types/game';
import { AnimalIllustration } from '../AnimalIllustration';
import { playClickSound, playFanfare } from '../../utils/audio';
import confetti from 'canvas-confetti';

interface DrawingMissionProps {
  zone: ZoneConfig;
  onAwardBadge: () => void;
  isAlreadyCompleted?: boolean;
}

export const DrawingMission: React.FC<DrawingMissionProps> = ({
  zone,
  onAwardBadge,
  isAlreadyCompleted = false,
}) => {
  const [activeStepTab, setActiveStepTab] = useState<number>(0);
  const [brushColor, setBrushColor] = useState<string>('#1E293B');
  const [brushSize, setBrushSize] = useState<number>(3);
  const [isEraser, setIsEraser] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white sketchbook background with subtle grid or paper texture
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  // Canvas drawing handlers (mouse & touch)
  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    lastPosRef.current = getCoordinates(e);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current || !lastPosRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getCoordinates(e);

    ctx.beginPath();
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (isEraser) {
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.lineWidth = brushSize;
    }

    ctx.stroke();
    lastPosRef.current = currentPos;
    setHasDrawn(true);
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleClearCanvas = () => {
    playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleDownload = () => {
    playClickSound();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `karya_sketsa_${zone.animal.toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleClaimBadge = () => {
    playFanfare();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
    });
    onAwardBadge();
  };

  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {/* Mission Header */}
      <div className="w-full text-center mb-3">
        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-4 py-1 rounded-full text-xs md:text-sm font-bold mb-1">
          <span>✏️ MISI 5</span>
          <span>·</span>
          <span>SIAP MENGGAMBAR</span>
        </div>
        <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 font-display">
          Sintesis Karya: Menggambar {zone.animal}
        </h3>
        <p className="text-xs md:text-sm text-slate-600 max-w-xl mx-auto">
          Kamu telah menyelesaikan seluruh tahapan observasi! Sekarang buktikan kemampuan senimu.
        </p>
      </div>

      {/* Observation Summary Checklist (Requirement) */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 mb-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center sm:text-left">
          Ringkasan Hasil Observasi Seni Rupa
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              ✓
            </div>
            <div>
              <p className="font-extrabold text-xs text-emerald-950 uppercase tracking-wide">
                BENTUK DASAR
              </p>
              <p className="text-[11px] text-emerald-800">
                Penyederhanaan geometri tervalidasi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              ✓
            </div>
            <div>
              <p className="font-extrabold text-xs text-emerald-950 uppercase tracking-wide">
                PROPORSI
              </p>
              <p className="text-[11px] text-emerald-800">
                Skala anatomi & letak seimbang
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-300 rounded-2xl">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow">
              ✓
            </div>
            <div>
              <p className="font-extrabold text-xs text-emerald-950 uppercase tracking-wide">
                CIRI KHAS
              </p>
              <p className="text-[11px] text-emerald-800">
                Karakteristik unik teridentifikasi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4-Step Drawing Guide Tabs */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 mb-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 flex-wrap gap-2">
          <h4 className="font-extrabold text-slate-800 text-sm md:text-base font-display flex items-center gap-2">
            <span>📖</span>
            <span>Panduan Langkah Menggambar {zone.animal}</span>
          </h4>
          <span className="text-xs text-slate-500 font-medium">Langkah {activeStepTab + 1} dari 4</span>
        </div>

        {/* Step Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
          {zone.drawingSteps.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                playClickSound();
                setActiveStepTab(idx);
              }}
              className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                activeStepTab === idx
                  ? 'bg-amber-500 text-white border-amber-600 shadow'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
              }`}
            >
              <span className="block text-[10px] opacity-80 uppercase tracking-wider">
                Langkah {s.step}
              </span>
              <span className="truncate block font-display">{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="mt-4 p-4 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs md:text-sm text-slate-800">
          <div className="font-bold text-amber-950 text-sm md:text-base font-display">
            {zone.drawingSteps[activeStepTab].title}
          </div>
          <p className="mt-1 text-slate-700 leading-relaxed">
            {zone.drawingSteps[activeStepTab].instruction}
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-xs text-amber-900 bg-amber-100/80 px-3 py-1.5 rounded-xl font-medium">
            <span>💡 <strong>Tips Guru:</strong></span>
            <span>{zone.drawingSteps[activeStepTab].tip}</span>
          </div>
        </div>
      </div>

      {/* Interactive Sketchbook & Digital Canvas Sandbox */}
      <div className="w-full bg-white rounded-3xl p-5 shadow-xl border-4 border-amber-200 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-2xl">📝</span>
            <div>
              <h4 className="font-extrabold text-slate-800 text-sm md:text-base font-display">
                Kanvas Sketsa Interaktif / Buku Gambar
              </h4>
              <p className="text-[11px] text-slate-500">
                Kamu dapat mencoret sketsa langsung di sini atau menggambar di buku gambarmu sendiri.
              </p>
            </div>
          </div>

          {/* Tools Palette */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Color palette */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {['#1E293B', '#DC2626', '#2563EB', '#D97706', '#059669'].map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    playClickSound();
                    setBrushColor(c);
                    setIsEraser(false);
                  }}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-lg transition-transform cursor-pointer ${
                    brushColor === c && !isEraser ? 'scale-125 ring-2 ring-amber-400' : ''
                  }`}
                  aria-label={`Warna ${c}`}
                />
              ))}
            </div>

            {/* Eraser Button */}
            <button
              onClick={() => {
                playClickSound();
                setIsEraser(!isEraser);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                isEraser
                  ? 'bg-amber-500 text-white border-amber-600 shadow'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
              }`}
            >
              🧹 Penghapus
            </button>

            {/* Clear Button */}
            <button
              onClick={handleClearCanvas}
              className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold cursor-pointer"
            >
              Bersihkan
            </button>

            {/* Download Button */}
            {hasDrawn && (
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow cursor-pointer font-display"
              >
                💾 Unduh Sketsa
              </button>
            )}
          </div>
        </div>

        {/* Canvas Element */}
        <div className="mt-3 relative w-full aspect-[16/9] max-h-[360px] bg-slate-50 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={800}
            height={450}
            className="w-full h-full cursor-crosshair touch-none"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />

          {!hasDrawn && (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-slate-400 p-4 text-center">
              <span className="text-3xl mb-1">✏️</span>
              <p className="text-xs md:text-sm font-semibold">
                Goreskan pensil di sini untuk melatih bentuk dasar {zone.animal.toLowerCase()}!
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                (Atau buka buku gambar fisikmu dan mulai menggambar dengan pensil 2B)
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Main Ready Action & Badge Award Prompt (Requirement) */}
      <div className="w-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-6 shadow-2xl text-white text-center flex flex-col items-center justify-center">
        <div className="flex items-center gap-3 text-4xl mb-2">
          <span>✏️</span>
          <span>📓</span>
        </div>

        <h4 className="text-xl md:text-2xl font-extrabold font-display">
          Instruksi Menggambar di Buku Gambar
        </h4>
        <p className="text-xs md:text-sm text-amber-100 max-w-lg mt-1 leading-relaxed">
          “Sekarang gunakan hasil pengamatanmu untuk menggambar {zone.animal.toLowerCase()} di buku gambarmu. Mulailah dari bentuk dasar, perhatikan proporsinya, dan berikan ciri khasnya!”
        </p>

        <button
          onClick={handleClaimBadge}
          className="mt-5 px-8 py-4 bg-white text-amber-900 hover:bg-amber-50 active:scale-95 font-extrabold text-base md:text-lg rounded-2xl shadow-2xl hover:shadow-white/30 transition-all flex items-center gap-2 cursor-pointer font-display border-2 border-amber-300"
        >
          <span>✏️</span>
          <span>SAYA SIAP MENGGAMBAR</span>
        </button>
      </div>
    </div>
  );
};
