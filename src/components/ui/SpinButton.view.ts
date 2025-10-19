import { Container, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/ResourcesLoader/ResourcesLoared'

import { UI_CONFIG, UIConfig } from './UI.config'

export class SpinButtonView extends Container {
  public static readonly BUTTON_CLICKED = 'BUTTON_CLICKED'

  protected static readonly ACTIVE_TEXTURE = 'PLAY.png'
  protected static readonly INACTIVE_TEXTURE = 'PLAY_DISABLED.png'

  protected _resourcesLoader: ResourcesLoader
  protected _config: UIConfig

  protected _button: Sprite
  protected _isActive: boolean = true

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader
    this._config = UI_CONFIG

    this.setPosition()

    this._button = this.createSpinButton()

    this.addChild(this._button)
  }

  public setActive(isActive: boolean): void {
    const textureName = isActive ? SpinButtonView.ACTIVE_TEXTURE: SpinButtonView.INACTIVE_TEXTURE
    const resources = this._resourcesLoader.loadedResources

    this._button.texture = resources.mainResources.textures[textureName]

    this._isActive = isActive
    this._button.interactive = isActive
  }

  protected setPosition(): void{
    this.position.set(this._config.spinButtonView.position.x, this._config.spinButtonView.position.y)
  }

  protected createSpinButton(): Sprite {
    const resources = this._resourcesLoader.loadedResources
    const texture = resources.mainResources.textures[SpinButtonView.ACTIVE_TEXTURE]
    const button = new Sprite(texture)

    button.interactive = true

    button.on('pointerup', () => {
      this.onButtonClicked()
    })

    return button
  }

  protected onButtonClicked(): void {
    if (!this._isActive) {
      return
    }

    this.setActive(false)
    this._button.interactive = false
    
    this.emit(SpinButtonView.BUTTON_CLICKED)
  }
}