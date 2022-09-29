import { Game } from "./Game";

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('canvas');

  // 判断canvas是否有属性context
  if (canvas?.getContext) {
  
    // 获取canvas 2d的上下文
    const ctx = canvas.getContext('2d')!;
  
    // 设置 canvas 画布大小
    const CANVAS_WIDTH = canvas.width = 500;
    const CANVAS_HEIGHT = canvas.height = 800;
  
    // 上一次动画时间
    let lastTime = 0;
  
    const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
  
    function animate (timeStamp: number) {
      // 清除画布
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
  
      game.update(deltaTime);
      game.draw();
  
      //重复动画
      requestAnimationFrame(animate);
    }
  
    animate(0);
  }
});