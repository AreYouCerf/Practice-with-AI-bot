/* const themeToggleButton = document.getElementById('themeToggle')
function getInitialTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) return savedTheme
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
}
const currentTheme = getInitialTheme()
setTheme(currentTheme)
if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const themeIsDark = document.documentElement.getAttribute('data-theme') === 'dark'
    setTheme(themeIsDark ? 'light' : 'dark')
  })
} */

const themeToggleButton = document.getElementById('themeToggle');

if (themeToggleButton) {
  themeToggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}