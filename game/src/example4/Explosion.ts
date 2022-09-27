class Explosion {
  x: number;
  y: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  img: HTMLImageElement;
  frame: number;
  timer: number;
  angle: number;
  sound: HTMLAudioElement;

  constructor(x: number, y: number) {
    // 图片的宽高
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // 图片在 canvas 上展示的宽高
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;

    // 图片在 canvas 上的位置, 居中显示
    // this.x = x - this.width / 2;
    // this.y = y - this.height / 2;
    this.x = x;
    this.y = y;

    // 图片
    this.img = new Image();
    this.img.src = '../../public/assets/project4/boom.png';

    // 控制 原图片 的位置
    this.frame = 0;

    // 控制图片 更新 的速度
    this.timer = 0;

    // 旋转的弧度
    this.angle = Math.random() * 6.28;

    // 添加音频
    this.sound = new Audio();
    this.sound.src = '../../public/assets/project4/boom.wav';
  }

  update() {

    if(this.frame === 0) {
      this.sound.play();
    }

    this.timer++;

    if(this.timer % 10 === 0) {
      this.frame++;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {

    // 保存之前画笔的状态
    ctx.save();
    // 平移
    ctx.translate(this.x, this.y);
    // 旋转
    ctx.rotate(this.angle);
    // 绘制图片
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 0 - this.width / 2, 0 - this.height /2, this.width, this.height);
    // 反悔之前保存过的路径属性和状态
    ctx.restore();
  }
}

export {
  Explosion
}