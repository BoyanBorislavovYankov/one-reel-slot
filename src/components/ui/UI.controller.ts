import { Application } from 'pixi.js'

import { AppEventNames, EventBus } from '../../core/EventBus'
import { GameStateManager } from '../../core/GameStateManager'
import { ResourcesLoader } from '../../core/ResourcesLoared'

import { SpinButtonView } from './SpinButton.view'
import { BalanceView } from './Balance.view'

export class UIController {
  protected _PIXI: Application
  protected _resourcesLoader: ResourcesLoader
  protected _gameStateManager: GameStateManager

  protected _spinButtonView: SpinButtonView
  protected _balanceView: BalanceView

  constructor(PIXI: Application, resourcesLoader: ResourcesLoader, gameStateManager: GameStateManager) {    
    this._PIXI = PIXI
    this._resourcesLoader = resourcesLoader
    this._gameStateManager = gameStateManager

    this._spinButtonView = new SpinButtonView(resourcesLoader)
    this._balanceView = new BalanceView(resourcesLoader)

    PIXI.stage.addChild(this._spinButtonView, this._balanceView)

    this.addListeners()
  }

  protected addListeners(): void {
    EventBus.on(AppEventNames.GAME_READY, () => {
      this.onGameReady()
    })

    EventBus.on(AppEventNames.BET_RECEIVED, () => {
      this.onBetReceived()
    })
    
    EventBus.on(AppEventNames.REEL_SPIN_STOPPED, () => {
      this.onReelSpinStopped()
    })

    this._spinButtonView.on(SpinButtonView.SPIN_BUTTON_CLICKED, this.onSpinButtonClicked, this)
    this._spinButtonView.on(SpinButtonView.FORCE_STOP_CLICKED, this.onForceStopClicked, this)
  }

  protected onGameReady(): void {
    this._balanceView.updateBalance(this._gameStateManager.balance)
    
    this._spinButtonView.setActive(this._gameStateManager.isBalanceEnoughForBet())
  }

  protected onSpinButtonClicked(): void {
    if (!this._gameStateManager.isBalanceEnoughForBet()) {
      return
    }
    
    this._balanceView.updateBalance(this._gameStateManager.balance - this._gameStateManager.bet)

    EventBus.emit(AppEventNames.SPIN_BUTTON_CLICKED)
  }

  protected onBetReceived(): void {
    this._spinButtonView.isForceStopAllowed = true
  }

  protected onReelSpinStopped(): void {
    this._balanceView.updateBalance(this._gameStateManager.balance)
    this._balanceView.updateLastWin(this._gameStateManager.winAmount)

    this._spinButtonView.isForceStopAllowed = false
    this._spinButtonView.setActive(this._gameStateManager.isBalanceEnoughForBet())
  }

  protected onForceStopClicked(): void {
    EventBus.emit(AppEventNames.FORCE_STOP_CLICKED)
  }
}