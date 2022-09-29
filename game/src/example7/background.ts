class BackGround {
  gameWidth: number;
  gameHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  img: HTMLImageElement;
  speed: number;

  constructor(gameWidth: number, gameHeight: number) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 2400;
    this.height = 720;
    this.x = 0;
    this.y = 0;
    this.img = document.querySelector('#backgroundImage') as HTMLImageElement;
    this.speed = 6;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.img, this.x + this.width - this.speed, this.y, this.width, this.height);
  }

  update() {    
    this.x -= this.speed;

    if(this.x < -this.width) this.x = 0;
  }
}

export {
  BackGround
}