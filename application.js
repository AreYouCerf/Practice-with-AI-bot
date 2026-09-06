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

//The fourth task
const TFT = document.querySelector('.theFourthTask');
const newDiv = document.createElement('div');
newDiv.textContent = 'Военные конфликты 20-го века';
newDiv.className = 'armedClashes';
TFT.appendChild(newDiv);
const newUl = document.createElement('ul');
newUl.className = 'list';
TFT.appendChild(newUl);
const items = [
  'Ирано-иракская война 1980-1988',
  'Шестидневная война 05.06.1967 - 10.06.1967',
  'Война в Персидском заливе 1990-1991',
  'Афганская война 1979-1989',
  'Вьетнамская война 1955-1975'
];
const list = document.querySelector('.list');
items.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item;
  list.append(li);
})