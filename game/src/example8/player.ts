import { PressKey, ReleaseKey } from "./inputHandler";
import { FallingLeft, FallingRight, JumpingLeft, JumpingRight, RunningLift, RunningRight, SittingLift, SittingRight, StandingLeft, StandingRight } from "./state";

export class Player {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  states: StandingLeft[];
  currentState: StandingLeft;
  frameX: number;
  frameY: number;
  speed: number;
  maxSpeed: number;
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
    this.height = 181.83;
    this.x = this.gameWidth/2 - this.width/2;
    this.y = this.gameHeight - this.height;
    this.img = document.querySelector('#playerImage') as HTMLImageElement;

    this.states = [new StandingLeft(this), new StandingRight(this), new SittingLift(this), new SittingRight(this), new RunningLift(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)];
    this.currentState = this.states[0];

    this.frameX = 0;
    this.maxFrame = 6;
    this.frameY = 0;

    this.speed = 0
    this.maxSpeed = 12;

    this.vy = 0;
    this.weight = 2.5;

    this.fps = 20;
    this.frameTimer = 0;
    this.frameInterval = 1000 / this.fps;
  }

  draw(ctx: CanvasRenderingContext2D, deltaTime: number) {

    if(this.frameTimer > this.frameInterval) {
      if(this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0;
      this.frameTimer = 0
    } else {
      this.frameTimer += deltaTime;
    }

    ctx.drawImage(this.img, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
  }

  update(input: PressKey | ReleaseKey | '') {
    this.currentState.handleInput(input);
    this.x += this.speed;

    if(this.x <= 0) this.x = 0
    else if(this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width;

    this.y += this.vy;

    if(!this.onGround()) {
      this.vy += this.weight;
    } else {
      this.vy = 0;
    }
  }

  setState(state: number) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}