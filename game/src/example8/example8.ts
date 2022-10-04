import { InputHandler } from "./inputHandler";
import { Player } from "./player";
import { drawStatusText } from "./utils";

window.addEventListener('load', async () => {

  const loading = document.querySelector('#loading') as HTMLHRElement;
  loading.style.display = 'none';

  const canvas = document.querySelector('canvas');

  // 判断canvas是否有属性context
  if (canvas?.getContext) {
  
    // 获取canvas 2d的上下文
    const ctx = canvas.getContext('2d')!;
  
    // 设置 canvas 画布大小
    const CANVAS_WIDTH = canvas.width = window.innerWidth;
    const CANVAS_HEIGHT = canvas.height = window.innerHeight;

    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);


    const input = new InputHandler();

    let lastTime = 0;

  
    function animate (timeStamp: number) {
      // 清除画布
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;

      player.update(input.lastkey);
      player.draw(ctx, deltaTime);
      drawStatusText(ctx, input, player);
  
      //重复动画
      requestAnimationFrame(animate);
    }
  
    animate(0);
  }
});