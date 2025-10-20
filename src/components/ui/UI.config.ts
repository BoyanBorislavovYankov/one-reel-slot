export const UI_CONFIG = {
  spinButtonView: {
    position: { x: 87, y: 520 },
  },
  balanceView: {
    position: { x: 110, y: 460 },
    balanceTextOffsetY: 30,
    textStyle: {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
    }
  },
} as const

export type UIConfig = typeof UI_CONFIG
