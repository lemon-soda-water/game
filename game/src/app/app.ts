import { Game } from "./game";

window.addEventListener('load', async () => {
  const canvas = document.querySelector('canvas');

  // 判断canvas是否有属性context
  if (canvas?.getContext) {
  
    // 获取canvas 2d的上下文
    const ctx = canvas.getContext('2d')!;
  
    // 设置 canvas 画布大小
    const CANVAS_WIDTH = canvas.width = 900;
    const CANVAS_HEIGHT = canvas.height = 500;

    let lastTime = 0;

    const game = new Game(CANVAS_WIDTH, CANVAS_HEIGHT);

    function animate (timeStamp: number) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      // 清除画布
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      game.update(deltaTime);
      game.draw(ctx);
  
      //重复动画
      if(!game.gameOver) requestAnimationFrame(animate);
    }
  
    animate(0);
  }
});

export {}