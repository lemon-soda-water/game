import { drawGameOver } from "./drawGameOver";
import { drawScore } from "./drawScore";
import { Explosion } from "./explosion";
import { gameOver, particles, Raven } from "./raven";

// 获取画布
const canvas = document.querySelector('#canvas1') as HTMLCanvasElement;
const collisionCanvas = document.querySelector('#canvas2') as HTMLCanvasElement;

// 判断canvas是否有属性context
if (canvas?.getContext) {

  // 下一次图片出现的时间
  let timeToMextRaven = 0;
  // 图片出现的间隔时间
  const ravenTnterval = 500;
  // 上一次图片出现的时间
  let lastTime = 0;

  let ravens: Raven[] = [];
  let explosions: Explosion[] =[];


  // 获取canvas 2d的上下文
  const ctx = canvas.getContext('2d')!;
  const collisionCtx = collisionCanvas.getContext('2d')!;

  // 设置 canvas 画布大小
  const CANVAS_WIDTH = canvas.width = collisionCanvas.width = window.innerWidth;
  const CANVAS_HEIGHT = canvas.height = collisionCanvas.height = window.innerHeight;

  // 分数
  let score = 0;
  // 设置字体大小、样式
  ctx.font = '50px Impact';


  // 监听点击事件
  window.addEventListener('click', (e) => {
    // 获取点击部分颜色
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    // 判断点击哪只乌鸦
    for (let i = 0; i < ravens.length; i++) {
      if(ravens[i].readomColor[0] === pc[0] && ravens[i].readomColor[1] === pc[1] && ravens[i].readomColor[2] === pc[2]) {
        ravens[i].markForDetele = true;
        // 分数
        score++;

        explosions.push(new Explosion(ravens[i].x, ravens[i].y, ravens[i].width));
      }
    }
  })


  function animate (timestamp: number) {
    // 清除画布
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    const deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToMextRaven += deltatime;

    if(timeToMextRaven > ravenTnterval) {
      ravens.push(new Raven());
      // 重新计算
      timeToMextRaven = 0
      // 排序
      ravens.sort((a, b) => a.width - b.width);
    }

    drawScore(ctx, score);
  
    [...particles, ...ravens, ...explosions].forEach(object => object.update(deltatime));
    [...particles, ...ravens, ...explosions].forEach(object => object.draw(ctx, collisionCtx));

    // 清除使用过的 音效和图片
    ravens = ravens.filter(objetc => !objetc.markForDetele);
    explosions = explosions.filter(objetc => !objetc.markForDetele);

    //重复动画
    if(!gameOver) requestAnimationFrame(animate);
    else drawGameOver(ctx, score, canvas);
  }

  animate(0);
}