`use strict`;
window.onscroll = function() {myFunction()};
const nav = document.querySelector('.page-header__block');
const menu = document.querySelector('.main-nav');
const header = document.querySelector('.intro');
const headerHeight = header.offsetHeight;
const sticky = headerHeight - nav.offsetHeight;
const img = document.querySelector('#desktop-logo');
const callBtn = document.querySelector('.page-header__recall');


function myFunction() {
  if (window.pageYOffset >= sticky) {
    nav.classList.add("page-header__block--white");
    img.srcset = 'img/logo-desktop--dark.svg';
    menu.classList.add('main-nav--visible');
    menu.classList.remove('main-nav--hidden');
    callBtn.classList.add('page-header__recall--yellow');
  } else {
    nav.classList.remove("page-header__block--white");
    img.srcset = 'img/logo-desktop.svg';
    menu.classList.add('main-nav--hidden');
    menu.classList.remove('main-nav--visible');
    callBtn.classList.remove('page-header__recall--yellow');
  }
}


// Cache selectors
var lastId,
    topMenu = $(".main-nav"),
    topMenuHeight = topMenu.outerHeight()+15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function(e){
  var href = $(this).attr("href"),
      offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;

   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("main-nav__item--active")
         .end().filter("[href='#"+id+"']").parent().addClass("main-nav__item--active");
   }
});
