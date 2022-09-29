import { Enemy } from "./enemy";
import { Game } from "./Game";

const spider = document.querySelector('#spider') as HTMLImageElement;

class Spider extends Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  vx: number;
  vy: number;
  maxLength: number;

  constructor(game: Game) {
    super(game);
    this.spriteWidth = 310;
    this.spriteHeight = 175;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = Math.random() * this.game.width;
    this.y = 0 - this.height;
    this.img = spider;
    this.vx = 0;
    this.vy = Math.random() * 0.1 + 0.1;
    this.maxLength = Math.random() * this.game.height;
  }
  update(deltaTime: number) {
    super.update(deltaTime);
    this.y += this.vy * deltaTime;

    if(this.y < -this.height * 2) this.markedForDeletion = true;

    if(this.y > this.maxLength) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.moveTo(this.x + this.width/2, 0);
    ctx.lineTo(this.x + this.width/2, this.y + 10);
    ctx.stroke();
    super.draw(ctx);
  }
}

export {
  Spider
}