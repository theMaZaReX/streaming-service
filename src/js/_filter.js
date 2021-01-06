const filter = (function () {
    const   filterCompany = document.querySelector('.filter-company');
    const   checkTV = document.getElementById('type-tv');
    const   checkMovie = document.getElementById('type-movie');
    const   filterGenre = document.querySelector('.filter-genre');
    const   filterGenreList = document.querySelector('.filter-genre__list');
    const   filterGenreNone = document.getElementById('filter-genre__none');
    const   btnGenre = document.querySelector('.filter-genre__btn');
    const   arrFilterCompanies = [...filterCompany.children];
    const   arrFilterGenreList = [...filterGenreList.children];

   

    return {
        init: function () {

           _that = this;

            checkTV.value = 'tv';
            checkMovie.value = 'movie';

            this.fillDataAttrForItems();
            this.fillDataAttrForGenre();
            this.fillDataAttrForCompanies();

            checkMovie.addEventListener('click', _that.filterMovies);
            checkTV.addEventListener('click', _that.filterMovies);
            ageStart.addEventListener('click', _that.filterMovies);
            ageEnd.addEventListener('click', _that.filterMovies);

            btnGenre.addEventListener('click', function () {
                filterGenreList.classList.add('filter-genre__list--show');
            });

            document.addEventListener('mouseup', function (event) {
                if (event.target !== btnGenre) {
                    filterGenreList.classList.remove('filter-genre__list--show');
                }
            })

            arrFilterCompanies.forEach(function (element) {
                element.addEventListener('click', _that.filterMovies);
            })
        },
        fillDataAttrForItems: function () {
            for (let i = 0; i <= arrMoviesItems.length - 1; i++) {
                let current = arrMoviesItems[i];
                current.setAttribute('data-type', current.querySelector('.movies-list__type').textContent.toLowerCase());
                current.setAttribute('data-company', current.querySelector('.movies-list__company').textContent.toLowerCase());
                current.setAttribute('data-age', parseInt(current.querySelector('.movies-list__age').textContent.toLowerCase()));
                current.setAttribute('data-userscore', parseInt(current.querySelector('.ratings__user-score').textContent));
                current.setAttribute('data-tomatoscore', parseInt(current.querySelector('.ratings__tomato-score').textContent));
            }
        },
        fillDataAttrForGenre: function () {
  
            arrFilterGenreList.forEach(function (element) {
                element.addEventListener('click', function () {
                    event.preventDefault();
                    filterGenre.removeAttribute('data-genre');
                    btnGenre.textContent = element.innerText;

                    if (event.target !== filterGenreNone) {
                        filterGenre.setAttribute('data-genre', btnGenre.innerText.toLowerCase());
                    }

                    _that.filterMovies();

                })
            });
        },
        fillDataAttrForCompanies: function () {
            arrFilterCompanies.forEach(function (element) {
                element.addEventListener('click', function (event) {

                    textContent = "";

                    if (event.target.getAttribute('id') === 'filtr-Amazon') {
                        textContent = 'amazon'
                    }
                    else if (event.target.getAttribute('id') === 'filtr-all') {
                        event.target.removeAttribute('data-company');
                    }
                    else {
                        textContent = event.target.textContent;
                    }
                    filterCompany.setAttribute('data-company', textContent.toLowerCase());
                });
            })
        },
        filterMovies: function () {
            const filter = document.querySelector('.filter'),
                checkboxes = [...filter.querySelectorAll('.filter-type__item input:checked')].map(n => n.value),
                filterCompanyVal = filterCompany.dataset.company,
                currentMinAge = ageStart.dataset.min,
                currentMaxAge = ageEnd.dataset.max,
                filterGenreVal = filterGenre.dataset.genre;

            arrMoviesItems.forEach(function (element) {
                element.classList.remove('hidden');
            })

            let result = arrMoviesItems.filter((element) => (

                (!filterCompanyVal || (element.dataset.company === filterCompanyVal)) &&
                (!checkboxes.length || checkboxes.includes(element.dataset.type)) &&
                (!filterGenreVal || (element.dataset.genre === filterGenreVal)) &&
                (parseInt(element.dataset.age) <= parseInt(currentMaxAge)) &&
                (parseInt(element.dataset.age) >= parseInt(currentMinAge))
            )
            );

            for (let i = 0; i <= arrMoviesItems.length - 1; i++) {
                if (!result.includes(arrMoviesItems[i])) {
                    arrMoviesItems[i].classList.add('hidden');
                }
                else {
                    arrMoviesItems[i].classList.remove('hidden');
                }
            }

            if (window.screen.width >= 768) app.mainMethods.updateHeightMoviesList(maxItemsInRow, rowMoviesHeight);
        }
    }
})()