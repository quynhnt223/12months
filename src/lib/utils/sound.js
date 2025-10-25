// sound.js - Simple sound effects helper using Web Audio API

class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.init();
  }

  init() {
    // Create audio context on first user interaction
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
  }

  // Pop sound - short click
  createPop1() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(800, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      400,
      ctx.currentTime + 0.1
    );

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.1);
  }

  // Pop sound 2 - higher pitch
  createPop2() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(1200, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      600,
      ctx.currentTime + 0.08
    );

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.08);
  }

  // Toggle on sound
  createToggleOn() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(600, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      900,
      ctx.currentTime + 0.15
    );

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.15);
  }

  // Toggle off sound
  createToggleOff() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(900, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      600,
      ctx.currentTime + 0.12
    );

    gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.12);
  }

  // Success sound
  createSuccess() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(523, ctx.currentTime); // C
    oscillator.frequency.setValueAtTime(659, ctx.currentTime + 0.1); // E
    oscillator.frequency.setValueAtTime(784, ctx.currentTime + 0.2); // G

    gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.3);
  }

  // Error sound
  createError() {
    const ctx = this.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(400, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      200,
      ctx.currentTime + 0.2
    );

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.2);
  }

  play(soundName) {
    this.init(); // Ensure audio context exists

    switch (soundName) {
      case "pop1":
        this.createPop1();
        break;
      case "pop2":
        this.createPop2();
        break;
      case "toggle-on":
        this.createToggleOn();
        break;
      case "toggle-off":
        this.createToggleOff();
        break;
      case "success":
        this.createSuccess();
        break;
      case "error":
        this.createError();
        break;
      default:
        console.warn(`Sound "${soundName}" not found`);
    }
  }
}

// Create singleton instance
const soundEffects = new SoundEffects();

// Setup sound effects for elements with sound classes
export function setupSoundEffects() {
  const soundClasses = [
    "pop1",
    "pop2",
    "toggle-on",
    "toggle-off",
    "success",
    "error",
  ];

  soundClasses.forEach((soundClass) => {
    document.addEventListener(
      "click",
      (e) => {
        const target = e.target.closest(`.${soundClass}`);
        if (target) {
          soundEffects.play(soundClass);
        }
      },
      true
    );
  });
}

// Export for manual use
export { soundEffects };
