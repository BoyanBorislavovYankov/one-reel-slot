import { Application } from 'pixi.js'

import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'
import { ReelView } from './Reel.view'

export class ReelController {
  protected _PIXI: Application
  protected _resourcesLoader: ResourcesLoader
  protected _reelView: ReelView

  constructor(PIXI: Application, resourcesLoader: ResourcesLoader) {    
    this._PIXI = PIXI
    this._resourcesLoader = resourcesLoader
    this._reelView = new ReelView(resourcesLoader)

    PIXI.stage.addChild(this._reelView)
  }
}