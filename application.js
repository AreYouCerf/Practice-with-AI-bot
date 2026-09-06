//The first task
const greeting = document.querySelector('.greeting');
greeting.textContent = 'Доброго времени суток!'

//The second task
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

//The third task
const box = document.querySelector('.hidden');
let content = document.querySelector('.contentButton');
document.querySelector('.contentButton').addEventListener('click', () => {
  box.classList.toggle('unhidden');
  if (box.classList.contains('unhidden')) {
    content.textContent = 'Скрыть содержимое';
  } else {
    content.textContent = 'Показать содержимое'
  }
})