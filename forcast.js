const forcasts = [
  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/cloudy-day-1.svg',
    day: 'Today'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/cloudy-night-1.svg',
    day: 'Monday'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/cloudy.svg',
    day: 'Tuesday'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/day.svg',
    day: 'Wednesday'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/rainy-1.svg',
    day: 'Thrusday'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/rainy-5.svg',
    day: 'Friday'
  },

  {
    max: '101°F',
    min: '98°F',
    img: 'icons/animated/snowy-2.svg',
    day: 'Saturday'
  },
];


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

function forcastRender() {
  let html = '';

  forcasts.forEach((forcast) => {
    html += `
    <div class="swiper-slide py-3 border-2 border-black/50 font-bold w-auto h-auto flex justify-between items-center flex-col text-1xl rounded-2xl">
      <div class="high-low-temp flex flex-col justify-center items-center">
        <p>${forcast.max}</p>
        <p class="opacity-50 mt-[-.5vh]">${forcast.min}</p>
      </div>
      <img src="${forcast.img}" class="rounded-2xl w-[36vw] h-[36vw] object-center object-cover">
      <p class="text-[#121212]/80">${forcast.day}</p>
    </div>
  `;
  });

  document.querySelector('.forcast-con').innerHTML = html;
}

forcastSwiper()
// forcast()
forcastRender()

