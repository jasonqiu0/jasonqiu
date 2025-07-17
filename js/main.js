
function loadPage(page) {
    fetch(`pages/${page}.html`)
      .then(response => response.text())
      .then(html => {
        document.getElementById('main-content').innerHTML = html;
        history.pushState(null, null, `#${page}`);
      });
  }
  
  // Initialize with hash or default page
  window.addEventListener('DOMContentLoaded', () => {
    const page = window.location.hash.substring(1) || 'about';
    loadPage(page);
  });