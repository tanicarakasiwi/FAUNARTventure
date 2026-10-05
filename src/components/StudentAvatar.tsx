import React from 'react';

interface StudentAvatarProps {
  className?: string;
  size?: number;
  walking?: boolean;
}

export const StudentAvatar: React.FC<StudentAvatarProps> = ({
  className = '',
  size = 140,
  walking = false,
}) => {
  return (
    <div
      style={{ width: size, height: size * 1.5 }}
      className={`relative inline-block select-none pointer-events-none ${walking ? 'animate-bounce' : ''} ${className}`}
    >
      <svg
        viewBox="0 0 100 150"
        className="w-full h-full filter drop-shadow-md overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="avatar-vest" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="avatar-skirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="avatar-hat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="avatar-hair" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5C2B10" />
            <stop offset="50%" stopColor="#451A03" />
            <stop offset="100%" stopColor="#2E0E02" />
          </linearGradient>
        </defs>

        {/* Soft Ground Shadow */}
        <ellipse cx="50" cy="144" rx="26" ry="6" fill="#000000" opacity="0.22" />

        {/* Back Hair: Energetic Explorer Ponytail (Rambut Dikuncir) */}
        <g id="ponytail-back">
          {/* Base gathered hair behind neck */}
          <path
            d="M 36 36 C 36 48 40 54 50 54 C 60 54 64 48 64 36 Z"
            fill="url(#avatar-hair)"
          />

          {/* Bouncy Ponytail flowing energetically out to the side */}
          <path
            d="M 64 30 C 78 24 88 32 89 46 C 90 60 82 72 76 78 C 74 80 71 78 72 74 C 75 64 78 54 75 44 C 73 36 68 33 63 32 Z"
            fill="url(#avatar-hair)"
          />

          {/* Sleek ponytail strand highlight */}
          <path
            d="M 68 32 C 78 30 84 38 84 50 C 84 60 78 68 75 72"
            stroke="#78350F"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
            strokeLinecap="round"
          />

          {/* Cute Hair Tie / Scrunchie (Karet Kuncir Rambut) */}
          <ellipse cx="64" cy="32" rx="4.5" ry="6.5" fill="#F43F5E" transform="rotate(-15 64 32)" />
          <ellipse cx="64" cy="32" rx="2.5" ry="4.5" fill="#FB7185" transform="rotate(-15 64 32)" />
        </g>

        {/* Legs / Explorer Boots */}
        <g id="legs">
          {/* Left leg */}
          <rect x="36" y="98" width="10" height="34" rx="4" fill="#FDE68A" />
          {/* Right leg */}
          <rect x="54" y="98" width="10" height="34" rx="4" fill="#FDE68A" />
          {/* Knee socks */}
          <rect x="36" y="112" width="10" height="18" fill="#FFFFFF" rx="2" />
          <line x1="36" y1="116" x2="46" y2="116" stroke="#10B981" strokeWidth="1.5" />
          <rect x="54" y="112" width="10" height="18" fill="#FFFFFF" rx="2" />
          <line x1="54" y1="116" x2="64" y2="116" stroke="#10B981" strokeWidth="1.5" />
          {/* Adventure Boots */}
          <path d="M 34 130 L 47 130 L 47 138 C 47 141 32 141 32 138 Z" fill="#854D0E" stroke="#582900" strokeWidth="1" />
          <path d="M 53 130 L 66 130 L 66 138 C 66 141 51 141 51 138 Z" fill="#854D0E" stroke="#582900" strokeWidth="1" />
        </g>

        {/* Explorer Skirt / Outfit */}
        <g id="skirt">
          <polygon points="34,92 66,92 70,104 30,104" fill="url(#avatar-skirt)" stroke="#B45309" strokeWidth="1" />
          {/* Belt */}
          <rect x="33" y="90" width="34" height="4.5" fill="#78350F" />
          <rect x="47" y="89" width="6" height="6.5" rx="1.5" fill="#FDE047" stroke="#B45309" strokeWidth="0.8" />
        </g>

        {/* Body / Female Explorer Vest & Neckerchief */}
        <g id="body">
          <rect x="33" y="58" width="34" height="34" rx="8" fill="url(#avatar-vest)" />
          {/* Vest collar */}
          <path d="M 43 58 L 50 70 L 57 58" fill="#FEF08A" />
          {/* Pink Neckerchief / Bandana */}
          <polygon points="46,58 54,58 50,65" fill="#F43F5E" />
          <circle cx="50" cy="64" r="2.5" fill="#FB7185" />
          {/* Vest Pockets */}
          <rect x="36" y="73" width="9" height="8" rx="2" fill="#065F46" />
          <rect x="55" y="73" width="9" height="8" rx="2" fill="#065F46" />
        </g>

        {/* Arms and Sketchbook */}
        <g id="arms">
          {/* Left arm holding sketchpad */}
          <path d="M 34 63 C 22 70 21 84 27 90" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Sketchpad book */}
          <rect x="13" y="76" width="22" height="28" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" transform="rotate(-12 24 90)" />
          <line x1="16" y1="82" x2="29" y2="79" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="17" y1="86" x2="30" y2="83" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="18" y1="90" x2="28" y2="87" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Cute drawing of a star on cover */}
          <circle cx="23" cy="95" r="2" fill="#F59E0B" />
          {/* Left hand */}
          <circle cx="25" cy="92" r="4.5" fill="#FDE68A" />

          {/* Right arm holding pencil */}
          <path d="M 66 63 C 76 70 76 82 72 88" stroke="#FDE68A" strokeWidth="7" strokeLinecap="round" fill="none" />
          {/* Pencil */}
          <polygon points="75,80 81,72 83,74 77,82" fill="#EF4444" />
          <polygon points="77,82 78,86 75,84" fill="#FDE047" />
          <circle cx="73" cy="86" r="4" fill="#FDE68A" />
        </g>

        {/* Female Head and Face */}
        <g id="head">
          <circle cx="50" cy="38" r="17.5" fill="#FDE68A" />

          {/* Front Hair Bangs: Clean neat bangs */}
          <path d="M 33 34 C 33 22 45 18 50 18 C 55 18 67 22 67 34 C 63 36 58 31 50 31 C 42 31 37 36 33 34 Z" fill="url(#avatar-hair)" />

          {/* Neat side locks framing cheeks */}
          <path d="M 33 34 C 30 42 31 50 33 54 C 35 54 36 48 36 42 C 36 38 35 34 33 34 Z" fill="url(#avatar-hair)" />
          <path d="M 67 34 C 70 42 69 50 67 54 C 65 54 64 48 64 42 C 64 38 65 34 67 34 Z" fill="url(#avatar-hair)" />

          {/* Big expressive anime-styled feminine eyes with eyelashes */}
          {/* Left Eye */}
          <ellipse cx="43" cy="38" rx="3.5" ry="4.5" fill="#1E293B" />
          <circle cx="42" cy="36.5" r="1.5" fill="#FFFFFF" />
          <circle cx="44" cy="40" r="0.8" fill="#FFFFFF" />
          {/* Left Eyelashes */}
          <path d="M 39 35 Q 43 33 46 34" stroke="#1E293B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 39 34 L 37.5 32.5" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />

          {/* Right Eye */}
          <ellipse cx="57" cy="38" rx="3.5" ry="4.5" fill="#1E293B" />
          <circle cx="56" cy="36.5" r="1.5" fill="#FFFFFF" />
          <circle cx="58" cy="40" r="0.8" fill="#FFFFFF" />
          {/* Right Eyelashes */}
          <path d="M 54 34 Q 57 33 61 35" stroke="#1E293B" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M 61 34 L 62.5 32.5" stroke="#1E293B" strokeWidth="1.2" strokeLinecap="round" />

          {/* Rosy Pink Cheeks */}
          <ellipse cx="39" cy="42" rx="3.5" ry="2" fill="#FB7185" opacity="0.6" />
          <ellipse cx="61" cy="42" rx="3.5" ry="2" fill="#FB7185" opacity="0.6" />

          {/* Sweet Smile */}
          <path d="M 46 43 Q 50 48 54 43" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Safari Explorer Hat with flower emblem */}
        <g id="hat">
          {/* Hat brim */}
          <ellipse cx="50" cy="24" rx="26" ry="7" fill="url(#avatar-hat)" stroke="#B45309" strokeWidth="1.5" />
          {/* Hat crown */}
          <path d="M 36 24 C 36 10 42 7 50 7 C 58 7 64 10 64 24 Z" fill="url(#avatar-hat)" stroke="#B45309" strokeWidth="1.5" />
          {/* Hat band */}
          <path d="M 36 22 Q 50 25 64 22" stroke="#15803D" strokeWidth="3" fill="none" />
          {/* Little pink blossom pin on hat */}
          <circle cx="61" cy="21" r="2.8" fill="#F43F5E" />
          <circle cx="61" cy="21" r="1.2" fill="#FDE047" />
        </g>
      </svg>
    </div>
  );
};
