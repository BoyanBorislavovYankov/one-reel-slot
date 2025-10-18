import { BetResponse, MathDummy, ReelSymbol, SettingsResponse } from './MathDummy'
import { AppEventNames, EventBus } from './EventBus'

export class GameStateManager {
  protected _math: MathDummy

  protected _balance: number = 0
  protected _bet: number = 0
  protected _winAmount: number = 0
  protected _reelStopIndex = 0
  protected _reel: ReelSymbol[] = []

  constructor() {
    // Todo: replace MathDummy with a websocket connection to the backend server
    this._math = new MathDummy()
  }

  get balance(): number {
    return this._balance
  }

  get bet(): number {
    return this._bet
  }

  get winAmount(): number {
    return this._winAmount
  }

  get reel(): string[] {
    return this.reel
  }

  public async init(): Promise<void> {
    const settings: SettingsResponse = this._math.settings()

    this._balance = settings.balance
    this._bet = settings.bet
    this._reel = settings.reel

    this.addListeners()
    
    EventBus.emit(AppEventNames.GAME_READY)
  }

  protected addListeners(): void {
    EventBus.on(AppEventNames.SPIN_BUTTON_CLICKED, () => {
      this.onSpinButtonClicked()
    })
  }

  protected async onSpinButtonClicked(): Promise<void> {
    const betResponse: BetResponse = this._math.bet()

    this._reelStopIndex = betResponse.reelStopIndex
    this._balance = betResponse.balance
    this._winAmount = betResponse.winAmount

    EventBus.emit(AppEventNames.BET_RECEIVED)
  }
}
