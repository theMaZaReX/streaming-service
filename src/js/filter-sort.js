const range = document.querySelector('.filter-age__rng');
const ageStart = document.querySelector('.filter-age__rng-start');
const ageEnd = document.querySelector('.filter-age__rng-end');
const rangeOverlay = document.querySelector('.filter-age__rng-overlay');
let minAgeStart = parseInt(ageStart.getAttribute('data-min')); 
let maxAgeEnd = parseInt(ageEnd.getAttribute('data-max')); 
let ageDiff = maxAgeEnd - minAgeStart;
let rightStatic = 0;
let leftStatic = 0;


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
if (btnAge == 'ageStart'){
  let left =  event.pageX - shiftBtn - rangeCoords.left;
  let step  = Math.ceil((left/(rangeCoords.width/ageDiff)));
  return {
    left: left,
    step: step
  }
}

if(btnAge == 'ageEnd'){
  let right = rangeCoords.right- event.pageX + shiftBtn;
  let step  = parseInt((right/(rangeCoords.width/ageDiff)));
  return {
    right: right,
    step: step
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




ageStart.addEventListener('mousedown', function(event){
  console.log(event.target);
    let btn1Coords = getCoords(ageStart);
    let rangeCoords = getCoords(range);
    let shiftBtn1 = event.pageX - btn1Coords.left;
    const moveBounded = move.bind(this, shiftBtn1, rangeCoords); 
    
    document.addEventListener('mousemove', moveBounded);
    document.addEventListener('mouseup', function(){
    document.removeEventListener('mousemove', moveBounded);
    })
});

ageEnd.addEventListener('mousedown', function(event){
  console.log(event.target);
  let btn2Coords = getCoords(ageEnd);
  let rangeCoords = getCoords(range);
  let shiftBtn2 = event.pageX - btn2Coords.right;
  const moveBounded = move.bind(this, shiftBtn2, rangeCoords); 
  
  document.addEventListener('mousemove', moveBounded);
  document.addEventListener('mouseup', function(){
  document.removeEventListener('mousemove', moveBounded);
  })
});


