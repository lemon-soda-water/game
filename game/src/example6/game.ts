import { Enemy } from "./enemy";
import { Ghost } from "./ghost";
import { Spider } from "./spider";
import { Worm } from "./worm";

class Game {
  enemies: Worm[];
  height: number;
  ctx: CanvasRenderingContext2D;
  width: number;
  enemyInterval: number;
  enemyTomer: number;
  enemyTypes: string[];

  constructor(ctx: CanvasRenderingContext2D, width: number, height: number) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.enemies = [];
    this.enemyInterval = 1000;
    this.enemyTomer = 0;
    this.enemyTypes = ['worm', 'ghost', 'spider'];
  }

  update(deltaTime: number) {

    this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);

    if(this.enemyTomer > this.enemyInterval) {
      this.#addNewEnemy();
      this.enemyTomer = 0;
    }
    
    this.enemyTomer += deltaTime;

    this.enemies.forEach(object => object.update(deltaTime));
  }

  draw() {
    this.enemies.forEach(object => object.draw(this.ctx));
  }

  #addNewEnemy() {

    const randomEnemy = this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

    if(randomEnemy === 'worm') {
      this.enemies.push(new Worm(this));
    } else if (randomEnemy === 'ghost') {
      this.enemies.push(new Ghost(this));
    } else if (randomEnemy === 'spider') {
      this.enemies.push(new Spider(this));
    }

    this.enemies.sort((a, b) => a.y - b.y);
  }
}

export {
  Game
}