export const drawGameOver = (ctx: CanvasRenderingContext2D, score: number, canvas: HTMLCanvasElement) => {
  ctx.textAlign = 'center';
  ctx.fillStyle = 'black';
  ctx.fillText(`游戏结束： 你的分数为${score}`, canvas.width /2, canvas.height /2);
  ctx.fillStyle = 'white';
  ctx.fillText(`游戏结束： 你的分数为${score}`, canvas.width /2 + 5, canvas.height /2 + 5);
}