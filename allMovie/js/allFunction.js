function showMovies(movies) {
    let content = document.querySelector('#Movie .content .dataMovie .row');
    content.innerHTML = ``;
    movies.forEach((movie, index) => {

        //* check if the poster or background image is null
        if (movie.poster_path == null || movie.backdrop_path == null)
            return;

        //* get year
        let year = getDateMovie(movie.release_date).year;

        content.innerHTML +=
            `
        <div class=" col-sm-6 col-md-4 col-lg-3 cards">
            <div class="item mb-5">
                <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="img-fluid" alt="">
                <div class="data">
                    <div class="vote">
                        <p class="mb-0">${!movie.vote_average ? 'No vote' : movie.vote_average.toFixed(1)}</p>
                    </div>
                    <div class="info">
                        <h2 class="mb-2">${editTitleMovies(movie.title, 4)}</h2>
                        <p class="mb-0">${year}</p>
                    </div>
                </div>
                <div class="layout d-flex align-items-end justify-content-center">
                    <div class="body py-2 px-2 w-100">
                        <h2 class="mb-2">${editTitleMovies(movie.title, 4)}</h2>
                        <p class="mb-2">${year}</p>
                        <div class="buttons d-flex align-items-center justify-content-center">
                            ${(!checkBtnAddedCart(movie.id) ? `<button class="addCart me-2 btn" onclick="addToCart(${movie.id},'addCart')" data-id="${movie.id}"><i class="fa-solid fa-plus me-2"></i>Cart</button>` : `<button class="addCart me-2 btn" data-id="${movie.id}" onclick="removeFromCart(${movie.id},'addCart',${isDetailsPage(movie.id)},${isAllMoviesPage()})"> <i class="fa-regular fa-trash-can me-2"></i>Cart</button>`)}
                            <button class="btn" onclick='showDetailsMovie(${movie.id})'>
                                <span class="position-relative z-3">Details</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });

    let cards = document.querySelectorAll('.cards');
    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });
}

function showLoading() {
    let content = document.querySelector('#Movie .content .dataMovie .row');
    content.innerHTML = '';

    for (let i = 0; i < 20; i++) {
        content.innerHTML += `
            <div class="col-sm-6 col-md-4 col-lg-3 mb-5">
                <div class="loading-card"></div>
            </div>
        `;
    }
}

function hideLoading() {
    let content = document.querySelector('#Movie .content .dataMovie .row');
    content.innerHTML = '';
}

function showError() {
    let content = document.querySelector('#Movie .content .dataMovie .row');
    content.innerHTML = `
        <div class="error-load col-12 d-flex justify-content-center align-items-center">
            <div class="text-center info">
                <i class="fa-solid fa-triangle-exclamation mb-3"></i>
                <h4 class="mb-2">Something Went Wrong</h4>
                <p>Could not load movies. Please try again.</p>
                <button class='btn mt-3' onclick="location.reload()">Try Again</button>
            </div>
        </div>
    `;
}

function updateActive(link) {
    document.querySelector('.type_link.active').classList.remove('active');
    link.classList.add('active');
}

function showMovieGenres(genres) {
    let filterMovie = movies.filter(movie =>
        movie.genre_ids.some(genre => genre === genres)
    );

    if (filterMovie.length === 0) {
        let content = document.querySelector('#Movie .content .dataMovie .row');
        content.innerHTML = `
            <div class="col-12 d-flex justify-content-center align-items-center" style="min-height: 300px;">
                <div class="text-center info">
                    <i class="fa-solid fa-film mb-3" style="font-size: 3rem;"></i>
                    <h4 class="mb-2">No Movies Found</h4>
                    <p>There are no movies in this genre.</p>
                </div>
            </div>
        `;
        return;
    }
    
    showMovies(filterMovie);
}