import { Enemy } from "./enemy";
import { Game } from "./Game";
import { Worm } from "./worm";

const ghost = document.querySelector('#ghost') as HTMLImageElement;

class Ghost extends Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  vx: number;
  angle: number;
  curve: number;

  constructor(game: Game) {
    super(game);
    this.spriteWidth = 261;
    this.spriteHeight = 209;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.6;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.img = ghost;
    this.vx = Math.random() * 0.2 + 0.1;
    this.angle = 0;
    this.curve = Math.random() * 3;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    this.y += Math.sin(this.angle) * 5 * this.curve;
    this.angle += 0.5;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    super.draw(ctx);
    ctx.restore();
  }
}

export {
  Ghost
}