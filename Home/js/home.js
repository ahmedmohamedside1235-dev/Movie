let genres = {
    g1: "trending",
    g2: "popular",
    g3: "topRated",
    g4: "nowPlaying",
    g5: "upcoming",
},
    contentHeader = document.querySelector(`#Home .swiper .swiper-wrapper`),
    token = localStorage.getItem("token"),
    ulLogin = document.querySelector(".navbar-nav.icons"),
    userName = new URLSearchParams(window.location.search).get('userName')?.split('%20').join(' ') || localStorage.getItem('userName') || 'User';


//* check the user login or not
if (token != "null" && token) {
    addUlLogin(true);
} else {
    addUlLogin(false);
}

(async function () {
    requestAnimationFrame(animate);
    dataMovies.trending = (await getDataMovie(url.trending)).results;
    dataMovies.popular = (await getDataMovie(url.popular)).results;
    dataMovies.topRated = (await getDataMovie(url.topRated)).results;
    dataMovies.nowPlaying = (await getDataMovie(url.nowPlaying)).results;
    dataMovies.upcoming = (await getDataMovie(url.upcoming)).results;

    showMoviesInHeader(dataMovies.trending);
    //* show data in section
    for (let genre in genres) {
        showDataMoviesInSections(genres[genre]);
    }
})();


//* select element nav
let buttonLogin = document.querySelector(".button-login"),
    searchInput = document.getElementById("search"),
    searchIcon = document.querySelector(".searchLi img");

//* if the user login or logout
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

//* send query for the function after enter data 
let searchTimeout;
searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    let query = e.target.value;
    searchTimeout = setTimeout(() => {
        searchMovies(query);
    }, 400);
});