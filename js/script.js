let percentTop;
let percentLeft;
$(document).on("click", function (e) {
    let mouseTop = e.pageY - $(window).scrollTop();
    let mouseLeft = e.pageX;
    percentTop = (mouseTop / $(window).height()) * 100;
    percentLeft = (mouseLeft / $(window).width()) * 100;   
});

function updateCurrentClass() {
    $(".w--current").removeClass("w--current");
    $("header a").each(function(index){
        if ($(this).attr("href") === window.location.pathname) {
            $(this).addClass("w--current");
        }
    });
}



// BARBA SETUP
barba.init({    

    transitions: [{
      preventRunning: true,
      enter(data) {
        updateCurrentClass();
        gsap.defaults({duration: 1.4, ease: "power2.inOut"})
        if ($('.menu-link.w--current').length > 0) {
            gsap.fromTo(".is-home", { x: "0%" }, { x: "49%" });
            gsap.fromTo(".is-clip", { x: "-49%" }, { x: "0%" });  
        } else{
            gsap.fromTo(".is-home", { x: "49%" }, { x: "0%" });
            gsap.fromTo(".is-clip", { x: "0%" }, { x: "-49%" });  
        }             
        $(data.next.container).addClass("fixed");
        return gsap.fromTo(data.next.container,
            { clipPath:  `circle(0% at ${percentLeft}% ${percentTop}%)` }, 
            { clipPath:  `circle(140% at ${percentLeft}% ${percentTop}%)`,            
            onComplete: () => {
                $(window).scrollTop(0);
                $(data.next.container).removeClass("fixed");
            }
        });
      }
     
    }]
  });


  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle("sticky", window.scrollY > 0 );
  })