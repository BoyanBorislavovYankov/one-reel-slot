import { Container, Text, TextStyle } from 'pixi.js'
import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'

export class BalanceView extends Container {
  protected _resourcesLoader: ResourcesLoader
  protected _lastWinText: Text
  protected _balanceText: Text

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader

    this.setPosition()

    this._lastWinText = this.createTextLabel()
    this._balanceText = this.createTextLabel()
    this._balanceText.y= 30
    
    this.updateLastWin(0)
    this.updateBalance(100)
    this.addChild(this._lastWinText, this._balanceText)
  }

  public updateLastWin(amount: number): void {
    this._lastWinText.text = `Last win: ${amount}`
  }

  public updateBalance(amount: number): void {
    this._balanceText.text = `Balance: ${amount}`
  }

  protected setPosition(): void {
    this.position.set(50, 430)
  }

  protected createTextLabel(): Text {
    const labelStyle = new TextStyle({
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
    })

    return new Text('', labelStyle)
  }
}
