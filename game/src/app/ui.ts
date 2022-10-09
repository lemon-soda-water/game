import { Game } from "./game";

export class UI {
  game: Game;
  fontSize: number;
  fontFamily: string;
  livesImage: HTMLImageElement;

  constructor(game: Game) {
    this.game = game;
    this.fontSize = 30;
    this.fontFamily = 'Helvetica';
    this.livesImage = document.querySelector('#lives') as HTMLImageElement;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();

    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 0;

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = 'left';
    ctx.fillStyle = this.game.fontColor;
    ctx.fillText(`Score: ${this.game.score}`, 20, 50);

    ctx.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
    ctx.fillText(`Time: ${(this.game.time * 0.001).toFixed(1)} s`, 20, 80);

    for (let i = 0; i < this.game.lives; i++) {
      ctx.drawImage(this.livesImage, 25 * i + 20, 95, 25, 25); 
    }

    if(this.game.gameOver) {
      ctx.textAlign = 'center';
      ctx.font = `${this.fontSize * 2}px ${this.fontFamily}`;
      ctx.fillText('Game Over', this.game.width * 0.5, this.game.height * 0.5);
    }
    ctx.restore();
  }
}