import { forcasts } from "./forcast.js";

function forcastSwiper() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 'auto',
    spaceBetween: 8,
    freeMode: true,
  });
}

function forcast() {
  const forcast = document.querySelector('.forcasting h1');
  const forcastCont = document.querySelector('.forcasting .forcast-con');

  forcastCont.style.display = 'none';


  forcast.addEventListener("click", () => {
    if (forcastCont.style.display === 'none') {
      forcastCont.style.display = ''
    } else {
      forcastCont.style.display = 'none';
    }
  });
}

function loader() {
  const loader = document.querySelector('.loader');
  const loaderAni = document.querySelector('.loader h1');

  setTimeout(() => {
    loaderAni.style.marginBottom = '0'
  }, 800)

  if (!sessionStorage.getItem('loaderShown')) {
    setTimeout(() => {
      loader.style.marginTop = '-210%';
      sessionStorage.setItem('loaderShown', 'true');
    }, 2000);
  } else {
    loader.style.display = 'none';
  }
}

window.addEventListener('load', loader);


function forcastRender() {
  let html = '';

  forcasts.forEach((forcast) => {
    html += `
    <div class="swiper-slide p-3 border-2 border-black/50 font-bold w-[30vw] h-auto flex justify-between items-center flex-col text-1xl rounded-2xl">
      <div class="high-low-temp flex flex-col justify-center items-center">
        <p>${forcast.max}</p>
        <p class="opacity-50 mt-[-.5vh]">${forcast.min}</p>
      </div>
      <img src="${forcast.img}" class="rounded-2xl w-[20vw] h-[20vw] object-cover my-5">
      <p class="text-[#121212]/80">${forcast.day}</p>
    </div>
  `;
  });

  document.querySelector('.forcast-con').innerHTML = html;
}

function menu() {
  const menu = document.querySelector('.menu');
  const extendedMenu = document.querySelector('.extended-menu');
  const menuBar = document.querySelectorAll('.menu .bar');
  let isOpen = false;

  const toggleMenu = () => {
    extendedMenu.style.bottom = isOpen ? '-40vh' : '7vh';
    extendedMenu.style.opacity = isOpen ? '.8' : '1';
    menuBar.forEach(bar => bar.style.backgroundColor = isOpen ? '' : '#2462EB');
    isOpen = !isOpen;
  }

  menu.addEventListener('click', e => {
    e.stopPropagation()
    toggleMenu()
  })

  document.addEventListener('click', e => {
    if (isOpen && !menu.contains(e.target) && !extendedMenu.contains(e.target)) toggleMenu()
  })
}

function logSing() {
  const popUpCross = document.querySelector('.cross');
  const loginSingup = document.querySelector('.login-signup');

  popUpCross.addEventListener('click', () => {
    loginSingup.style.top = '-30vh';
  });
}



forcastSwiper()
forcast()
loader()
forcastRender()
menu()
logSing()




