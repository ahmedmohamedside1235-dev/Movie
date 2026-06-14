let genres = {
    g1: "trending",
    g2: "popular",
    g3: "topRated",
    g4: "nowPlaying",
    g5: "upcoming",
},
    contentHeader = document.querySelector(`#Home .swiper .swiper-wrapper`);


(async function () {
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

