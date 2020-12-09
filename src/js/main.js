const moviesName = document.querySelectorAll('.movies-list__name');


document.addEventListener("DOMContentLoaded", function(){
    moviesName.forEach(function(elem){
        if(elem.innerText.length>=26){
            elem.innerText+=', ';
            elem.style.display = 'inline';
        }
   
    })
});