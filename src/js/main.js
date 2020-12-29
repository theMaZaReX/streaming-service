const headerInner = document.querySelector('.header__inner');
    searchInput = document.querySelector('.search__input'),
    searchBtn = document.querySelector('.search__button'),
    moviesList = document.querySelector('.movies-list'),
    moviesItem = document.querySelector('.movies-list__item'),
    moviesType = document.querySelectorAll('.movies-list__item .movies-list__type'),
    moviesListCompany = document.querySelectorAll('.movies-list__item .movies-list__company'),
    moviesName = document.querySelectorAll('.movies-list__name'),
    arrMoviesItems = [...moviesList.children],
    filterCompany = document.querySelector('.filter-company'),
    checkTV = document.getElementById('type-tv'),
    checkMovie = document.getElementById('type-movie'),
    btnMore = document.querySelector('.btn'),
    filterGenre = document.querySelector('.filter-genre'),
    filterGenreList = document.querySelector('.filter-genre__list'),
    btnGenre = document.querySelector('.filter-genre__btn'),
    filterGenreNone = document.getElementById('filter-genre__none'),
    range = document.querySelector('.filter-age__rng'),
    ageStart = document.querySelector('.filter-age__rng-start'),
    ageEnd = document.querySelector('.filter-age__rng-end'),
    rangeOverlay = document.querySelector('.filter-age__rng-overlay'),
    sorts = document.querySelector('.sorts'),
    sortsCurrent = document.querySelector('.sorts__current'),
    sortsList = document.querySelector('.sorts__list'),

    checkTV.value = 'tv';
    checkMovie.value = 'movie';

let rowMoviesToShow = 2,
    rowMoviesHeight = moviesItem.offsetHeight + 30,
    maxItemsInRow = Math.floor(moviesList.offsetWidth / moviesItem.offsetWidth);

function getActiveMovies() {
    let arr = [];
    for (let i = 0; i <= arrMoviesItems.length - 1; i++) {
        if (!arrMoviesItems[i].classList.contains('hidden')) {
            arr.push(arrMoviesItems[i]);

        }
    }
    return arr;
}

const updateHeightMoviesList = function (maxItemsInRow, rowMoviesHeight) {

    let arrMoviesItems = [...moviesList.children],
        numberItems = getActiveMovies(arrMoviesItems).length,
        hasListener = false;

    if (numberItems <= 2) {
        moviesList.style.justifyContent = 'space-around';
    }

    numberRows = Math.ceil(numberItems / maxItemsInRow);
    if (numberRows <= rowMoviesToShow) {
        moviesList.style.height = (numberRows * rowMoviesHeight) + 'px';
        btnMore.style.backgroundColor = 'black';
        btnMore.style.cursor = 'auto';
        btnMore.removeEventListener('click', addMoviesRow);
        hasListener = true;
    }
    else {
        moviesList.style.height = (rowMoviesToShow * rowMoviesHeight) + 'px';
        if (!hasListener) {
            btnMore.addEventListener('click', addMoviesRow);
            btnMore.style.backgroundColor = '#e73327';
            btnMore.style.cursor = 'pointer';
        }
    }
}

const openSearchInput = function () {
    event.preventDefault();
    headerInner.classList.add('header__inner--search-open');
    searchInput.classList.add('search__input--open');
    searchBtn.removeEventListener('click', openSearchInput);
}

const lineBreak = function (elem) {
    if (elem.innerText.length >= 26) {
        elem.innerText += ', ';
        elem.style.display = 'inline';
    }
}

const addMoviesRow = function () {
    let arrMoviesItems = [...moviesList.children],
        activeMovies = getActiveMovies(arrMoviesItems).length,
        maxRows = Math.ceil(activeMovies / maxItemsInRow),
        maxHeightMoviesRows = maxRows * rowMoviesHeight;

    if ((moviesList.offsetHeight + (rowMoviesHeight * rowMoviesToShow) >= maxHeightMoviesRows)) {
        moviesList.style.height = maxHeightMoviesRows + 'px';
        btnMore.style.backgroundColor = 'black';
        btnMore.style.cursor = 'auto';
        btnMore.removeEventListener('click', addMoviesRow);
    }
    else {
        moviesList.style.height = moviesList.offsetHeight + (rowMoviesHeight * rowMoviesToShow) + 'px';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    moviesName.forEach(function (elem) {
        lineBreak(elem);
    })

    if (window.screen.width >= 992) {
        moviesList.style.overflow = 'hidden';
        moviesList.style.height = rowMoviesHeight * rowMoviesToShow + 'px';
    }

});

btnMore.addEventListener('click', addMoviesRow);

if (window.screen.width <= 768) searchBtn.addEventListener("click", openSearchInput);
