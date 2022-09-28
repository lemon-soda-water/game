export const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
  ctx.fillStyle = 'black';
  ctx.fillText(`Score: ${score}`, 50, 75);
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 55, 80);
}