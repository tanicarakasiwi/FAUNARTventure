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
          <linearGradient id="avatar-shirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="avatar-pants" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="avatar-hat" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        {/* Shadow */}
        <ellipse cx="50" cy="144" rx="28" ry="6" fill="#000000" opacity="0.25" />

        {/* Legs / Pants */}
        <g id="legs">
          {/* Left leg */}
          <rect x="36" y="96" width="11" height="38" rx="5" fill="url(#avatar-pants)" />
          {/* Right leg */}
          <rect x="53" y="96" width="11" height="38" rx="5" fill="url(#avatar-pants)" />
          {/* Shoes */}
          <ellipse cx="40" cy="136" rx="8" ry="5" fill="#334155" />
          <ellipse cx="60" cy="136" rx="8" ry="5" fill="#334155" />
        </g>

        {/* Body / Explorer vest */}
        <g id="body">
          <rect x="32" y="58" width="36" height="42" rx="10" fill="url(#avatar-shirt)" />
          {/* Vest collar and pockets */}
          <path d="M 43 58 L 50 72 L 57 58" fill="#FDE68A" />
          <rect x="36" y="76" width="10" height="9" rx="2" fill="#065F46" />
          <rect x="54" y="76" width="10" height="9" rx="2" fill="#065F46" />
          {/* Belt */}
          <rect x="32" y="93" width="36" height="5" fill="#78350F" />
          <rect x="47" y="92" width="6" height="7" fill="#FBBF24" />
        </g>

        {/* Arms and Sketchbook */}
        <g id="arms">
          {/* Left arm holding sketchpad */}
          <path d="M 33 64 C 20 72 20 86 28 92" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Sketchpad book */}
          <rect x="14" y="78" width="22" height="28" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" transform="rotate(-12 25 92)" />
          <line x1="17" y1="84" x2="30" y2="81" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="18" y1="88" x2="31" y2="85" stroke="#38BDF8" strokeWidth="1.5" />
          <line x1="19" y1="92" x2="29" y2="89" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Hand */}
          <circle cx="26" cy="94" r="5" fill="#FCD34D" />

          {/* Right arm holding pencil */}
          <path d="M 67 64 C 78 72 78 84 74 90" stroke="#FDE047" strokeWidth="8" strokeLinecap="round" fill="none" />
          {/* Pencil */}
          <polygon points="76,82 82,74 84,76 78,84" fill="#EF4444" />
          <polygon points="78,84 79,88 76,86" fill="#FBBF24" />
          <circle cx="75" cy="88" r="4" fill="#FCD34D" />
        </g>

        {/* Head and Face */}
        <g id="head">
          <circle cx="50" cy="38" r="18" fill="#FCD34D" />
          {/* Hair */}
          <path d="M 34 32 C 34 22 45 18 50 18 C 55 18 66 22 66 32 C 64 36 60 30 50 30 C 40 30 36 36 34 32 Z" fill="#451A03" />
          {/* Eyes */}
          <circle cx="44" cy="38" r="2.5" fill="#1E293B" />
          <circle cx="56" cy="38" r="2.5" fill="#1E293B" />
          {/* Cheeks blush */}
          <ellipse cx="41" cy="42" rx="3" ry="1.5" fill="#F43F5E" opacity="0.4" />
          <ellipse cx="59" cy="42" rx="3" ry="1.5" fill="#F43F5E" opacity="0.4" />
          {/* Smile */}
          <path d="M 46 43 Q 50 48 54 43" stroke="#B45309" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>

        {/* Explorer Safari Hat */}
        <g id="hat">
          {/* Hat brim */}
          <ellipse cx="50" cy="24" rx="26" ry="7" fill="url(#avatar-hat)" stroke="#B45309" strokeWidth="1.5" />
          {/* Hat crown */}
          <path d="M 36 24 C 36 10 42 7 50 7 C 58 7 64 10 64 24 Z" fill="url(#avatar-hat)" stroke="#B45309" strokeWidth="1.5" />
          {/* Hat band */}
          <path d="M 36 22 Q 50 25 64 22" stroke="#15803D" strokeWidth="3" fill="none" />
        </g>
      </svg>
    </div>
  );
};
