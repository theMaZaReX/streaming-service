//модуль search
const search = (function(){

    const headerInner = document.querySelector('.header__inner'),
          searchInput = document.querySelector('.search__input'),
          searchBtn = document.querySelector('.search__button');

        
    return {
        init: function(){
            this.ref  = this.openSearchInput.bind(this);
            if (window.screen.width <= 768) searchBtn.addEventListener("click", this.ref);
        },
        openSearchInput:  function () {
            event.preventDefault();
            headerInner.classList.add('header__inner--search-open');
            searchInput.classList.add('search__input--open');
            searchBtn.removeEventListener('click', this.ref);
        }
    }


    
})()

