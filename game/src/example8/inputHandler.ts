enum KeyName {
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight'
}

export enum PressKey {
  Left = 'PRESS left',
  Right = 'PRESS right',
  Up = 'PRESS up',
  Down = 'PRESS down'
}

export enum ReleaseKey {
  Left = 'RELEASE left',
  Right = 'RELEASE right',
  Up = 'RELEASE up',
  Down = 'RELEASE down'
}

export class InputHandler {
  lastkey: PressKey | ReleaseKey | '';

  constructor() {
    this.lastkey = '';
    window.addEventListener('keydown', (e) => {
      switch(e.key) {
        case KeyName.ArrowLeft:
          this.lastkey = PressKey.Left;
          break
        case KeyName.ArrowRight:
          this.lastkey = PressKey.Right;
          break
        case KeyName.ArrowUp:
          this.lastkey = PressKey.Up;
          break
        case KeyName.ArrowDown:
          this.lastkey = PressKey.Down;
          break
        default:
          this.lastkey = '';
      }
    })

    window.addEventListener('keyup', e => {
      switch(e.key) {
        case KeyName.ArrowLeft:
          this.lastkey = ReleaseKey.Left;
            break
          case KeyName.ArrowRight:
            this.lastkey = ReleaseKey.Right;
            break
          case KeyName.ArrowUp:
            this.lastkey = ReleaseKey.Up;
            break
          case KeyName.ArrowDown:
            this.lastkey = ReleaseKey.Down;
            break
          default:
            this.lastkey = '';
      }
    })
  }
}