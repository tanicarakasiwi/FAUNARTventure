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
  if (bgmMasterGain && audioCtx) {
    bgmMasterGain.gain.linearRampToValueAtTime(
      isMuted ? 0 : 0.85,
      audioCtx.currentTime + 0.1
    );
  }
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

export function playStepTransitionSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(580, ctx.currentTime + 0.1);

  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.13);
}


// ==========================================
// NATURAL AMBIENT SOUNDSCAPES (SUARA ALAM)
// ==========================================

function createNoiseBuffer(ctx: AudioContext, durationSeconds: number): AudioBuffer {
  const bufferSize = ctx.sampleRate * durationSeconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let lastOut = 0.0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    lastOut = (lastOut + 0.02 * white) / 1.02;
    data[i] = lastOut * 3.5;
  }
  return buffer;
}

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

function playWaterAndDuck(ctx: AudioContext) {
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

function playBirdSong(ctx: AudioContext) {
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

function playAquariumWater(ctx: AudioContext) {
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

function playOceanAndDolphin(ctx: AudioContext) {
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

function playBreezeAndCat(ctx: AudioContext) {
  const meowStart = ctx.currentTime + 0.3;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'triangle';
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

export function startZoneAmbienceLoop(zoneId: ZoneId): () => void {
  let timerId: number | null = null;
  let isStopped = false;

  const scheduleNext = (delayMs: number) => {
    if (isStopped) return;
    timerId = window.setTimeout(() => {
      if (isStopped) return;
      playZoneAmbience(zoneId);
      const nextDelay = 15000 + Math.floor(Math.random() * 7000);
      scheduleNext(nextDelay);
    }, delayMs);
  };

  scheduleNext(1800);

  return () => {
    isStopped = true;
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
    }
  };
}

// =========================================================================
// FAUNARTVENTURE 30-SECOND SEAMLESS LOOPING SOUNDTRACK
// Exactly 120 BPM, 4/4 Time Signature, C Major, 15 Bars (60 Beats = exactly 30.00s)
// Harmony: C – G/B – Am – Em – F – C/E – Dm7 – G7 – C – Am – F – Dm7 – Em – F – G7
// =========================================================================

const BGM_NOTES = {
  E2: 82.41, F2: 87.31, G2: 98.0, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, D6: 1174.66, E6: 1318.51, F6: 1396.91, G6: 1567.98, A6: 1760.0, B6: 1975.53,
  C7: 2093.0,
};

// Tempo: Exactly 120 BPM = 0.500s per beat
const BGM_BEAT = 60 / 120; // 0.500s
const LOOP_BARS = 15;
const LOOP_BEATS = LOOP_BARS * 4; // 60 beats
const LOOP_DURATION = 30.0; // Exactly 30.000 seconds

let bgmIntervalId: number | null = null;
let bgmMasterGain: GainNode | null = null;
let isBgmRunning = false;
let nextLoopStartTime = 0;

/**
 * High Playful Orchestral Flute (Airy, singing, cheerful lead melody in C major)
 */
function playFlute(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur = 0.38,
  vol = 0.08
) {
  if (freq <= 0) return;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);

  // Gentle natural flute vibrato
  osc.frequency.linearRampToValueAtTime(freq * 1.006, time + dur * 0.45);
  osc.frequency.linearRampToValueAtTime(freq, time + dur);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(freq * 2.8, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.035);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(time);
  osc.stop(time + dur + 0.02);
}

/**
 * Playful Wooden Marimba (Warm, percussive rhythm patterns)
 */
function playMarimba(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur = 0.28,
  vol = 0.075
) {
  if (freq <= 0) return;
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, time);

  // Soft wooden mallet attack ping
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();
  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(freq * 3.0, time);

  gain2.gain.setValueAtTime(vol * 0.3, time);
  gain2.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

  gain1.gain.setValueAtTime(0.001, time);
  gain1.gain.linearRampToValueAtTime(vol, time + 0.006);
  gain1.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc1.connect(gain1);
  gain1.connect(dest);

  osc2.connect(gain2);
  gain2.connect(dest);

  osc1.start(time);
  osc1.stop(time + dur + 0.02);
  osc2.start(time);
  osc2.stop(time + 0.04);
}

/**
 * Sparkling Glockenspiel (Magical discovery accents with crystalline overtones)
 */
function playGlockenspiel(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur = 0.45,
  vol = 0.055
) {
  if (freq <= 0) return;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(freq, time);

  // Crystal overtone bell frequency
  osc2.type = 'sine';
  osc2.frequency.setValueAtTime(freq * 2.76, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(dest);

  osc1.start(time);
  osc1.stop(time + dur + 0.02);
  osc2.start(time);
  osc2.stop(time + dur + 0.02);
}

/**
 * Warm Bass (Supports the chord roots on downbeats)
 */
function playWarmBass(
  ctx: AudioContext,
  dest: AudioNode,
  freq: number,
  time: number,
  dur = 0.45,
  vol = 0.08
) {
  if (freq <= 0) return;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, time);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(280, time);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(dest);

  osc.start(time);
  osc.stop(time + dur + 0.02);
}

/**
 * Bouncy Pizzicato Strings (Walking rhythm on beats 1 and 3)
 */
function playPizzStrings(
  ctx: AudioContext,
  dest: AudioNode,
  notes: number[],
  time: number,
  dur = 0.22,
  vol = 0.038
) {
  notes.forEach((freq) => {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3.5, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + dur);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(vol, time + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(dest);

    osc.start(time);
    osc.stop(time + dur + 0.02);
  });
}

/**
 * Subtle Birdsong Ambience (Delicate, natural woodland chirp)
 */
function playSubtleBird(ctx: AudioContext, dest: AudioNode, time: number, vol = 0.022) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(3400, time);
  osc.frequency.exponentialRampToValueAtTime(4500, time + 0.06);
  osc.frequency.exponentialRampToValueAtTime(3600, time + 0.14);

  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

  osc.connect(gain);
  gain.connect(dest);

  osc.start(time);
  osc.stop(time + 0.16);
}

/**
 * Schedules the exact 15-bar, 30-second soundtrack in C Major.
 * Progression: C – G/B – Am – Em – F – C/E – Dm7 – G7 – C – Am – F – Dm7 – Em – F – G7
 */
function scheduleExact15BarSoundtrack(ctx: AudioContext, dest: AudioNode, startTime: number) {
  const N = BGM_NOTES;

  // -------------------------------------------------------------------
  // 1. HARMONY & BASS: 15 Exact Bars (Beats 0 to 59 = 30.00 seconds)
  // -------------------------------------------------------------------
  interface BarHarmonic {
    bar: number; // 0-indexed (0 to 14)
    bassRoot1: number;
    bassRoot2: number;
    chordNotes: number[];
  }

  const harmonicPlan: BarHarmonic[] = [
    // Bar 1: C
    { bar: 0, bassRoot1: N.C3, bassRoot2: N.G2, chordNotes: [N.E4, N.G4, N.C5] },
    // Bar 2: G/B
    { bar: 1, bassRoot1: N.B2, bassRoot2: N.D3, chordNotes: [N.D4, N.G4, N.B4] },
    // Bar 3: Am
    { bar: 2, bassRoot1: N.A2, bassRoot2: N.E3, chordNotes: [N.C4, N.E4, N.A4] },
    // Bar 4: Em
    { bar: 3, bassRoot1: N.E2, bassRoot2: N.B2, chordNotes: [N.G3, N.B3, N.E4] },
    // Bar 5: F
    { bar: 4, bassRoot1: N.F2, bassRoot2: N.C3, chordNotes: [N.A3, N.C4, N.F4] },
    // Bar 6: C/E
    { bar: 5, bassRoot1: N.E2, bassRoot2: N.G2, chordNotes: [N.G3, N.C4, N.E4] },
    // Bar 7: Dm7
    { bar: 6, bassRoot1: N.D3, bassRoot2: N.A2, chordNotes: [N.F3, N.A3, N.C4] },
    // Bar 8: G7
    { bar: 7, bassRoot1: N.G2, bassRoot2: N.D3, chordNotes: [N.F4, N.G4, N.B4] },
    // Bar 9: C
    { bar: 8, bassRoot1: N.C3, bassRoot2: N.G2, chordNotes: [N.E4, N.G4, N.C5] },
    // Bar 10: Am
    { bar: 9, bassRoot1: N.A2, bassRoot2: N.E3, chordNotes: [N.C4, N.E4, N.A4] },
    // Bar 11: F
    { bar: 10, bassRoot1: N.F2, bassRoot2: N.C3, chordNotes: [N.A3, N.C4, N.F4] },
    // Bar 12: Dm7
    { bar: 11, bassRoot1: N.D3, bassRoot2: N.A2, chordNotes: [N.F3, N.A3, N.C4] },
    // Bar 13: Em
    { bar: 12, bassRoot1: N.E2, bassRoot2: N.B2, chordNotes: [N.G3, N.B3, N.E4] },
    // Bar 14: F
    { bar: 13, bassRoot1: N.F2, bassRoot2: N.C3, chordNotes: [N.A3, N.C4, N.F4] },
    // Bar 15: G7 (Resolves naturally to Bar 1's C chord on loop)
    { bar: 14, bassRoot1: N.G2, bassRoot2: N.D3, chordNotes: [N.F4, N.G4, N.B4] },
  ];

  harmonicPlan.forEach(({ bar, bassRoot1, bassRoot2, chordNotes }) => {
    const barBeat = bar * 4;

    // Warm Bass roots on beats 0 & 2 of each bar
    playWarmBass(ctx, dest, bassRoot1, startTime + barBeat * BGM_BEAT, 0.42, 0.08);
    playWarmBass(ctx, dest, bassRoot2, startTime + (barBeat + 2) * BGM_BEAT, 0.42, 0.075);

    // Bouncy Pizzicato Strings walking harmony on beats 1 & 3 of each bar
    playPizzStrings(ctx, dest, chordNotes, startTime + (barBeat + 1) * BGM_BEAT, 0.22, 0.038);
    playPizzStrings(ctx, dest, chordNotes, startTime + (barBeat + 3) * BGM_BEAT, 0.22, 0.038);
  });

  // -------------------------------------------------------------------
  // 2. MAIN MELODY: High Flute + Marimba + Glockenspiel Sparkles
  // Playful, catchy, whimsical C major melody across the 15 bars
  // -------------------------------------------------------------------
  interface MelodyEvent {
    beat: number;
    freq: number;
    dur: number;
    glock: boolean;
  }

  const melodyEvents: MelodyEvent[] = [
    // Bar 1: C (Beats 0..3) - Playful entrance
    { beat: 0.0, freq: N.G5, dur: 0.22, glock: true },
    { beat: 0.5, freq: N.C6, dur: 0.22, glock: true },
    { beat: 1.0, freq: N.D6, dur: 0.22, glock: false },
    { beat: 1.5, freq: N.E6, dur: 0.42, glock: true },
    { beat: 2.5, freq: N.G6, dur: 0.35, glock: true },
    { beat: 3.0, freq: N.E6, dur: 0.22, glock: false },
    { beat: 3.5, freq: N.D6, dur: 0.22, glock: false },

    // Bar 2: G/B (Beats 4..7)
    { beat: 4.0, freq: N.B5, dur: 0.32, glock: true },
    { beat: 4.5, freq: N.D6, dur: 0.22, glock: false },
    { beat: 5.0, freq: N.G6, dur: 0.42, glock: true },
    { beat: 6.0, freq: N.F6, dur: 0.22, glock: false },
    { beat: 6.5, freq: N.E6, dur: 0.22, glock: false },
    { beat: 7.0, freq: N.D6, dur: 0.35, glock: true },

    // Bar 3: Am (Beats 8..11)
    { beat: 8.0, freq: N.C6, dur: 0.32, glock: true },
    { beat: 8.5, freq: N.E6, dur: 0.22, glock: false },
    { beat: 9.0, freq: N.A6, dur: 0.45, glock: true },
    { beat: 10.0, freq: N.G6, dur: 0.22, glock: false },
    { beat: 10.5, freq: N.E6, dur: 0.22, glock: false },
    { beat: 11.0, freq: N.C6, dur: 0.32, glock: true },

    // Bar 4: Em (Beats 12..15)
    { beat: 12.0, freq: N.B5, dur: 0.32, glock: true },
    { beat: 12.5, freq: N.G5, dur: 0.22, glock: false },
    { beat: 13.0, freq: N.E5, dur: 0.42, glock: true },
    { beat: 14.0, freq: N.G5, dur: 0.22, glock: false },
    { beat: 14.5, freq: N.B5, dur: 0.22, glock: false },
    { beat: 15.0, freq: N.E6, dur: 0.35, glock: true },

    // Bar 5: F (Beats 16..19)
    { beat: 16.0, freq: N.A5, dur: 0.32, glock: true },
    { beat: 16.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 17.0, freq: N.F6, dur: 0.45, glock: true },
    { beat: 18.0, freq: N.E6, dur: 0.22, glock: false },
    { beat: 18.5, freq: N.D6, dur: 0.22, glock: false },
    { beat: 19.0, freq: N.C6, dur: 0.32, glock: true },

    // Bar 6: C/E (Beats 20..23)
    { beat: 20.0, freq: N.G5, dur: 0.32, glock: true },
    { beat: 20.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 21.0, freq: N.E6, dur: 0.45, glock: true },
    { beat: 22.0, freq: N.D6, dur: 0.22, glock: false },
    { beat: 22.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 23.0, freq: N.G5, dur: 0.32, glock: true },

    // Bar 7: Dm7 (Beats 24..27)
    { beat: 24.0, freq: N.F5, dur: 0.28, glock: true },
    { beat: 24.5, freq: N.A5, dur: 0.22, glock: false },
    { beat: 25.0, freq: N.D6, dur: 0.42, glock: true },
    { beat: 26.0, freq: N.C6, dur: 0.22, glock: false },
    { beat: 26.5, freq: N.A5, dur: 0.22, glock: false },
    { beat: 27.0, freq: N.F5, dur: 0.32, glock: true },

    // Bar 8: G7 (Beats 28..31)
    { beat: 28.0, freq: N.G5, dur: 0.32, glock: true },
    { beat: 28.5, freq: N.B5, dur: 0.22, glock: false },
    { beat: 29.0, freq: N.D6, dur: 0.32, glock: true },
    { beat: 29.5, freq: N.F6, dur: 0.32, glock: false },
    { beat: 30.0, freq: N.E6, dur: 0.22, glock: false },
    { beat: 30.5, freq: N.D6, dur: 0.35, glock: true },

    // Bar 9: C (Beats 32..35) - Joyful exploration peak
    { beat: 32.0, freq: N.E6, dur: 0.32, glock: true },
    { beat: 32.5, freq: N.G6, dur: 0.22, glock: false },
    { beat: 33.0, freq: N.C7, dur: 0.48, glock: true },
    { beat: 34.0, freq: N.B6, dur: 0.22, glock: true },
    { beat: 34.5, freq: N.A6, dur: 0.22, glock: false },
    { beat: 35.0, freq: N.G6, dur: 0.35, glock: true },

    // Bar 10: Am (Beats 36..39)
    { beat: 36.0, freq: N.A5, dur: 0.32, glock: true },
    { beat: 36.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 37.0, freq: N.E6, dur: 0.45, glock: true },
    { beat: 38.0, freq: N.D6, dur: 0.22, glock: false },
    { beat: 38.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 39.0, freq: N.A5, dur: 0.32, glock: true },

    // Bar 11: F (Beats 40..43)
    { beat: 40.0, freq: N.F5, dur: 0.32, glock: true },
    { beat: 40.5, freq: N.A5, dur: 0.22, glock: false },
    { beat: 41.0, freq: N.C6, dur: 0.45, glock: true },
    { beat: 42.0, freq: N.E6, dur: 0.22, glock: false },
    { beat: 42.5, freq: N.D6, dur: 0.22, glock: false },
    { beat: 43.0, freq: N.C6, dur: 0.32, glock: true },

    // Bar 12: Dm7 (Beats 44..47)
    { beat: 44.0, freq: N.D5, dur: 0.32, glock: true },
    { beat: 44.5, freq: N.F5, dur: 0.22, glock: false },
    { beat: 45.0, freq: N.A5, dur: 0.45, glock: true },
    { beat: 46.0, freq: N.C6, dur: 0.22, glock: false },
    { beat: 46.5, freq: N.B5, dur: 0.22, glock: false },
    { beat: 47.0, freq: N.A5, dur: 0.32, glock: true },

    // Bar 13: Em (Beats 48..51)
    { beat: 48.0, freq: N.G5, dur: 0.32, glock: true },
    { beat: 48.5, freq: N.B5, dur: 0.22, glock: false },
    { beat: 49.0, freq: N.E6, dur: 0.45, glock: true },
    { beat: 50.0, freq: N.D6, dur: 0.22, glock: false },
    { beat: 50.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 51.0, freq: N.B5, dur: 0.32, glock: true },

    // Bar 14: F (Beats 52..55)
    { beat: 52.0, freq: N.A5, dur: 0.32, glock: true },
    { beat: 52.5, freq: N.C6, dur: 0.22, glock: false },
    { beat: 53.0, freq: N.F6, dur: 0.45, glock: true },
    { beat: 54.0, freq: N.G6, dur: 0.22, glock: false },
    { beat: 54.5, freq: N.A6, dur: 0.32, glock: true },
    { beat: 55.0, freq: N.F6, dur: 0.22, glock: false },

    // Bar 15: G7 (Beats 56..59) - Smooth turnaround resolving into Bar 1's C chord
    { beat: 56.0, freq: N.G5, dur: 0.32, glock: true },
    { beat: 56.5, freq: N.B5, dur: 0.22, glock: false },
    { beat: 57.0, freq: N.D6, dur: 0.32, glock: true },
    { beat: 57.5, freq: N.F6, dur: 0.32, glock: false },
    { beat: 58.0, freq: N.G6, dur: 0.28, glock: true },
    { beat: 58.5, freq: N.F6, dur: 0.22, glock: false },
    { beat: 59.0, freq: N.D6, dur: 0.22, glock: false },
    { beat: 59.5, freq: N.B5, dur: 0.22, glock: true },
  ];

  melodyEvents.forEach(({ beat, freq, dur, glock }) => {
    const noteTime = startTime + beat * BGM_BEAT;

    // High Playful Orchestral Flute
    playFlute(ctx, dest, freq, noteTime, dur, 0.082);

    // Warm Marimba rhythmic double
    playMarimba(ctx, dest, freq, noteTime, dur * 0.9, 0.075);

    // Sparkling Glockenspiel on key discovery highlights
    if (glock) {
      playGlockenspiel(ctx, dest, freq, noteTime, dur * 1.4, 0.052);
    }
  });

  // -------------------------------------------------------------------
  // 3. SUBTLE BIRD AMBIENCE: Blended into musical phrases
  // -------------------------------------------------------------------
  const birdMoments = [7.2, 23.2, 39.2, 55.2];
  birdMoments.forEach((b) => {
    playSubtleBird(ctx, dest, startTime + b * BGM_BEAT, 0.02);
  });
}

/**
 * Starts the exact 30-second seamless looping instrumental soundtrack.
 * Automatically loops seamlessly using Web Audio API's sample-accurate clock.
 */
export function startAdventureBGM(): void {
  if (isBgmRunning) return;

  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmRunning = true;

  if (!bgmMasterGain) {
    bgmMasterGain = ctx.createGain();
    bgmMasterGain.connect(ctx.destination);
  }

  // Set gain smoothly according to current mute state
  bgmMasterGain.gain.setValueAtTime(isMuted ? 0 : 0.85, ctx.currentTime);

  // Schedule the very first 30s cycle immediately
  nextLoopStartTime = ctx.currentTime + 0.12;
  scheduleExact15BarSoundtrack(ctx, bgmMasterGain, nextLoopStartTime);
  nextLoopStartTime += LOOP_DURATION;

  // Background scheduler checks every 400ms and pre-schedules upcoming 30s loops
  bgmIntervalId = window.setInterval(() => {
    if (!isBgmRunning || !bgmMasterGain) return;
    const current = ctx.currentTime;
    // Pre-schedule when within 2 seconds of the next loop point
    if (nextLoopStartTime - current < 2.0) {
      scheduleExact15BarSoundtrack(ctx, bgmMasterGain, nextLoopStartTime);
      nextLoopStartTime += LOOP_DURATION;
    }
  }, 400);
}

/**
 * Stops the adventure game BGM smoothly (with a soft fadeout).
 */
export function stopAdventureBGM(): void {
  if (!isBgmRunning) return;
  isBgmRunning = false;

  if (bgmIntervalId !== null) {
    window.clearInterval(bgmIntervalId);
    bgmIntervalId = null;
  }

  const ctx = getAudioContext();
  if (bgmMasterGain && ctx) {
    try {
      bgmMasterGain.gain.setValueAtTime(bgmMasterGain.gain.value, ctx.currentTime);
      bgmMasterGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    } catch {
      // Ignored if context closed
    }
  }
}

export function isAdventureBGMPlaying(): boolean {
  return isBgmRunning && !isMuted;
}
