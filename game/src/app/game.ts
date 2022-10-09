import { Background } from "./background";
import { CollisionAnimation } from "./collisionAnimation";
import { ClimbingEnemy, FlyingEnemy, GroundEnemy } from "./enemy";
import { FloatingMessage } from "./floatingMessage";
import { InputHandler } from "./input";
import { Dust, Fire, Splash } from "./particle";
import { Player } from "./player";
import { UI } from "./ui";

export class Game {
  width: number;
  height: number;
  player: Player;
  input: InputHandler;
  groundMargin: number;
  speed: number;
  background: Background;
  maxSpeed: number;
  enemies: (FlyingEnemy | GroundEnemy | ClimbingEnemy)[];
  enemyInterval: number;
  enemyTimer: number;
  debug: boolean;
  score: number;
  UI: UI;
  fontColor: string;
  particles: (Dust | Fire | Splash)[];
  maxParticles: number;
  collisions: CollisionAnimation[];
  time: number;
  maxTime: number;
  gameOver: boolean;
  lives: number;
  floatingMessages: FloatingMessage[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.groundMargin = 82;
    this.speed = 0;
    this.maxSpeed = 6;
    this.background = new Background(this);
    this.player = new Player(this);
    this.input = new InputHandler(this);
    this.UI = new UI(this);
    this.particles = [];
    this.maxParticles = 50;
    this.enemies = []; 
    this.enemyInterval = 1000;
    this.enemyTimer = 0;

    this.debug = false;

    this.score = 0;
    this.fontColor = 'rgba(0, 0, 0)';
    this.player.currentState = this.player.states[0];
    this.player.currentState.enter();

    this.collisions = [];

    this.time = 0;
    this.maxTime = 1000 * 60;
    this.gameOver = false;

    this.lives = 5;

    this.floatingMessages = []
  }

  update(deltaTime: number) {

    this.time += deltaTime;
    if(this.time > this.maxTime) this.gameOver = true;

    this.background.update();
    this.player.update(this.input.keys, deltaTime);

    if(this.enemyTimer > this.enemyInterval) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }

    this.enemies.forEach((enemy, index) => {
      enemy.update(deltaTime);
      if(enemy.markedForDeletion) {
        this.enemies.splice(index, 1);
      }
    })

    this.particles.forEach((particle, index) => {
      particle.update();
      if(particle.markedForDeletion) {
        this.particles.splice(index, 1);
      }
    })

    if(this.particles.length > this.maxParticles) {
      this.particles.length = this.maxParticles;
    }

    this.collisions.forEach((collision, index) => {
      collision.update(deltaTime);
      if(collision.markedForDeletion) {
        this.collisions.splice(index, 1);
      }
    })

    this.floatingMessages.forEach((floatingMessage) => {
      floatingMessage.update();
    })
    this.floatingMessages.filter(floatingMessage => !floatingMessage.markedForDeletion);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.background.draw(ctx);
    this.player.draw(ctx);

    this.enemies.forEach((enemy) => {
      enemy.draw(ctx);
    })

    this.particles.forEach((particle) => {
      particle.draw(ctx);
    })

    this.collisions.forEach((collision) => {
      collision.draw(ctx);
    })

    this.floatingMessages.forEach((floatingMessage) => {
      floatingMessage.draw(ctx);
    })

    this.UI.draw(ctx);
  }

  addEnemy() {
    if(this.speed > 0 && Math.random() < 0.5) {
      this.enemies.push(new GroundEnemy(this));
    } else if(this.speed > 0) {
      this.enemies.push(new ClimbingEnemy(this));
    }
    this.enemies.push(new FlyingEnemy(this));
  }
}