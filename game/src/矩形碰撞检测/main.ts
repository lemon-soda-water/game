// 对游戏碰撞进行检测

// 矩形1 的位置
const rect1 = {
  x: 20,
  y: 50,
  width: 100,
  height: 100
}

// 矩形2 的位置
const rect2 = {
  x: 150,
  y: 130,
  width: 200,
  height: 320
}

// 第一种判断
if (
  rect1.x < rect2.x + rect2.width &&
  rect1.x + rect1.width > rect2.x &&
  rect1.y < rect2.y + rect2.height &&
  rect1.y + rect1.height > rect2.height
) {
  console.log('碰撞了');
} else {
  console.log('没有碰撞');
}

// 第二种判断
if (
  rect1.x > rect2.x + rect2.width ||
  rect1.x + rect1.width < rect2.x ||
  rect1.y > rect2.y + rect2.height ||
  rect1.y + rect1.height < rect2.height
) {
  console.log('没有碰撞');
} else {
  console.log('碰撞了');
}

// 为了不报错，默认没有导出
export {}