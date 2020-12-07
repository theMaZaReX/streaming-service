const ageStart = document.querySelector('.filter-age__rng-start');
const ageEnd = document.querySelector('.filter-age__rng-end');
const rngOverlay = document.querySelector('.filter-age__rng-overlay');
ageStart.getAttribute('data-min');
ageStart.style.left=0;
ageStart.addEventListener('mousedown', function(){
    this.getAttribute('data-min');
    this.style.left = `${parseInt(this.style.left)}+1`;
    let i = 0;

})