import { defineSound } from "@web-kits/audio";

// The "pop" sound from @web-kits/audio's own quickstart example
// (https://audio.raphaelsalaja.com/). Each call accepts per-play overrides
// (detune/playbackRate) so repeated clicks don't sound robotically identical.
export const playClickSound = defineSound({
  source: { type: "sine", frequency: { start: 400, end: 150 } },
  envelope: { decay: 0.05 },
  gain: 0.35,
});
