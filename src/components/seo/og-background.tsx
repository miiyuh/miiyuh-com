const GRID_LINE = "rgba(250, 243, 224, 0.1)";
const GRID_SIZE = 60;
const NOISE_TILE = 100;

/**
 * Shared backdrop for generated OG images: a faint grid + a tiled noise
 * texture so the image has some depth/texture instead of flat black.
 */
export function getOgBackgroundStyle(noiseDataUrl: string) {
  return {
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "1200px",
    height: "630px",
    display: "flex",
    backgroundColor: "#070707",
    backgroundImage: [
      `url(${noiseDataUrl})`,
      `repeating-linear-gradient(to right, ${GRID_LINE} 0, ${GRID_LINE} 1px, transparent 1px, transparent ${GRID_SIZE}px)`,
      `repeating-linear-gradient(to bottom, ${GRID_LINE} 0, ${GRID_LINE} 1px, transparent 1px, transparent ${GRID_SIZE}px)`,
    ].join(", "),
    backgroundSize: `${NOISE_TILE}px ${NOISE_TILE}px, 100% 100%, 100% 100%`,
    backgroundRepeat: "repeat, no-repeat, no-repeat",
  };
}
