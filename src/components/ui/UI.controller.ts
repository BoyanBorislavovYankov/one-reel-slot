import { Application } from 'pixi.js'

import { ResourcesLoader } from '../../core/resourcesLoader/ResourcesLoared'
import { SpinButtonView } from './SpinButton.view'
import { BalanceView } from './Balance.view'

export class UIController {
  protected _PIXI: Application
  protected _resourcesLoader: ResourcesLoader
  protected _spinButtonView: SpinButtonView
  protected _balanceView: BalanceView

  constructor(PIXI: Application, resourcesLoader: ResourcesLoader) {    
    this._PIXI = PIXI
    this._resourcesLoader = resourcesLoader

    this._spinButtonView = new SpinButtonView(resourcesLoader)
    this._balanceView = new BalanceView(resourcesLoader)

    PIXI.stage.addChild(this._spinButtonView, this._balanceView)
  }
}