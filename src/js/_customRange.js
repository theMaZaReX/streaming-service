
const customRange = (function(){
    const range = document.querySelector('.filter-age__rng'),
          rangeOverlay = document.querySelector('.filter-age__rng-overlay');

    return {
        init:  function(){
            
            _this = this;

            ageStart.setAttribute('data-min', this.getMinAgeMovie());
            ageEnd.setAttribute('data-max', this.getMaxAgeMovie());

            ageStart.addEventListener('mousedown', function (event) {

                let btn1Coords = _this.getCoords(ageStart);
                let rangeCoords = _this.getCoords(range);
                let shiftBtn1 = event.pageX - btn1Coords.left;
                     
                const prevDefSelection = function (event) {
                  event.preventDefault();
                }
                const moveBounded = _this.move.bind(this, shiftBtn1, rangeCoords);
            
                document.addEventListener('selectstart', prevDefSelection);
                document.addEventListener('mousemove', moveBounded);
                document.addEventListener('mouseup', function () {
                  document.removeEventListener('mousemove', moveBounded);
                  document.removeEventListener('selectstart', prevDefSelection);
                })
              });

              ageEnd.addEventListener('mousedown', function (event) {

                let btn2Coords = _this.getCoords(ageEnd);
                let rangeCoords = _this.getCoords(range);
                let shiftBtn2 = event.pageX - btn2Coords.right;
                const prevDefSelection = function (event) {
                  event.preventDefault();
                }
                const moveBounded = _this.move.bind(this, shiftBtn2, rangeCoords);
                document.addEventListener('selectstart', prevDefSelection);
                document.addEventListener('mousemove', moveBounded);
                document.addEventListener('mouseup', function () {
                  document.removeEventListener('mousemove', moveBounded);
                  document.removeEventListener('selectstart', prevDefSelection);
                })
              });

              ageStart.addEventListener('touchstart', function (event) {

                let btn1Coords = _this.getCoords(ageStart);
                let rangeCoords = _this.getCoords(range);
                let shiftBtn1 = event.changedTouches[0].pageX - btn1Coords.left;
                const moveBounded = _this.move.bind(this, shiftBtn1, rangeCoords);
            
                document.addEventListener('touchmove', moveBounded);
              //  document.addEventListener('touchmove', filterMovies);
                document.addEventListener('touchend', function () {
                  document.removeEventListener('touchmove', moveBounded);
            
                })
              });
            
              ageEnd.addEventListener('touchstart', function (event) {
            
                let btn2Coords = _this.getCoords(ageEnd);
                let rangeCoords = _this.getCoords(range);
                let shiftBtn2 = event.changedTouches[0].pageX - btn2Coords.right;
                const moveBounded = _this.move.bind(this, shiftBtn2, rangeCoords);
            
                document.addEventListener('touchmove', moveBounded);
                //document.addEventListener('touchmove', filterMovies);
                document.addEventListener('touchend', function () {
                  document.removeEventListener('touchmove', moveBounded);
            
                })
              });

        },
        move: function(shiftBtn, rangeCoords){
            let btn1Coords = _this.getCoords(ageStart);
            let btn2Coords = _this.getCoords(ageEnd);

            if (this === ageStart) _this.moveLeft(shiftBtn, rangeCoords, btn1Coords, btn2Coords);
            if (this === ageEnd) _this.moveRight(shiftBtn, rangeCoords, btn1Coords, btn2Coords);
        },
        moveLeft: function(shiftBtn, rangeCoords, btn1Coords, btn2Coords){

            let minAgeStart = _this.getMinAgeMovie();
            let MoveStepLeft = _this.calcMoveStep('ageStart', shiftBtn, rangeCoords);
            let left = MoveStepLeft.left;
            let step = MoveStepLeft.step;
          
            if ((left >= 0) && (left <= rangeCoords.width)) {
              ageStart.style.left = left + "px";
              ageStart.setAttribute('data-min', minAgeStart + step);
          
              if (btn1Coords.left > btn2Coords.left) {
                let MoveStepRight = _this.calcMoveStep('ageEnd', shiftBtn, rangeCoords);
                ageEnd.style.right = MoveStepRight.right - 15 + "px";
                ageEnd.setAttribute('data-max', minAgeStart + step);
                rangeOverlay.style.left = left + "px";
                rangeOverlay.style.right = MoveStepRight.right - 15 + "px";
              }
          
              rangeOverlay.style.left = left + "px";
          
            }
            return left;
        },
        moveRight: function(shiftBtn, rangeCoords, btn1Coords, btn2Coords){
            let maxAgeEnd = _this.getMaxAgeMovie();

            let moveStepRight = _this.calcMoveStep('ageEnd', shiftBtn, rangeCoords)
            let right = moveStepRight.right;
            let step = moveStepRight.step;
          
            if ((right > 0) && (right <= rangeCoords.width)) {
              ageEnd.style.right = right + "px";
              ageEnd.setAttribute('data-max', maxAgeEnd - step);
          
              if (btn2Coords.left < btn1Coords.left) {
                let MoveStepleft = _this.calcMoveStep('ageStart', shiftBtn, rangeCoords);
                ageStart.style.left = MoveStepleft.left - 15 + "px";
                ageStart.setAttribute('data-min', maxAgeEnd - step);
                rangeOverlay.style.right = right + "px";
                rangeOverlay.style.left = MoveStepleft.left - 15 + "px";
              }
          
              rangeOverlay.style.right = right + "px";
          
            }
            return right;
        },
        getCoords: function(element){
            let box = element.getBoundingClientRect();

            return {
              top: box.top + pageYOffset,
              left: box.left + pageXOffset,
              right: box.left + box.width,
              width: box.width
            };
        },
        getMaxAgeMovie: function () {
            let max = arrMoviesItems[0].dataset.age;
          
            for (let i = 1; i < arrMoviesItems.length; i++) {
              if (parseInt(max) < parseInt(arrMoviesItems[i].dataset.age)) {
                max = arrMoviesItems[i].dataset.age;
              }
            }
            return parseInt(max);
          },
          getMinAgeMovie: function () {
            let min = arrMoviesItems[0].dataset.age;
          
            for (let i = 1; i < arrMoviesItems.length; i++) {
              if (parseInt(min) > parseInt(arrMoviesItems[i].dataset.age)) {
                min = arrMoviesItems[i].dataset.age;
              }
            }
            return parseInt(min);
          },
          calcMoveStep: function (btnAge = '', shiftBtn, rangeCoords) {
            let ageDiff = _this.getMaxAgeMovie() - _this.getMinAgeMovie();
          
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
    }
})()