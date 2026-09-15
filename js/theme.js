const themeToggleBtn = document.getElementById('themeToggle')
const currentTheme = localStorage.getItem('theme')
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme)
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  if (prefersDark) {
    document.documentElement.setAttribute('data-theme', 'dark')
  }
}
themeToggleBtn.addEventListener('click', () => {
  let theme = document.documentElement.getAttribute('data-theme')
  if (theme === 'dark') {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  } else {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  }
})