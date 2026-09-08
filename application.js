//THE FIRST TASK***************************************************************************************

const greeting = document.querySelector('.greeting')
greeting.textContent = 'Доброго времени суток!'

//THE SECOND TASK***************************************************************************************

let counter = 0
const outer = document.querySelector('.counter')
document.querySelector('.buttonPlus').addEventListener('click', () => {
  counter = counter + 100000
  outer.textContent = counter
})
document.querySelector('.buttonMinus').addEventListener('click', () => {
  if (counter >= 100000) {
    counter = counter - 100000
    outer.textContent = counter
  }
})

//THE THIRD TASK***************************************************************************************

const box = document.querySelector('.hidden')
let content = document.querySelector('.contentButton')
document.querySelector('.contentButton').addEventListener('click', () => {
  box.classList.toggle('unhidden')
  if (box.classList.contains('unhidden')) {
    content.textContent = 'Скрыть содержимое'
  } else {
    content.textContent = 'Показать содержимое'
  }
})

//THE FOURTH TASK***************************************************************************************

const TFT = document.querySelector('.theFourthTask')

//создание нового div
const newDiv = document.createElement('div')
newDiv.textContent = 'Военные конфликты 20-го века'
newDiv.className = 'armedClashes'
TFT.appendChild(newDiv)

//создание нового input
const newInput = document.createElement('input')
newInput.className = 'findWarInput'
newInput.type = 'text'
newInput.placeholder = 'Введите поисковый запрос...'
TFT.appendChild(newInput)

//создание нового списка ul
const newUl = document.createElement('ul')
newUl.className = 'list'
TFT.appendChild(newUl)

//создание массива
const items = [
  'Ирано-иракская война 1980-1988',
  'Шестидневная война 05.06.1967 - 10.06.1967',
  'Война в Персидском заливе 1990-1991',
  'Афганская война 1979-1989',
  'Вьетнамская война 1955-1975'
]

//ссылка на ul после его добавления в DOM
const list = newUl

//функция рендера массива и его вывод в виде списка ul
function render(array) {
  list.replaceChildren()
  array.forEach((item) => {
    const li = document.createElement('li')
    li.textContent = item
    list.append(li)
  })
}

//стартовая загрузка массива с учетом того, что input пустой, следовательно будет выведен весь массив, т.к. любая строка содержит пустой кусок
render(items)

//фильтр содержимого по каждому введенному знаку, учитывающий строчное написание и заглавное toLowerCase
newInput.addEventListener('input', () => {
  const query = newInput.value.toLowerCase()
  render(items.filter((item) =>
    item.toLowerCase().includes(query)))
})

//THE FIFTH TASK***************************************************************************************
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.clientInfo')
  if (!form) return

  const placeholders = {
    '#yourSurname': 'Иванов',
    '#yourName': 'Иван',
    '#yourPatronymic': 'Иванович',
    '#yourEmail': 'ivanivanov@example.com'
  }

  Object.entries(placeholders).forEach(([selector, text]) => {
    const input = document.querySelector(selector)
    if (input) input.placeholder = text
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const surname = document.getElementById('yourSurname').value.trim()
    const name = document.getElementById('yourName').value.trim()
    const patronymic = document.getElementById('yourPatronymic').value.trim()
    const email = document.getElementById('yourEmail').value.trim()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      alert('Пожалуйста, укажите корректный email.')
      return
    }

    if (!name || !surname || !patronymic) {
      alert('Имя, фамилия и отчество обязательны для заполнения.')
      return
    }

    const data = {
      surname,
      name,
      patronymic,
      email
    }

    console.log('Данные формы:', data)

    const originalBtnText = form.querySelector('button[type="submit"]').textContent
    const btn = form.querySelector('button[type="submit"]')
    btn.textContent = 'Отправлено!'
    btn.style.opacity = '0.7'

    setTimeout(() => {
      btn.textContent = originalBtnText
      btn.style.opacity = '1'
      form.reset()
    }, 2000)
  })
})
