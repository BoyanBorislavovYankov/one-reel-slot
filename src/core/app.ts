import { Application, } from 'pixi.js'

import { MathDummy } from './mathDummy/MathDummy'
import { ResourcesLoader } from './resourcesLoader/ResourcesLoared'
import { Reel } from '../components/reel/Reel'

export class App{
  protected _app: Application

  constructor() {
    this._app = new Application()
  }

  public async start(): Promise<void> {
    // eslint-disable-next-line no-undef
    await this._app.init({ background: '#aabbff', resizeTo: window })

    // eslint-disable-next-line no-undef
    document.body.appendChild(this._app.canvas)

    const resourcesLoader = new ResourcesLoader({ mainResources: './assets/texture.json' })
    
    await resourcesLoader.load()

    const math = new MathDummy()
    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const settingsResponse = math.settings()

    const reel = new Reel(resourcesLoader)

    this._app.stage.addChild(reel.container)

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const betResponse = math.bet()
  }
}