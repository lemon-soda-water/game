import { Particle } from "./particle";
let gameOver = false;
let particles: Particle[] = [];

class Raven {
  width: number;
  height: number;
  x: number;
  y: number;
  directionX: number;
  directionY: number;
  markForDetele: boolean;
  img: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  sizeModify: number;
  frame: number;
  maxFrame: number;
  timeSinceFlap: number;
  flapInterval: number;
  readomColor: number[];
  color: string;

  constructor() {
    // 图片高宽
    this.spriteWidth = 271;
    this.spriteHeight = 194;

    // 图片随机缩放大小
    this.sizeModify = Math.random() * 0.3 + 0.4;

    // 图片在 canvas 的宽高
    this.width = this.spriteWidth * this.sizeModify;
    this.height = this.spriteHeight * this.sizeModify;
    // 图片在 canvas 出现的位置
    this.x = window.innerWidth;
    this.y = Math.random() * (window.innerHeight - this.height);
    // 图片移动的距离
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;

    // 标记是否被删除
    this.markForDetele = false;

    // 图片
    this.img = new Image();
    this.img.src = '../../public/assets/project5/raven.png';

    // 动作帧
    this.frame = 0;
    this.maxFrame = 4;

    // 图片更新初始时间和间隔
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 90;

    // 随机颜色
    this.readomColor = [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
    this.color = `rgb(${this.readomColor[0]}, ${this.readomColor[1]}, ${this.readomColor[2]})`;
  }

  update(deltatime: number) {
    // 当图片碰到屏幕上方或下方时
    if(this.y < 0 || this.y > window.innerHeight - this.height) {
      this.directionY = -this.directionY;
    }

    // 图片移动
    this.x -= this.directionX;
    this.y += this.directionY;

    if(this.x < -this.width) this.markForDetele = true;

    this.timeSinceFlap += deltatime;
    if(this.timeSinceFlap > this.flapInterval) {
      if(this.frame > this.maxFrame) this.frame = 0
      else this.frame++;

      // 重置
      this.timeSinceFlap = 0;

      // 控制粒子一次加入的数量
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(this.x, this.y, this.width, this.color));
      }
    }

    // 游戏结束
    if(this.x < - this.width) gameOver = true;
  }

  draw(ctx: CanvasRenderingContext2D, collisionCtx: CanvasRenderingContext2D) {
    // canvas 2
    collisionCtx.fillStyle = this.color;
    collisionCtx.fillRect(this.x, this.y, this.width, this.height);
    // canvas 1
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

export {
  Raven,
  gameOver,
  particles
}