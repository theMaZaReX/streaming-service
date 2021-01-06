const //global vars
    moviesList = document.querySelector('.movies-list'),
    moviesItem = document.querySelector('.movies-list__item'),
    moviesName = document.querySelectorAll('.movies-list__name'),
    arrMoviesItems = [...moviesList.children],
    btnMore = document.querySelector('.btn');
    ageStart = document.querySelector('.filter-age__rng-start'),
    ageEnd = document.querySelector('.filter-age__rng-end');

    let rowMoviesToShow = 2,
    rowMoviesHeight = moviesItem.offsetHeight + 30,
    maxItemsInRow = Math.floor(moviesList.offsetWidth / moviesItem.offsetWidth);

    const app = (function(){

        return {
            init: function(){
                _this = this;
                document.addEventListener("DOMContentLoaded", function () {
               
                    moviesName.forEach(_this.mainMethods.lineBreak);
                    
                    if (window.screen.width >= 992) {
                       moviesList.style.overflow = 'hidden';
                        moviesList.style.height = rowMoviesHeight * rowMoviesToShow + 'px';
                    }

                    btnMore.addEventListener('click', _this.mainMethods.addMoviesRow);

                    search.init();  
                    filter.init();
                    customRange.init();
                    sort.init();
                })
            },
            mainMethods: {
                lineBreak: function(element){
                    if (element.innerText.length >= 26) {
                        element.innerText += ', ';
                        element.style.display = 'inline';
                    } 
                },
                getActiveMovies: function(arrMoviesItems) {
                let arr = [];
                for (let i = 0; i <= arrMoviesItems.length - 1; i++) {
                    if (!arrMoviesItems[i].classList.contains('hidden')) {
                        arr.push(arrMoviesItems[i]);
                    }
                }
                return arr;
                },
                updateHeightMoviesList: function (maxItemsInRow, rowMoviesHeight) {

                    let arrMoviesItems = [...moviesList.children],
                        numberItems = this.getActiveMovies(arrMoviesItems).length,
                        hasListener = false;
                
                    if (numberItems <= 2) {
                        moviesList.style.justifyContent = 'space-around';
                    }
                
                    numberRows = Math.ceil(numberItems / maxItemsInRow);
                    if (numberRows <= rowMoviesToShow) {
                        moviesList.style.height = (numberRows * rowMoviesHeight) + 'px';
                        btnMore.style.backgroundColor = 'black';
                        btnMore.style.cursor = 'auto';
                        btnMore.removeEventListener('click', this.addMoviesRow);
                        hasListener = true;
                    }
                    else {
                        moviesList.style.height = (rowMoviesToShow * rowMoviesHeight) + 'px';
                        if (!hasListener) {
                            btnMore.addEventListener('click', this.addMoviesRow);
                            btnMore.style.backgroundColor = '#e73327';
                            btnMore.style.cursor = 'pointer';
                        }
                    }
                },
                addMoviesRow:  function () {
                    let arrMoviesItems = [...moviesList.children],
                    activeMovies = app.mainMethods.getActiveMovies(arrMoviesItems).length,
                    maxRows = Math.ceil(activeMovies / maxItemsInRow),
                    maxHeightMoviesRows = maxRows * rowMoviesHeight;
            
                    if ((moviesList.offsetHeight + (rowMoviesHeight * rowMoviesToShow) >= maxHeightMoviesRows)) {
                            moviesList.style.height = maxHeightMoviesRows + 'px';
                            btnMore.style.backgroundColor = 'black';
                            btnMore.style.cursor = 'auto';
                            btnMore.removeEventListener('click', _this.addMoviesRow);
                        }
                        else {
                            moviesList.style.height = moviesList.offsetHeight + (rowMoviesHeight * rowMoviesToShow) + 'px';
                        }
                    }
            }
        }
    })();

app.init();
