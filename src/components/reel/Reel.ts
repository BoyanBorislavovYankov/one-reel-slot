import { Container, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'

export class Reel {
  protected _resourcesLoader: ResourcesLoader
  protected _reelContainer: Container

  public get container(): Container {
    return this._reelContainer
  }

  constructor(resourcesLoader: ResourcesLoader) {
    this._resourcesLoader = resourcesLoader
    this._reelContainer = new Container()

    const resources = this._resourcesLoader.loadedResources
    const reelSprite = new Sprite(resources.mainResources.textures['REEL.png'])

    // reelSprite.anchor.set(0.5)
    // reelSprite.x = this.app.screen.width / 2
    // reelSprite.y = this.app.screen.height / 2

    this._reelContainer.addChild(reelSprite)
  }
}