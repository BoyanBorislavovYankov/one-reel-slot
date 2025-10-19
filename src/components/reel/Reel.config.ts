export const REEL_CONFIG = {

  reelView: {
    position: { x: 50, y: 20 },
    backgroundTexture: 'REEL.png',
    visibleSymbolsNumber: 3,
    symbolWidth: 128, 
    symbolHeight: 128, 
    reelPadding: { x: 6, y: 6 },
    spinTime: 3,
  },
  reelSymbol: {}
} as const

export type ReelConfig = typeof REEL_CONFIG
