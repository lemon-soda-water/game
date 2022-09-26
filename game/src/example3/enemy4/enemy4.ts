import { gameFrame } from "./example3";

// 获取画布
const canvas = document.querySelector('canvas');

// 敌人的数量
const numberOfEnemies = 10;
const enemiesArray: Enemy[] = [];

class Enemy {
  x: number;
  y: number;
  spritWidth: number;
  spritHeight: number;
  image: HTMLImageElement;
  width: number;
  height: number;
  frame: number;
  flapSpeed: number;
  newX: number;
  newY: number;
  interval: number;
  constructor() {
    // 敌人的宽度
    this.spritWidth = 218;
    // 敌人的高度
    this.spritHeight = 177;
    // 获取图片
    this.image = new Image();
    this.image.src = '../../public/assets/project3/enemy3.png';

    // 敌人在画布上出现的宽度和高度
    this.width = this.spritWidth / 2.5;
    this.height = this.spritHeight / 2.5;
    // 敌人出现位置横坐标（在画布内随机， 不允许出现在画布外)
    this.x = Math.random() * (canvas!.width - this.width);
    // 敌人出现位置纵坐标（在画布内随机， 不允许出现在画布外)
    this.y = Math.random() * (canvas!.height - this.height);

    // 新的位置
    this.newX = Math.random() * (canvas!.width - this.width);
    this.newY = Math.random() * (canvas!.height - this.height);

    // 动画帧
    this.frame = 0;
    // 敌人动作的速度
    this.flapSpeed = Math.floor(Math.random() * 3) + 1;

    // 间隔时间
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update() {
    // 更新移动方向和距离
    if(gameFrame % this.interval === 0) {
      this.newX = Math.random() * (canvas!.width - this.width);
      this.newY = Math.random() * (canvas!.height - this.height);
    }

    const dx = this.x - this.newX;
    const dy = this.y - this.newY;

    // 移动位置
    this.x -= dx / 20;
    this.y -= dy / 20;

    // 更新敌人动作
    if(gameFrame % this.flapSpeed === 0)
    this.frame > 4 ? this.frame = 0 : this.frame++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // 绘制敌人
    ctx.drawImage(this.image, this.frame * this.spritWidth, 0, this.spritWidth, this.spritHeight, this.x, this.y, this.width, this.height);
  }
}

for (let i = 0; i < numberOfEnemies; i++) {
  enemiesArray.push(new Enemy())
}

export {
  enemiesArray,
  canvas,
}