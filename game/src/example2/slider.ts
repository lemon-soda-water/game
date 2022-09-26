let gameSpeed = 5;

const slider = document.querySelector('#slider');
const span = document.querySelector('.showGameSpeed');

slider?.addEventListener('change', (e) => {
  gameSpeed = Number((e.target as HTMLInputElement).value);
  span!.textContent = (e.target as HTMLInputElement).value;
})

export {
  gameSpeed
}