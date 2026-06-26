async function showMoviesInHeader(Movies) {
    for (let movie of Movies.slice(0, 10)) {
        let keyVideo = await getKeyVideo(movie.id),
            detailsMovie = await getDetailsMovies(movie.id),
            objTimeMovie = getTime(detailsMovie.runtime),
            obiDateMovie = getDateMovie(detailsMovie.release_date);

        if (detailsMovie.background_image == null) {
            continue;
        }

        contentHeader.innerHTML += `
            <div class="swiper-slide position-relative">
                <img src="https://image.tmdb.org/t/p/original/${detailsMovie.background_image}" class="bg_header" alt="">
                <div class="container position-relative z-2">
                    <div class="content">
                        <div class="row">
                            <div class="col-lg-7 part1">
                                <div class="item">
                                    <h2>${detailsMovie.original_title}</h2>
                                    <div class="preview d-flex flex-wrap align-items-center my-2">
                                        <div class="stars mb-2 mb-md-0">
                                            <div class="item">                                         
                                                ${showRateStare(detailsMovie.vote_average)}
                                            </div>
                                        </div>
                                        <div class="time me-2 mx-md-3  d-flex justify-content-center align-items-center">
                                            <div class="item d-flex justify-content-center align-items-center">
                                                <i class="fa-regular fa-clock me-1"></i>
                                                <p class="mb-0">${(objTimeMovie.hour == undefined && objTimeMovie.minute == 0 ? 'Not avaliable' : (objTimeMovie.minute != 0 && objTimeMovie.hour == undefined) ? `${objTimeMovie.minute}min` : `<span>${(objTimeMovie.hour + 'h : ')}</span><span>${objTimeMovie.minute}min</span>`)}</p>
                                            </div>
                                        </div>
                                        <div class="date">
                                            <div class="item">
                                                <i class="fa-regular fa-calendar-days"></i>
                                                <span>${obiDateMovie.month}</span>
                                                <span>${obiDateMovie.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="overview">
                                        <p>${sliceDescription(detailsMovie.overview)}...</p>
                                    </div>
                                    <button onclick = 'showDetailsMovieForHomePadge(${movie.id})' class="btn mainButton mx-0 mt-2"><span class="position-relative z-3">View detalis</span></button>
                                </div>
                            </div>
                            <div class="col-lg-5 part2  d-flex justify-content-center align-items-center movie">
                                <div class="item  d-flex justify-content-center align-items-center">
                                    <img src="./Home/images/plug-and-play.gif" onclick = "openPopup('video',true,this)" class="img-fluid"  data-video-key = "${keyVideo}" alt="">
                                    <h4> Watch Trailer </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    }
    initSwiper();
}

//* init sweper after the header is render
function initSwiper() {
    let swiper = new Swiper(".mySwiper", {
        loop: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        spaceBetween: 15,
        speed: 900,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
    });
}

//* init swiper after the card is render
function initSwiperSection(element) {
    const moviesSwiper = new Swiper(element, {
        slidesPerView: 5,
        spaceBetween: 15,

        mousewheel: {
            forceToAxis: true,
        },

        freeMode: {
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },

        breakpoints: {
            300: { slidesPerView: 1 },
            350: { slidesPerView: 1 },
            450: { slidesPerView: 2 },
            790: { slidesPerView: 3 },
            1050: { slidesPerView: 5 },
        }
    });
}

function sliceDescription(des) {
    return des.split(" ").slice(0, 30).join(" ");
}

//* show movie card
async function showDataMoviesInSections(genres) {
    let contentSection = document.querySelector(`.cardsMovies[data-name="${genres}"] .content .swiper-wrapper`),
        swiperElement = document.querySelector(`.cardsMovies[data-name="${genres}"] .moviesSwiper`),
        Movies = dataMovies[genres],
        num = 0;
    contentSection.innerHTML = ``;

    if (genres == "trending") {
        num = 10;
    }
    for (let movie of Movies.slice(num, num + 10)) {
        let dataVideo = await getDetailsMovies(movie.id),
            moviesTime = getTime(dataVideo.runtime),
            moviesDate = getDateMovie(dataVideo.release_date);

        if (movie.poster_path == null || movie.backdrop_path == null) {
            num++;
            continue;
        }

        contentSection.innerHTML +=
            `
            <div class="swiper-slide">
                <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid" alt="">
                <div class="body d-flex align-items-end h-100">
                    <div class="layout px-2 px-sm-2 py-3">
                        <ul class="list-unstyled type mb-2 d-flex align-items-center flex-wrap">
                            ${showGenresMovies(movie.genre_ids)}
                        </ul>
                        <h6>${editTitleMovies(movie.title)}</h6>
                        <ul class="list-unstyled cat d-flex align-items-center flex-row">
                            <li class="time me-2">
                                <i class="fa-regular fa-clock"></i>${(moviesTime.hour == undefined && moviesTime.minute == 0 ? 'Not avaliable' : (moviesTime.minute != 0 && moviesTime.hour == undefined) ? `${moviesTime.minute}min` : `<span>${(moviesTime.hour + 'h : ')}</span><span>${moviesTime.minute}min</span>`)}
                            </li>
                            <li class="date">
                                <i class="fa-regular fa-calendar-days"></i><span>${moviesDate.month}</span> <span>${moviesDate.year}</span>
                            </li>
                        </ul>
                        <div class="back_drop d-flex justify-content-center w-100">
                            ${showBtn(movie.id)}
                            <button onclick = 'showDetailsMovieForHomePadge(${movie.id})' class="btn mainButton mx-0"><span class="position-relative z-3">View detalis</span></button>
                        </div>
                    </div>
                </div>
            </div>
            
        `
    }
    initSwiperSection(swiperElement);
}

//* show all genres for movie
function showGenresMovies(genres) {
    let contentGenres = '';
    genres.forEach((genre) => {
        contentGenres += `<li class="me-1 mb-1">${type[genre]}</li>`
    });
    return contentGenres;
}


