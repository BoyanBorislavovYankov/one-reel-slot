import { Assets, Spritesheet, SpritesheetData } from 'pixi.js'

export type Resources = Record<string, Spritesheet<SpritesheetData>>

export class ResourcesLoader {
  protected _resources: Record<string, string>
  protected _loadedResources: Resources

  public get loadedResources(): Resources {
    return this._loadedResources
  }

  constructor(resources: Record<string, string>) {
    this._resources = resources
    this._loadedResources = {}
  }

  public async load(): Promise<void> {
    for (const resourceName in this._resources) {
      const path = this._resources[resourceName]
      const loadedResource: unknown = await Assets.load(path)

      if (!(loadedResource instanceof Spritesheet)) {
        throw new Error(`Resource ${resourceName} is not a Spritesheet`)
      }

      this._loadedResources[resourceName] = loadedResource as Spritesheet<SpritesheetData>
    }
  }
}
