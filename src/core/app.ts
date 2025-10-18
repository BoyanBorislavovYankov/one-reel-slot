import { Application, } from 'pixi.js'
import { ResourcesLoader } from './resourcesLoader/ResourcesLoared'
import { Reel } from '../components/reel/Reel'

export class App{
  protected _app: Application

  constructor() {
    this._app = new Application()
  }

  public async start(): Promise<void> {
    // eslint-disable-next-line no-undef
    await this._app.init({ background: '#1099bb', resizeTo: window })

    // eslint-disable-next-line no-undef
    document.body.appendChild(this._app.canvas)

    const resourcesLoader = new ResourcesLoader({ mainResources: './assets/texture.json' })
    
    await resourcesLoader.load()

    const reel = new Reel(resourcesLoader)

    this._app.stage.addChild(reel.container)
  }
}