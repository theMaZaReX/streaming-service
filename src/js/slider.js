$(document).ready(function(){
    $('.slider').slick(
      {
        centerMode:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth:true,
        arrows:false,
        focusOnSelect: false,
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow:1
            }
          }
        ]
      }
    )
  });

