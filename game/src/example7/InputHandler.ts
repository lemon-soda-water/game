type keyName = 'ArrowDown'| 'ArrowUp'| 'ArrowLeft'| 'ArrowRight';
const keyNames: keyName[] = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];

class InputHandler {
  keys: keyName[];

  constructor() {
    this.keys = [];
    window.addEventListener('keydown', (e) => {
      if(keyNames.includes(e.key as keyName) && this.keys.indexOf(e.key as keyName) === -1) {
        this.keys.push(e.key as keyName);
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