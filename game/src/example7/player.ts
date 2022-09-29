import { Enemy } from "./enemy";
import { InputHandler } from "./InputHandler";

let gameOver = false;

class Player {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  frameX: number;
  frameY: number;
  speed: number;
  vy: number;
  weight: number;
  maxFrame: number;
  fps: number;
  frameTimer: number;
  frameInterval: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 200;
    this.height = 200;
    this.x = 0;
    this.y = this.gameHeight - this.height;
    this.img = document.querySelector('#playerImage') as HTMLImageElement;
    this.frameX = 0;
    this.maxFrame = 8;
    this.frameY = 0;
    this.speed = 0;
    this.vy = 0;
    this.weight = 1;

    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  update(input: InputHandler, deltaTime: number, enemies: Enemy[]) {

    enemies.forEach(enemy => {
      const dx = (enemy.x + enemy.width / 2) - (this.x + this.width / 2);
      const dy = (enemy.y + enemy.height / 2) - (this.y + this.height / 2);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < (this.width + enemy.width) / 2) {
        gameOver = true;
      }
    })

    if (this.frameTimer > this.frameInterval) {
      if(this.frameX >= this.maxFrame) this.frameX = 0;
      else this.frameX++;
      this.frameTimer= 0;
    } else {
      this.frameTimer += deltaTime;
    }


    this.x += this.speed;
    if(input.keys.indexOf('ArrowRight') > -1) {
      this.speed = 5;
    } else if(input.keys.indexOf('ArrowLeft') > -1) {
      this.speed = -5;
    } else if(input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {
      this.vy -= 32;
    } else {
      this.speed = 0;
    }

    if(this.x < 0) this.x = 0;
    else if(this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width;

    this.y += this.vy;
    if(!this.onGround()) {
      this.vy += this.weight;
      this.frameY = 1;
      this.maxFrame = 5;
    } else {
      this.vy = 0;
      this.frameY = 0;
      this.maxFrame = 8;
    }

    if(this.onGround()) this.y = this.gameHeight - this.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}

export {
  gameOver,
  Player
}