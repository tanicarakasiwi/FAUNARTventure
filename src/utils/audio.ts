/**
 * Web Audio API synthesizer for FAUNARTventure
 * Zero external audio files required, completely resilient offline & in classrooms.
 */

import { ZoneId } from '../types/game';

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  return isMuted;
}

export function getMuteState(): boolean {
  return isMuted;
}

export function playClickSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);

  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.07);
}

export function playSnapSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Satisfying mechanical "clack-click"
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(520, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.11);
}

export function playSuccessChime() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Major triad arpeggio: C5 - E5 - G5 - C6
  const notes = [523.25, 659.25, 783.99, 1046.5];
  notes.forEach((freq, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + index * 0.08);

    const startTime = ctx.currentTime + index * 0.08;
    gain.gain.setValueAtTime(0.2, startTime);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.36);
  });
}

export function playFanfare() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // Grand fanfare for badges
  const notes = [
    { freq: 523.25, time: 0, dur: 0.15 },
    { freq: 659.25, time: 0.15, dur: 0.15 },
    { freq: 783.99, time: 0.3, dur: 0.15 },
    { freq: 1046.5, time: 0.45, dur: 0.5 },
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + time);

    const start = ctx.currentTime + time;
    gain.gain.setValueAtTime(0.25, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(start);
    osc.stop(start + dur + 0.05);
  });
}

export function playSoftThump() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(180, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.12);

  gain.gain.setValueAtTime(0.18, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.13);
}

// ==========================================
// NATURAL AMBIENT SOUNDSCAPES (SUARA ALAM)
// ==========================================

// Helper: Generates procedural noise for wind and water swells
function createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    // Pink/brown filtered noise
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  return buffer;
}

/**
 * 1. ZONA TAMAN (SIPUT): Desau angin semilir di pepohonan & gemerisik dedaunan
 */
function playWindAndLeaves(ctx: AudioContext) {
  const duration = 3.2;
  const noiseBuffer = createNoiseBuffer(ctx, duration);
  const noiseSource = ctx.createBufferSource();
  noiseSource.buffer = noiseBuffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = 1.8;
  filter.frequency.setValueAtTime(320, ctx.currentTime);
  filter.frequency.exponentialRampToValueAtTime(650, ctx.currentTime + 1.4);
  filter.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + duration);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 1.2);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  noiseSource.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noiseSource.start();
  noiseSource.stop(ctx.currentTime + duration);
}

/**
 * 2. ZONA KOLAM (BEBEK): Gemercik riak air kolam dan suara kwek bebek yang ramah
 */
function playWaterAndDuck(ctx: AudioContext) {
  // 1. Water ripples (3 droplets)
  const dropPitches = [800, 680, 920];
  dropPitches.forEach((pitch, i) => {
    const delay = i * 0.18;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(pitch, ctx.currentTime + delay);
    osc.frequency.exponentialRampToValueAtTime(pitch * 0.55, ctx.currentTime + delay + 0.12);

    gain.gain.setValueAtTime(0.06, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + 0.16);
  });

  // 2. Gentle duck quack ("kwek... kwek") after droplet ripples
  const quackTimes = [0.65, 0.95];
  quackTimes.forEach((qTime) => {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, ctx.currentTime + qTime);
    osc.frequency.linearRampToValueAtTime(220, ctx.currentTime + qTime + 0.18);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(680, ctx.currentTime + qTime);
    filter.Q.value = 4.5;

    gain.gain.setValueAtTime(0.001, ctx.currentTime + qTime);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + qTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + qTime + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + qTime);
    osc.stop(ctx.currentTime + qTime + 0.22);
  });
}

/**
 * 3. ZONA BURUNG: Kicauan merdu burung di alam terbuka
 */
function playBirdSong(ctx: AudioContext) {
  // Trills of 3 sweet bird chirps
  const chirps = [
    { start: 0, fStart: 2800, fPeak: 3600, fEnd: 3100, dur: 0.12 },
    { start: 0.16, fStart: 3100, fPeak: 4200, fEnd: 3400, dur: 0.15 },
    { start: 0.36, fStart: 3700, fPeak: 4600, fEnd: 2900, dur: 0.22 },
  ];

  chirps.forEach((c) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const t0 = ctx.currentTime + c.start;
    const tHalf = t0 + c.dur * 0.4;
    const tEnd = t0 + c.dur;

    osc.frequency.setValueAtTime(c.fStart, t0);
    osc.frequency.linearRampToValueAtTime(c.fPeak, tHalf);
    osc.frequency.exponentialRampToValueAtTime(c.fEnd, tEnd);

    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(0.09, t0 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, tEnd);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(tEnd + 0.02);
  });
}

/**
 * 4. ZONA AKUARIUM (IKAN): Gelembung air tenang dan desiran air akuarium
 */
function playAquariumWater(ctx: AudioContext) {
  // Gentle rising bubble pop sequences
  const bubbles = [
    { delay: 0.0, f0: 380, f1: 680 },
    { delay: 0.28, f0: 440, f1: 780 },
    { delay: 0.52, f0: 330, f1: 600 },
    { delay: 0.85, f0: 490, f1: 850 },
  ];

  bubbles.forEach((b) => {
    const t0 = ctx.currentTime + b.delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(b.f0, t0);
    osc.frequency.exponentialRampToValueAtTime(b.f1, t0 + 0.1);

    gain.gain.setValueAtTime(0.001, t0);
    gain.gain.linearRampToValueAtTime(0.08, t0 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + 0.14);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(t0);
    osc.stop(t0 + 0.15);
  });
}

/**
 * 5. DUNIA LAUT (LUMBA-LUMBA): Deburan ombak laut dalam & siulan lumba-lumba
 */
function playOceanAndDolphin(ctx: AudioContext) {
  // 1. Soft ocean wave swell
  const waveDuration = 2.6;
  const noiseBuffer = createNoiseBuffer(ctx, waveDuration);
  const waveSource = ctx.createBufferSource();
  waveSource.buffer = noiseBuffer;

  const waveFilter = ctx.createBiquadFilter();
  waveFilter.type = 'lowpass';
  waveFilter.frequency.setValueAtTime(220, ctx.currentTime);
  waveFilter.frequency.linearRampToValueAtTime(450, ctx.currentTime + 1.2);
  waveFilter.frequency.linearRampToValueAtTime(180, ctx.currentTime + waveDuration);

  const waveGain = ctx.createGain();
  waveGain.gain.setValueAtTime(0.001, ctx.currentTime);
  waveGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.0);
  waveGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + waveDuration);

  waveSource.connect(waveFilter);
  waveFilter.connect(waveGain);
  waveGain.connect(ctx.destination);

  waveSource.start();
  waveSource.stop(ctx.currentTime + waveDuration);

  // 2. Playful dolphin whistle glissando
  const whistleStart = ctx.currentTime + 0.7;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(3200, whistleStart);
  osc.frequency.exponentialRampToValueAtTime(5400, whistleStart + 0.35);
  osc.frequency.exponentialRampToValueAtTime(3900, whistleStart + 0.65);

  gain.gain.setValueAtTime(0.001, whistleStart);
  gain.gain.linearRampToValueAtTime(0.07, whistleStart + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.001, whistleStart + 0.7);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(whistleStart);
  osc.stop(whistleStart + 0.72);
}

/**
 * 6. ZONA DARAT (KUCING): Semilir angin tenang dan suara mengeong lembut kucing
 */
function playBreezeAndCat(ctx: AudioContext) {
  const meowStart = ctx.currentTime + 0.3;

  // Gentle cat meow ("m-e-o-w")
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
  // Pitch rises gently then falls
  osc.frequency.setValueAtTime(460, meowStart);
  osc.frequency.exponentialRampToValueAtTime(740, meowStart + 0.28);
  osc.frequency.exponentialRampToValueAtTime(520, meowStart + 0.7);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(650, meowStart);
  filter.frequency.linearRampToValueAtTime(950, meowStart + 0.28);
  filter.frequency.linearRampToValueAtTime(600, meowStart + 0.7);
  filter.Q.value = 3.0;

  gain.gain.setValueAtTime(0.001, meowStart);
  gain.gain.linearRampToValueAtTime(0.08, meowStart + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, meowStart + 0.75);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(meowStart);
  osc.stop(meowStart + 0.78);
}

/**
 * Play single realistic nature soundscape based on zone
 */
export function playZoneAmbience(zoneId: ZoneId) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  switch (zoneId) {
    case 'siput':
      playWindAndLeaves(ctx);
      break;
    case 'bebek':
      playWaterAndDuck(ctx);
      break;
    case 'burung':
      playBirdSong(ctx);
      break;
    case 'ikan':
      playAquariumWater(ctx);
      break;
    case 'lumba':
      playOceanAndDolphin(ctx);
      break;
    case 'kucing':
      playBreezeAndCat(ctx);
      break;
  }
}

/**
 * Starts periodic, gentle natural ambient soundscape while exploring habitat or working on missions.
 * Plays occasionally (every ~15 to 22 seconds) so it creates a relaxing, non-distracting atmospheric backdrop.
 * Returns a cleanup function to stop the timer when changing zones or screens.
 */
export function startZoneAmbienceLoop(zoneId: ZoneId): () => void {
  let timerId: number | null = null;
  let isStopped = false;

  const scheduleNext = (delayMs: number) => {
    if (isStopped) return;
    timerId = window.setTimeout(() => {
      if (isStopped) return;
      playZoneAmbience(zoneId);
      // Next organic interval between 15 and 22 seconds
      const nextDelay = 15000 + Math.floor(Math.random() * 7000);
      scheduleNext(nextDelay);
    }, delayMs);
  };

  // Play initial gentle sound after 1.8 seconds of entering
  scheduleNext(1800);

  return () => {
    isStopped = true;
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  };
}
