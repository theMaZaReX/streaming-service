const moviesName = document.querySelectorAll('.movies-list__name');
const searchBtn = document.querySelector('.search__button');
const searchInput = document.querySelector('.search__input');
const headerInner = document.querySelector('.header__inner');
let searchInputOpenned = false; 

document.addEventListener("DOMContentLoaded", function(){
    moviesName.forEach(function(elem){
        if(elem.innerText.length>=26){
            elem.innerText+=', ';
            elem.style.display = 'inline';
        }
   
    })
});

const openSearchInput = function(){
    if(!searchInputOpenned){
    searchInputOpenned = true;
    event.preventDefault();
    headerInner.classList.add('header__inner--search-open');
    searchInput.classList.add('search__input--open');
    searchBtn.removeEventListener('click', openSearchInput);
   
    }
}

searchBtn.addEventListener("click", openSearchInput);
