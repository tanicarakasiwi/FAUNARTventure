export type ZoneId = 'ikan' | 'lumba' | 'kucing' | 'burung' | 'bebek' | 'siput';

export type Screen = 'WELCOME' | 'MAP' | 'HABITAT' | 'MISSIONS' | 'SUMMARY';

export type MissionStep = 1 | 2 | 3 | 4 | 5;

export type GeometricShape = 'Lingkaran' | 'Oval' | 'Segitiga' | 'Persegi' | 'Persegi panjang';

export interface BodyPartShape {
  partName: string;
  correctShape: GeometricShape;
  explanation: string;
  highlightCoords?: { x: number; y: number; r?: number; rx?: number; ry?: number; w?: number; h?: number };
}

export interface ProportionQuestion {
  question: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

export interface FeatureQuestion {
  question: string;
  options: {
    id: string;
    label: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export interface DrawingStep {
  step: number;
  title: string;
  instruction: string;
  tip: string;
}

export interface ZoneConfig {
  id: ZoneId;
  habitat: string;
  animal: string;
  badge: string;
  badgeIcon: string;
  subtitle: string;
  accentColor: string;
  headerBg: string;
  mapCoords: { x: number; y: number }; // percentage on map
  greeting: string;
  observationPrompt: string;
  shapes: BodyPartShape[];
  proportions: ProportionQuestion[];
  features: FeatureQuestion;
  drawingSteps: DrawingStep[];
  referenceImage: string;
  pdfLabel: string;
}

export interface ZoneProgress {
  zoneStarted: boolean;
  puzzleCompleted: boolean;
  shapeCompleted: boolean;
  proportionCompleted: boolean;
  featureCompleted: boolean;
  zoneCompleted: boolean;
}

export type AllZonesProgress = Record<ZoneId, ZoneProgress>;
