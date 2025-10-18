import { Application } from 'pixi.js'

import { AppEventNames, EventBus } from '../../core/EventBus'
import { GameStateManager } from '../../core/GameStateManager'
import { ResourcesLoader } from '../../core/ResourcesLoader/ResourcesLoared'

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

    EventBus.on(AppEventNames.BET_RECEIVED, () => {
      this.onBetReceived()
    })
  }

  protected onGameReady(): void {
    // Todo: add reel symbols
  }

  protected onBetReceived(): void {
    // Todo: spin the reels
    EventBus.emit(AppEventNames.REEL_SPIN_STOPPED)
  }
}