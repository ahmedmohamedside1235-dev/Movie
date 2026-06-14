let token = localStorage.getItem("token"),
    ulLogin = document.querySelector(".navbar-nav.icons"),
    userName = new URLSearchParams(window.location.search).get('userName')?.split('%20').join(' ') || localStorage.getItem('userName') || 'User',
    moviesCart = [],
    popups = document.querySelectorAll(`.popup`),
    dataMovies = {
        trending: [],
        popular: [],
        topRated: [],
        nowPlaying: [],
        upcoming: []
    },
    allMovies = [];


(async function () {
    dataMovies.trending = (await getDataMovie(url.trending)).results;
    dataMovies.popular = (await getDataMovie(url.popular)).results;
    dataMovies.topRated = (await getDataMovie(url.topRated)).results;
    dataMovies.nowPlaying = (await getDataMovie(url.nowPlaying)).results;
    dataMovies.upcoming = (await getDataMovie(url.upcoming)).results;

    //* combine All data movie
    combineAllMovies();
})();

if (token != "null" && token) {
    addUlLogin(true);
} else {
    addUlLogin(false);
}

if (localStorage.getItem("moviesCart") == null) {
    updateLocalStorag();
} else {
    moviesCart = JSON.parse(localStorage.getItem("moviesCart"));
}

let buttonLogin = document.querySelector(".button-login"),
    searchInput = document.getElementById("search"),
    searchIcon = document.querySelector(".searchLi img");

buttonLogin.addEventListener("click", function () {
    if (token != "null" && token) {
        localStorage.removeItem("token");
    }
    window.location.href = "./index.html";
});

document.addEventListener("click", function (e) {
    hideInputSearch();
});

searchInput.addEventListener('click', function (e) {
    e.stopPropagation();
});

searchIcon.addEventListener('click', function (e) {
    e.stopPropagation();
});

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

//* send query for the function after enter data 
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    let query = e.target.value;
    searchTimeout = setTimeout(() => {
        searchMovies(query);
    }, 400);
});

document.addEventListener('click', (e) => {
    let searchLi = document.querySelector('.searchLi'),
        resultsBox = document.querySelector('.search-results');
    if (searchLi && !searchLi.contains(e.target)) {
        resultsBox.classList.remove('show');
    }
});