import { DifficultyLevel } from '../types/game';

export interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  shortLabel: string;
  badge: string;
  icon: string;
  badgeClass: string;
  activeColor: string;
  borderClass: string;
  summary: string;
  description: string;
  features: string[];
  puzzleSnapTolerance: number;
  showPuzzleGhostDefault: boolean;
  shapeOptionsCount: number;
  enableTimer: boolean;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  EASY: {
    id: 'EASY',
    name: 'Mudah (Easy)',
    shortLabel: 'Mudah',
    badge: 'Pemula',
    icon: '🌱',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    activeColor: 'emerald',
    borderClass: 'border-emerald-500 bg-emerald-50/60',
    summary: 'Bantuan visual penuh & magnet puzzle sangat kuat',
    description: 'Cocok untuk pemula yang ingin belajar dengan santai dan tanpa rasa terburu-buru.',
    features: [
      'Siluet panduan hewan selalu aktif di puzzle',
      'Toleransi magnetik puzzle sangat kuat (mudah menempel)',
      'Pilihan bentuk geometri disederhanakan (3 opsi utama)',
      'Garis penyorot anatomi menyala jelas di ilustrasi satwa',
      'Faint outline sketsa bantu tracing di kanvas gambar',
    ],
    puzzleSnapTolerance: 95,
    showPuzzleGhostDefault: true,
    shapeOptionsCount: 3,
    enableTimer: false,
  },
  MEDIUM: {
    id: 'MEDIUM',
    name: 'Sedang (Medium)',
    shortLabel: 'Sedang',
    badge: 'Penjelajah',
    icon: '⚡',
    badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
    activeColor: 'amber',
    borderClass: 'border-amber-500 bg-amber-50/60',
    summary: 'Standar kurikulum seni rupa SMP (Rekomendasi)',
    description: 'Tantangan seimbang untuk melatih kepekaan bentuk, proporsi, dan keterampilan menggambar.',
    features: [
      '6 keping puzzle acak dengan opsi tombol petunjuk manual',
      'Toleransi magnetik puzzle pas dan natural (68px)',
      '5 pilihan bentuk geometri lengkap (lingkaran, segitiga, oval, dll.)',
      'Analisis proporsi dan ciri khas standar kurikulum',
      'Kanvas digital 4 tahap dengan grid panduan',
    ],
    puzzleSnapTolerance: 68,
    showPuzzleGhostDefault: false,
    shapeOptionsCount: 5,
    enableTimer: false,
  },
  HARD: {
    id: 'HARD',
    name: 'Sulit (Hard)',
    shortLabel: 'Sulit',
    badge: 'Master Seni',
    icon: '🔥',
    badgeClass: 'bg-rose-100 text-rose-800 border-rose-300',
    activeColor: 'rose',
    borderClass: 'border-rose-500 bg-rose-50/60',
    summary: 'Tantangan ketelitian tinggi & stopwatch waktu',
    description: 'Bagi siswa yang ingin menguji ketajaman mata dan kecepatan menyelesaikan misi seni rupa!',
    features: [
      'Puzzle magnetik presisi tinggi (38px) tanpa siluet bayangan',
      'Stopwatch pencatat waktu penyelesaian misi puzzle & tantangan',
      'Bentuk geometri tanpa garis penyorot bantu (harus jeli mengamati)',
      'Tantangan akurasi satu kali percobaan untuk Medali Emas',
      'Tips teknik arsiran, pencahayaan, & tekstur tingkat lanjut',
    ],
    puzzleSnapTolerance: 38,
    showPuzzleGhostDefault: false,
    shapeOptionsCount: 5,
    enableTimer: true,
  },
};
