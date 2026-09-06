const greeting = document.querySelector('.greeting');
greeting.textContent = 'Доброго времени суток!'

let counter = 0
const outer = document.querySelector('.counter');
document.querySelector('.buttonPlus').addEventListener('click', () => {
  counter = counter + 100000;
  outer.textContent = counter;
});
document.querySelector('.buttonMinus').addEventListener('click', () => {
  if (counter >= 100000) {
    counter = counter - 100000;
    outer.textContent = counter;
  }
})