/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Application } from 'pixi.js'

import { MathDummy } from './mathDummy/MathDummy'
import { ResourcesLoader } from './resourcesLoader/ResourcesLoared'
import { ReelController } from '../components/reel/Reel.controller'
import { UIController } from '../components/ui/UI.controller'

export class App{
  protected _PIXI: Application
  protected _loader: ResourcesLoader | undefined

  constructor() {
    this._PIXI = new Application()
  }

  public async start(): Promise<void> {
    // eslint-disable-next-line no-undef
    await this._PIXI.init({ background: '#054066ff', resizeTo: window })

    // eslint-disable-next-line no-undef
    document.body.appendChild(this._PIXI.canvas)

    this._loader = new ResourcesLoader({ mainResources: './assets/texture.json' })
    await this._loader.load()

    const math = new MathDummy()
    const settingsResponse = math.settings()
    const reelController = new ReelController(this._PIXI, this._loader)
    const uIController = new UIController(this._PIXI, this._loader)
    const betResponse = math.bet()
  }
}