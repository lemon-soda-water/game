import { spriteHeight, spriteWidth, spriteAnimations, AnimationNames } from "./animateData";

// 获取画布
const canvas = document.querySelector('canvas');
// 获取下拉菜单
const dropdown = document.querySelector('#animations');

// 判断canvas是否有属性context
if (canvas?.getContext) {

  // 获取canvas 2d的上下文
  const ctx = canvas.getContext('2d')!;

  // 设置 canvas 画布大小
  const CANVAS_WIDTH = canvas.width = 600;
  const CANVAS_HEIGHT = canvas.height = 600;

  // 创建图片
  const playerImage = document.createElement('img');
  playerImage.src = '../../public/assets/项目1.png';

  // 游戏帧
  let gameFrame = 0;
  // 交错帧
  const staggerFrames = 5;

  let playerState: AnimationNames = 'run';
  dropdown?.addEventListener('change',(e) => {
    playerState = (e.target as HTMLSelectElement).value as AnimationNames;
  })

  function animate () {
    // 清除画布
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // 动画帧
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;

    // 动画位置
    const frameX = spriteWidth * position;
    const frameY = spriteAnimations[playerState].loc[position].y;

    // 将图片放置在画布上  api使用地址 https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);

    gameFrame++;

    //重复动画
    requestAnimationFrame(animate);
  }

  animate();
}