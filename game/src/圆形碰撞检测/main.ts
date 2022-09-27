// 圆形1
const circle1 = {
  x: 10,
  y: 10,
  radius: 300
}

// 圆形2
const circle2 = {
  x: 500,
  y: 500,
  radius: 150
}

// 两个圆之间 横坐标距离
const dx = circle2.x - circle1.x;

// 两个圆之间 纵坐标距离
const dy = circle2.y - circle1.y;

// 勾股定理
const distance = Math.sqrt(dx * dx + dy * dy);

// 两个圆半径和
const sumOfRadius = circle1.radius + circle2.radius;

if (distance > sumOfRadius) {
  console.log('相离');
} else if (distance === sumOfRadius) {
  console.log('相切');
} else {
  console.log('相交');
}

export {}