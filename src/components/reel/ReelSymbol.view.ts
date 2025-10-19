import { Sprite, Texture } from 'pixi.js'

import { REEL_CONFIG, ReelConfig } from './Reel.config'

export class ReelSymbol extends Sprite {
  public reelIndex: number = 0
  public reelPosition: number = 0

  protected _config: ReelConfig

  constructor(texture: Texture) {
    super(texture)

    this._config = REEL_CONFIG
  }
}