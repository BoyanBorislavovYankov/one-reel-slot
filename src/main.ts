import { App } from './core/app'

void (async () => {
  const app = new App()
	
  await app.start()
})()