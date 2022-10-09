import { Game } from "./game";

export type keyName = 'ArrowDown'| 'ArrowUp'| 'ArrowLeft'| 'ArrowRight' | 'Enter';
const keyNames: keyName[] = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter'];

class InputHandler {
  keys: keyName[];
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if(keyNames.includes(e.key as keyName) && this.keys.indexOf(e.key as keyName) === -1) {        
        this.keys.push(e.key as keyName);
      } else if(e.key === 'd') {
        this.game.debug = !this.game.debug;
      }
    })

    window.addEventListener('keyup', e => {
      if(keyNames.includes(e.key as keyName)) {
        this.keys.splice(this.keys.indexOf(e.key as keyName), 1);
      }
    })
  }
}

export {
  InputHandler
}