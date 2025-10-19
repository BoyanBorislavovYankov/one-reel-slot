import { Container, Graphics, Sprite } from 'pixi.js'

import { ResourcesLoader } from '../../core/ResourcesLoader/ResourcesLoared'

import { REEL_CONFIG, ReelConfig } from './Reel.config'
import { ReelSymbol } from './ReelSymbol.view'

export class ReelView extends Container {
  protected _resourcesLoader: ResourcesLoader
  protected _config: ReelConfig

  protected _symbols: ReelSymbol[] = []
  protected _mask?: Graphics

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader
    this._config = REEL_CONFIG

    this.setPosition()

    this.addReelBackground()
    this.addSymbolsMask()
    this.addSymbols()
  }

  protected setPosition(): void{
    this.position.set(this._config.reelView.position.x, this._config.reelView.position.y)
  }

  protected addReelBackground(): void {
    const resources = this._resourcesLoader.loadedResources
    const textureName = this._config.reelView.backgroundTexture
    const texture = resources.mainResources.textures[textureName]
    const background = new Sprite(texture)

    this.addChild(background)
  }
    
  protected addSymbolsMask(): void {
    const x = this._config.reelView.reelPadding.x
    const y = this._config.reelView.reelPadding.y
    const width = this._config.reelView.symbolWidth
    const height = this._config.reelView.symbolHeight * this._config.reelView.visibleSymbolsNumber

    this._mask = new Graphics()
    this._mask.beginFill(0xff0000)
    this._mask.drawRect(x, y, width, height)
    this._mask.endFill()

    this.addChild(this._mask)
  }

  protected addSymbols(): void {
    for (let i = -1; i < this._config.reelView.visibleSymbolsNumber; i++) {
      const resources = this._resourcesLoader.loadedResources
      const texture = resources.mainResources.textures['SYM01.png']
      const symbol = new ReelSymbol(texture)

      symbol.reelPosition = i
      symbol.reelIndex = 0
      
      if (this._mask) {
        symbol.mask = this._mask
      }

      this.positionSymbol(symbol)
      this._symbols.push(symbol)
      this.addChild(symbol)
    } 
  }

  protected positionSymbol(symbol: ReelSymbol): void {
    const x = this._config.reelView.reelPadding.x
    const y = symbol.reelPosition * this._config.reelView.symbolHeight + this._config.reelView.reelPadding.y

    symbol.position.set(x, y)
  }
}