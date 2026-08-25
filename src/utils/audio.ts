/**
 * Web Audio API synthesizer for Norse / Viking & Airplane sounds
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  // Airplane propeller whoosh sound as it tows the cargo
  public playPlaneWhoosh() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      // White noise for engine airflow
      const bufferSize = this.ctx.sampleRate * 1.2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(180, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + 0.6);
      filter.frequency.exponentialRampToValueAtTime(140, now + 1.2);
      filter.Q.setValueAtTime(3, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      // Low frequency motor hum
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(95, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.6);
      osc.frequency.exponentialRampToValueAtTime(80, now + 1.2);

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.01, now);
      oscGain.gain.linearRampToValueAtTime(0.08, now + 0.5);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 1.2);
      osc.start(now);
      osc.stop(now + 1.2);
    } catch {
      // Ignore audio failure
    }
  }

  // Viking horn triumphant blast (correct answer & victory)
  public playVikingHorn() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const notes = [220, 277.18, 329.63, 440]; // A major chord (A3, C#4, E4, A4)

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        // Viking horn swelling
        gain.gain.setValueAtTime(0.001, now + idx * 0.05);
        gain.gain.linearRampToValueAtTime(0.07, now + 0.2 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.05);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + 1.0);
      });
    } catch {
      // Ignore audio error
    }
  }

  // Sparkling magic chime for correct drop
  public playCorrectChime() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const chimeNotes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      chimeNotes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.6);
      });
    } catch {
      // Ignore
    }
  }

  // Troll wooden thud / oops sound on incorrect placement
  public playIncorrectThud() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.35);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.35);
    } catch {
      // Ignore
    }
  }

  // Soft card pick / snap sound
  public playCardSnap() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Ignore
    }
  }

  // Victory fanfare
  public playVictoryFanfare() {
    if (this.isMuted) return;
    this.initCtx();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const fanfare = [
        { note: 392.00, time: 0, dur: 0.15 },    // G4
        { note: 392.00, time: 0.16, dur: 0.15 }, // G4
        { note: 392.00, time: 0.32, dur: 0.15 }, // G4
        { note: 523.25, time: 0.48, dur: 0.6 },  // C5
        { note: 440.00, time: 0.85, dur: 0.2 },  // A4
        { note: 493.88, time: 1.05, dur: 0.2 },  // B4
        { note: 523.25, time: 1.30, dur: 1.0 },  // C5
      ];

      fanfare.forEach(item => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(item.note, now + item.time);

        gain.gain.setValueAtTime(0.15, now + item.time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + item.time + item.dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + item.time);
        osc.stop(now + item.time + item.dur);
      });
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
