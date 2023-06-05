// Opening and Closing Mobile Navigation Bar

const closeBtn = document.querySelector('.close-btn');
const openBtn = document.querySelector('.open-btn');

const mobileNav = document.querySelector('.mobile-navigation');

function openNav()
{
  mobileNav.style.left = '0%';
}

function closeNav()
{
  mobileNav.style.left = '100%';
}

openBtn.addEventListener('click',openNav);
closeBtn.addEventListener('click',closeNav);

// Changing the Background Color and Color of Header While Scrolling

const mainHeader = document.querySelector('.main-header');
const subHeader = document.querySelector('.sub-header');

function scrollHeader(){
  if(window.scrollY > 50)
  {
    mainHeader.style.backgroundColor = `var(--dominant-color)`;
    mainHeader.style.top = `0`;
    subHeader.style.border = `none`;
    subHeader.style.padding = `0`;
  }

  else
  {
    mainHeader.style.backgroundColor = `transparent`
    mainHeader.style.top = `1rem`;
    subHeader.style.border = `2px solid var(--light-accent-color)`;
    subHeader.style.padding = `0 1rem`;
  }
}

window.addEventListener('scroll',scrollHeader);

// Menu Carousel

const carouselContainer = document.querySelector('.carousel-container');

const carouselWrapper = document.querySelector('.carousel-wrapper');

let itemLength = carouselWrapper.children.length;
let itemWidth = carouselWrapper.children[0].offsetWidth;

window.addEventListener('resize',()=>
{
  if(window.innerWidth < 1024)
  {
    carouselWrapper.style.width = itemWidth * itemLength + 100 + 'px';
    carouselContainer.style.width = carouselWrapper.offsetWidth + 'px';
  }

  if(window.innerWidth >= 1024 && window.innerWidth < 1200)
  {
    carouselWrapper.style.width = 900 + 'px';
    carouselContainer.style.width = 900 + 'px';
  }

  if(window.innerWidth >= 1200)
  {
    carouselWrapper.style.width = 1100 + 'px';
    carouselContainer.style.width = 1100 + 'px';
  }
})

// Touch Event Carousel

let counter = 0;

Array.from(carouselWrapper.children).forEach(item => 
{

  let touchStart = 0;
  let touchMove = 0;

  function touchEnd (){
    
    const swipeDistance = touchStart - touchMove;

    if(swipeDistance > 0)
    {

      if(window.innerWidth > 650)
      {
        if(counter <= carouselWrapper.children.length-3)
        {
          counter++;
          carouselWrapper.style.transform = `translateX(-${316 * counter}px)`;
        }
        
        else return;
      }

      else if(window.innerWidth < 650)
      {
        if(counter <= carouselWrapper.children.length-2)
        {
          counter++;
          carouselWrapper.style.transform = `translateX(-${316 * counter}px)`;

        }

        else return;
      }

    }
    else if (swipeDistance < 0) {

      counter--;
      counter >= 0 ? carouselWrapper.style.transform = `translateX(-${316 * counter}px)` : '';
    }

  }

  let carouselTimeout;

  function refreshListener2(func,delay)
  {
    clearTimeout(carouselTimeout);
    carouselTimeout = setTimeout(func,delay);
    // counter = 0;
  }

  item.addEventListener('touchend',touchEnd);

  item.addEventListener('touchstart', (e)=>{
    touchStart = e.touches[0].clientX;
  })

  item.addEventListener('touchmove', (e)=>{
    e.preventDefault();
    touchMove = e.touches[0].clientX;
  })

  window.addEventListener('resize',function()
  {
    refreshListener2(touchEnd,250);

    if(window.innerWidth >= 1024)
    {
      counter = 0;
      touchStart = 0;
      touchMove = 0;
      carouselWrapper.style.transform = `translateX(${0}px)`;

      item.removeEventListener('touchend',touchEnd);

      item.removeEventListener('touchstart', (e)=>{
        touchStart = e.touches[0].clientX;
      })
    
      item.removeEventListener('touchmove', (e)=>{
        e.preventDefault();
        touchMove = e.touches[0].clientX;
      })
    }

    else if(window.innerWidth < 1024)
    {
      item.addEventListener('touchend',touchEnd);

      item.addEventListener('touchstart', (e)=>{
        touchStart = e.touches[0].clientX;
      })
    
      item.addEventListener('touchmove', (e)=>{
        e.preventDefault();
        touchMove = e.touches[0].clientX;
      })
    }

  });

}); 

