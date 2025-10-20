export const REEL_CONFIG = {
  position: { x: 110, y: 30 },
  backgroundTexture: 'REEL.png',
  visibleSymbolsNumber: 3,
  symbolWidth: 128, 
  symbolHeight: 128, 
  reelPadding: { x: 6, y: 6 },
  minimumSpinTime: 2,
  reelRotationSpeed: 50,
  minimumRotationSpeed: 10,
  reelDecelerationWhenStopping: 0.3,
} as const

export type ReelConfig = typeof REEL_CONFIG
