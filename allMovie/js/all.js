let starsContainer = document.getElementById('StarsContainer'),
    TypeMovie = new URLSearchParams(window.location.search).get('type') || 'trending',
    movies = [],
    moviesCart = JSON.parse(localStorage.getItem('moviesCart')) ?? [],
    linksGenres = document.querySelectorAll('.type_link'),
    head = document.querySelector('#Header .head h2 #Type');
head.textContent = `${TypeMovie}`;

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

//* show stars
for (let i = 0; i < 60; i++) {
    let star = document.createElement('div');
    star.className = 'star';
    let size = Math.random() * 4 + 2;
    star.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;  
        --duration:     ${3 + Math.random() * 4}s;
        --delay: -${Math.random() * 4}s;  
    `;
    starsContainer.appendChild(star);
}

(async function () {
    showLoading();
    movies = (await getDataMovie(url[TypeMovie])).results;

    if (!movies || movies.length === 0) {
        showError();
        return;
    }

    hideLoading();
    showMovies(movies);
})();

linksGenres.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('active')) return;
        updateActive(link);
        if (link.dataset.name == 'all') {
            showMovies(movies);
        } else {
            showMovieGenres(GENRES[link.dataset.name]);
        }
    })
});




