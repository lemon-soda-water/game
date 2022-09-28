class Particle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  markForDetele: boolean;
  speedX: number;
  color: string;

  constructor(x: number, y: number, size: number, color: string) {
    // 在 canvas 的坐标
    this.x = x + size /2;
    this.y = y + size /3;
    // 粒子半径
    this.radius = Math.random() * size / 10;
    // 粒子最大半径
    this.maxRadius = Math.random() * 20 + 35;
    // 标记是否删除
    this.markForDetele = false;
    // 粒子每次移动的位置值
    this.speedX = Math.random() + 0.5;
    // 粒子的颜色
    this.color = color;
  }

  update() {
    // 粒子移动
    this.x += this.speedX;
    // 粒子增长值
    this.radius += 0.3;
    // 超过最大值删除
    // 这里可以提前控制透明度
    if(this.radius > this.maxRadius) this.markForDetele = true;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    // 控制透明度
    const alpha = (this.radius / this.maxRadius) > 1 ? 1 : (this.radius / this.maxRadius);
    ctx.globalAlpha = 1 - alpha;
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill();
    ctx.restore();
  }
}

export {
  Particle
}