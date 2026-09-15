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
newDiv.textContent = 'Самые кровопролитные войны в истории нашей эры'
newDiv.className = 'armedClashes'
TFT.appendChild(newDiv)

//создание нового input
const newInput = document.createElement('input')
newInput.className = 'findWarInput'
newInput.type = 'text'
newInput.placeholder = 'Введите поисковый запрос...'
TFT.appendChild(newInput)

//создание счетчика найденных элементов
const countElements = document.createElement('h3')
countElements.className = 'countElements'
countElements.textContent = 'Поисковый запрос отсутствует.'
TFT.appendChild(countElements)

//создание кнопки сортировки по названию
const sortNameButton = document.createElement('button')
sortNameButton.className = 'sortNameButton'
sortNameButton.type = 'button'
sortNameButton.textContent = 'Сортировать по названию'
TFT.appendChild(sortNameButton)

//создание нового списка ul
const newUl = document.createElement('ul')
newUl.className = 'list'
TFT.appendChild(newUl)

//создание input для ввода новых данных массива
const addWarInput = document.createElement('input')
addWarInput.className = 'addWarInput'
addWarInput.type = 'text'
addWarInput.placeholder = 'Введите название события...'
TFT.appendChild(addWarInput)

//создание input для ввода новых данных массива
const addWarYearsInput = document.createElement('input')
addWarYearsInput.className = 'addWarYearsInput'
addWarYearsInput.type = 'text'
addWarYearsInput.placeholder = 'Введите даты начала и завершения события...'
TFT.appendChild(addWarYearsInput)

//создание кнопки для добавления данных в массив items
const addWarButton = document.createElement('button')
addWarButton.className = 'addWarButton'
addWarButton.type = 'button'
addWarButton.textContent = 'Добавить'
TFT.appendChild(addWarButton)

//создание массива
/* const items = [
  'Ирано-иракская война 1980-1988',
  'Шестидневная война 05.06.1967 - 10.06.1967',
  'Война в Персидском заливе 1990-1991',
  'Афганская война 1979-1989',
  'Вьетнамская война 1955-1975'
] */
const items = [
  { title: 'Наполеоновские войны', years: '1799-1815' },
  { title: 'Гражданская война в России', years: '1917-1923' },
  { title: 'Дунганское восстание', years: '1862' },
  { title: 'Восстание Ай Лушаня', years: '8 век нашей эры' },
  { title: 'Первая мировая война', years: '1914-1918' },
  { title: 'Войны Тамерлана', years: '14 век' },
  { title: 'Восстание тайпинов', years: '1850-1864' },
  { title: 'Захват Китая маньчжурской династией', years: '1616-1662' },
  { title: 'Войны Монгольской империи', years: '13-15 века' },
  { title: 'Вторая мировая война', years: '1939-1945' }
]

//ссылка на ul после его добавления в DOM
const list = newUl

//функция рендера массива и его вывод в виде списка ul
function render(array) {
  list.replaceChildren()
  array.forEach((item) => {
    const li = document.createElement('li')
    const { title, years } = item
    li.dataset.title = title
    li.dataset.years = years
    li.textContent = `${title} (Даты начала и завершения: ${years})`
    list.append(li)
  })
}

/* loadArray()
// стартовая загрузка массива с учетом того, что input пустой, следовательно будет выведен весь массив, т.к. любая строка содержит пустой кусок
render(items) */

//rework стартовой загрузки массива
loadArray().then(() => render(items))

//функция фильтра содержимого
function filtered() {
  const query = newInput.value.toLowerCase()
  const shownElements = items.filter(({ title, years }) =>
    title.toLowerCase().includes(query) || years.toLowerCase().includes(query))
  if (!query) {
    countElements.textContent = 'Поисковый запрос отсутствует.'
    render(items)
  } else {
    render(shownElements)
    countElements.textContent = `Найдено: ${shownElements.length}`
  }
  if (query && shownElements.length === 0) {
    list.replaceChildren()
    const emptyElementLi = document.createElement('li')
    emptyElementLi.textContent = 'В списке ничего не найдено'
    list.append(emptyElementLi)
    countElements.textContent = 'Найдено: 0'
    return
  }
}

//функция сохранения массива
function saveArray() {
  localStorage.setItem('wars', JSON.stringify(items))
}

//функция загрузки массива
async function loadArray() {
  const saved = localStorage.getItem('wars')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) {
        items.splice(0, items.length, ...parsed)
      }
    } catch (error) {
      console.log('Не удалось получить wars', error)
    }
    return
  }
  try {
    const res = await fetch('wars.json')
    if (!res.ok) throw new Error('HTTP' + res.status)
    const data = await res.json()
    if (Array.isArray(data)) {
      items.splice(0, items.length, ...data)
    }
  } catch (error) {
    console.log('Не удалось загрузить wars.json', error)
  }
}

/* фильтр содержимого по каждому введенному знаку в нижнем регистре
debounce - добавление задержки перед фильтрацией, чтобы по каждому введенному символу
не происходила пересборка DOM */
let timer
newInput.addEventListener('input', () => {
  clearTimeout(timer)
  timer = setTimeout(filtered, 500)
})

/* обработка клика по кнопке addWarButton с изменением массива в памяти и ререндером списка из перезаписанного массива
с реюзом ранее созданного фильтра */

/* addWarButton.addEventListener('click', () => {
  const text = addWarInput.value.trim()
  const yearsWar = addWarYearsInput.value.trim()
  if (!text || !yearsWar) return
  items.push({ title: text, years: yearsWar })
  saveArray()
  filtered()
  addWarInput.value = ''
  addWarYearsInput.value = ''
}) */

//rework обработки клика этапом выше с добавление обработчика нажатия клавиши Enter по обоим полям ввода
function addWar() {
  const text = addWarInput.value.trim()
  const yearsWar = addWarYearsInput.value.trim()
  if (!text || !yearsWar) return
  const exists = items.some((item) =>
    item.title.toLowerCase() === text.toLowerCase() && item.years.toLowerCase() === yearsWar.toLowerCase())
  if (exists) {
    alert('Такая запись уже существует.')
    return
  }
  items.push({ title: text, years: yearsWar })
  saveArray()
  filtered()
  addWarInput.value = ''
  addWarYearsInput.value = ''
}
addWarButton.addEventListener('click', addWar)
addWarInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addWar()
})
addWarYearsInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') addWar()
})

//очистка поля при нажатии клавиши escape
newInput.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return
  newInput.value = ''
  filtered()
})

//обработка клика внутри списка ul по ближайшему дочернему li с удалением пункта из списка ul
list.addEventListener('click', (event) => {
  const li = event.target.closest('li')
  if (!li) return
  const i = items.findIndex((item) => item.title === li.dataset.title && item.years === li.dataset.years)
  if (i === -1) return
  items.splice(i, 1) //splice вырезает данные из массива
  saveArray()
  filtered()
})

//функция сортировки по названию
let nameDir = 1
function sortByName() {
  items.sort((a, b) => a.title.localeCompare(b.title, 'ru') * nameDir)
  nameDir = -nameDir
  saveArray()
  filtered()
}

//обработчик клика по кнопке сортировки
sortNameButton.addEventListener('click', sortByName)

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