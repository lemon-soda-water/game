import { CollisionAnimation } from "./collisionAnimation";
import { FloatingMessage } from "./floatingMessage";
import { Game } from "./game";
import { keyName } from "./input";
import { Diving, Falling, Hit, Jumping, Rolling, Running, Sitting } from "./state";

export class Player {
  game: Game;
  width: number;
  height: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  speed: number;
  maxSpeed: number;
  vy: number;
  weight: number;
  states: Sitting[];
  frameX: number;
  frameY: number;
  maxFrame: number;
  fps: number;
  frameInterval: number;
  frameTimer: number;
  currentState: Sitting | null;

  constructor(game: Game) {
    this.game = game,
    this.width = 100;
    this.height = 91.3;
    this.x = 0;
    this.y = this.game.height - this.height - this.game.groundMargin;
    this.img = document.querySelector('#player') as HTMLImageElement;

    this.speed = 0;
    this.maxSpeed = 10;

    this.vy = 0;
    this.weight = 1;

    this.currentState = null;
    this.states = [new Sitting(this.game), new Running(this.game), new Jumping(this.game), new Falling(this.game), new Rolling(this.game), new Diving(this.game), new Hit(this.game)];

    this.frameX = 0;
    this.frameY = 0;

    this.maxFrame = 2;

    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  update(input: keyName[], deltaTime: number) {
    this.checkCollision();

    this.currentState!.handleInput(input);

    this.x += this.speed;

    if(input.includes('ArrowRight') && this.currentState !== this.states[6]) this.speed = this.maxSpeed;
    else if(input.includes('ArrowLeft') && this.currentState !== this.states[6]) this.speed = -this.maxSpeed;
    else this.speed = 0;

    if(this.x <= 0) this.x = 0;
    if(this.x >= this.game.width - this.width) this.x = this.game.width - this.width;

    this.y += this.vy;
    if(!this.onGround()) this.vy += this.weight;
    else this.vy = 0;

    if(this.frameTimer > this.frameInterval) {
      if(this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime;
    }

    if(this.y > this.game.height - this.height - this.game.groundMargin) this.y = this.game.height - this.height -this.game.groundMargin;

  }

  draw(ctx: CanvasRenderingContext2D) {
    if(this.game.debug) ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  onGround() {
    return this.y >= this.game.height - this.height - this.game.groundMargin;
  }

  setState(state: number, speed: number) {
    this.currentState = this.states[state];
    this.game.speed = this.game.maxSpeed * speed;
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach(enemy => {
      if(
        enemy.x < this.x + this.width &&
        enemy.x + this.width > this.x &&
        enemy.y < this.y + this.height && 
        enemy.y + this.height > this.y
      ) {

        enemy.markedForDeletion = true;
        this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
       
        if(this.currentState === this.states[4] || this.currentState === this.states[5]) {          
          this.game.score++;
          this.game.floatingMessages.push(new FloatingMessage('+1', enemy.x, enemy.y, 150, 50))
        } else {
          this.setState(6, 0);
          this.game.lives--;
          if(this.game.lives <= 0) {
            this.game.gameOver = true;
          }
        }
      }
    })
  }
}