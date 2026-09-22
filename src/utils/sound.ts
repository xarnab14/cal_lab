let audioCtx: AudioContext | null = null;

export function playClickSound(enabled: boolean = true, type: 'digit' | 'operator' | 'action' = 'digit') {
  if (!enabled) return;
  try {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }

    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx?.resume();
    }

    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'digit') {
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.02);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
      osc.start(now);
      osc.stop(now + 0.02);
    } else if (type === 'operator') {
      osc.frequency.setValueAtTime(580, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.025);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    } else {
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.035);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.035);
    }
  } catch {
    // Graceful fallback if audio context not permitted
  }
}
