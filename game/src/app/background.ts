import { Game } from "./game";

export class Layer {
  game: Game;
  width: number;
  height: number;
  speedModifier: number;
  image: HTMLImageElement;
  x: number;
  y: number;
  
  constructor(game: Game, width: number, height: number, speedModifier: number, image: HTMLImageElement) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.speedModifier = speedModifier;
    this.image = image;
    this.x = 0;
    this.y = 0;
  }

  update() {
    if(this.x < -this.width) this.x = 0
    else this.x -= this.game.speed * this.speedModifier;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}

export class Background {
  game: Game;
  width: number;
  height: number;
  backgroundLayers: Layer[];
  layer1image: HTMLImageElement;
  layer2image: HTMLImageElement;
  layer3image: HTMLImageElement;
  layer4image: HTMLImageElement;
  layer5image: HTMLImageElement;
  layer1: Layer;
  layer2: Layer;
  layer3: Layer;
  layer4: Layer;
  layer5: Layer;

  constructor(game: Game) {
    this.game = game;
    this.width = 1667;
    this.height = 500;
    this.layer1image = document.querySelector('#layer1') as HTMLImageElement;
    this.layer2image = document.querySelector('#layer2') as HTMLImageElement;
    this.layer3image = document.querySelector('#layer3') as HTMLImageElement;
    this.layer4image = document.querySelector('#layer4') as HTMLImageElement;
    this.layer5image = document.querySelector('#layer5') as HTMLImageElement;
    this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1image);
    this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2image);
    this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3image);
    this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4image);
    this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5image);
    this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
  }

  update() {
    this.backgroundLayers.forEach(layer => {
      layer.update();
    })
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.backgroundLayers.forEach(layer => {
      layer.draw(ctx);
    })
  }
}