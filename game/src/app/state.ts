import { Game } from "./game";
import { keyName } from "./input";
import { Dust, Fire, Splash } from "./particle";

enum States {
  SITTING,
  RUNNING,
  JUMPING,
  FALLING,
  ROLLING,
  DIVING,
  HIT
}

class State {
  state: string;
  game: Game;

  constructor(state: string, game: Game) {
    this.state = state;
    this.game = game;
  }
}

export class Sitting extends State {

  constructor(game: Game) {
    super('SITTING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 5;
    this.game.player.maxFrame = 4;
  }

  handleInput(input: keyName[]) {
    if(input.includes('ArrowLeft') || input.includes('ArrowRight')) {
      this.game.player.setState(States.RUNNING, 1);
    } else if (input.includes('Enter')) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class Running extends State {
  constructor(game: Game) {
    super('RUNNING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 3;
    this.game.player.maxFrame = 8;
  }

  handleInput(input: keyName[]) {

    this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.6, this.game.player.y + this.game.player.height));

    if(input.includes('ArrowDown')) {
      this.game.player.setState(States.SITTING, 0);
    } else if(input.includes('ArrowUp')) {
      this.game.player.setState(States.JUMPING, 1);
    } else if (input.includes('Enter')) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class Jumping extends State {
  constructor(game: Game) {
    super('JUMPING', game);
  }

  enter() {
    if(this.game.player.onGround()) this.game.player.vy -= 27;
    this.game.player.frameX = 0;
    this.game.player.frameY = 1;
    this.game.player.maxFrame = 6;
  }

  handleInput(input: keyName[]) {
    if(this.game.player.vy > this.game.player.weight) {
      this.game.player.setState(States.FALLING, 1)
    } else if (input.includes('Enter')) {
      this.game.player.setState(States.ROLLING, 2);
    } else if(input.includes('ArrowDown')) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class Falling extends State {
  constructor(game: Game) {
    super('FALLING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 2;
    this.game.player.maxFrame = 6;
  }

  handleInput(input: keyName[]) {
    if(this.game.player.onGround()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if(input.includes('ArrowDown')) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class Rolling extends State {
  constructor(game: Game) {
    super('ROLLING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
  }

  handleInput(input: keyName[]) {
    this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

    if(!input.includes('Enter') && this.game.player.onGround()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if(!input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(States.FALLING, 1);
    } else if(input.includes('Enter') && input.includes('ArrowUp') && this.game.player.onGround()) {
      this.game.player.vy -= 27;
    } else if(input.includes('ArrowDown') && !this.game.player.onGround()) {
      this.game.player.setState(States.DIVING, 0);
    }
  }
}

export class Diving extends State {
  constructor(game: Game) {
    super('DIVING', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 6;
    this.game.player.maxFrame = 6;
    this.game.player.vy = 15;
  }

  handleInput(input: keyName[]) {
    this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));

    if(this.game.player.onGround()) {
      this.game.player.setState(States.RUNNING, 1);

      for (let i = 0; i < 30; i++) {
        this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height))
      }

    } else if(input.includes('Enter') && !this.game.player.onGround()) {
      this.game.player.setState(States.ROLLING, 2);
    }
  }
}

export class Hit extends State {
  constructor(game: Game) {
    super('HIT', game);
  }

  enter() {
    this.game.player.frameX = 0;
    this.game.player.frameY = 4;
    this.game.player.maxFrame = 10;
  }

  handleInput() {
    if(this.game.player.frameX >= 10 && this.game.player.onGround()) {
      this.game.player.setState(States.RUNNING, 1);
    } else if(this.game.player.frameX >= 10 && !this.game.player.onGround()) {
      this.game.player.setState(States.FALLING, 1);
    }
  }
}