document.addEventListener('DOMContentLoaded', function() {
    // Load about page by default
    loadPage('about');
    

    document.querySelectorAll('.topbar a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.topbar a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    var aboutLink = document.querySelector('.topbar a[href="#about"]');
    if (aboutLink) {
        aboutLink.classList.add('active');
    }
});

function loadPage(page) {
    const content = document.getElementById('content-container');

    content.classList.remove('fade-in');
    content.classList.add('fade-out');

    content.addEventListener('transitionend', function handler() {
        content.removeEventListener('transitionend', handler);
        fetch(`pages/${page}.html`)
            .then(response => response.text())
            .then(html => {
                content.innerHTML = html;
                history.pushState(null, null, `#${page}`);
                document.querySelectorAll('.topbar a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${page}`) {
                        link.classList.add('active');
                    }
                });
                // Start fade in
                content.classList.remove('fade-out');
                content.classList.add('fade-in');
            })
            .catch(err => {
                console.error(`Failed to load page: ${page}`, err);
                content.innerHTML = `
                    <section class="page-content">
                        <h2>Page Not Found</h2>
                        <p>The requested page could not be loaded.</p>
                    </section>
                `;
                content.classList.remove('fade-out');
                content.classList.add('fade-in');
            });
    });
}