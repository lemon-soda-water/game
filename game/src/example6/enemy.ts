import { Game } from "./Game";
class Enemy {
  game: Game;
  markedForDeletion: boolean;
  frameX: number;
  maxFrame: number;
  frameInterval: number;
  framTimer: number;
  width: any;

  constructor(game: Game) {
    this.game = game;
    this.markedForDeletion = false;
    this.frameX = 0;
    this.maxFrame = 5;
    this.frameInterval = 100;
    this.framTimer = 0;
  }

  update(this: any, deltaTime: number) {
    this.x -= this.vx * deltaTime;

    if(this.x < -this.width) this.markedForDeletion = true;

    if(this.framTimer > this.frameInterval) {
      if(this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.framTimer = 0;
    }
    this.framTimer += deltaTime;
  }

  draw(this: any, ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
  }
}

export {
  Enemy
}