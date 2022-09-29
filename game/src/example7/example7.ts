import { BackGround } from "./background";
import { displayStatusText } from "./displayStatusText";
import { enemies, handleEnemies } from "./handleEnemies";
import { InputHandler } from "./InputHandler";
import { gameOver, Player } from "./player";

window.addEventListener('load', async () => {
  const canvas = document.querySelector('canvas');

  // 判断canvas是否有属性context
  if (canvas?.getContext) {
  
    // 获取canvas 2d的上下文
    const ctx = canvas.getContext('2d')!;
  
    // 设置 canvas 画布大小
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 720;

    const input = new InputHandler();
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
    const background = new BackGround(CANVAS_WIDTH, CANVAS_HEIGHT);

    let lastTime = 0;
  
    function animate (timeStamp: number) {
      // 清除画布
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      background.update();
      background.draw(ctx);

      player.update(input, deltaTime, enemies);
      player.draw(ctx);

      handleEnemies(ctx, deltaTime, CANVAS_WIDTH, CANVAS_HEIGHT);

      displayStatusText(ctx, CANVAS_WIDTH);
  
      //重复动画
      if(!gameOver) requestAnimationFrame(animate);
    }
  
    animate(0);
  }
});