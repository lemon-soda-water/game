import { PressKey, ReleaseKey } from "./inputHandler";
import { Player } from "./player";

export enum States {
  STANDING_LEFT,
  STANDING_RIGHT,
  SITTING_LEFT,
  SITTING_RIGHT,
  RUNNING_LEFT,
  RUNNING_RIGHT,
  JUMPING_LEFT,
  JUMPING_RIGHT,
  FALLING_LEFT,
  FALLING_RIGHT,
}

class State {
  state: States;

  constructor(state: States) {
    this.state = state;
  }
}

export class StandingLeft extends State {
  player: Player;

  constructor(player: Player) {
    super(States.STANDING_LEFT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 1;
    this.player.speed = 0;
    this.player.maxFrame = 6;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Right) this.player.setState(States.RUNNING_RIGHT);
    else if(input === PressKey.Left) this.player.setState(States.RUNNING_LEFT);
    else if(input === PressKey.Down) this.player.setState(States.SITTING_LEFT);
    else if(input === PressKey.Up) this.player.setState(States.JUMPING_LEFT);
  }
}

export class StandingRight extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.STANDING_RIGHT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 0;
    this.player.speed = 0;
    this.player.maxFrame = 6;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Left) this.player.setState(States.RUNNING_LEFT);
    else if(input === PressKey.Right) this.player.setState(States.RUNNING_RIGHT);
    else if(input === PressKey.Down) this.player.setState(States.SITTING_RIGHT);
    else if(input === PressKey.Up) this.player.setState(States.JUMPING_RIGHT);
  }
}

export class SittingLift extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.SITTING_LEFT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 9;
    this.player.speed = 0;
    this.player.maxFrame = 4;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Right) this.player.setState(States.SITTING_RIGHT);
    else if(input === PressKey.Up) this.player.setState(States.STANDING_LEFT);
  }
}

export class SittingRight extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.SITTING_RIGHT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 8;
    this.player.speed = 0;
    this.player.maxFrame = 4;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Left) this.player.setState(States.SITTING_LEFT);
    else if (input === PressKey.Up) this.player.setState(States.STANDING_RIGHT);
  }
}

export class RunningLift extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.RUNNING_LEFT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 7;
    this.player.speed = -this.player.maxSpeed;
    this.player.maxFrame = 8;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Right) this.player.setState(States.RUNNING_RIGHT);
    else if(input === ReleaseKey.Left) this.player.setState(States.STANDING_LEFT);
    else if(input === PressKey.Down) this.player.setState(States.SITTING_LEFT);
  }
}

export class RunningRight extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.RUNNING_RIGHT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 6;
    this.player.speed = this.player.maxSpeed;
    this.player.maxFrame = 8;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === PressKey.Left) this.player.setState(States.RUNNING_LEFT);
    else if(input === ReleaseKey.Right) this.player.setState(States.STANDING_RIGHT);
    else if(input === PressKey.Down) this.player.setState(States.SITTING_RIGHT);
  }
}

export class JumpingLeft extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.JUMPING_LEFT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 3;
    if(this.player.onGround()) this.player.vy -= 40;
    this.player.speed = -this.player.maxSpeed * 0.5;
    this.player.maxFrame = 6;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === ReleaseKey.Right) this.player.setState(States.JUMPING_RIGHT);
    else if(this.player.onGround()) this.player.setState(States.STANDING_LEFT);
    else if(this.player.vy > 0) this.player.setState(States.FALLING_LEFT);
  }
}

export class JumpingRight extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.JUMPING_RIGHT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 2;
    if(this.player.onGround()) this.player.vy -= 40;
    this.player.speed = this.player.maxSpeed * 0.5;
    this.player.maxFrame = 6;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === ReleaseKey.Left) this.player.setState(States.JUMPING_LEFT);
    else if(this.player.onGround()) this.player.setState(States.STANDING_RIGHT);
    else if(this.player.vy > 0) this.player.setState(States.FALLING_RIGHT);
  }
}

export class FallingLeft extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.FALLING_LEFT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 5;
    this.player.maxFrame = 6;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === ReleaseKey.Right) this.player.setState(States.FALLING_RIGHT);
    else if(this.player.onGround()) this.player.setState(States.STANDING_LEFT);
  }
}

export class FallingRight extends State {
  player: Player;
  
  constructor(player: Player) {
    super(States.FALLING_RIGHT);
    this.player = player;
  }

  enter() {
    this.player.frameY = 4;
    this.player.maxFrame = 4;
  }

  handleInput(input: PressKey | ReleaseKey | '') {
    if(input === ReleaseKey.Left) this.player.setState(States.JUMPING_LEFT);
    else if(this.player.onGround()) this.player.setState(States.STANDING_RIGHT);
  }
}
