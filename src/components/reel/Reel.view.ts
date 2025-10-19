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
    // this.setRandomReelRotation()
    this.addSymbols()
  }

  public startRotation(): void {
    this.emit(ReelView.REEL_STARTED)

    let isRotationStopping = false

    // Todo: start and stop the timeline smoothly
    const timeline = gsap.to(this._symbols, {
      ease: 'none',
      repeat: -1,
      onUpdate: () => {
        let shouldChangeSymbol = false

        if (timeline.totalTime() > this._config.reelView.minimumSpinTime) {
          isRotationStopping = true
        }

        // move symbols down
        for (let i = 0; i < this._symbols.length; i++) {
          const symbol = this._symbols[i]

          symbol.y += this._config.reelView.reelRotationSpeed

          if (symbol.y >= this._config.reelView.symbolHeight * 3) {
            shouldChangeSymbol = true
          }
        }

        // when any symbol crosses the bottom threshold
        if (shouldChangeSymbol) {
          // rotate the reel with one symbol, reseting at the end of the reel
          this._reelCurrentRotation = (this._reelCurrentRotation + 1) % this._reel.length

          // update the symbols so that the bottom one moves to the top
          for (let i = 0; i < this._symbols.length; i++) {
            const symbol = this._symbols[i]
            const isLastSymbol = symbol.reelPosition === this._config.reelView.visibleSymbolsNumber - 1

            if (isLastSymbol) {
              symbol.reelPosition = -1
              symbol.y -= this._config.reelView.symbolHeight * (this._config.reelView.visibleSymbolsNumber + 1)
              symbol.reelIndex = this.getReelIndexByReelPosition(symbol.reelPosition)
              
              const symbolName = this._reel[symbol.reelIndex]
              const resources = this._resourcesLoader.loadedResources
              const texture = resources.mainResources.textures[`${symbolName}.png`]

              symbol.texture = texture
            } else {
              symbol.reelPosition += 1
            }
          }
        }

        const firstSymbol = this._symbols.find(s => s.reelPosition === 2)
        const hasReachedStopIndex = firstSymbol?.reelIndex === this._reelStopIndex

        // stop the rotation when the target index has been reached
        if (isRotationStopping && shouldChangeSymbol && hasReachedStopIndex) {
          timeline.kill()

          for (let i = 0; i < this._symbols.length; i++) {
            const symbol = this._symbols[i]
            
            this.positionSymbol(symbol)
          }

          this.onReelStopped()

          return
        }
      },
    })
  }

  protected animateNextSymbol(): void {
    this._symbols.forEach(symbol => {
      const isLastSymbol = symbol.reelPosition === this._config.reelView.visibleSymbolsNumber - 1

      // move the last symbol first, as it is not visible anymore
      if (isLastSymbol) {
        symbol.reelPosition = -1
        symbol.y -= this._config.reelView.symbolHeight * (this._config.reelView.visibleSymbolsNumber + 1)
      } else {
        symbol.reelPosition += 1
      }
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
      const reelPosition = i
      const symbolReelIndex = this.getReelIndexByReelPosition(reelPosition)
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

  protected getReelIndexByReelPosition(reelPosition: number): number {
    let symbolReelIndex = this._reelCurrentRotation - reelPosition

    // if more than reel length, start over from 0
    symbolReelIndex = symbolReelIndex % this._reel.length

    // if negative, wrap around to the end
    if (symbolReelIndex < 0) {
      symbolReelIndex += this._reel.length
    }

    return symbolReelIndex
  }

  protected positionSymbol(symbol: ReelSymbol): void {
    const x = this._config.reelView.reelPadding.x
    const y = symbol.reelPosition * this._config.reelView.symbolHeight + this._config.reelView.reelPadding.y

    symbol.position.set(x, y)
  }

  protected onReelStopped(): void {
    this.emit(ReelView.REEL_STOPPED)
  }
}