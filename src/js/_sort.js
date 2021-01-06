const sort = (function(){
    const  sorts = document.querySelector('.sorts'),
    sortsCurrent = document.querySelector('.sorts__current'),
    sortsList = document.querySelector('.sorts__list'),
    arrSortsList = [...sortsList.children],
    sortUserScore = document.getElementById('user-score'),
    sortTomatoScore = document.getElementById('tomato-score');


    return {
        init: function(){
            self = this;

            sortsCurrent.addEventListener('click', function () {
                sortsList.classList.add('sorts__list--show');
              })

              arrSortsList.forEach(function (element) {
                element.addEventListener('click', function (event) {
                  event.preventDefault();
                  sortsCurrent.textContent = element.innerText;
                  self.sortItems(event);
                })
              })

              document.addEventListener('mouseup', function (event) {
                if (event.target !== sortsCurrent) {
                  sortsList.classList.remove('sorts__list--show');
                }
              })
        },
        sortItems: function (event) {
           
           let activeMovies = app.mainMethods.getActiveMovies(arrMoviesItems);
            let sortResult = [];
          
            if (event.target === sortUserScore) {
              sortResult = activeMovies.sort(function (a, b) {
                return b.dataset.userscore - a.dataset.userscore;
              })
            }
          
            if (event.target === sortTomatoScore) {
              sortResult = activeMovies.sort(function (a, b) {
                return b.dataset.tomatoscore - a.dataset.tomatoscore;
              })
            }
          
            if (sortResult.length !== 0) {
              activeMovies.forEach(function (element) {
                moviesList.removeChild(element);
              })
              sortResult.forEach(function (element) {
                moviesList.appendChild(element);
              })
            }
          
          
          }
    }

})()