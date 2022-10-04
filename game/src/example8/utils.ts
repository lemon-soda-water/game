import { InputHandler } from "./inputHandler";
import { Player } from "./player";

export const drawStatusText = (ctx: CanvasRenderingContext2D, input: InputHandler, player: Player) => {
  ctx.font = '28px Helvetica';
  ctx.fillText(`Last input: ${input.lastkey}`, 20, 50);
  ctx.fillText(`Active state: ${player.currentState.state}`, 20, 100);
}