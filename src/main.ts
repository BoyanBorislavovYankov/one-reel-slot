import { Application, Assets, Sprite, Container } from 'pixi.js';

(async () =>
{   // Create the application
    const app = new Application();

    await app.init({ background: '#1099bb', resizeTo: window });

    document.body.appendChild(app.canvas);

    // Load the spritesheet
    const sheet = await Assets.load('./assets/texture.json');

    const reelSprite = new Sprite(sheet.textures['REEL.png']);

    reelSprite.anchor.set(0.5);
    reelSprite.x = app.screen.width / 2;
    reelSprite.y = app.screen.height / 2;

    app.stage.addChild(reelSprite);
})();

