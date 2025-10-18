export type ReelSymbol = 'SYM1' | 'SYM2' | 'SYM3' | 'SYM4' | 'SYM5' | 'SYM6'

export type SettingsResponse = {
  balance: number
  bet: number
  reel: ReelSymbol[]
}

export type BetResponse = {
  reelStopIndex: number
  balance: number
  winAmount: number
}

// Todo: replace MathDummy with a websocket connection to the backend server
export class MathDummy {
  protected static readonly REEL: ReelSymbol[] = [
    'SYM1', 'SYM5', 'SYM1', 'SYM3', 'SYM4', 'SYM3', 'SYM2', 'SYM4', 'SYM3', 'SYM6',
    'SYM3', 'SYM1', 'SYM6', 'SYM1', 'SYM2', 'SYM1', 'SYM2', 'SYM2', 'SYM2', 'SYM1',
    'SYM2', 'SYM1', 'SYM4', 'SYM1', 'SYM3', 'SYM6', 'SYM1', 'SYM3', 'SYM2', 'SYM5',
    'SYM3', 'SYM1', 'SYM2', 'SYM2', 'SYM2', 'SYM1', 'SYM4', 'SYM1', 'SYM4', 'SYM1',
    'SYM3', 'SYM2', 'SYM4', 'SYM4', 'SYM5', 'SYM2', 'SYM3', 'SYM1', 'SYM1', 'SYM1',
    'SYM4', 'SYM5', 'SYM2', 'SYM2', 'SYM2', 'SYM1', 'SYM5', 'SYM6', 'SYM1', 'SYM3',
    'SYM4', 'SYM2', 'SYM5', 'SYM2', 'SYM1', 'SYM5', 'SYM1', 'SYM2', 'SYM1', 'SYM1',
    'SYM1', 'SYM4', 'SYM4', 'SYM3', 'SYM3', 'SYM5', 'SYM5', 'SYM4', 'SYM2', 'SYM5',
    'SYM2', 'SYM1', 'SYM3', 'SYM2', 'SYM3', 'SYM1', 'SYM4', 'SYM3', 'SYM4', 'SYM2',
    'SYM3', 'SYM4', 'SYM1', 'SYM1', 'SYM1', 'SYM2', 'SYM6', 'SYM3', 'SYM2', 'SYM3',
    'SYM1', 'SYM5'
  ]

  protected _balance = 100
  protected _bet = 1

  public settings(): SettingsResponse {
    const response: SettingsResponse = {
      balance: this._balance,
      bet: this._bet,
      reel: MathDummy.REEL
    }

    return response
  }

  public bet(): BetResponse {
    this._balance -= this._bet
    const reelStopIndex = this.getRandomreelStopIndex()
    const winAmount = this.calculateWin(reelStopIndex)
    this._balance += winAmount

    const response: BetResponse = {
      reelStopIndex,
      balance: this._balance,
      winAmount,
    }
    
    return response
  }

  protected getRandomreelStopIndex(): number {
    return Math.floor(Math.random() * MathDummy.REEL.length)
  }

  protected calculateWin(reelStopIndex: number): number {
    const reelSymbols = [MathDummy.REEL[reelStopIndex] , MathDummy.REEL[reelStopIndex + 1], MathDummy.REEL[reelStopIndex + 3]]

    // 3 of a kind
    if (reelSymbols[0] === reelSymbols[1] && reelSymbols[1] === reelSymbols[2]) {
      return 3
    }

    // 2 of a kind
    if (reelSymbols[0] === reelSymbols[1] || reelSymbols[1] === reelSymbols[2] || reelSymbols[0] === reelSymbols[2]) {
      return 2
    }

    // no win
    return 0
  }
}