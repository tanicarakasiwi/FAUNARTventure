/**
 * Web Audio API synthesizer for FAUNARTventure
 * Zero external audio files required, completely resilient offline & in classrooms.
 */

let audioCtx: AudioContext | null = null;
let isMuted = false;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
