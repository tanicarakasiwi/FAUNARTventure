import React from 'react';
import { ZoneId } from '../types/game';

interface AnimalIllustrationProps {
  zoneId: ZoneId;
  highlightPart?: string | null;
  showShapeOverlay?: boolean;
  className?: string;
  width?: number | string;
  height?: number | string;
}

export const AnimalIllustration: React.FC<AnimalIllustrationProps> = ({
  zoneId,
  highlightPart,
  showShapeOverlay = false,
  className = '',
  width = 600,
  height = 400,
}) => {
  return (
    <svg
      viewBox="0 0 600 400"
      width={width}
      height={height}
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="fish-body" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="fish-fin" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </linearGradient>
        <linearGradient id="dolphin-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="cat-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="bird-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0E7490" />
        </linearGradient>
        <linearGradient id="duck-body" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
        <linearGradient id="snail-shell" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
        <linearGradient id="snail-body" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#4ADE80" />
        </linearGradient>
      </defs>

      {/* Render selected animal */}
      {zoneId === 'ikan' && (
        <g id="animal-ikan">
          {/* Ekor (Tail) - Segitiga / Kipas */}
          <g className={`transition-all duration-300 ${highlightPart === 'Ekor' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 180 200 L 70 120 C 100 190 100 210 70 280 Z"
              fill="url(#fish-fin)"
              stroke="#C2410C"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Fin rays */}
            <path d="M 170 195 Q 120 160 85 140" stroke="#FFF7ED" strokeWidth="2.5" fill="none" opacity="0.8" />
            <path d="M 170 200 L 95 200" stroke="#FFF7ED" strokeWidth="2.5" fill="none" opacity="0.8" />
            <path d="M 170 205 Q 120 240 85 260" stroke="#FFF7ED" strokeWidth="2.5" fill="none" opacity="0.8" />
          </g>

          {/* Sirip Punggung (Dorsal Fin) - Segitiga */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sirip' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 270 120 Q 320 60 380 90 Q 340 120 330 125 Z"
              fill="url(#fish-fin)"
              stroke="#C2410C"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Sirip Bawah */}
            <path
              d="M 280 270 Q 310 325 350 300 Q 325 275 320 268 Z"
              fill="url(#fish-fin)"
              stroke="#C2410C"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Badan Utama (Body) - Oval */}
          <g className={`transition-all duration-300 ${highlightPart === 'Badan' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <ellipse
              cx="330"
              cy="200"
              rx="160"
              ry="95"
              fill="url(#fish-body)"
              stroke="#C2410C"
              strokeWidth="4"
            />
            {/* White stripes with dark borders (Clownfish style) */}
            <path
              d="M 390 110 C 370 150 370 250 390 290 C 370 285 355 240 365 200 C 355 160 370 115 390 110 Z"
              fill="#FFFFFF"
              stroke="#9A3412"
              strokeWidth="3"
            />
            <path
              d="M 280 125 C 265 160 265 240 280 275 C 265 270 255 235 260 200 C 255 165 265 130 280 125 Z"
              fill="#FFFFFF"
              stroke="#9A3412"
              strokeWidth="3"
            />
            {/* Belly highlight */}
            <path
              d="M 230 240 Q 330 290 430 240"
              stroke="#FED7AA"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Sirip Dada (Pectoral Fin) - Segitiga melengkung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sirip' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 370 205 Q 330 245 365 260 Q 395 245 395 210 Z"
              fill="#FDBA74"
              stroke="#C2410C"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </g>

          {/* Mulut (Mouth) - Segitiga / bibir */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mulut' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 490 200 Q 470 208 480 216"
              fill="none"
              stroke="#7C2D12"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <circle cx="488" cy="202" r="4" fill="#EA580C" />
          </g>

          {/* Mata (Eye) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mata' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <circle cx="440" cy="170" r="18" fill="#FFFFFF" stroke="#9A3412" strokeWidth="3.5" />
            <circle cx="445" cy="170" r="10" fill="#1E293B" />
            <circle cx="442" cy="166" r="3.5" fill="#FFFFFF" />
          </g>

          {/* Geometric Overlays for Mission 2 & 3 */}
          {showShapeOverlay && (
            <g opacity="0.85">
              {/* Badan: Oval */}
              <ellipse cx="330" cy="200" rx="160" ry="95" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" />
              <text x="330" y="165" fill="#1D4ED8" fontSize="14" fontWeight="bold" textAnchor="middle">BENTUK: OVAL</text>

              {/* Mata: Lingkaran */}
              <circle cx="440" cy="170" r="22" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="6 4" />
              <text x="440" y="138" fill="#B91C1C" fontSize="12" fontWeight="bold" textAnchor="middle">LINGKARAN</text>

              {/* Sirip: Segitiga */}
              <polygon points="270,120 380,90 330,125" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" />
              <text x="335" y="75" fill="#047857" fontSize="12" fontWeight="bold" textAnchor="middle">SEGITIGA</text>

              {/* Ekor: Segitiga */}
              <polygon points="180,200 70,120 70,280" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="6 4" />
              <text x="110" y="105" fill="#B45309" fontSize="12" fontWeight="bold" textAnchor="middle">SEGITIGA</text>
            </g>
          )}
        </g>
      )}

      {zoneId === 'lumba' && (
        <g id="animal-lumba">
          {/* Ekor (Fluke) - Segitiga melengkung / bulan sabit */}
          <g className={`transition-all duration-300 ${highlightPart === 'Ekor' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 140 240 Q 80 200 50 170 Q 70 230 110 250 Q 70 270 50 330 Q 80 300 140 260 Z"
              fill="url(#dolphin-body)"
              stroke="#0369A1"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Badan & Kepala - Oval melengkung aerodinamis */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kepala/Badan' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            {/* Punggung & Perut */}
            <path
              d="M 130 250 C 180 220 260 120 400 130 C 470 135 520 180 540 195 C 555 205 560 215 540 218 C 500 225 460 215 440 225 C 380 265 250 300 130 250 Z"
              fill="url(#dolphin-body)"
              stroke="#0369A1"
              strokeWidth="4"
              strokeLinejoin="round"
            />
            {/* Perut Putih/Terang */}
            <path
              d="M 170 255 C 240 275 350 255 430 220 C 460 212 500 220 535 215 C 470 255 350 295 170 255 Z"
              fill="#E0F2FE"
              stroke="#BAE6FD"
              strokeWidth="2"
            />
          </g>

          {/* Sirip Punggung (Dorsal Fin) - Segitiga melengkung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sirip Punggung' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 310 135 C 330 80 365 70 380 90 C 370 115 360 130 355 137 Z"
              fill="#0284C7"
              stroke="#0369A1"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Sirip Samping (Flipper/Pectoral Fin) - Segitiga */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sirip Samping' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <path
              d="M 370 225 C 360 270 320 310 300 320 C 315 285 340 250 380 225 Z"
              fill="#0284C7"
              stroke="#0369A1"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Mulut Senyum (Smile line) */}
          <path
            d="M 545 208 Q 500 212 485 202"
            fill="none"
            stroke="#075985"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Mata (Eye) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mata' ? 'filter drop-shadow-[0_0_12px_#38bdf8]' : ''}`}>
            <circle cx="470" cy="180" r="9" fill="#0C4A6E" />
            <circle cx="472" cy="178" r="3" fill="#FFFFFF" />
          </g>

          {/* Geometric Overlays */}
          {showShapeOverlay && (
            <g opacity="0.85">
              <ellipse cx="340" cy="205" rx="170" ry="75" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" transform="rotate(-6 340 205)" />
              <text x="340" y="175" fill="#1D4ED8" fontSize="14" fontWeight="bold" textAnchor="middle">OVAL MELENGKUNG</text>

              <polygon points="310,135 375,80 355,137" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" />
              <text x="345" y="65" fill="#047857" fontSize="12" fontWeight="bold" textAnchor="middle">SEGITIGA</text>

              <polygon points="140,240 50,170 110,250 50,330" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="6 4" />
              <text x="75" y="150" fill="#B45309" fontSize="12" fontWeight="bold" textAnchor="middle">SEGITIGA (EKOR)</text>
            </g>
          )}
        </g>
      )}

      {zoneId === 'kucing' && (
        <g id="animal-kucing">
          {/* Ekor (Tail) - Persegi panjang melengkung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Ekor' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            <path
              d="M 190 280 C 130 280 100 220 110 160 C 115 130 145 130 140 155 C 132 195 155 245 200 255 Z"
              fill="url(#cat-body)"
              stroke="#B45309"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Badan (Body) - Oval tegak */}
          <g className={`transition-all duration-300 ${highlightPart === 'Badan' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            <ellipse
              cx="260"
              cy="250"
              rx="90"
              ry="105"
              fill="url(#cat-body)"
              stroke="#B45309"
              strokeWidth="4"
            />
            {/* Dada Putih */}
            <path
              d="M 230 190 C 230 240 250 280 270 280 C 290 280 300 240 290 190 Z"
              fill="#FEF3C7"
              stroke="#FDE68A"
              strokeWidth="2"
            />
          </g>

          {/* Kaki Depan (Front Legs) - Persegi Panjang */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kaki' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            {/* Kaki Kiri */}
            <rect x="235" y="270" width="30" height="85" rx="14" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" />
            {/* Kaki Kanan */}
            <rect x="280" y="270" width="30" height="85" rx="14" fill="#D97706" stroke="#B45309" strokeWidth="3.5" />
            {/* Cakar membulat */}
            <ellipse cx="250" cy="355" rx="18" ry="10" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
            <ellipse cx="295" cy="355" rx="18" ry="10" fill="#FEF3C7" stroke="#B45309" strokeWidth="3" />
          </g>

          {/* Kepala (Head) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kepala' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            <circle cx="270" cy="130" r="65" fill="url(#cat-body)" stroke="#B45309" strokeWidth="4" />
          </g>

          {/* Telinga (Ears) - Segitiga */}
          <g className={`transition-all duration-300 ${highlightPart === 'Telinga' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            {/* Telinga Kiri */}
            <polygon points="220,110 205,45 250,85" fill="#D97706" stroke="#B45309" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="222,100 215,60 242,88" fill="#FDE68A" />
            {/* Telinga Kanan */}
            <polygon points="290,85 335,45 320,110" fill="#D97706" stroke="#B45309" strokeWidth="4" strokeLinejoin="round" />
            <polygon points="298,88 325,60 318,100" fill="#FDE68A" />
          </g>

          {/* Mata (Eyes) - Oval / Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mata' ? 'filter drop-shadow-[0_0_12px_#f59e0b]' : ''}`}>
            {/* Mata Kiri */}
            <ellipse cx="245" cy="130" rx="11" ry="15" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
            <ellipse cx="245" cy="130" rx="4" ry="12" fill="#064E3B" />
            <circle cx="242" cy="125" r="3" fill="#FFFFFF" />
            {/* Mata Kanan */}
            <ellipse cx="295" cy="130" rx="11" ry="15" fill="#10B981" stroke="#047857" strokeWidth="2.5" />
            <ellipse cx="295" cy="130" rx="4" ry="12" fill="#064E3B" />
            <circle cx="292" cy="125" r="3" fill="#FFFFFF" />
          </g>

          {/* Hidung & Mulut */}
          <polygon points="265,150 275,150 270,157" fill="#F43F5E" />
          <path d="M 270 157 L 270 165 Q 262 172 255 168" stroke="#78350F" strokeWidth="2.5" fill="none" />
          <path d="M 270 165 Q 278 172 285 168" stroke="#78350F" strokeWidth="2.5" fill="none" />

          {/* Kumis (Whiskers) */}
          <path d="M 240 155 L 180 148 M 240 162 L 175 165 M 240 170 L 185 180" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
          <path d="M 300 155 L 360 148 M 300 162 L 365 165 M 300 170 L 355 180" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

          {/* Geometric Overlays */}
          {showShapeOverlay && (
            <g opacity="0.85">
              <circle cx="270" cy="130" r="65" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="8 6" />
              <text x="270" y="55" fill="#B91C1C" fontSize="13" fontWeight="bold" textAnchor="middle">KEPALA: LINGKARAN</text>

              <ellipse cx="260" cy="250" rx="90" ry="105" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" />
              <text x="260" y="240" fill="#1D4ED8" fontSize="13" fontWeight="bold" textAnchor="middle">BADAN: OVAL</text>

              <polygon points="205,45 220,110 250,85" fill="none" stroke="#059669" strokeWidth="3" strokeDasharray="6 4" />
              <text x="195" y="35" fill="#047857" fontSize="12" fontWeight="bold">SEGITIGA</text>

              <rect x="235" y="270" width="30" height="85" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="6 4" />
              <text x="200" y="315" fill="#B45309" fontSize="11" fontWeight="bold">PERSEGI PANJANG</text>
            </g>
          )}
        </g>
      )}

      {zoneId === 'burung' && (
        <g id="animal-burung">
          {/* Ekor (Tail) - Persegi panjang / bertingkat */}
          <g className={`transition-all duration-300 ${highlightPart === 'Ekor' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <polygon points="210,260 130,340 160,350 250,280" fill="#0E7490" stroke="#155E75" strokeWidth="3.5" />
            <polygon points="220,265 150,355 180,360 260,285" fill="#0891B2" stroke="#155E75" strokeWidth="3" />
          </g>

          {/* Badan (Body) - Oval miring */}
          <g className={`transition-all duration-300 ${highlightPart === 'Badan' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <ellipse
              cx="310"
              cy="230"
              rx="105"
              ry="75"
              fill="url(#bird-body)"
              stroke="#155E75"
              strokeWidth="4"
              transform="rotate(-25 310 230)"
            />
            {/* Dada oranye hangat */}
            <path
              d="M 330 180 C 370 210 380 270 330 290 C 300 270 310 210 330 180 Z"
              fill="#FB923C"
              stroke="#EA580C"
              strokeWidth="2.5"
            />
          </g>

          {/* Sayap (Wing) - Oval / Segitiga melengkung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sayap' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <path
              d="M 270 190 C 230 220 200 260 215 290 C 240 310 300 270 330 225 Z"
              fill="#0891B2"
              stroke="#155E75"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Pola bulu sayap */}
            <path d="M 260 220 Q 235 260 240 280" stroke="#67E8F9" strokeWidth="2.5" fill="none" />
            <path d="M 285 220 Q 260 265 270 285" stroke="#67E8F9" strokeWidth="2.5" fill="none" />
          </g>

          {/* Kaki & Ranting (Legs) - Persegi panjang / garis */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kaki' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            {/* Ranting pohon */}
            <path d="M 120 320 Q 280 305 480 330" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
            {/* Kaki */}
            <line x1="300" y1="285" x2="295" y2="315" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
            <line x1="335" y1="280" x2="330" y2="312" stroke="#D97706" strokeWidth="5" strokeLinecap="round" />
            {/* Cakar */}
            <path d="M 285 315 L 305 315 M 320 312 L 340 312" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
          </g>

          {/* Kepala (Head) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kepala' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <circle cx="395" cy="145" r="50" fill="url(#bird-body)" stroke="#155E75" strokeWidth="4" />
          </g>

          {/* Paruh (Beak) - Segitiga runcing */}
          <g className={`transition-all duration-300 ${highlightPart === 'Paruh' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <polygon points="435,135 520,150 435,165" fill="#F59E0B" stroke="#B45309" strokeWidth="3.5" strokeLinejoin="round" />
            <line x1="435" y1="150" x2="510" y2="150" stroke="#78350F" strokeWidth="2" />
          </g>

          {/* Mata (Eye) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mata' ? 'filter drop-shadow-[0_0_12px_#06b6d4]' : ''}`}>
            <circle cx="410" cy="135" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="413" cy="135" r="6" fill="#0F172A" />
            <circle cx="411" cy="132" r="2.5" fill="#FFFFFF" />
          </g>

          {/* Geometric Overlays */}
          {showShapeOverlay && (
            <g opacity="0.85">
              <circle cx="395" cy="145" r="50" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="8 6" />
              <text x="395" y="80" fill="#B91C1C" fontSize="13" fontWeight="bold" textAnchor="middle">KEPALA: LINGKARAN</text>

              <ellipse cx="310" cy="230" rx="105" ry="75" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" transform="rotate(-25 310 230)" />
              <text x="310" y="245" fill="#1D4ED8" fontSize="13" fontWeight="bold" textAnchor="middle">BADAN: OVAL</text>

              <polygon points="435,135 520,150 435,165" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="6 4" />
              <text x="475" y="125" fill="#B45309" fontSize="12" fontWeight="bold">SEGITIGA</text>
            </g>
          )}
        </g>
      )}

      {zoneId === 'bebek' && (
        <g id="animal-bebek">
          {/* Air kolam / Riak air */}
          <path d="M 120 295 C 180 285 240 305 300 295 C 360 285 420 305 480 295" stroke="#38BDF8" strokeWidth="6" fill="none" strokeLinecap="round" opacity="0.7" />

          {/* Ekor (Tail) - Segitiga menjungkit */}
          <g className={`transition-all duration-300 ${highlightPart === 'Ekor' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <polygon points="190,240 120,205 180,265" fill="#EAB308" stroke="#CA8A04" strokeWidth="4" strokeLinejoin="round" />
          </g>

          {/* Badan (Body) - Oval mengapung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Badan' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <ellipse
              cx="290"
              cy="245"
              rx="135"
              ry="75"
              fill="url(#duck-body)"
              stroke="#CA8A04"
              strokeWidth="4"
            />
          </g>

          {/* Sayap (Wing) - Oval */}
          <g className={`transition-all duration-300 ${highlightPart === 'Sayap' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <path
              d="M 230 205 C 280 195 350 215 360 250 C 350 280 280 285 230 260 Z"
              fill="#CA8A04"
              stroke="#A16207"
              strokeWidth="3.5"
            />
            <path d="M 260 230 C 290 230 330 245 340 260" stroke="#FEF08A" strokeWidth="2.5" fill="none" />
          </g>

          {/* Leher & Kepala (Head) - Lingkaran & sambungan leher */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kepala' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            {/* Leher */}
            <path
              d="M 360 220 C 375 180 395 150 415 130 L 445 155 C 430 185 410 215 395 240 Z"
              fill="#EAB308"
              stroke="#CA8A04"
              strokeWidth="3"
            />
            {/* Kepala */}
            <circle cx="430" cy="125" r="48" fill="url(#duck-body)" stroke="#CA8A04" strokeWidth="4" />
          </g>

          {/* Paruh Pipih (Bill) - Persegi panjang / oval pipih */}
          <g className={`transition-all duration-300 ${highlightPart === 'Paruh' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <path
              d="M 465 125 C 490 120 540 125 540 142 C 540 155 490 155 465 145 Z"
              fill="#F97316"
              stroke="#C2410C"
              strokeWidth="3.5"
            />
            <circle cx="485" cy="132" r="2.5" fill="#7C2D12" />
          </g>

          {/* Mata (Eye) - Lingkaran */}
          <g className={`transition-all duration-300 ${highlightPart === 'Mata' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <circle cx="440" cy="115" r="9" fill="#0F172A" />
            <circle cx="442" cy="113" r="3" fill="#FFFFFF" />
          </g>

          {/* Kaki / Dayung di bawah air */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kaki' ? 'filter drop-shadow-[0_0_12px_#eab308]' : ''}`}>
            <path d="M 280 310 L 265 345 L 305 345 Z" fill="#F97316" stroke="#C2410C" strokeWidth="3" opacity="0.8" />
          </g>

          {/* Geometric Overlays */}
          {showShapeOverlay && (
            <g opacity="0.85">
              <circle cx="430" cy="125" r="48" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="8 6" />
              <text x="430" y="65" fill="#B91C1C" fontSize="13" fontWeight="bold" textAnchor="middle">KEPALA: LINGKARAN</text>

              <ellipse cx="290" cy="245" rx="135" ry="75" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" />
              <text x="290" y="245" fill="#1D4ED8" fontSize="13" fontWeight="bold" textAnchor="middle">BADAN: OVAL</text>

              <rect x="465" y="125" width="75" height="25" rx="10" fill="none" stroke="#D97706" strokeWidth="3" strokeDasharray="6 4" />
              <text x="500" y="112" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle">PARUH PIPIH</text>
            </g>
          )}
        </g>
      )}

      {zoneId === 'siput' && (
        <g id="animal-siput">
          {/* Daun tempat siput merayap */}
          <path
            d="M 60 330 C 150 290 350 280 540 330 C 450 380 200 380 60 330 Z"
            fill="#15803D"
            stroke="#166534"
            strokeWidth="4"
          />
          <path d="M 70 330 C 220 315 380 315 530 330" stroke="#4ADE80" strokeWidth="3" fill="none" opacity="0.6" />

          {/* Tubuh / Kaki Siput (Foot) - Oval memanjang */}
          <g className={`transition-all duration-300 ${highlightPart === 'Tubuh' ? 'filter drop-shadow-[0_0_12px_#84cc16]' : ''}`}>
            <path
              d="M 120 320 C 180 315 320 315 440 315 C 470 315 490 290 470 270 C 450 250 420 260 380 265 C 280 275 160 275 120 320 Z"
              fill="url(#snail-body)"
              stroke="#15803D"
              strokeWidth="4"
              strokeLinejoin="round"
            />
          </g>

          {/* Cangkang (Spiral Shell) - Lingkaran Spiral */}
          <g className={`transition-all duration-300 ${highlightPart === 'Cangkang' ? 'filter drop-shadow-[0_0_12px_#84cc16]' : ''}`}>
            <circle cx="260" cy="195" r="105" fill="url(#snail-shell)" stroke="#78350F" strokeWidth="5" />
            {/* Spiral lines */}
            <path
              d="M 260 195 C 240 195 230 180 230 165 C 230 145 255 130 280 135 C 315 140 335 175 330 210 C 320 255 270 280 220 270 C 160 260 130 200 145 140 C 160 80 240 50 310 65"
              fill="none"
              stroke="#FDE68A"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.9"
            />
          </g>

          {/* Kepala (Head) - Lingkaran kecil */}
          <g className={`transition-all duration-300 ${highlightPart === 'Kepala' ? 'filter drop-shadow-[0_0_12px_#84cc16]' : ''}`}>
            <circle cx="455" cy="265" r="32" fill="url(#snail-body)" stroke="#15803D" strokeWidth="4" />
          </g>

          {/* Tentakel / Mata - Garis/persegi tipis dengan lingkaran di ujung */}
          <g className={`transition-all duration-300 ${highlightPart === 'Tentakel/Mata' ? 'filter drop-shadow-[0_0_12px_#84cc16]' : ''}`}>
            {/* Tentakel Belakang */}
            <path d="M 450 245 C 445 200 425 170 415 150" stroke="#15803D" strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="415" cy="150" r="11" fill="url(#snail-body)" stroke="#15803D" strokeWidth="3" />
            <circle cx="413" cy="148" r="4" fill="#0F172A" />

            {/* Tentakel Depan */}
            <path d="M 470 248 C 475 200 495 170 505 145" stroke="#15803D" strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="505" cy="145" r="11" fill="url(#snail-body)" stroke="#15803D" strokeWidth="3" />
            <circle cx="503" cy="143" r="4" fill="#0F172A" />
            <circle cx="501" cy="141" r="1.5" fill="#FFFFFF" />

            {/* Sungut bibir kecil */}
            <path d="M 480 280 Q 500 285 505 295" stroke="#15803D" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>

          {/* Geometric Overlays */}
          {showShapeOverlay && (
            <g opacity="0.85">
              <circle cx="260" cy="195" r="105" fill="none" stroke="#DC2626" strokeWidth="3" strokeDasharray="8 6" />
              <text x="260" y="80" fill="#B91C1C" fontSize="13" fontWeight="bold" textAnchor="middle">CANGKANG: LINGKARAN</text>

              <ellipse cx="290" cy="290" rx="150" ry="30" fill="none" stroke="#2563EB" strokeWidth="3" strokeDasharray="8 6" />
              <text x="290" y="340" fill="#1D4ED8" fontSize="12" fontWeight="bold" textAnchor="middle">TUBUH: OVAL MEMANJANG</text>

              <circle cx="505" cy="145" r="14" fill="none" stroke="#D97706" strokeWidth="2.5" strokeDasharray="4 4" />
              <text x="525" y="140" fill="#B45309" fontSize="11" fontWeight="bold">TENTAKEL</text>
            </g>
          )}
        </g>
      )}
    </svg>
  );
};
