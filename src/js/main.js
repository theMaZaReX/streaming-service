const moviesName = document.querySelectorAll('.movies-list__name');
const searchBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const headerInner = document.querySelector('.header__inner');
const moviesList = document.querySelector('.movies-list');
const moviesItem = document.querySelector('.movies-list__item');
const btnMore = document.querySelector('.btn');

let arrMoviesItems = [...moviesList.children];
let searchInputOpenned = false; 
let rowMoviesToShow = 2;
let rowMoviesHeight = moviesItem.offsetHeight + 30;
let maxItemsInRow = Math.floor(moviesList.offsetWidth / moviesItem.offsetWidth);

function numberActiveMovies(arrMoviesItems){
    let count = 0;
    arrMoviesItems.forEach(function(element){
        if(element.style.display !== 'none'){
        count++;
        }
    })
    return count;
}

const openSearchInput = function(){
    if(!searchInputOpenned){
    searchInputOpenned = true;
    event.preventDefault();
    headerInner.classList.add('header__inner--search-open');
    searchInput.classList.add('search__input--open');
    searchBtn.removeEventListener('click', openSearchInput);
   
    }
}

const lineBreak = function(elem){
    if(elem.innerText.length>=26){
        elem.innerText+=', ';
        elem.style.display = 'inline';
    }
}

const addMoviesRow = function(){   
    let activeMovies = numberActiveMovies(arrMoviesItems);
    let maxRows = Math.ceil(activeMovies / maxItemsInRow);
    let maxHeightMoviesRows = maxRows * rowMoviesHeight; 
    if ((moviesList.offsetHeight + (rowMoviesHeight*rowMoviesToShow) >= maxHeightMoviesRows)){
        moviesList.style.height = maxHeightMoviesRows + 'px';
        btnMore.style.backgroundColor = 'black';
        btnMore.style.cursor = 'auto';
        btnMore.removeEventListener('click',addMoviesRow);
        console.log(true);
    }
    else{
        console.log(false);
        moviesList.style.height = moviesList.offsetHeight + (rowMoviesHeight*rowMoviesToShow) +  'px';       
    }   
}

document.addEventListener("DOMContentLoaded", function(){
    moviesName.forEach(function(elem){
        lineBreak(elem);
    })

    if (window.screen.width >= 992){
        moviesList.style.overflow = 'hidden';
        moviesList.style.height = rowMoviesHeight*rowMoviesToShow + 'px';
    } 
    
    moviesType.forEach(function(element){
        element.setAttribute('data-type', element.innerText);
     
    });


});

btnMore.addEventListener('click', addMoviesRow);


if (window.screen.width <= 768) searchBtn.addEventListener("click", openSearchInput);
