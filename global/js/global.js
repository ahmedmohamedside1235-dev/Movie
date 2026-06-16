let moviesCart = [],
    popups = document.querySelectorAll(`.popup`),
    dataMovies = {
        trending: [],
        popular: [],
        topRated: [],
        nowPlaying: [],
        upcoming: []
    },
    allMovies = [],
    starsContainer = document.getElementById('starsContainer'),
    loadingPadge = document.querySelector('#LoadingPage'),
    fillLoad = document.querySelector('#LoadingPage .content .layout .load-line'),
    rate = document.querySelector('#LoadingPage .content .layout .load .color'),
    done = document.querySelector('#LoadingPage .content .layout .load .loa'),
    lines = document.querySelectorAll('.lines-load'),
    succesfulMessage = document.querySelector('#LoadingPage .content .layout .success-info');


//* show stars
for (let i = 0; i < 200; i++) {
    let star = document.createElement('div');
    star.className = 'star';

    let size = Math.random() * 2.5 + 0.5;

    star.style.cssText = `
        width:  ${size}px;
        height: ${size}px;
        left:   ${Math.random() * 100}%;
        top:    ${Math.random() * 100}%;  
        --duration:     ${2 + Math.random() * 4}s;
        --delay: -${Math.random() * 4}s;  
    `;
    starsContainer.appendChild(star);
}


(async function () {
    dataMovies.trending = (await getDataMovie(url.trending)).results;
    dataMovies.popular = (await getDataMovie(url.popular)).results;
    dataMovies.topRated = (await getDataMovie(url.topRated)).results;
    dataMovies.nowPlaying = (await getDataMovie(url.nowPlaying)).results;
    dataMovies.upcoming = (await getDataMovie(url.upcoming)).results;

    //* combine All data movie
    combineAllMovies();
})();

//* get movie cart from local storage
if (localStorage.getItem("moviesCart") == null) {
    updateLocalStorag();
} else {
    moviesCart = JSON.parse(localStorage.getItem("moviesCart"));
}

popups.forEach((popup) => {
    popup.addEventListener("click", closePopup);
    let box = popup.querySelector(".box");
    box.addEventListener("click", (e) => {
        e.stopPropagation();
    });
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePopup();
    }
});

document.addEventListener('click', (e) => {
    let searchLi = document.querySelector('.searchLi'),
        resultsBox = document.querySelector('.search-results');
    if (searchLi && !searchLi.contains(e.target)) {
        resultsBox.classList.remove('show');
    }
});
