const getMinAgeMovie = function () {
  let min = arrMoviesItems[0].dataset.age;

  for (let i = 1; i < arrMoviesItems.length; i++) {
    if (parseInt(min) > parseInt(arrMoviesItems[i].dataset.age)) {
      min = arrMoviesItems[i].dataset.age;
    }
  }
  return parseInt(min);
}

const getMaxAgeMovie = function () {
  let max = arrMoviesItems[0].dataset.age;

  for (let i = 1; i < arrMoviesItems.length; i++) {
    if (parseInt(max) < parseInt(arrMoviesItems[i].dataset.age)) {
      max = arrMoviesItems[i].dataset.age;
    }
  }
  return parseInt(max);
}


const getCoords = function (elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + pageYOffset,
    left: box.left + pageXOffset,
    right: box.left + box.width,
    width: box.width
  };
}

const calcMoveStep = function (btnAge = '', shiftBtn, rangeCoords) {
  let ageDiff = getMaxAgeMovie() - getMinAgeMovie();

  if (event.type === 'mousemove') {
    if (btnAge == 'ageStart') {
      let left = event.pageX - shiftBtn - rangeCoords.left;
      let step = Math.ceil((left / (rangeCoords.width / ageDiff)));
      return {
        left: left,
        step: step
      }
    }

    if (btnAge === 'ageEnd') {
      let right = rangeCoords.right - event.pageX + shiftBtn;
      let step = parseInt((right / (rangeCoords.width / ageDiff)));
      return {
        right: right,
        step: step
      }
    }
  }

  if (event.type === 'touchmove') {
    if (btnAge == 'ageStart') {
      let left = event.changedTouches[0].pageX - shiftBtn - rangeCoords.left;
      let step = Math.ceil((left / (rangeCoords.width / ageDiff)));
      return {
        left: left,
        step: step
      }
    }

    if (btnAge == 'ageEnd') {
      let right = rangeCoords.right - event.changedTouches[0].pageX + shiftBtn;
      let step = parseInt((right / (rangeCoords.width / ageDiff)));
      return {
        right: right,
        step: step
      }
    }
  }
}

const moveLeft = function (shiftBtn, rangeCoords, btn1Coords, btn2Coords) {
  let minAgeStart = getMinAgeMovie();

  let MoveStepLeft = calcMoveStep('ageStart', shiftBtn, rangeCoords);
  let left = MoveStepLeft.left;
  let step = MoveStepLeft.step;

  if ((left >= 0) && (left <= rangeCoords.width)) {
    ageStart.style.left = left + "px";
    ageStart.setAttribute('data-min', minAgeStart + step);

    if (btn1Coords.left > btn2Coords.left) {
      let MoveStepRight = calcMoveStep('ageEnd', shiftBtn, rangeCoords);
      ageEnd.style.right = MoveStepRight.right - 15 + "px";
      ageEnd.setAttribute('data-max', minAgeStart + step);
      rangeOverlay.style.left = left + "px";
      rangeOverlay.style.right = MoveStepRight.right - 15 + "px";
    }

    rangeOverlay.style.left = left + "px";

  }
  return left;
}

const moveRight = function (shiftBtn, rangeCoords, btn1Coords, btn2Coords) {
  let maxAgeEnd = getMaxAgeMovie();

  let moveStepRight = calcMoveStep('ageEnd', shiftBtn, rangeCoords)
  let right = moveStepRight.right;
  let step = moveStepRight.step;

  if ((right > 0) && (right <= rangeCoords.width)) {
    ageEnd.style.right = right + "px";
    ageEnd.setAttribute('data-max', maxAgeEnd - step);

    if (btn2Coords.left < btn1Coords.left) {
      let MoveStepleft = calcMoveStep('ageStart', shiftBtn, rangeCoords);
      ageStart.style.left = MoveStepleft.left - 15 + "px";
      ageStart.setAttribute('data-min', maxAgeEnd - step);
      rangeOverlay.style.right = right + "px";
      rangeOverlay.style.left = MoveStepleft.left - 15 + "px";
    }

    rangeOverlay.style.right = right + "px";

  }
  return right;
}

const move = function (shiftBtn, rangeCoords) {

  let btn1Coords = getCoords(ageStart);
  let btn2Coords = getCoords(ageEnd);

  if (this === ageStart) moveLeft(shiftBtn, rangeCoords, btn1Coords, btn2Coords);
  if (this === ageEnd) moveRight(shiftBtn, rangeCoords, btn1Coords, btn2Coords);

}

const fillDataAttrMovies = function () {
  for (let i = 0; i <= arrMoviesItems.length - 1; i++) {
    let current = arrMoviesItems[i];
    current.setAttribute('data-type', current.querySelector('.movies-list__type').textContent.toLowerCase());
    current.setAttribute('data-company', current.querySelector('.movies-list__company').textContent.toLowerCase());
    current.setAttribute('data-age', parseInt(current.querySelector('.movies-list__age').textContent.toLowerCase()));
    current.setAttribute('data-userscore', parseInt(current.querySelector('.ratings__user-score').textContent));
    current.setAttribute('data-tomatoscore', parseInt(current.querySelector('.ratings__tomato-score').textContent));

  }
}



document.addEventListener("DOMContentLoaded", function () {
  const arrFilterCompanies = [...filterCompany.children];
  const arrFilterGenreList = [...filterGenreList.children];
  const arrSortsList = [...sortsList.children];

  //заполнение data- атрибутов у всех movies
  fillDataAttrMovies();

  //заполнение data- атрибутов у customRange
  ageStart.setAttribute('data-min', getMinAgeMovie());
  ageEnd.setAttribute('data-max', getMaxAgeMovie());

  // заполнение data- атрибутов у filter-company
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

  // заполнение data- атрибутов у filter-genre
  arrFilterGenreList.forEach(function (element) {
    element.addEventListener('click', function () {
      event.preventDefault();
      filterGenre.removeAttribute('data-genre');
      btnGenre.textContent = element.innerText;

      if (event.target !== filterGenreNone) {
        filterGenre.setAttribute('data-genre', btnGenre.innerText.toLowerCase());
      }

      filterMovies();

    })
  });


  //listeners
  ageStart.addEventListener('mousedown', function (event) {

    let btn1Coords = getCoords(ageStart);
    let rangeCoords = getCoords(range);
    let shiftBtn1 = event.pageX - btn1Coords.left;
    const prevDefSelection = function (event) {
      event.preventDefault();
    }
    const moveBounded = move.bind(this, shiftBtn1, rangeCoords);

    document.addEventListener('selectstart', prevDefSelection);
    document.addEventListener('mousemove', moveBounded);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', moveBounded);
      document.removeEventListener('selectstart', prevDefSelection);
    })
  });

  ageEnd.addEventListener('mousedown', function (event) {

    let btn2Coords = getCoords(ageEnd);
    let rangeCoords = getCoords(range);
    let shiftBtn2 = event.pageX - btn2Coords.right;
    const prevDefSelection = function (event) {
      event.preventDefault();
    }
    const moveBounded = move.bind(this, shiftBtn2, rangeCoords);
    document.addEventListener('selectstart', prevDefSelection);
    document.addEventListener('mousemove', moveBounded);
    document.addEventListener('mouseup', function () {
      document.removeEventListener('mousemove', moveBounded);
      document.removeEventListener('selectstart', prevDefSelection);
    })
  });


  ageStart.addEventListener('touchstart', function (event) {

    let btn1Coords = getCoords(ageStart);
    let rangeCoords = getCoords(range);
    let shiftBtn1 = event.changedTouches[0].pageX - btn1Coords.left;
    const moveBounded = move.bind(this, shiftBtn1, rangeCoords);

    document.addEventListener('touchmove', moveBounded);
    document.addEventListener('touchmove', filterMovies);
    document.addEventListener('touchend', function () {
      document.removeEventListener('touchmove', moveBounded);

    })
  });

  ageEnd.addEventListener('touchstart', function (event) {

    let btn2Coords = getCoords(ageEnd);
    let rangeCoords = getCoords(range);
    let shiftBtn2 = event.changedTouches[0].pageX - btn2Coords.right;
    const moveBounded = move.bind(this, shiftBtn2, rangeCoords);

    document.addEventListener('touchmove', moveBounded);
    document.addEventListener('touchmove', filterMovies);
    document.addEventListener('touchend', function () {
      document.removeEventListener('touchmove', moveBounded);

    })
  });

  checkMovie.addEventListener('click', filterMovies);
  checkTV.addEventListener('click', filterMovies);
  ageStart.addEventListener('click', filterMovies);
  ageEnd.addEventListener('click', filterMovies);
  btnGenre.addEventListener('click', function () {
    filterGenreList.classList.add('filter-genre__list--show');
  });
  sortsCurrent.addEventListener('click', function () {
    sortsList.classList.add('sorts__list--show');
  })

  document.addEventListener('mouseup', function (event) {
    if (event.target !== btnGenre) {
      filterGenreList.classList.remove('filter-genre__list--show');
    }
    if (event.target !== sortsCurrent) {
      sortsList.classList.remove('sorts__list--show');
    }
  })

  arrFilterCompanies.forEach(function (element) {
    element.addEventListener('click', filterMovies);
  })

  arrSortsList.forEach(function (element) {
    element.addEventListener('click', function (event) {
      event.preventDefault();
      sortsCurrent.textContent = element.innerText;
      sort(event);
    })
  })


});

const filterMovies = function () {
  const filter = document.querySelector('.filter'),
        checkboxes = [...filter.querySelectorAll('.filter-type__item input:checked')].map(n => n.value),
        filterCompanyVal = filterCompany.dataset.company,
        currentMinAge = ageStart.dataset.min,
        currentMaxAge = ageEnd.dataset.max,
        filterGenreVal = filterGenre.dataset.genre;
console.log([...filter.querySelectorAll('.filter-type__item input:checked')]);
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

  if (window.screen.width >= 768) updateHeightMoviesList(maxItemsInRow, rowMoviesHeight);
}

const sort = function (event) {
  const sortUserScore = document.getElementById('user-score');
  const sortTomatoScore = document.getElementById('tomato-score');
  let activeMovies = getActiveMovies();
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

