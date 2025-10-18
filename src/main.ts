import { App } from './core/App'

void (async () => {
  const app = new App()
	
  await app.start()
})()