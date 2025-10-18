import { Container, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'

export class ReelView extends Container {
  protected _resourcesLoader: ResourcesLoader

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader

    this.setPosition()

    const reelBackground = this.createReelBackground()
    const reelSymbol = this.createReelSymbol()

    this.addChild(reelBackground, reelSymbol)
  }

  protected setPosition(): void{
    this.position.set(50, 20)
  }

  protected createReelBackground(): Sprite {
    const resources = this._resourcesLoader.loadedResources
    const texture = resources.mainResources.textures['REEL.png']

    return new Sprite(texture)
  }

  protected createReelSymbol(): Sprite {
    const resources = this._resourcesLoader.loadedResources
    const texture = resources.mainResources.textures['SYM01.png']

    return new Sprite(texture)
  }
}