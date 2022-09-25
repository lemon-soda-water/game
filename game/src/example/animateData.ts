type AnimationData = {
  [key in AnimationNames]: Frame
}

interface Frame {
  loc: {x: number, y: number}[]
}

interface AnimationState {
  name: AnimationNames,
  frames: number
}

// 精灵的大小
const spriteWidth = 575;
const spriteHeight = 523;

// 动画名
type AnimationNames = 'idle'|'jump'|'fall'|'run'|'dizzy'|'sit'|'sit'|'roll'|'bite'|'bite'|'ko'|'gethit'

// 每一组动画名字和帧数
const animationStates: AnimationState[] = [
  {
    name: 'idle',
    frames: 7
  },
  {
    name: 'jump',
    frames: 7
  },
  {
    name: 'fall',
    frames: 7
  },
  {
    name: 'run',
    frames: 9
  },
  {
    name: 'dizzy',
    frames: 11
  },
  {
    name: 'sit',
    frames: 5
  },
  {
    name: 'roll',
    frames: 7
  },
  {
    name: 'bite',
    frames: 7
  },
  {
    name: 'ko',
    frames: 12
  },
  {
    name: 'gethit',
    frames: 4
  }
]

// 每一组动画名字和位置
const spriteAnimations = {} as AnimationData

animationStates.forEach((state, index) => {
  const frames: Frame = {
    loc: []
  }

  for (let j = 0; j < state.frames; j++) {
    const positionX = j * spriteWidth;
    const positionY = index * spriteHeight;
    frames.loc.push({
      x: positionX,
      y: positionY
    })
  }

  spriteAnimations[state.name] = frames;
})

export {
  spriteWidth,
  spriteHeight,
  spriteAnimations
};
export type { AnimationNames };
