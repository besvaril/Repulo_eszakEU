/**
 * Web Audio API synthesizer for Norse / Viking & Airplane sounds
 * and Nordic background ambient music ("Vargsången" - The Wolf Song).
 */

interface NoteEvent {
  note: number; // Frequency in Hz (0 for rest)
  duration: number; // Duration in seconds
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isMusicPlaying: boolean = false;
  private musicTimeoutId: number | null = null;
  private musicGainNode: GainNode | null = null;
  private droneGainNode: GainNode | null = null;
  private droneOscillators: OscillatorNode[] = [];

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
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setValueAtTime(muted ? 0 : 0.08, this.ctx.currentTime);
    }
    if (this.droneGainNode && this.ctx) {
      this.droneGainNode.gain.setValueAtTime(muted ? 0 : 0.04, this.ctx.currentTime);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.setMuted(this.isMuted);
    return this.isMuted;
  }

  // ==========================================
  // 🐺 NORDIC BACKGROUND MUSIC: "VARGSÅNGEN" (THE WOLF SONG)
  // ==========================================

  // Frequencies in Hz for A-minor / Dorian scale
  private static readonly NOTES = {
    REST: 0,
    E3: 164.81,
    F3: 174.61,
    G3: 196.00,
    A3: 220.00,
    B3: 246.94,
    C4: 261.63,
    D4: 293.66,
    E4: 329.63,
    F4: 349.23,
    G4: 392.00,
    A4: 440.00,
    B4: 493.88,
    C5: 523.25,
    D5: 587.33,
    E5: 659.25,
  };

  /**
   * Complete melody of "Vargsången" (The Wolf Song)
   * A traditional Nordic lullaby in A minor / Scandinavian folk mode
   */
  private getWolfSongScore(): { melody: NoteEvent[]; chords: { notes: number[]; duration: number }[] } {
    const N = SoundEngine.NOTES;
    const beat = 0.65; // ~92 BPM (relaxed, atmospheric)

    // Melody: Note and duration in beats
    const rawMelody: [number, number][] = [
      // Intro breathe
      [N.REST, 2 * beat],

      // Verse 1: "Vargen tjuter i nattens skog..."
      [N.A3, 1 * beat],
      [N.A3, 0.5 * beat],
      [N.C4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1.8 * beat],
      [N.REST, 0.2 * beat],

      // "...han vill men kan inte sova."
      [N.E4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.C4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.B3, 2.5 * beat],
      [N.REST, 0.5 * beat],

      // "Hungern river i hans vargabuk..."
      [N.A3, 1 * beat],
      [N.A3, 0.5 * beat],
      [N.C4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1.8 * beat],
      [N.REST, 0.2 * beat],

      // "...och det är kallt i hans stova."
      [N.E4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.C4, 0.5 * beat],
      [N.B3, 0.5 * beat],
      [N.A3, 2.8 * beat],
      [N.REST, 0.5 * beat],

      // Refrain: "Ulv, ulv, vihla i natten..."
      [N.C4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.C4, 1 * beat],

      // "...gör dig ett bo utav mossa."
      [N.D4, 1 * beat],
      [N.D4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.C4, 0.5 * beat],
      [N.B3, 2.5 * beat],
      [N.REST, 0.5 * beat],

      // "Sov, lilla vargen, natten är lång..."
      [N.C4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.E4, 1 * beat],
      [N.D4, 0.5 * beat],
      [N.C4, 1 * beat],

      // "...mor din ska vaka hos dig."
      [N.D4, 1 * beat],
      [N.C4, 0.5 * beat],
      [N.B3, 0.5 * beat],
      [N.B3, 0.5 * beat],
      [N.A3, 3.5 * beat],
      [N.REST, 1.5 * beat],
    ];

    // Accompanying Nordic acoustic harp / tagelharpa drone harmonies
    const rawChords: [number[], number][] = [
      [[N.A3, N.E4], 2 * beat],
      [[N.A3, N.C4, N.E4], 6 * beat], // Am
      [[N.G3, N.B3, N.D4], 5 * beat], // G
      [[N.A3, N.C4, N.E4], 6 * beat], // Am
      [[N.F3, N.A3, N.C4], 3 * beat], // F
      [[N.A3, N.E4], 3 * beat],       // Am
      [[N.C4, N.E4, N.G4], 6 * beat], // C
      [[N.G3, N.B3, N.D4], 5 * beat], // G
      [[N.C4, N.E4, N.G4], 6 * beat], // C
      [[N.E3, N.G3, N.B3], 3 * beat], // Em
      [[N.A3, N.C4, N.E4], 5 * beat], // Am
    ];

    return {
      melody: rawMelody.map(([note, duration]) => ({ note, duration })),
      chords: rawChords.map(([notes, duration]) => ({ notes, duration })),
    };
  }

  /**
   * Starts the quiet Nordic background music loop of The Wolf Song (Vargsången)
   */
  public startWolfSongMusic() {
    if (this.isMusicPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isMusicPlaying = true;

    // Create master music gain node
    if (!this.musicGainNode) {
      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.07, this.ctx.currentTime);
      this.musicGainNode.connect(this.ctx.destination);
    }

    // Start atmospheric Nordic drone & gentle forest breeze
    this.startNordicAtmosphere();

    // Start melody player loop
    this.playWolfSongCycle();
  }

  /**
   * Plays one cycle of Vargsången and schedules the next one seamlessly
   */
  private playWolfSongCycle() {
    if (!this.isMusicPlaying || !this.ctx || !this.musicGainNode) return;

    const score = this.getWolfSongScore();
    const startTime = this.ctx.currentTime + 0.1;
    let currentTime = startTime;

    // Play melody with a traditional Nordic wooden flute / flute-whistle sound
    score.melody.forEach(({ note, duration }) => {
      if (note > 0 && this.ctx && this.musicGainNode) {
        this.synthesizeFluteNote(note, currentTime, duration * 0.92);
      }
      currentTime += duration;
    });

    // Play soft acoustic harp / kantele accompaniment chords
    let chordTime = startTime;
    score.chords.forEach(({ notes, duration }) => {
      if (this.ctx && this.musicGainNode) {
        notes.forEach((freq, idx) => {
          this.synthesizeHarpNote(freq, chordTime + idx * 0.04, duration);
        });
      }
      chordTime += duration;
    });

    const totalCycleDuration = Math.max(currentTime - startTime, chordTime - startTime) + 2.0;

    // Schedule next seamless loop
    this.musicTimeoutId = window.setTimeout(() => {
      if (this.isMusicPlaying) {
        this.playWolfSongCycle();
      }
    }, totalCycleDuration * 1000);
  }

  /**
   * Synthesize Nordic Wooden Flute / Recorder with subtle vibrato and breath
   */
  private synthesizeFluteNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Flute warmth: Triangle + Sine mix via vibrato
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      // Subtle warm vibrato LFO (5 Hz)
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();
      lfo.frequency.setValueAtTime(4.8, startTime);
      lfoGain.gain.setValueAtTime(freq * 0.008, startTime); // subtle pitch vibrato
      lfo.connect(osc.frequency);
      lfo.start(startTime);
      lfo.stop(startTime + duration);

      // Warm lowpass filter (soft flute timbre)
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(freq * 3.2, startTime);
      filter.Q.setValueAtTime(1.5, startTime);

      // Gentle flute envelope (soft attack, sustained, soft release)
      const attack = Math.min(0.08, duration * 0.25);
      const release = Math.min(0.15, duration * 0.35);

      oscGain.gain.setValueAtTime(0.001, startTime);
      oscGain.gain.linearRampToValueAtTime(0.06, startTime + attack);
      oscGain.gain.setValueAtTime(0.05, startTime + duration - release);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(filter);
      filter.connect(oscGain);
      oscGain.connect(this.musicGainNode);

      osc.start(startTime);
      osc.stop(startTime + duration);
    } catch {
      // Ignore
    }
  }

  /**
   * Synthesize Soft Nordic Kantele / Harp Pluck
   */
  private synthesizeHarpNote(freq: number, startTime: number, duration: number) {
    if (!this.ctx || !this.musicGainNode) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      // Pluck decay envelope
      gain.gain.setValueAtTime(0.025, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + Math.min(duration * 0.8, 1.8));

      osc.connect(gain);
      gain.connect(this.musicGainNode);

      osc.start(startTime);
      osc.stop(startTime + Math.min(duration * 0.8, 1.8));
    } catch {
      // Ignore
    }
  }

  /**
   * Starts low, resonant Nordic Tagelharpa drone & mountain atmosphere
   */
  private startNordicAtmosphere() {
    if (!this.ctx || this.droneOscillators.length > 0) return;

    try {
      this.droneGainNode = this.ctx.createGain();
      this.droneGainNode.gain.setValueAtTime(this.isMuted ? 0 : 0.035, this.ctx.currentTime);
      this.droneGainNode.connect(this.ctx.destination);

      // Low A drone notes (55 Hz A1, 110 Hz A2, 164.8 Hz E3)
      const droneFreqs = [55.0, 110.0, 164.81];

      droneFreqs.forEach((freq) => {
        if (!this.ctx || !this.droneGainNode) return;
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, this.ctx.currentTime);

        osc.connect(filter);
        filter.connect(this.droneGainNode);

        osc.start();
        this.droneOscillators.push(osc);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Stops the background music
   */
  public stopWolfSongMusic() {
    this.isMusicPlaying = false;

    if (this.musicTimeoutId !== null) {
      clearTimeout(this.musicTimeoutId);
      this.musicTimeoutId = null;
    }

    this.droneOscillators.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignore
      }
    });
    this.droneOscillators = [];
  }

  // ==========================================
  // ✈️ SOUND EFFECTS (WHOOSH, HORNS, CLICKS)
  // ==========================================

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
