/* eslint-disable @typescript-eslint/no-unused-vars */
import { Application } from 'pixi.js'

import { AppEventNames, EventBus } from './EventBus'
import { MathDummy } from './MathDummy'
import { GameStateManager } from './GameStateManager'
import { ResourcesLoader } from './ResourcesLoader/ResourcesLoared'
import { ReelController } from '../components/reel/Reel.controller'
import { UIController } from '../components/ui/UI.controller'

export class App{
  protected _PIXI: Application
  protected _loader?: ResourcesLoader
  protected _gameStateManager: GameStateManager

  constructor() {
    this._PIXI = new Application()
    this._gameStateManager = new GameStateManager()
  }

  public async start(): Promise<void> {
    // eslint-disable-next-line no-undef
    await this._PIXI.init({ background: '#054066ff', resizeTo: window })

    // eslint-disable-next-line no-undef
    document.body.appendChild(this._PIXI.canvas)

    this._loader = new ResourcesLoader({ mainResources: './assets/texture.json' })
    await this._loader.load()

    new UIController(this._PIXI, this._loader, this._gameStateManager)
    new ReelController(this._PIXI, this._loader, this._gameStateManager)

    await this._gameStateManager.init()
    /*

    EventBus.on(AppEventNames.SPIN_BUTTON_CLICKED, () => {
      this.onSpinButtonClicked()
    })
      */
  }

  /*
  protected onSpinButtonClicked(): void {
    const betResponse = math.bet()

    console.log(betResponse)
  }
  */
}