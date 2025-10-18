import { Application } from 'pixi.js'


import { AppEventNames, EventBus } from '../../core/EventBus'
import { GameStateManager } from '../../core/GameStateManager'
import { ResourcesLoader } from '../../core/ResourcesLoader/ResourcesLoared'

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

    this._spinButtonView.on(SpinButtonView.BUTTON_CLICKED, this.onSpinButtonClicked, this)
  }

  protected onGameReady(): void {
    this._balanceView.updateBalance(this._gameStateManager.balance)
  }

  protected onSpinButtonClicked(): void {
    EventBus.emit(AppEventNames.SPIN_BUTTON_CLICKED)
  }

  protected onBetReceived(): void {
    this._balanceView.updateBalance(this._gameStateManager.balance)
    this._balanceView.updateLastWin(this._gameStateManager.winAmount)
  }

  protected onReelSpinStopped(): void {
    const isBalanceEnoughForBet = this._gameStateManager.balance > 0

    this._spinButtonView.setActive(isBalanceEnoughForBet)
  }
}