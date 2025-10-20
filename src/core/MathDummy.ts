export type ReelSymbolName = 'SYM01' | 'SYM02' | 'SYM03' | 'SYM04' | 'SYM05' | 'SYM06'

export type SettingsResponse = {
  balance: number
  bet: number
  reel: ReelSymbolName[]
}

export type BetResponse = {
  reelStopIndex: number
  balance: number
  winAmount: number
  symbols: ReelSymbolName[]
}

// Todo: replace MathDummy with a websocket connection to the backend server
export class MathDummy {
  static readonly REEL: ReelSymbolName[] = [
    'SYM01', 'SYM05', 'SYM01', 'SYM03', 'SYM04', 'SYM03', 'SYM02', 'SYM04', 'SYM03', 'SYM06',
    'SYM03', 'SYM01', 'SYM06', 'SYM01', 'SYM02', 'SYM01', 'SYM02', 'SYM02', 'SYM02', 'SYM01',
    'SYM02', 'SYM01', 'SYM04', 'SYM01', 'SYM03', 'SYM06', 'SYM01', 'SYM03', 'SYM02', 'SYM05',
    'SYM03', 'SYM01', 'SYM02', 'SYM02', 'SYM02', 'SYM01', 'SYM04', 'SYM01', 'SYM04', 'SYM01',
    'SYM03', 'SYM02', 'SYM04', 'SYM04', 'SYM05', 'SYM02', 'SYM03', 'SYM01', 'SYM01', 'SYM01',
    'SYM04', 'SYM05', 'SYM02', 'SYM02', 'SYM02', 'SYM01', 'SYM05', 'SYM06', 'SYM01', 'SYM03',
    'SYM04', 'SYM02', 'SYM05', 'SYM02', 'SYM01', 'SYM05', 'SYM01', 'SYM02', 'SYM01', 'SYM01',
    'SYM01', 'SYM04', 'SYM04', 'SYM03', 'SYM03', 'SYM05', 'SYM05', 'SYM04', 'SYM02', 'SYM05',
    'SYM02', 'SYM01', 'SYM03', 'SYM02', 'SYM03', 'SYM01', 'SYM04', 'SYM03', 'SYM04', 'SYM02',
    'SYM03', 'SYM04', 'SYM01', 'SYM01', 'SYM01', 'SYM02', 'SYM06', 'SYM03', 'SYM02', 'SYM03',
    'SYM01', 'SYM05'
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
    const secondSymbolIndex = (reelStopIndex + 1) % MathDummy.REEL.length
    const thirdSymbolIndex = (reelStopIndex + 2) % MathDummy.REEL.length
    const winAmount = this.calculateWin(reelStopIndex, secondSymbolIndex, thirdSymbolIndex)
    
    this._balance += winAmount

    const response: BetResponse = {
      reelStopIndex,
      balance: this._balance,
      winAmount,
      symbols: [MathDummy.REEL[reelStopIndex], MathDummy.REEL[secondSymbolIndex], MathDummy.REEL[thirdSymbolIndex]]
    }
    
    return response
  }

  protected getRandomreelStopIndex(): number {
    return Math.floor(Math.random() * MathDummy.REEL.length)
  }

  protected calculateWin(firstSymbolIndex: number, secondSymbolIndex: number, thirdSymbolIndex: number): number {
    const reelSymbols = [MathDummy.REEL[firstSymbolIndex] , MathDummy.REEL[secondSymbolIndex], MathDummy.REEL[thirdSymbolIndex]]

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