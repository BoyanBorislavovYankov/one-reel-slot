import { Emitter, EventMap } from 'strict-event-emitter'

// define app event names
export const AppEventNames = {
  GAME_READY: 'GAME_READY',
  SPIN_BUTTON_CLICKED: 'SPIN_BUTTON_CLICKED',
  REEL_SPIN_STARTED: 'REEL_SPIN_STARTED',
  FORCE_STOP_CLICKED: 'FORCE_STOP_CLICKED',
  BET_RECEIVED: 'BET_RECEIVED',
  REEL_SPIN_STOPPED: 'REEL_SPIN_STOPPED',
} as const

export type AppEventName = typeof AppEventNames[keyof typeof AppEventNames]

// define app events with payload
interface AppEvents extends EventMap {
  [AppEventNames.GAME_READY]: []
  [AppEventNames.SPIN_BUTTON_CLICKED]: []
  [AppEventNames.REEL_SPIN_STARTED]: []
  [AppEventNames.FORCE_STOP_CLICKED]: []
  [AppEventNames.BET_RECEIVED]: []
  [AppEventNames.REEL_SPIN_STOPPED]: []
}

export const EventBus = new Emitter<AppEvents>()