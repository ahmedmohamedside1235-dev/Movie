//* after Dom load get id from search
document.addEventListener('DOMContentLoaded', async () => {
    let id = parseInt(new URLSearchParams(window.location.search).get('id')) || JSON.parse(localStorage.getItem('id')) || 1083381;

    //* details movie
    let detailsMovie = await getDetailsMovies(id);

    //* cast movie
    let credits = await getDataMovie(url.movieCredits(id));
    let cast = credits.cast;

    //* key video
    let keyVideo = await getKeyVideo(id);

    showDataInPageDetails(detailsMovie, cast, keyVideo);
});

(function () {
    requestAnimationFrame(animate);
})()