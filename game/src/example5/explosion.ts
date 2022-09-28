class Explosion {
  img: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  size: number;
  x: number;
  y: number;
  frame: number;
  sound: HTMLAudioElement;
  timeSinceLastFrame: number;
  frameInterval: number;
  markForDetele: boolean;

  constructor(x: number, y: number, size: number) {
    // 图片
    this.img = new Image();
    this.img.src = '../../public/assets/project4/boom.png';
    // 原图片的宽高
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    // 大小
    this.size = size;
    // 在 canvas 的位置
    this.x = x;
    this.y = y;
    // 动作帧
    this.frame = 0;
    // 上一次 动作帧 时间
    this.timeSinceLastFrame = 0;
    // 动作帧间隔
    this.frameInterval = 200;
    // 音效
    this.sound = new Audio();
    this.sound.src = '../../public/assets/project4/boom.wav';
    // 标记是否删除
    this.markForDetele = false;
  }

  update(deltatime: number) {
    // 播放声音
    if(this.frame === 0) this.sound.play();

    this.timeSinceLastFrame += deltatime;

    if(this.timeSinceLastFrame > this.frameInterval) {
      this.frame ++;
      // 重置时间
      this.timeSinceLastFrame = 0;
      if(this.frame > 5) this.markForDetele = true;
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size / 4, this.size, this.size);
  }
}

export {
  Explosion
}