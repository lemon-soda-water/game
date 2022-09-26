import { canvas, enemiesArray } from "./enemy2";

// 游戏帧
let gameFrame = 0;

// 判断canvas是否有属性context
if (canvas?.getContext) {

  // 获取canvas 2d的上下文
  const ctx = canvas.getContext('2d')!;

  // 设置 canvas 画布大小
  const CANVAS_WIDTH = canvas.width = 500;
  const CANVAS_HEIGHT = canvas.height = 1000;

  function animate () {
    // 清除画布
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 绘制每一个敌人
    enemiesArray.forEach((enemy) => {
      enemy.update();
      enemy.draw(ctx);
    })

    // 游戏帧
    gameFrame++;

    //重复动画
    requestAnimationFrame(animate);
  }

  animate();
}

export {
  gameFrame
}