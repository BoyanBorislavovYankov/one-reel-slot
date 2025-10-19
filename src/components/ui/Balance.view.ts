import { Container, Text } from 'pixi.js'

import { ResourcesLoader } from '../../core/ResourcesLoared'

import { UI_CONFIG, UIConfig } from './UI.config'

export class BalanceView extends Container {
  protected _resourcesLoader: ResourcesLoader
  protected _config: UIConfig

  protected _lastWinText: Text
  protected _balanceText: Text

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader
    this._config = UI_CONFIG

    this.setPosition()

    this._lastWinText = this.createTextLabel()
    this._balanceText = this.createTextLabel()
    this._balanceText.y= this._config.balanceView.balanceTextOffsetY

    this.addChild(this._lastWinText, this._balanceText)
  }

  public updateLastWin(amount: number): void {
    this._lastWinText.text = `Last win: ${amount}`
  }

  public updateBalance(amount: number): void {
    this._balanceText.text = `Balance: ${amount}`
  }

  protected setPosition(): void {
    this.position.set(this._config.balanceView.position.x, this._config.balanceView.position.y)
  }

  protected createTextLabel(): Text {
    return new Text({
      text: '',
      style: this._config.balanceView.textStyle,
    })
  }
}
