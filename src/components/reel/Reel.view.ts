import { Container, Graphics, Sprite } from 'pixi.js'
import { gsap } from 'gsap'

import { ReelSymbolName } from '../../core/MathDummy'
import { ResourcesLoader } from '../../core/ResourcesLoared'

import { REEL_CONFIG, ReelConfig } from './Reel.config'
import { ReelSymbol } from './ReelSymbol.view'

export class ReelView extends Container {
  public static readonly REEL_STARTED = 'REEL_STARTED'
  public static readonly REEL_STOPPED = 'REEL_STOPPED'

  protected _resourcesLoader: ResourcesLoader
  protected _config: ReelConfig

  protected _symbols: ReelSymbol[] = []
  protected _mask?: Graphics
  protected _reel: ReelSymbolName[] = []
  protected _reelStopIndex: number = 0
  protected _reelCurrentRotation: number = 0

  constructor(resourcesLoader: ResourcesLoader) {
    super()

    this._resourcesLoader = resourcesLoader
    this._config = REEL_CONFIG

    this.setPosition()
  }

  set reel(reel: ReelSymbolName[]) {
    this._reel = reel
  }

  set reelStopIndex(reelStopIndex: number) {
    // Todo: when integrating with a backend, extend the spin time until reelStopIndex is set
    this._reelStopIndex = reelStopIndex
  }

  public addReelElements(): void {
    this.addReelBackground()
    this.addSymbolsMask()
    this.setRandomReelRotation()
    this.addSymbols()
  }

  public startRotation(): void {
    this.emit(ReelView.REEL_STARTED)

    gsap.delayedCall(this._config.reelView.spinTime, () => {
      this.emit(ReelView.REEL_STOPPED)
    })
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

  protected setRandomReelRotation(): void {
    this._reelCurrentRotation = Math.floor(Math.random() * this._reel.length)
  }

  protected addSymbols(): void {
    for (let i = -1; i < this._config.reelView.visibleSymbolsNumber; i++) {      
      const symbolReelIndex = (this._reelCurrentRotation + i) % this._reel.length
      const symbolName = this._reel[symbolReelIndex]
      const resources = this._resourcesLoader.loadedResources
      const texture = resources.mainResources.textures[`${symbolName}.png`]
      const symbol = new ReelSymbol(texture)

      symbol.reelPosition = i
      symbol.reelIndex = symbolReelIndex
      
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