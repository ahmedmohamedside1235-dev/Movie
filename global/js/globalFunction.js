//* API
let url = {
    trending: `https://api.themoviedb.org/3/trending/movie/week?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en-US`,
    popular: `https://api.themoviedb.org/3/movie/popular?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en-US`,
    topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en-US`,
    nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en-US`,
    upcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en-US`,

    movieDetails: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en`,
    movieVideos: (id) => `https://api.themoviedb.org/3/movie/${id}/videos?api_key=c28e3494c8c7a7884ac091d2d510269a`,
    moviesByGenre: (genreId) => `https://api.themoviedb.org/3/discover/movie?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en&with_genres=${genreId}`,
    movieCredits: (id) => `https://api.themoviedb.org/3/movie/${id}/credits?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en`,
    search: (query) => `https://api.themoviedb.org/3/search/movie?api_key=c28e3494c8c7a7884ac091d2d510269a&language=en&query=${encodeURIComponent(query)}`
};

//* special movies
let GENRES = {
    action: 28,
    adventure: 12,
    animation: 16,
    comedy: 35,
    crime: 80,
    documentary: 99,
    drama: 18,
    family: 10751,
    fantasy: 14,
    history: 36,
    horror: 27,
    music: 10402,
    mystery: 9648,
    romance: 10749,
    scienceFiction: 878,
    thriller: 53,
    war: 10752,
    western: 37
};

//* type of movies
let type = {
    '0': 'all',
    "28": "Action",
    "12": "Adventure",
    "16": "Animation",
    "35": "Comedy",
    "80": "Crime",
    "99": "Documentary",
    "18": "Drama",
    "10751": "Family",
    "14": "Fantasy",
    "36": "History",
    "27": "Horror",
    "10402": "Music",
    "9648": "Mystery",
    "10749": "Romance",
    "878": "ScienceFiction",
    "53": "Thriller",
    "10752": "War",
    "37": "Western",
};

//* Get Data From API
async function getDataMovie(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Http Error! Status : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching data : ", error);
        return { results: [] };
    }
}

//* combine All data movie
function combineAllMovies() {
    let combined = [
        ...dataMovies.trending,
        ...dataMovies.popular,
        ...dataMovies.topRated,
        ...dataMovies.nowPlaying,
        ...dataMovies.upcoming
    ],
        uniqueMovies = [],
        seenIds = [];

    combined.forEach(movie => {
        if (!seenIds.includes(movie.id)) {
            seenIds.push(movie.id);
            uniqueMovies.push(movie);
        }
    });

    allMovies = uniqueMovies;
}

//* open popup
function openPopup(popupName, bool = false, ele = undefined) {
    let popupEle = document.querySelector(`.popup[data-name="${popupName}"]`),
        body = document.querySelector("body");

    //* popup video
    if (bool) {
        let keyVideo = ele.dataset.videoKey,
            iframe = popupEle.querySelector("iframe");
        iframe.src = fixedSrc(iframe.src, keyVideo);
    }
    popupEle.classList.add('active');
    body.classList.add("overflow-hidden");
    setTimeout(() => {
        popupEle.classList.add('show');
    }, 400);
}

//* close popup
function closePopup() {
    let popupEle = document.querySelector('.popup.active'),
        popupName = popupEle.dataset.name,
        body = document.querySelector("body");
    popupEle.classList.remove("show");
    //* stop video
    if (popupName == "video") {
        popupEle.querySelectorAll("iframe").forEach(frame => {
            frame.src = "https://www.youtube-nocookie.com/embed/";
        });
        setTimeout(() => {
            popupEle.classList.remove('active');
            body.classList.remove("overflow-hidden");
        }, 400);
    } else {
        setTimeout(() => {
            popupEle.classList.remove('active');
            body.classList.remove("overflow-hidden");
        }, 900);
    }
}

//* fiexd src for any url
function fixedSrc(oldSrc, addSrc) {
    let srcArr = oldSrc.split("/");
    srcArr[srcArr.length - 1] = addSrc;
    return srcArr.join('/');
}


//* Show input search
function showInputSearch(iconEle) {
    iconEle.classList.add('hide');
    searchInput.classList.add("active");
    searchMovies(searchInput.value);
}

//* hide input search
function hideInputSearch() {
    searchInput.classList.remove("active");
    document.querySelector(".searchLi img").classList.remove('hide');
}

//* add login in navbar
function addUlLogin(bool) {

    if (bool) {
        ulLogin.innerHTML =
            `
        <li class="nav-item d-flex align-items-center justify-content-center searchLi">
            <img src="./global/images/magnifying-glass.gif" class='img-fluid seaGif' onclick="showInputSearch(this)" alt="">
            <input type="text" name="search" autocomplete="off" id="search" class="form-control" placeholder="Search...">
            <div class="search-results"></div>
        </li>
        <li class="nav-item d-flex align-items-center mx-3" onclick='showMoviesInCart()'>
            <i class="fa-solid fa-cart-arrow-down"></i>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                aria-expanded="false">
                <i class="fa-solid fa-user"></i>
                    ${userName}
            </a>
            <ul class="dropdown-menu position-absolute dropdown-menu-start text-center">
                <li class="nav-item d-flex align-items-center ">
                    <a class="nav-link login button-login mainButton buut" href="./login_padge/index.html">
                        <span class="position-relative z-3"><i class="fa-solid fa-right-from-bracket"></i> Logout</span>
                    </a>
                </li>
            </ul>
        </li>
                    
                    `;
    }

    else {
        ulLogin.innerHTML =
            `
        <li class="nav-item d-flex align-items-center justify-content-center searchLi">
            <img src="./global/images/magnifying-glass.gif"  class='img-fluid seaGif' onclick="showInputSearch(this)" alt="">
            <input type="text" autocomplete="off" name="search" id="search" class="form-control" placeholder="Search...">
            <div class="search-results"></div>
        </li>
        <li class="nav-item d-flex align-items-center  mb-3 mb-lg-0 mx-3" onclick='showMoviesInCart()'>
            <i class="fa-solid fa-cart-arrow-down"></i>
        </li>
        <li class="nav-item d-flex align-items-center mb-3 mb-lg-0 login">
            <a class="nav-link login button-login mainButton buut" href="./login_padge/index.html">
                <span class="position-relative z-3"><i class="fa-solid fa-right-to-bracket"></i> Login</span>
            </a>
        </li>
            `;
    }

}

//* get key video
async function getKeyVideo(id) {
    let data = await getDataMovie(url.movieVideos(id)),
        trailer = data.results.find(v => v.type === "Trailer");
    return trailer ? trailer.key : null;
}

//* get details movie from url
async function getDetailsMovies(id) {
    let detailsMovie = await getDataMovie(url.movieDetails(id)),
        objDataMovie = {
            id: detailsMovie.id,
            background_image: detailsMovie.backdrop_path,
            poster_image: detailsMovie.poster_path,
            original_title: detailsMovie.title,
            tagline: detailsMovie.tagline,
            genres: detailsMovie.genres,
            overview: detailsMovie.overview,
            release_date: detailsMovie.release_date,
            runtime: detailsMovie.runtime,
            vote_average: detailsMovie.vote_average,
            status: detailsMovie.status,
            languages: detailsMovie.spoken_languages
        };
    return objDataMovie;
}

//* go to details page
function showDetailsMovie(movieId) {
    localStorage.setItem('id', `${movieId}`);
    window.location.href = `./details/details.html?id=${movieId}`;
}

//* show rate star
function showRateStare(rate) {
    let rateStare = rate / 2,
        rateInt = parseInt(rateStare),
        bool = Number.isInteger(rateStare),
        htmlStare = "",
        emptyStare = 5 - rateInt;
    for (let i = 0; i < rateInt; i++) {
        htmlStare += `<i class="fa-solid fa-star"></i>`;
    }

    if (!bool) {
        htmlStare += `<i class="fa-solid fa-star-half-stroke"></i>`;
        emptyStare = 4 - rateInt;
    }

    for (let i = 0; i < emptyStare; i++) {
        htmlStare += `<i class="fa-regular fa-star"></i>`
    }
    return htmlStare;
}

//* fixed date
function getDateMovie(date) {
    let date2 = new Date(date);
    return {
        year: date2.getFullYear(),
        month: date2.toLocaleString('en-US', { month: 'long' }),
        day: date2.getDate()
    };
}

//* fixed time
function getTime(time) {
    let hours = Math.floor(time / 60);
    let minutes = time % 60;

    if (hours == 0) {
        return {
            minute: minutes
        };
    }
    return {
        hour: hours,
        minute: minutes
    };
}

//* add movie to cart
async function addToCart(movieId, status) {
    if (checkBtnAddedCart(movieId))
        return;

    let dataMovie = await getDetailsMovies(movieId),
        dataCart = {
            id: movieId,
            status: status,
            poster: dataMovie.poster_image,
            title: dataMovie.original_title,
            release_date: dataMovie.release_date,
            runtime: dataMovie.runtime
        };
    moviesCart.push(dataCart);
    chechStatusButton(status, movieId);
    updateLocalStorag();
}

//* remove the movie from cart
function removeFromCart(id, status, bool = false, isCart = false) {
    let headPopup = document.querySelector(`.popup[data-name="cart"] .box .head p`);
    moviesCart = moviesCart.filter((movie) => movie.id !== id);

    if (bool)
        status = 'btn';

    if (isCart)
        status = 'addCart';

    if (status == 'btn' || status === 'icon') {
        headPopup.textContent = `Cart (${moviesCart.length})`;
        checkCartEmpty();
    }

    editButtonToAdd(status, id);
    updateLocalStorag();
}

//* update local storage
function updateLocalStorag() {
    localStorage.setItem("moviesCart", JSON.stringify(moviesCart));
}

//* chech status of the button
function chechStatusButton(bool, id) {
    if (bool === 'icon') {
        let add_carts = document.querySelectorAll(`.add_cart[data-id="${id}"]`);
        editButtonToRemove(add_carts, id, bool);
    } else if (bool === 'btn') {
        let add_cart = document.querySelector(`.add_cart.button[data-id="${id}"]`);
        editButtonToRemove(add_cart, id, bool)
    } else {
        let add_cart = document.querySelector(`.addCart[data-id="${id}"]`);
        editButtonToRemove(add_cart, id, bool);
    }
}

//* show icon after remove and add
function showIcons(iconDelete, iconAdd, bool) {
    if (bool) {
        iconAdd.classList.add('hide');
        setTimeout(() => {
            iconAdd.classList.add('d-none');
            iconDelete.classList.remove('d-none');
        }, 300);
        setTimeout(() => {
            iconDelete.classList.add('show');
        }, 400);
    } else {
        iconDelete.classList.remove('show');
        setTimeout(() => {
            iconDelete.classList.add('d-none');
            iconAdd.classList.remove('d-none');
        }, 300);
        setTimeout(() => {
            iconAdd.classList.remove('hide');
        }, 400);
    }
}

//* chech movie in cart or not
function checkBtnAddedCart(id) {
    return moviesCart.some(movie => movie.id === id);
}

//* show button in card and check if the movie in cart or not 
function showBtn(id) {
    let bool = checkBtnAddedCart(id);
    if (!bool) {
        return `<div class="add_cart me-2 d-flex align-items-center" data-id="${id}" data-name="icon" onclick='addToCart(${id},"icon")'>
                    <img src="./Home/images/plus.gif" class="img-fluid add" alt="">
                    <img src="./Home/images/multiply.gif" class="img-fluid delete d-none" alt="">
                    <div class="text">Add To Cart</div>
                </div>
        `
    } else {
        return `<div class="add_cart me-2 d-flex align-items-center" data-id="${id}" onclick="removeFromCart(${id},'icon')" data-name="icon" >
                    <img src="./Home/images/plus.gif" class="img-fluid add hide d-none" alt="">
                    <img src="./Home/images/multiply.gif" class="img-fluid delete show" alt="">
                    <div class="text">Remove From Cart</div>
                </div>
        `
    }
}

//* edit button from add to remove
function editButtonToRemove(add_carts, id, bool) {
    if (bool === 'icon') {
        add_carts.forEach(add_cart => {
            add_cart.setAttribute('onclick', `removeFromCart(${id},"icon")`);
            let iconDelete = add_cart.querySelector('.delete'),
                iconAdd = add_cart.querySelector('.add'),
                text = add_cart.querySelector('.text');
            showIcons(iconDelete, iconAdd, true);
            text.textContent = 'Remove From Cart';
        });
    } else if (bool == 'btn') {
        add_carts.setAttribute('onclick', `removeFromCart(${id},"btn")`);
        add_carts.innerHTML = `
            <span class="position-relative z-3">
                <i class="fa-regular fa-trash-can"></i> Remove From Cart
            </span>`;
    } else {
        add_carts.setAttribute('onclick', `removeFromCart(${id},"addCart")`);
        add_carts.innerHTML =
            `
                <i class="fa-regular fa-trash-can me-2"></i>Cart
            `;
    }

}

//* edit button from remove to add
function editButtonToAdd(status, id) {
    if (status === 'icon') {
        let add_carts = document.querySelectorAll(`.add_cart[data-id="${id}"]`);
        add_carts.forEach(add_cart => {
            add_cart.setAttribute('onclick', `addToCart(${id},"icon")`);
            let iconDelete = add_cart.querySelector('.delete'),
                iconAdd = add_cart.querySelector('.add'),
                text = add_cart.querySelector('.text');
            showIcons(iconDelete, iconAdd, false);
            text.textContent = 'Add To Cart';
        });
    } else if (status == 'btn') {
        let add_cart = document.querySelector(`.add_cart.button[data-id="${id}"]`);
        add_cart.setAttribute('onclick', `addToCart(${id},"btn")`);
        add_cart.innerHTML = `
            <span class="position-relative z-3">
                <i class="fa-solid fa-cart-plus"></i> Add To Cart
            </span>`;
    } else {
        let addCart = document.querySelector(`.addCart[data-id="${id}"]`);
        addCart.setAttribute('onclick', `addToCart(${id},"addCart")`);
        addCart.innerHTML =
            `
                <i class="fa-solid fa-plus me-2"></i>Cart
            `;
    }
}

//* show data movie in cart
function showMoviesInCart() {
    let contentPopup = document.querySelector(`.popup[data-name="cart"] .box .cards .row `),
        headPopup = document.querySelector(`.popup[data-name="cart"] .box .head p`);
    headPopup.textContent = `Cart (${moviesCart.length})`
    contentPopup.innerHTML = '';

    if (checkCartEmpty()) {
        openPopup("cart");
        return;
    }

    moviesCart.forEach(movie => {
        let objTimeMovie = getTime(movie.runtime),
            obiDateMovie = getDateMovie(movie.release_date);
        contentPopup.innerHTML +=
            `
            <div class="col-md-6 col-lg-4 mb-3">
                <div class="item">
                    <img src="https://image.tmdb.org/t/p/w500${movie.poster}" class="img-fluid" alt="">
                    <div class="body d-flex align-items-end">
                        <div class="layout px-2 py-3 w-100">
                            <div class="delete" onclick="removeMovie(this);removeFromCart(${movie.id}, 'icon',${isDetailsPage(movie.id)},${isAllMoviesPage()})">
                                <i class="fa-solid fa-delete-left"></i>
                            </div>
                            <div class="info d-flex align-items-end w-100 h-100">
                                <div class="content w-100">
                                    <h3>${editTitleMovies(movie.title)}</h3>
                                    <p class='mb-2'>
                                        <span class="me-2"><i class="fa-regular fa-clock"></i>${(objTimeMovie.hour == undefined && objTimeMovie.minute == 0 ? 'Not avaliable' : (objTimeMovie.minute != 0 && objTimeMovie.hour == undefined) ? `${objTimeMovie.minute}min` : `<span>${(objTimeMovie.hour + 'h : ')}</span><span>${objTimeMovie.minute}min</span>`)}</span>
                                        <span><i class="fa-regular fa-calendar-days"></i>${obiDateMovie.month} ${obiDateMovie.year}</span>
                                    </p>
                                    ${isDetailsPage(movie.id) ? '' : `<button onclick = 'showDetailsMovie(${movie.id})' class="btn buut mainButton mx-auto mt-2 d-block"><span class="position-relative z-3">View detalis</span></button>`}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
    });
    openPopup("cart");
}

//* fixed title
function editTitleMovies(title, num = 2) {
    let bool = title?.split(' ').length > 2;
    return bool ? title.split(' ').slice(0, num).join(' ') + "..." : title;
}

//* remove card from the cart 
function removeMovie(icon) {
    let parent = icon.closest('.col-lg-4');
    parent.remove();
    checkCartEmpty();
}

//* check if the cart is empty
function checkCartEmpty() {
    if (moviesCart.length === 0) {
        let emptyCart = document.querySelector('.popup[data-name="cart"] .box .empty');
        emptyCart.classList.remove('d-none');
        emptyCart.classList.add('d-flex');
        return true;
    } else {
        let emptyCart = document.querySelector('.popup[data-name="cart"] .box .empty');
        emptyCart.classList.add('d-none');
        emptyCart.classList.remove('d-flex');
        return false;
    }
}

//* if the page is details
function isDetailsPage(currentId) {
    let bool = window.location.pathname.includes("details"),
        id = parseInt(new URLSearchParams(window.location.search).get('id')) || JSON.parse(localStorage.getItem('id')) || currentId;
    return currentId === id && bool;
}

//* if the page is allMovies
function isAllMoviesPage() {
    return window.location.pathname.includes("allMovie");
}

//* search on query in All movie
function searchInAllMovies(query) {
    let lowerQuery = query.toLowerCase();

    return allMovies.filter(movie => {

        //* title
        if (movie.title.toLowerCase().includes(lowerQuery)) return true;

        //* overview
        if (movie.overview && movie.overview.toLowerCase().includes(lowerQuery)) return true;

        //* date
        if (movie.release_date && movie.release_date.includes(lowerQuery)) return true;

        //* genres
        if (movie.genre_ids && movie.genre_ids.some(id =>
            type[id] && type[id].toLowerCase().includes(lowerQuery)
        )) return true;

        //* language
        if (movie.original_language && movie.original_language.toLowerCase().includes(lowerQuery)) return true;

        return false;
    });
}

//* get data from The All movie
function searchMovies(query) {
    let resultsBox = document.querySelector('.search-results');

    if (!query.trim()) {
        resultsBox.classList.remove('show');
        resultsBox.innerHTML = '';
        return;
    }

    let results = searchInAllMovies(query);
    showSearchResults(results);
}

//* show the result of search
function showSearchResults(movies) {
    let resultsBox = document.querySelector('.search-results');

    //* if no movie found
    if (movies.length === 0) {
        resultsBox.innerHTML = `<div class="no-result">No results found</div>`;
        resultsBox.classList.add('show');
        return;
    }

    let filteredMovies = movies.filter(movie => movie.poster_path && movie.backdrop_path);

    //* if the movie not have poster
    if (filteredMovies.length === 0) {
        resultsBox.innerHTML = `<div class="no-result">No results found</div>`;
        resultsBox.classList.add('show');
        return;
    }

    resultsBox.innerHTML = '';

    filteredMovies.forEach(movie => {
        resultsBox.innerHTML += `
            <div class="item d-flex align-items-center" onclick="showDetailsMovie(${movie.id})">
                <img src="https://image.tmdb.org/t/p/w200/${movie.poster_path}" alt="">
                <div class="info">
                    <h6 class="mb-0">${editTitleMovies(movie.title)}</h6>
                    <small>${movie.release_date ? movie.release_date.split('-')[0] : ''}</small>
                </div>
            </div>
        `;
    });
    resultsBox.classList.add('show');
}

//* add color for load line 
function addColorLoad(width, color) {
    lines.forEach((line, i) => {
        if (width >= (i + 1) * 20) {
            line.style.background = color;
        }
    });
}

let width = 0;
function animate() {
    if (width >= 90) {
        width += 0.3;
    } else {
        width += .8;
    }
    addColorLoad(width, '#E50914');
    rate.textContent = Math.floor(width) + "%";
    fillLoad.style.width = width + '%';
    if (width >= 100) {
        lines.forEach(line => line.style.background = '#c8a96e');
        done.textContent = 'Done';
        succesfulMessage.classList.add('show');
        hideLoadingPadge();
        return;
    }
    requestAnimationFrame(animate);
}

function hideLoadingPadge() {
    setTimeout(() => {
        document.querySelector('body').classList.remove('overflow-hidden');
        loadingPadge.classList.add('hide');
    }, 2500);
}