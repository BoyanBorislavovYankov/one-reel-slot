export const UI_CONFIG = {
  spinButtonView: {
    position: { x: 25, y: 490 },
  },
  balanceView: {
    position: { x: 50, y: 430 },
    balanceTextOffsetY: 30,
    textStyle: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
    }
  },
} as const

export type UIConfig = typeof UI_CONFIG
