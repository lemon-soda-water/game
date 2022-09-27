import { Explosion } from "./Explosion";

// 获取画布
const canvas = document.querySelector('canvas');

// 判断canvas是否有属性context
if (canvas?.getContext) {

  // 获取canvas 2d的上下文
  const ctx = canvas.getContext('2d')!;

  // 设置 canvas 画布大小
  const CANVAS_WIDTH = canvas.width = 500;
  const CANVAS_HEIGHT = canvas.height = 700;

  // 获取 canvas 在浏览器界面的位置
  const canvasPosition = canvas.getBoundingClientRect();

  const explosions: Explosion[] = [];

  const createAnimation = (e: MouseEvent) => {
    // 让图片的 x， y是鼠标的 x、y
    const positionX = e.x - canvasPosition.left;
    const positionY = e.y - canvasPosition.top;

    // 将图片放入数组中
    explosions.push(new Explosion(positionX, positionY));
  }

  // 监听 click 事件
  window.addEventListener('click', createAnimation);
  // 监听 mousemove 事件
  // window.addEventListener('mousemove', createAnimation);

  function animate () {
    // 清除画布
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    for (let i = 0; i < explosions.length; i++) {
      explosions[i].update();
      explosions[i].draw(ctx); 
      
      // 将动画完的图片清空
      if(explosions[i].frame > 5) {
        explosions.splice(i, 1);
        // 调整索引
        i--;
      }
    }

    //重复动画
    requestAnimationFrame(animate);
  }

  animate();
}
export {}