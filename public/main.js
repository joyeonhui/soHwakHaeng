// banner고정 - banner1
$( document ).ready( function() {
       
  var jbOffset = $( '.appheader' ).offset();
    $( window ).scroll( function() {
      if ( $( document ).scrollTop() > jbOffset.top ) {
        $( '.appheader' ).addClass( 'jbFixed' );
      }
      else {
        $( '.appheader' ).removeClass( 'jbFixed' );
      }
    });
} );

// dropmenu - level
$(document).ready(function() {
    $("ul.menu > li").on('mouseover', function(){
        $(this).find('a').addClass('hover');
        $(this).find('ul.sub-list').show();
    }).on('mouseout',function(){
        $(this).find('a').removeClass('hover');
        $(this).find('ul.sub-list').hide();
    });
});

// Carousel
var time; 
var $carouselLi;
var carouselCount; 
var currentIndex; 
var caInterval;
 
var imgW;  
$(document).ready(function(){
 
    carouselInit(400, 2000);
});
 
$(window).resize(function(){
    carousel_setImgPosition();
});
 

function carouselInit( height, t ){
   
    time = t;
    $("#carousel_section").height(height); 
    $carouselLi = $("#carousel_section > ul >li");
    carouselCount = $carouselLi.length; 
    currentIndex = 0; 
    carousel_setImgPosition();
    carousel();
}
 
function carousel_setImgPosition(){
 
    imgW = $carouselLi.width();   
    // 이미지 위치 조정
    for(var i = 0; i < carouselCount; i++)
    {
        if( i == currentIndex)
        {
            $carouselLi.eq(i).css("left", 0);
        }
        else
        {
            $carouselLi.eq(i).css("left", imgW);
        }
    }
}
 
function carousel(){

    caInterval = setInterval(function(){
        var left = "-" + imgW;
 
        $carouselLi.eq(currentIndex).animate( { left: left }, function(){
          
            $carouselLi.eq(currentIndex).css("left", imgW);
 
            if( currentIndex == ( carouselCount - 1 ) )
            {
                currentIndex = 0;
            }
            else
            {
                currentIndex ++;
            }
        } );
 
        if( currentIndex == ( carouselCount - 1 ) )
        {
            $carouselLi.eq(0).animate( { left: 0 } );
        }
        else
        {
            $carouselLi.eq(currentIndex + 1).animate( { left: 0 } );
        }
    }, time);
}

// Scrollspy
$(function(){

    var link = $('#top-banner a.dot');
    link.on('click',function(e){
        
        //href 속성을 통해, section id 타겟을 잡음
        var target = $($(this).attr('href')); 
        
        //target section의 좌표를 통해 꼭대기로 이동
        $('html, body').animate({
            scrollTop: target.offset().top
        },600);
        
        //active 클래스 부여
        $(this).addClass('active');

        //앵커를 통해 이동할때, URL에 #id가 붙지 않도록 함.
        e.preventDefault();
    });
    
    $(window).on('scroll',function(){
        findPosition();
    });
  
    function findPosition(){
        $('#content').each(function(){
            if( ($(this).offset().top - $(window).scrollTop() ) < 20){
                link.removeClass('active');
        		}
        });
    }

    findPosition();
   
});