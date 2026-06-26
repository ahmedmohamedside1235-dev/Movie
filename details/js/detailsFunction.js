function playIfram() {
    let eleVideo = document.querySelector('.part3 .part1 .item .video');
    eleVideo.classList.add('hide');
    let frame = document.getElementById('frame'),
        url = new URL(frame.src);

    if (!url.searchParams.has('autoplay')) {
        url.searchParams.set('autoplay', '1');
        frame.src = url.toString();
    }
}

function showDataInPageDetails(detailsMovie, cast, keyVideo) {
    let sectionHead = document.getElementById('Header'),
        sectionMovieData = document.getElementById('MovieData'),
        objTimeMovie = getTime(detailsMovie.runtime),
        dateMovie = getDateMovie(detailsMovie.release_date);
    sectionHead.innerHTML =
        `
        <img src="https://image.tmdb.org/t/p/original/${detailsMovie.background_image}" class="img-fluid" alt="">
        <div class="container-fluid position-relative z-3 d-flex align-items-end h-100">
            <div class="content pb-5 d-flex align-items-end h-100 w-100">
                <div class="row w-100">
                    <div class=" col-5 col-sm-3 col-lg-2 poster">
                        <div class="item">
                            <img src="https://image.tmdb.org/t/p/w500/${detailsMovie.poster_image}" class="img-fluid" alt="">
                        </div>
                    </div>
                    <div class=" col-7 col-sm-9 col-lg-10 ps-4 info_poster align-items-center d-flex">
                        <div class="item ms-2 ms-md-0">
                            <div class="status mb-2 d-flex align-items-center">
                                <ul class="me-3 mb-0 list-unstyled d-flex">
                                    ${showRateStare(detailsMovie.vote_average)}
                                </ul>
                                <p class="date mb-0">
                                    <span>${dateMovie.month}</span>
                                    <span>${dateMovie.year}</span>
                                </p>
                            </div>
                            <h2>${detailsMovie.original_title}</h2>
                            <div class="tagline">
                                <p>${detailsMovie.tagline}</p>
                            </div>
                            <div class="buttons">
                                ${showButtonInDetails(detailsMovie.id)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `


    sectionMovieData.innerHTML =
        `
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-6 part1 my-auto">
                    <div class="item overview px-3 py-4 mb-4 mb-lg-0">
                        <div class="head mb-4 d-flex align-items-center">
                            <img src="./images/search.gif" alt="" class="img-fluid gif me-2">
                            <h2 class="mb-0">Overview</h2>
                        </div>
                        <div class="body">
                            <p>${(detailsMovie.overview == '' ? 'No overview available for this movie' : detailsMovie.overview)}</p>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 part2">
                    <div class="item px-3 py-4 ">
                        <div class="head mb-4 d-flex align-items-center">
                            <img src="./images/film-tape.gif" alt="" class="img-fluid gif me-2">
                            <h2 class="mb-0">Cast</h2>
                        </div>
                        <div class="body">
                            <div class="info">
                                <div class="castData d-flex align-items-center flex-nowrap g-0">
                                    ${showCastMovie(cast) == '' ? 'No Cast available for this movie' : showCastMovie(cast)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-12  part3">
                    <div class="item my-3 px-3 py-4">
                        <div class="row">
                            <div class="col-lg-6 part1">
                                <div class="item px-3 py-4 mb-4 mb-lg-0">
                                    <div class="head mb-4 d-flex align-items-center">
                                        <span class="me-2"></span>
                                        <h2>Tailer</h2>
                                    </div>
                                    <div class="frameVideo text-light">
                                        ${keyVideo === null ? 'No Trailer Available' : `<iframe id="frame" data-src="autoplay=1" width="100%" height="100%" allowfullscreen
                                            src="https://www.youtube-nocookie.com/embed/${keyVideo}" allow="autoplay; encrypted-media"
                                            frameborder="0"></iframe>
                                        <div class="video" onclick="playIfram()">
                                            <div id="playBtn" class="d-flex justify-content-center align-items-center">
                                                <i class="fa-solid fa-play"></i>
                                            </div>
                                            <div id="thumb">
                                                <img src="https://image.tmdb.org/t/p/original/${detailsMovie.background_image}" class="img-fluid" alt="">
                                            </div>      
                                        </div>`}
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6 part2 align-items-center d-flex">
                                <div class="item px-3 py-4 w-100 mb-4 mb-md-0">
                                    <div class="head mb-4 d-flex align-items-center">
                                        <span class="me-2"></span>
                                        <h2>Detalis</h2>
                                    </div>
                                    <div
                                        class="mb-3 px-3 py-2 d-flex justify-content-between align-items-center info status">
                                        <h5>Status</h5>
                                        <p>${detailsMovie.status}</p>
                                    </div>
                                    <div
                                        class="mb-3 px-3 py-2 d-flex justify-content-between align-items-center info lang">
                                        <h5>Language</h5>
                                        <p>${showLang(detailsMovie.languages) == '' ? 'Unknown' : showLang(detailsMovie.languages)}</p>
                                    </div>
                                    <div
                                        class="mb-3 px-3 py-2 d-flex justify-content-between align-items-center info release">
                                        <h5>Release</h5>
                                        <p>
                                            <span>${dateMovie.day},</span>
                                            <span>${dateMovie.month}, </span>
                                            <span>${dateMovie.year}</span>
                                        </p>
                                    </div>
                                    <div
                                        class="mb-3 px-3 py-2 d-flex justify-content-between align-items-center info runtime">
                                        <h5>Runtime</h5>
                                        <p>${(objTimeMovie.hour == undefined && objTimeMovie.minute == 0 ? 'Not avaliable' : (objTimeMovie.minute != 0 && objTimeMovie.hour == undefined) ? `${objTimeMovie.minute}min` : `<span>${(objTimeMovie.hour + 'h : ')}</span><span>${objTimeMovie.minute}min</span>`)}</p>
                                    </div>
                                    <div
                                        class="px-3 py-2 d-flex justify-content-between align-items-center info runtime">
                                        <h5>Category</h5>
                                        <p>
                                            ${(getMovieGenres(detailsMovie.genres) == '' ? 'No Genres Available' : getMovieGenres(detailsMovie.genres))}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href="../index.html" class="text-decoration-none mt-4 w-100 d-block">
                            <button class="btn backHome mainButton text-light border border-1 border-light d-block m-auto"><span class="position-relative z-3">Back To Home</span></button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `
}

//* show all cast movie
function showCastMovie(casts) {
    let contentCast = '';

    casts.slice(0, 20).forEach(cast => {
        contentCast +=
            `
            <div class="cast me-2">
                <div class="item me-2">
                    <a class="profile text-decoration-none text-center">
                        <div class="logo d-flex justify-content-center align-items-center mb-2">
                            ${editNameCast(cast.name)}
                        </div>
                        <div class="cont d-flex justify-content-center align-items-center flex-column">
                            <h4>${cast.name}</h4>
                            <h5>${cast.character}</h5>
                        </div>
                    </a>
                </div>
            </div>
            `
    });

    return contentCast;
}

//* cut the name of cast
function editNameCast(castName) {
    let strArr = castName.split(' ').slice(0, 2),
        summaryName = '';
    strArr.forEach(str => {
        summaryName += str[0].toUpperCase();
    });
    return summaryName
}

//* show all language for movie
function showLang(lang) {
    let language = '';
    if (lang.length == 1) {
        lang.forEach(name => {
            language = language + " " + name.english_name;
        });
        return language;
    }

    lang.forEach((name, index) => {
        language = language + name.english_name + ((index == lang.length - 1) ? "" : " , ");
    });

    return language;
}

//* get all genres for movie 
function getMovieGenres(genres) {
    let html = '';
    genres.forEach((genre, index) => {
        html += `<span class="me-1">${genre.name}${index < genres.length - 1 ? ' ,' : ''}</span>`;
    });
    return html;
}

//* show button after check is founded in cart or not
function showButtonInDetails(id) {
    if (!checkBtnAddedCart(id))
        return `<button data-id="${id}" onclick="addToCart(${id},'btn')" class="btn add_cart button mainButton">
                    <span class="position-relative z-3"> 
                        <i class="fa-solid fa-cart-plus"></i> Add to cart
                    </span>
                </button>`

    return `<button data-id="${id}" onclick="removeFromCart(${id},'btn')" class="btn add_cart button mainButton">
                <span class="position-relative z-3">
                    <i class="fa-regular fa-trash-can"></i> Remove From Cart
                </span>
            </button>`
}