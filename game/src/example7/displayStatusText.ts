import { score } from "./enemy";
import { gameOver } from "./player";

export function displayStatusText(ctx: CanvasRenderingContext2D, width: number) {
  ctx.font = '40px Helvetica';
  ctx.fillStyle = '#000';
  ctx.fillText(`Socre： ${score}`, 20, 50);
  ctx.fillStyle = '#fff';
  ctx.fillText(`Socre： ${score}`, 22, 52);
  if(gameOver) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('游戏结束！', width / 2, 200);
    ctx.fillStyle = '#fff';
    ctx.fillText('游戏结束！', width / 2 + 3, 202);
  }
}