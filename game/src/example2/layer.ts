import { gameSpeed } from "./slider";

// 初始化图片
const backgroundLayer1 = new Image();
const backgroundLayer2 = new Image();
const backgroundLayer3 = new Image();
const backgroundLayer4 = new Image();
const backgroundLayer5 = new Image();

backgroundLayer1.src = '../../public/assets/project2/layer-1.png';
backgroundLayer2.src = '../../public/assets/project2/layer-2.png';
backgroundLayer3.src = '../../public/assets/project2/layer-3.png';
backgroundLayer4.src = '../../public/assets/project2/layer-4.png';
backgroundLayer5.src = '../../public/assets/project2/layer-5.png';

// 创建Class Layer
class Layer {
  x: number;
  y: number;
  width: number;
  height: number;
  x2: number;
  image: HTMLImageElement;
  speedModifier: number;
  speed: number;

  constructor(image: HTMLImageElement, speedModifier: number) {
    this.x = 0;
    this.y = 0;
    this.width = 2400;
    this.height = 700;
    this.x2 = this.width;
    this.image = image;
    this.speedModifier = speedModifier;
    this.speed = this.speedModifier * gameSpeed
  }

  // 更新图片位置
  update() {
    this.speed = this.speedModifier * gameSpeed;
    // 当动画走完后，重置动画位置
    if(this.x <= -this.width) {
      this.x = 0;
    }
    // 动画的速度
    this.x = Math.floor(this.x - this.speed);
  }

  // 绘制图片
  draw(ctx: CanvasRenderingContext2D) {
    // 第一张图片
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    // 第二张图片
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
  }
}


const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gamesObjects: Layer[] = [layer1, layer2, layer3, layer4, layer5];

export {
  gamesObjects
}