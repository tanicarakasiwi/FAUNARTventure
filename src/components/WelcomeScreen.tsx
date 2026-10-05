import React, { useState } from 'react';
import { StudentAvatar } from './StudentAvatar';
import { playClickSound, playSuccessChime } from '../utils/audio';

interface WelcomeScreenProps {
  onEnterMap: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnterMap }) => {
  const [gateState, setGateState] = useState<'closed' | 'opening' | 'opened'>('closed');
  const [showNarration, setShowNarration] = useState(false);

  const handleEnterZoo = () => {
    playClickSound();
    setGateState('opening');

    // Gate opens, student walks in
    setTimeout(() => {
      setGateState('opened');
      setShowNarration(true);
      playSuccessChime();
    }, 1200);
  };

  const handleOpenMap = () => {
    playClickSound();
    onEnterMap();
  };

  return (
    <div className="relative w-full min-h-[92vh] flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-sky-400 via-sky-200 to-amber-100 px-4 py-6">
      {/* Background clouds & mountains */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 600">
          <path d="M 0 450 Q 200 250 450 420 Q 750 200 1000 450 Q 1150 320 1200 430 L 1200 600 L 0 600 Z" fill="#86EFAC" />
          <path d="M 0 500 Q 300 360 600 490 Q 900 380 1200 510 L 1200 600 L 0 600 Z" fill="#4ADE80" />
        </svg>
      </div>

      {/* Sun and Floating Birds */}
      <div className="absolute top-8 right-12 w-24 h-24 rounded-full bg-amber-300 blur-sm animate-pulse opacity-80 pointer-events-none" />

      {/* Header Banner */}
      <div className="relative z-20 text-center max-w-3xl pt-2">
        <div className="inline-block bg-amber-100/90 border border-amber-300 shadow-sm rounded-full px-4 py-1 mb-2">
          <span className="text-amber-800 font-semibold text-xs md:text-sm tracking-wide">
            Seni Rupa SMP Kelas VII · Eksplorasi Terbuka
          </span>
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold text-amber-950 tracking-tight drop-shadow-sm font-display mb-2">
          FAUNART<span className="text-emerald-600">venture</span>
        </h1>
        <p className="text-base md:text-xl font-medium text-slate-700 max-w-xl mx-auto drop-shadow-sm">
          “Jelajah Fauna, Temukan Bentuk, Ciptakan Karyamu!”
        </p>
      </div>

      {/* Grand Zoo Gate Illustration & Scene */}
      <div className="relative z-10 w-full max-w-4xl h-[460px] md:h-[500px] flex items-end justify-center my-2">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMax meet">
          <defs>
            <linearGradient id="gate-wood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#A16207" />
              <stop offset="50%" stopColor="#854D0E" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>
            <linearGradient id="gate-stone" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94A3B8" />
              <stop offset="50%" stopColor="#64748B" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>

          {/* Cobblestone path into zoo */}
          <path d="M 280 500 L 350 310 L 450 310 L 520 500 Z" fill="#D6D3D1" />
          <path d="M 330 330 Q 400 325 470 330" stroke="#A8A29E" strokeWidth="3" strokeDasharray="8 8" fill="none" />
          <path d="M 305 420 Q 400 415 495 420" stroke="#A8A29E" strokeWidth="4" strokeDasharray="10 10" fill="none" />

          {/* Tropical Plants at sides */}
          <g fill="#15803D" opacity="0.9">
            <ellipse cx="120" cy="460" rx="60" ry="80" transform="rotate(-15 120 460)" />
            <ellipse cx="160" cy="470" rx="50" ry="70" transform="rotate(20 160 470)" />
            <ellipse cx="680" cy="460" rx="60" ry="80" transform="rotate(15 680 460)" />
            <ellipse cx="640" cy="470" rx="50" ry="70" transform="rotate(-20 640 470)" />
          </g>

          {/* Left Stone Pillar */}
          <rect x="220" y="160" width="60" height="340" rx="6" fill="url(#gate-stone)" stroke="#334155" strokeWidth="3" />
          <rect x="210" y="140" width="80" height="26" rx="4" fill="#334155" />
          <circle cx="250" cy="120" r="16" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <text x="250" y="125" fontSize="16" textAnchor="middle" fill="#FFFFFF">🌿</text>

          {/* Right Stone Pillar */}
          <rect x="520" y="160" width="60" height="340" rx="6" fill="url(#gate-stone)" stroke="#334155" strokeWidth="3" />
          <rect x="510" y="140" width="80" height="26" rx="4" fill="#334155" />
          <circle cx="550" cy="120" r="16" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
          <text x="550" y="125" fontSize="16" textAnchor="middle" fill="#FFFFFF">🎨</text>

          {/* Left Wooden Gate Door */}
          <g
            className="transition-transform duration-1000 ease-in-out"
            style={{
              transformOrigin: '280px 300px',
              transform: gateState !== 'closed' ? 'scaleX(0.12)' : 'scaleX(1)',
            }}
          >
            <rect x="280" y="210" width="118" height="270" rx="4" fill="url(#gate-wood)" stroke="#451A03" strokeWidth="3" />
            <line x1="280" y1="270" x2="398" y2="270" stroke="#713F12" strokeWidth="3" />
            <line x1="280" y1="380" x2="398" y2="380" stroke="#713F12" strokeWidth="3" />
            <line x1="280" y1="210" x2="398" y2="480" stroke="#451A03" strokeWidth="3" />
            <circle cx="380" cy="340" r="6" fill="#FDE047" stroke="#78350F" strokeWidth="2" />
          </g>

          {/* Right Wooden Gate Door */}
          <g
            className="transition-transform duration-1000 ease-in-out"
            style={{
              transformOrigin: '520px 300px',
              transform: gateState !== 'closed' ? 'scaleX(0.12)' : 'scaleX(1)',
            }}
          >
            <rect x="402" y="210" width="118" height="270" rx="4" fill="url(#gate-wood)" stroke="#451A03" strokeWidth="3" />
            <line x1="402" y1="270" x2="520" y2="270" stroke="#713F12" strokeWidth="3" />
            <line x1="402" y1="380" x2="520" y2="380" stroke="#713F12" strokeWidth="3" />
            <line x1="520" y1="210" x2="402" y2="480" stroke="#451A03" strokeWidth="3" />
            <circle cx="420" cy="340" r="6" fill="#FDE047" stroke="#78350F" strokeWidth="2" />
          </g>

          {/* Top Arch Canopy Signboard */}
          <path d="M 200 160 Q 400 90 600 160 L 590 195 Q 400 135 210 195 Z" fill="#92400E" stroke="#451A03" strokeWidth="3" />
          <path d="M 230 165 Q 400 110 570 165" stroke="#FDE68A" strokeWidth="3" fill="none" />
          <text x="400" y="152" fill="#FEF08A" fontSize="24" fontWeight="800" textAnchor="middle" letterSpacing="3" fontFamily="'Fredoka', sans-serif">
            TAMAN SATWA SENI RUPA
          </text>

          {/* Decorative Hanging Animal Signs */}
          <g transform="translate(305, 175)">
            <rect x="0" y="0" width="34" height="26" rx="4" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
            <text x="17" y="18" fontSize="14" textAnchor="middle">🐟</text>
          </g>
          <g transform="translate(355, 168)">
            <rect x="0" y="0" width="34" height="26" rx="4" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
            <text x="17" y="18" fontSize="14" textAnchor="middle">🐱</text>
          </g>
          <g transform="translate(410, 168)">
            <rect x="0" y="0" width="34" height="26" rx="4" fill="#34D399" stroke="#065F46" strokeWidth="1.5" />
            <text x="17" y="18" fontSize="14" textAnchor="middle">🐦</text>
          </g>
          <g transform="translate(460, 175)">
            <rect x="0" y="0" width="34" height="26" rx="4" fill="#A78BFA" stroke="#6D28D9" strokeWidth="1.5" />
            <text x="17" y="18" fontSize="14" textAnchor="middle">🐌</text>
          </g>
        </svg>

        {/* Student Character in front of gate */}
        <div
          className="absolute z-20 transition-all duration-1000 ease-in-out"
          style={{
            bottom: '20px',
            transform:
              gateState === 'closed'
                ? 'scale(1) translateY(0)'
                : gateState === 'opening'
                ? 'scale(0.8) translateY(-70px)'
                : 'scale(0.65) translateY(-110px)',
            opacity: gateState === 'opened' ? 0.3 : 1,
          }}
        >
          <StudentAvatar size={150} walking={gateState === 'opening'} />
        </div>
      </div>

      {/* Action / Trigger Button */}
      <div className="relative z-30 pb-6">
        {gateState === 'closed' && (
          <button
            onClick={handleEnterZoo}
            className="group relative px-8 py-4 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-extrabold text-lg md:text-xl rounded-2xl shadow-xl hover:shadow-emerald-500/30 transition-all flex items-center gap-3 cursor-pointer border-2 border-emerald-400 font-display"
          >
            <span className="text-2xl transition-transform group-hover:translate-x-1">▶</span>
            <span>MASUK KEBUN BINATANG</span>
          </button>
        )}
      </div>

      {/* Narration Dialog Modal when student enters */}
      {showNarration && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl border-4 border-amber-300 relative text-left">
            <div className="flex items-start gap-4 mb-4">
              <div className="shrink-0 bg-amber-100 p-2 rounded-2xl border border-amber-200">
                <StudentAvatar size={64} />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Pemandu Artventure
                </span>
                <h3 className="text-2xl font-bold text-slate-900 font-display mt-1">
                  Selamat Datang, Artventurer!
                </h3>
              </div>
            </div>

            <div className="space-y-3 text-slate-700 text-sm md:text-base leading-relaxed bg-amber-50/70 p-4 rounded-2xl border border-amber-200/60 font-sans">
              <p className="font-semibold text-amber-900">
                Hari ini kamu bebas memilih tempat yang ingin kamu jelajahi!
              </p>
              <ul className="space-y-1.5 list-disc list-inside text-slate-700">
                <li><span className="font-medium text-slate-900">Amati fauna</span> yang kamu pilih di habitatnya</li>
                <li><span className="font-medium text-slate-900">Temukan bentuk dasarnya</span> (lingkaran, oval, segitiga, kotak)</li>
                <li><span className="font-medium text-slate-900">Perhatikan proporsinya</span> secara cermat</li>
                <li><span className="font-medium text-slate-900">Gunakan hasil pengamatanmu</span> untuk menggambar di buku gambarmu</li>
              </ul>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleOpenMap}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-xl shadow-lg hover:shadow-amber-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer font-display text-base"
              >
                <span>🗺️</span>
                <span>LIHAT PETA KEBUN BINATANG</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
