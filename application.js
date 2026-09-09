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

//создание input для ввода новых данных массива
const addWarInput = document.createElement('input')
addWarInput.className = 'addWarInput'
addWarInput.type = 'text'
addWarInput.placeholder = 'Добавьте событие в список выше...'
TFT.appendChild(addWarInput)

//создание кнопки для добавления данных в массив items
const addWarButton = document.createElement('button')
addWarButton.className = 'addWarButton'
addWarButton.type = 'button'
addWarButton.textContent = 'Добавить'
TFT.appendChild(addWarButton)

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

//обработка клика по кнопке addWarButton с изменением массива в памяти и ререндером списка из перезаписанного массива
addWarButton.addEventListener('click', () => {
  const text = addWarInput.value.trim()
  if (!text) return
  items.push(text)
  render(items)
  addWarInput.value = ''
})

//THE FIFTH TASK***************************************************************************************

/* document.addEventListener('DOMContentLoaded', () => {
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
}) */


//THE FIFTH TASK rework***************************************************************************************

document.addEventListener('DOMContentLoaded', () => {

  //Поиск form для ввода и span для вывода ошибки
  const clientInfo = document.querySelector('.clientInfo')
  const resultOfSubmit = document.querySelector('.resultOfSubmit')
  if (!clientInfo || !resultOfSubmit) return

  //Вставка placeholder в соответсвующие input по #
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

  //создания события form submit
  clientInfo.addEventListener('submit', (e) => {
    e.preventDefault()
    const surname = document.getElementById('yourSurname').value.trim()
    const name = document.getElementById('yourName').value.trim()
    const patronymic = document.getElementById('yourPatronymic').value.trim()
    const email = document.getElementById('yourEmail').value.trim()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let error = false
    let errorText = ''

    //Проверка email
    if (!emailRegex.test(email)) {
      error = true
      errorText = 'Пожалуйста, укажите корректный email.'
    }

    //Проверка заполненности ФИО в том случае, если email прошел проверку
    else if (!name || !surname || !patronymic) {
      error = true
      errorText = 'Имя, фамилия и отчество обязательны для заполнения.'
    }

    //Вывод ошибок в span в соответствии с вышеперечисленными условиями
    if (error) {
      resultOfSubmit.textContent = errorText
      resultOfSubmit.classList.add('resultOfSubmitView')
      return
    }

    //Очистка span в случае отсутствия ошибок
    else {
      resultOfSubmit.classList.remove('resultOfSubmitView')
      resultOfSubmit.textContent = ''
    }

    //Сбор данных заполненных в form и вывод в консоль
    const data = { surname, name, patronymic, email }
    console.log('Данные формы:', data)

    //Изменение текста button и opacity в случае прохождения проверок и отправки form
    const btn = clientInfo.querySelector('button[type="submit"]')
    const originalButtonText = btn.textContent
    btn.textContent = 'Отправлено!'
    btn.style.opacity = '0.7'

    //Возврат form к первоначальному состоянию с задержкой 2с
    setTimeout(() => {
      btn.textContent = originalButtonText
      btn.style.opacity = '1'
      clientInfo.reset()
      resultOfSubmit.classList.remove('resultOfSubmitView')
    }, 2000)
  })
})