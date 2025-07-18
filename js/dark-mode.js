document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('dark-mode-toggle');
  const sunIcon = document.getElementById('theme-sun');
  const moonIcon = document.getElementById('theme-moon');

  function setThemeIcons(isDark) {
    if (sunIcon && moonIcon) {
      if (isDark) {
        sunIcon.classList.remove('active');
        moonIcon.classList.add('active');
      } else {
        sunIcon.classList.add('active');
        moonIcon.classList.remove('active');
      }
    }
  }

  // Initial icon state
  setThemeIcons(document.documentElement.getAttribute('data-theme') === 'dark');

  if (toggle) {
    toggle.addEventListener('change', function() {
      const isDark = toggle.checked;
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
      setThemeIcons(isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  // On page load, set the toggle and icon based on saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (toggle) toggle.checked = savedTheme === 'dark';
    setThemeIcons(savedTheme === 'dark');
  }
});
