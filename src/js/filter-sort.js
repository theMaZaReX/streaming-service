const range = document.querySelector('.filter-age__rng');
const ageStart = document.querySelector('.filter-age__rng-start');
const ageEnd = document.querySelector('.filter-age__rng-end');
const rangeOverlay = document.querySelector('.filter-age__rng-overlay');
let minAgeStart = parseInt(ageStart.getAttribute('data-min')); 
let maxAgeEnd = parseInt(ageEnd.getAttribute('data-max')); 
let ageDiff = maxAgeEnd - minAgeStart;






// Визаульная часть кастомного range
const getCoords = function (elem) {
    let box = elem.getBoundingClientRect();
  
    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      right: box.left + box.width,
      width: box.width
    };
  }

const calcMoveStep = function(btnAge = '', shiftBtn, rangeCoords){
  if (event.type ==='mousemove'){
    if (btnAge == 'ageStart'){
      let left =  event.pageX - shiftBtn - rangeCoords.left;
      let step  = Math.ceil((left/(rangeCoords.width/ageDiff)));
      return {
        left: left,
        step: step
      }
    }

    if(btnAge === 'ageEnd'){
      let right = rangeCoords.right- event.pageX + shiftBtn;
      let step  = parseInt((right/(rangeCoords.width/ageDiff)));
      return {
        right: right,
        step: step
      }
    }
  }

  if (event.type ==='touchmove'){
    if (btnAge == 'ageStart'){
      let left =   event.changedTouches[0].pageX - shiftBtn - rangeCoords.left;
      let step  = Math.ceil((left/(rangeCoords.width/ageDiff)));
      return {
        left: left,
        step: step
      }
    }

    if(btnAge == 'ageEnd'){
      let right = rangeCoords.right-  event.changedTouches[0].pageX + shiftBtn;
      let step  = parseInt((right/(rangeCoords.width/ageDiff)));
      return {
        right: right,
        step: step
      }
    }
  }
}

const moveLeft = function(shiftBtn, rangeCoords, btn1Coords, btn2Coords){

 
  let MoveStepLeft = calcMoveStep('ageStart', shiftBtn, rangeCoords);
  let left =  MoveStepLeft.left;
  let step  = MoveStepLeft.step;

  if ((left>=0) && (left<=rangeCoords.width)){
    ageStart.style.left = left + "px";
    ageStart.setAttribute('data-min', minAgeStart+step);

    if(btn1Coords.left>btn2Coords.left){
      let MoveStepRight = calcMoveStep('ageEnd', shiftBtn, rangeCoords);
       ageEnd.style.right = MoveStepRight.right-15 + "px";
       rangeOverlay.style.left = left + "px";
       rangeOverlay.style.right =MoveStepRight.right-15 + "px";
    }

    rangeOverlay.style.left = left + "px";

  }
  return left;
}

const moveRight = function(shiftBtn, rangeCoords, btn1Coords, btn2Coords){
    let moveStepRight = calcMoveStep('ageEnd', shiftBtn, rangeCoords)
    let right = moveStepRight.right;
    let step  = moveStepRight.step;
    
    if((right>0) && (right<=rangeCoords.width)){
     ageEnd.style.right = right + "px";
     ageEnd.setAttribute('data-max', maxAgeEnd-step);

     if (btn2Coords.left < btn1Coords.left) {
      let MoveStepleft = calcMoveStep('ageStart', shiftBtn, rangeCoords);
      ageStart.style.left = MoveStepleft.left-15 + "px";
      rangeOverlay.style.right = right + "px";
      rangeOverlay.style.left = MoveStepleft.left-15 + "px";
     }

     rangeOverlay.style.right = right + "px";

    }
    return right;
}

const move = function(shiftBtn, rangeCoords){
  
      let btn1Coords = getCoords(ageStart);
      let btn2Coords = getCoords(ageEnd);
    
      if (this===ageStart) moveLeft(shiftBtn, rangeCoords, btn1Coords, btn2Coords);
      if (this===ageEnd) moveRight(shiftBtn, rangeCoords, btn1Coords, btn2Coords);
  
}

// фильтр
const updateHeightMoviesList = function(maxItemsInRow, rowMoviesHeight){
  
  let numberItems = numberActiveMovies(arrMoviesItems);
  let hasListener = false;
  
      numberRows = Math.ceil(numberItems / maxItemsInRow);
      if (numberRows<=rowMoviesToShow){
          moviesList.style.height = (numberRows * rowMoviesHeight) + 'px';
          btnMore.style.backgroundColor = 'black';
          btnMore.style.cursor = 'auto';
          btnMore.removeEventListener('click',addMoviesRow);
          hasListener = true;
      }
      else{
          moviesList.style.height = (rowMoviesToShow * rowMoviesHeight) + 'px'; 
          if (!hasListener){
              btnMore.addEventListener('click',addMoviesRow);
              btnMore.style.backgroundColor = '#e73327';
              btnMore.style.cursor = 'pointer';
          }
      }
}



ageStart.addEventListener('mousedown', function(event){

    let btn1Coords = getCoords(ageStart);
    let rangeCoords = getCoords(range);
    let shiftBtn1 = event.pageX - btn1Coords.left;
    const prevDefSelection = function(event){
      event.preventDefault();
    }
    const moveBounded = move.bind(this, shiftBtn1, rangeCoords); 
    
    document.addEventListener('selectstart', prevDefSelection);
    document.addEventListener('mousemove', moveBounded);
    document.addEventListener('mouseup', function(){
        document.removeEventListener('mousemove', moveBounded);
        document.removeEventListener('selectstart', prevDefSelection);
    })
});

ageEnd.addEventListener('mousedown', function(event){

  let btn2Coords = getCoords(ageEnd);
  let rangeCoords = getCoords(range);
  let shiftBtn2 = event.pageX - btn2Coords.right;
  const prevDefSelection = function(event){
    event.preventDefault();
  }
  const moveBounded = move.bind(this, shiftBtn2, rangeCoords); 
  document.addEventListener('selectstart', prevDefSelection);
  document.addEventListener('mousemove', moveBounded);
  document.addEventListener('mouseup', function(){
     document.removeEventListener('mousemove', moveBounded);
     document.removeEventListener('selectstart', prevDefSelection);
  })
});


ageStart.addEventListener('touchstart', function(event){

    let btn1Coords = getCoords(ageStart);
    let rangeCoords = getCoords(range);
    let shiftBtn1 = event.changedTouches[0].pageX - btn1Coords.left;
    const moveBounded = move.bind(this, shiftBtn1, rangeCoords); 
    
    document.addEventListener('touchmove', moveBounded);
    document.addEventListener('touchend', function(){
        document.removeEventListener('touchmove', moveBounded);
     
    })
});

ageEnd.addEventListener('touchstart', function(event){

  let btn2Coords = getCoords(ageEnd);
  let rangeCoords = getCoords(range);
  let shiftBtn2 = event.changedTouches[0].pageX - btn2Coords.right;
  const moveBounded = move.bind(this, shiftBtn2, rangeCoords); 
  
  document.addEventListener('touchmove', moveBounded);
  document.addEventListener('touchend', function(){
     document.removeEventListener('touchmove', moveBounded);

  })
});

// Визаульная часть кастомного range



// Фильтр
const moviesType =  document.querySelectorAll('.movies-list__item .movies-list__type');
const checkTV = document.getElementById('type-tv');
const checkMovie = document.getElementById('type-movie');
const filtrCompany = document.querySelector('.filter-company');
const moviesCompany = document.querySelector('.filter-company');


const filtrType = function(checkbox, type){
  const arrMoviesItems = [...moviesList.children];
  const arrMoviesType = [...moviesType];

  if (((checkTV.checked) && (checkMovie.checked)) || (!(checkTV.checked) && !(checkMovie.checked))){
    for (i = 0; i<arrMoviesItems.length; i++){
      arrMoviesItems[i].style.display = 'inline-flex';
    }
    return true;
  }

  if (checkbox.checked){
    for (i = 0; i<arrMoviesItems.length; i++){
      if (arrMoviesType[i].getAttribute('data-type') !== type){
        arrMoviesItems[i].style.display = 'none';
      }
    }
   }
   else{
    for (i = 0; i<arrMoviesItems.length; i++){
      if (arrMoviesType[i].getAttribute('data-type') === type){
        arrMoviesItems[i].style.display = 'none';
      }
  }
  }
  
  
}
/*
document.addEventListener("DOMContentLoaded", function(){
  
  moviesType.forEach(function(element){
    let type = element.innerText.toLowerCase();
      element.setAttribute('data-type', type);
  });
  
  checkMovie.addEventListener('click', function(){
    filtrType(checkMovie, 'MOVIE');
  });
  checkTV.addEventListener('click', function(){
    filtrType(checkTV, 'TV');
  });
});


document.addEventListener("DOMContentLoaded", function(){
  const filtrCompanyItems = [...filtrCompany.children];
  
  moviesType.forEach(function(element){
      element.setAttribute('data-type', element.innerText);
  });
  
  checkMovie.addEventListener('click', function(){
    filtrType(checkMovie, 'MOVIE');
  });
  checkTV.addEventListener('click', function(){
    filtrType(checkTV, 'TV');
  });

  filtrCompanyItems.forEach(function(element){
    element.addEventListener('click', function(){
      console.log(element);
    })
  })

});

*/
document.addEventListener("DOMContentLoaded", function(){
  
  moviesType.forEach(function(element){
      element.setAttribute('data-type', element.innerText);
  });
  
  checkMovie.addEventListener('click', function(){
    filtrType(checkMovie, 'MOVIE');
    if (window.screen.width >= 992){
    updateHeightMoviesList(maxItemsInRow, rowMoviesHeight);
    }
  });
  checkTV.addEventListener('click', function(){
    filtrType(checkTV, 'TV');
    if (window.screen.width >= 992){
      updateHeightMoviesList(maxItemsInRow, rowMoviesHeight);
      }
  });
});

  
/*
document.addEventListener("DOMContentLoaded", function(){
  
  moviesType.forEach(function(element){
      element.setAttribute('data-type', element.innerText);
  });
  
  checkMovie.addEventListener('click', function(){
    filtrType(checkMovie, 'MOVIE');
  });
  checkTV.addEventListener('click', function(){
    filtrType(checkTV, 'TV');
  });
});
*/
  