import { Container, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/ResourcesLoared'

import { UI_CONFIG, UIConfig } from './UI.config'

export class SpinButtonView extends Container {
  public static readonly SPIN_BUTTON_CLICKED = 'SPIN_BUTTON_CLICKED'
  public static readonly FORCE_STOP_CLICKED = 'FORCE_STOP_CLICKED'
  
  protected static readonly ACTIVE_TEXTURE = 'PLAY.png'
  protected static readonly INACTIVE_TEXTURE = 'PLAY_DISABLED.png'

  protected _resourcesLoader: ResourcesLoader
  protected _config: UIConfig

  protected _button: Sprite
  protected _isActive: boolean = true
  protected _isForceStopAllowed: boolean = false

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader
    this._config = UI_CONFIG

    this.setPosition()

    this._button = this.createSpinButton()

    this.addChild(this._button)
  }

  set isForceStopAllowed(isForceStopAllowed: boolean) {
    this._isForceStopAllowed = isForceStopAllowed
    this._button.interactive = isForceStopAllowed
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
    if (this._isActive) {
      this.setActive(false)
      this._button.interactive = false
      
      this.emit(SpinButtonView.SPIN_BUTTON_CLICKED)
    } else if (this._isForceStopAllowed) {
      this.emit(SpinButtonView.FORCE_STOP_CLICKED)
    }
  }
}