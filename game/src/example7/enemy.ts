let score = 0;

class Enemy {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  framX: number;
  speed: number;
  maxFrame: number;
  fps: number;
  frameTimer: number;
  frameInterval: number;
  markedForDeletion: boolean;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 160;
    this.height = 119;
    this.x = this.gameWidth;
    this.y = this.gameHeight - this.height;
    this.img = document.querySelector('#enemyImage') as HTMLImageElement;
    this.framX = 0;
    this.speed = 8;
    this.fps = 20;
    this.maxFrame = 5;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;

    this.markedForDeletion = false;
  }

  update(deltaTime: number) {
    if(this.frameTimer > this.frameInterval) {
      if(this.framX >= this.maxFrame) this.framX = 0;
      else this.framX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }

    this.x -= this.speed;

    if(this.x < -this.width) {
      this.markedForDeletion = true;
      score++;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.framX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
  }
}

export {
  score,
  Enemy
}