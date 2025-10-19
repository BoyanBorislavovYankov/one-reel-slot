import { Application } from 'pixi.js'

import { AppEventNames, EventBus } from '../../core/EventBus'
import { GameStateManager } from '../../core/GameStateManager'
import { ResourcesLoader } from '../../core/ResourcesLoared'

import { ReelView } from './Reel.view'

export class ReelController {
  protected _PIXI: Application
  protected _resourcesLoader: ResourcesLoader
  protected _gameStateManager: GameStateManager

  protected _reelView: ReelView

  constructor(PIXI: Application, resourcesLoader: ResourcesLoader, gameStateManager: GameStateManager) {    
    this._PIXI = PIXI
    this._resourcesLoader = resourcesLoader
    this._gameStateManager = gameStateManager

    this._reelView = new ReelView(resourcesLoader)

    PIXI.stage.addChild(this._reelView)

    this.addListeners()
  }

  protected addListeners(): void {
    EventBus.on(AppEventNames.GAME_READY, () => {
      this.onGameReady()
    })

    EventBus.on(AppEventNames.SPIN_BUTTON_CLICKED, () => {
      this.onSpinButtonClicked()
    })
    

    EventBus.on(AppEventNames.BET_RECEIVED, () => {
      this.onBetReceived()
    })

    this._reelView.on(ReelView.REEL_STARTED, this.onReelStarted, this)
    this._reelView.on(ReelView.REEL_STOPPED, this.onReelStopped, this)
  }

  protected onGameReady(): void {
    this._reelView.reel = this._gameStateManager.reel
    this._reelView.addReelElements()
  }

  protected onSpinButtonClicked(): void {
    this._reelView.startRotation()
  }

  protected onBetReceived(): void {
    this._reelView.reelStopIndex = this._gameStateManager.reelStopIndex
  }

  protected onReelStarted(): void {
    EventBus.emit(AppEventNames.REEL_SPIN_STARTED)
  }

  protected onReelStopped(): void {
    EventBus.emit(AppEventNames.REEL_SPIN_STOPPED)
  }
}