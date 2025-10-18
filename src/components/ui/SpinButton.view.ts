import { Container, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'

export class SpinButtonView extends Container {
  protected _resourcesLoader: ResourcesLoader

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader

    this.setPosition()

    const spinButton = this.createSpinButton()

    this.addChild(spinButton)
  }

  protected setPosition(): void{
    this.position.set(25, 490)
  }

  protected createSpinButton(): Sprite {
    const resources = this._resourcesLoader.loadedResources
    const texture = resources.mainResources.textures['PLAY.png']

    return new Sprite(texture)
  }
}