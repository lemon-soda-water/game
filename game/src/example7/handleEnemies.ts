import { Enemy } from "./enemy"

let enemies: Enemy[] = [];

let enemyTimer = 0;
const enemyInterval = 1000;
let RandomEnemyInterval = Math.random() * 1000 + 500;

export const handleEnemies = (ctx: CanvasRenderingContext2D, deltaTime: number, gameWidth: number, gameHeight: number) => {
  if (enemyTimer > enemyInterval + RandomEnemyInterval) {
    enemies.push(new Enemy(gameWidth, gameHeight));
    enemyTimer = 0;
    RandomEnemyInterval = Math.random() * 1000 + 500;
  } else {
    enemyTimer += deltaTime;
  }

  enemies.forEach(enemy => {
    enemy.update(deltaTime);
    enemy.draw(ctx);
  })

  enemies = enemies.filter(enemy => !enemy.markedForDeletion)
}

export {
  enemies
}