import { Game } from "./game";

class Particle {
  game: Game;
  markedForDeletion: boolean;

  constructor(game: Game) {
    this.game = game;
    this.markedForDeletion = false;
  }

  update(this: any) {
    this.x -= this.speedX + this.game.speed;
    this.y -= this.speedY;
    this.size *= 0.97;
    if(this.size < 0.5) this.markedForDeletion = true;
  }
}

export class Dust extends Particle {
  x: number;
  speedX: number;
  y: number;
  speedY: number;
  size: number;
  color: string;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 10 + 10;
    this.x = x;
    this.y = y;
    this.speedX = Math.random();
    this.speedY = Math.random();
    this.color = 'rgba(0, 0, 0, .2)';
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export class Splash extends Particle {
  size: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  gravity: number;
  image: HTMLImageElement;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 100;
    this.x = x - this.size * 0.4;
    this.y = y - this.size * 0.5;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 2 + 2;
    this.gravity = 0;
    this.image = document.querySelector('#fire') as HTMLImageElement;
  }

  update() {
    super.update();
    this.gravity += 0.1;
    this.y += this.gravity;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
  }
}

export class Fire extends Particle {
  size: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  image: HTMLImageElement;
  angle: number;
  va: number;

  constructor(game: Game, x: number, y: number) {
    super(game);
    this.size = Math.random() * 100 + 50;
    this.x = x;
    this.y = y;
    this.speedX = 1;
    this.speedY = 1;
    this.image = document.querySelector('#fire') as HTMLImageElement;
    this.angle = 0;
    this.va = Math.random() * 0.2 - 0.1;
  }

  update() {
    super.update();
    this.angle += this.va;
    this.x += Math.sin(this.angle * 5);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
    ctx.restore();
  }
}