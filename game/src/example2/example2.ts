import { gamesObjects } from "./layer";

// 获取画布
const canvas = document.querySelector('canvas');

// 判断canvas是否有属性context
if (canvas?.getContext) {

  // 获取canvas 2d的上下文
  const ctx = canvas.getContext('2d')!;

  // 设置 canvas 画布大小
  const CANVAS_WIDTH = canvas.width = 800;
  const CANVAS_HEIGHT = canvas.height = 700;

  function animate () {
    // 清除画布
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // ctx.drawImage(backgroundLayer4, 0, 0)
    // ctx.drawImage(backgroundLayer4, 2400, 0)
    gamesObjects.forEach((object) => {
      object.update();
      object.draw(ctx);
    })

    //重复动画
    requestAnimationFrame(animate);
  }

  animate();
}
export {}