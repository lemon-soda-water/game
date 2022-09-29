import { Enemy } from "./enemy";
import { Game } from "./Game";

const worm = document.querySelector('#worm') as HTMLImageElement;

class Worm extends Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  img: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  vx: number;

  constructor(game: Game) {
    super(game);
    this.spriteWidth = 229;
    this.spriteHeight = 171;
    this.width = this.spriteWidth / 2;
    this.height = this.spriteHeight / 2;
    this.x = this.game.width;
    this.y = this.game.height - this.height;
    this.img = worm;
    this.vx = Math.random() * 0.1 + 0.1;
  }
}

export {
  Worm
}