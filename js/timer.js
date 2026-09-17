document.addEventListener('DOMContentLoaded', () => {
  const targetSection = document.querySelector('.theSixthTask')
  const nonVisible = document.querySelector('.startTimerQuestion')
  const answerNoButton = document.querySelector('.answerNoButton')
  const answerYesButton = document.querySelector('.answerYesButton')
  const timerDisplay = document.querySelector('.timer')
  const stopTimerButton = document.querySelector('.stopButtonTimer')
  const startTimerButton = document.querySelector('.startButtonTimer')
  const clearTimerButton = document.querySelector('.clearButtonTimer')
  let seconds = 0
  let intervalId = null

  function formatTime(total) {
    const minutes = Math.floor(total / 60)
    const secondsFormat = total % 60
    return `${String(minutes).padStart(2, '0')}:${String(secondsFormat).padStart(2, '0')}`
  }

  if (timerDisplay) {
    timerDisplay.textContent = formatTime(seconds)
  }

  function startTimer() {
    if (intervalId !== null) { return }
    intervalId = setInterval(() => {
      seconds += 1
      if (timerDisplay) {
        timerDisplay.textContent = formatTime(seconds)
      }
    }, 1000)
  }

  function stopTimer() {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
      if (timerDisplay) {
        timerDisplay.textContent = formatTime(seconds)
      }
    }
  }

  function clearTimer() {
    stopTimer()
    seconds = 0
    if (timerDisplay) {
      timerDisplay.textContent = formatTime(seconds)
    }
  }

  if (targetSection && nonVisible) {
    const options = {
      root: null,
      threshold: 1.0
    }
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          nonVisible.classList.add('visible')
          observer.unobserve(entry.target)
        }
      })
    }, options)
    observer.observe(targetSection)
  }

  if (answerNoButton && nonVisible) {
    answerNoButton.addEventListener('click', () => {
      nonVisible.classList.remove('visible')
      stopTimer()
    })
  }

  if (answerYesButton && nonVisible && timerDisplay) {
    answerYesButton.addEventListener('click', () => {
      nonVisible.classList.remove('visible')
      startTimer()
    })
  }

  if (stopTimerButton) {
    stopTimerButton.addEventListener('click', () => {
      stopTimer()
    })
  }

  if (startTimerButton && timerDisplay) {
    startTimerButton.addEventListener('click', () => {
      startTimer()
    })
  }

  if (clearTimerButton && timerDisplay) {
    clearTimerButton.addEventListener('click', () => {
      clearTimer()
    })
  }
})