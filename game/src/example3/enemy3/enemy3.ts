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
  angle: number;
  angleSpeed: number;
  curve: number;
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

    // 动画帧
    this.frame = 0;
    // 敌人动作的速度
    this.flapSpeed = Math.floor(Math.random() * 3) + 1;

    // 敌人初始位置
    this.angle = 0; 

    // 敌人随机移动的速度
    this.angleSpeed = Math.random() * 2;

    // 敌人随机运动轨迹范围值
    this.curve = Math.random() * 200 + 50;
  }

  update() {
    // 敌人左右移动
    this.x = this.curve * Math.cos(this.angle * Math.PI/50) + canvas!.width/2 - this.width/2;
    // 敌人上下移动
    this.y = this.curve * Math.sin(this.angle * Math.PI/300) + canvas!.height/2 - this.height/2;

    // 可以通过控制x是sin、cos、y是sin、cos、Math.PI/随机数来获取不同的运动模式
    /* 比如： 改变 Math.PI 除以的数值，可以改变水平或者垂直方向的运动轨迹
     this.x = this.curve * Math.sin(this.angle * Math.PI/90) + canvas!.width/2 - this.width/2;
     this.y = this.curve * Math.cos(this.angle * Math.PI/360) + canvas!.height/2 - this.height/2;
    */

    /* 比如： 改变 sin、cos和 Math.PI 除以的数值，可以改变曲线的运动轨迹
     this.x = this.curve * Math.cos(this.angle * Math.PI/90) + canvas!.width/2 - this.width/2;
     this.y = this.curve * Math.sin(this.angle * Math.PI/270) + canvas!.height/2 - this.height/2;
    */

    /* 比如： 改变 sin、cos和 Math.PI 除以的数值，可以改变曲线的运动轨迹
       此时的运动轨迹是圆形
     this.x = this.curve * Math.cos(this.angle * Math.PI/180) + canvas!.width/2 - this.width/2;
     this.y = this.curve * Math.sin(this.angle * Math.PI/180) + canvas!.height/2 - this.height/2;
    */

    // 你也可以改变 this.curve 的值改变运动的范围大小
    /* 比如：运动的范围是整个画布
        this.x = canvas.width/2 * Math.cos(this.angle * Math.PI/180) + canvas!.width/2 - this.width/2;
        this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/90) + canvas!.height/2 - this.height/2;
    */

    this.angle += this.angleSpeed;

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