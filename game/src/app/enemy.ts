import { Game } from "./game";

class Enemy {
  frameX: number;
  frameY: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  markedForDeletion: boolean;

  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(this: any, deltaTime: number) {
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;

    if(this.frameTimer > this.frameInterval) {
      if(this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime;
    }

    if(this.x + this.width < 0) this.markedForDeletion = true;
  }

  draw(this: any, ctx: CanvasRenderingContext2D) {
    if(this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height);
    
    ctx.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
  }
}

export class FlyingEnemy extends Enemy {
  width: number;
  height: number;
  game: Game;
  x: number;
  y: number;
  speedX: number;
  maxFrame: number;
  image: HTMLImageElement;
  speedY: number;
  angle: number;
  va: number;

  constructor(game: Game) {
    super();
    this.width = 60;
    this.height = 44;
    this.game = game;
    this.x = this.game.width + Math.random() * this.game.width * 0.5;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() + 1;
    this.speedY = 0;
    this.maxFrame = 0;
    this.image = document.querySelector('#enemy_fly') as HTMLImageElement;
    
    this.angle = 0;
    this.va = Math.random() * 0.1 + 0.1;
  }

  update(this: FlyingEnemy, deltaTime: number) {
    super.update(deltaTime);
    this.angle += this.va;
    this.y += Math.sin(this.angle);
  }
}

export class GroundEnemy extends Enemy {
  width: number;
  height: number;
  game: Game;
  x: any;
  y: number;
  speedX: number;
  speedY: number;
  maxFrame: number;
  image: HTMLImageElement;

  constructor(game: Game) {
    super();
    this.width = 60;
    this.height = 87;
    this.game = game;
    this.x = this.game.width;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.speedX = 0;
    this.speedY = 0;
    this.maxFrame = 1;
    this.image = document.querySelector('#enemy_plant') as HTMLImageElement;
  }
}

export class ClimbingEnemy extends Enemy {
  width: number;
  height: number;
  game: Game;
  x: any;
  y: number;
  speedX: number;
  speedY: number;
  maxFrame: number;
  image: HTMLImageElement;
  constructor(game: Game) {
    super();
    this.width = 120;
    this.height = 144;
    this.game = game;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = 0;
    this.speedY = Math.random() > 0.5 ? 1 : -1;
    this.maxFrame = 5;
    this.image = document.querySelector('#enemy_spider_big') as HTMLImageElement;
  }

  update(deltaTime: number): void {
    super.update(deltaTime);
    if(this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
    if(this.y < -this.height) this.markedForDeletion = true;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    ctx.beginPath();
    ctx.moveTo(this.x + this.width / 2, 0);
    ctx.lineTo(this.x + this.width / 2, this.y + 50);
    ctx.stroke();
  }
}