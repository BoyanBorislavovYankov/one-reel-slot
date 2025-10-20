 
import { Application } from 'pixi.js'

import { GameStateManager } from './GameStateManager'
import { ResourcesLoader } from './ResourcesLoared'

import { ReelController } from '../components/reel/Reel.controller'
import { UIController } from '../components/ui/UI.controller'

export class App{
  static readonly GAME_WIDTH = 360
  static readonly GAME_HEIGHT = 800

  protected _PIXI: Application
  protected _loader?: ResourcesLoader
  protected _gameStateManager: GameStateManager

  constructor() {
    this._PIXI = new Application()
    this._gameStateManager = new GameStateManager()
  }

  public async start(): Promise<void> {
    await this._PIXI.init({
      background: '#054066ff',
      width: App.GAME_WIDTH,
      height: App.GAME_HEIGHT,
    })

    // eslint-disable-next-line no-undef
    document.body.appendChild(this._PIXI.canvas)

    this._loader = new ResourcesLoader({ mainResources: './assets/texture.json' })
    await this._loader.load()

    new UIController(this._PIXI, this._loader, this._gameStateManager)
    new ReelController(this._PIXI, this._loader, this._gameStateManager)

    await this._gameStateManager.init()
  }
}