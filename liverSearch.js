// ----------------------------
// DOM Elements
// ----------------------------
const cityInput = document.querySelector('.cityInput');
const suggestions = document.querySelector('.suggestions');

const cityCountryName = document.querySelector('.city .cityCountryName');
const dayDateTime = document.querySelector('.city .dayDateTime');

const condition = document.querySelector('.temp .condition');
const temperature = document.querySelector('.temp .temperature');
const highTemp = document.querySelector('.temp .highTemp');
const lowTemp = document.querySelector('.temp .lowTemp');

const cloud = document.querySelector('.otherDetails .cloud');
const humidity = document.querySelector('.otherDetails .humidity');
const wind = document.querySelector('.otherDetails .wind');

const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
let clockInterval = null;

// ----------------------------
// Live Clock for city
// ----------------------------
function startCityClock(timezoneOffset) {
  if (clockInterval) clearInterval(clockInterval);

  clockInterval = setInterval(() => {
    const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
    const cityTime = new Date(nowUTC.getTime() + timezoneOffset * 1000);

    // Format without year and without 'at'
    const cityTimeStr = cityTime.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

    // Remove year and "at" if present
    const formattedTime = cityTimeStr.replace(/\s?202\d/, '').replace(/\s?at\s?/, ', ');
    dayDateTime.innerText = formattedTime;
  }, 1000);
}

// ----------------------------
// Show Delhi by default
// ----------------------------
const delhiLat = 28.6139;
const delhiLon = 77.2090;

cityCountryName.innerText = "Delhi, India";
dayDateTime.innerText = ""; // will update after API response
getWeather(delhiLat, delhiLon, true);

// ----------------------------
// Live City Search
// ----------------------------
cityInput.addEventListener('input', async () => {
  const inputSearch = cityInput.value.trim();
  if (!inputSearch) {
    suggestions.innerHTML = '';
    suggestions.style.border = 'none';
    return;
  } else {
    suggestions.style.border = '.1vh solid #121212cc';
  }

  try {
    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${inputSearch}&limit=10&appid=2078d8fd3148732b191a7bec324b0636`
    );
    displayCitySuggestions(res.data);
  } catch (error) {
    console.error(error);
  }
});

// ----------------------------
// Display City Suggestions
// ----------------------------
function displayCitySuggestions(cities) {
  suggestions.innerHTML = '';
  let html = '';

  cities.forEach((city, index) => {
    const country = regionNames.of(city.country) || city.country;
    const borderClass = index === cities.length - 1 ? '' : 'border-b-[.1vh]';

    html += `
      <li 
        class="w-full flex justify-between items-center cursor-pointer py-1 ${borderClass} border-[#121212]/50 px-4 hover:bg-blue-700/70 hover:text-white "
        data-lat="${city.lat}"
        data-lon="${city.lon}"
        data-name="${city.name}"
        data-country="${country}"
      >
        <h1>${city.name}${city.state ? ', ' + city.state : ''}</h1>
        <h1>${country}</h1>
      </li>
    `;
  });

  suggestions.innerHTML = html;

  document.querySelectorAll('.suggestions li').forEach(li => {
    li.addEventListener('click', () => {
      const lat = li.getAttribute('data-lat');
      const lon = li.getAttribute('data-lon');
      const name = li.getAttribute('data-name');
      const country = li.getAttribute('data-country');

      getWeather(lat, lon);
      cityInput.value = `${name}, ${country}`;
      suggestions.innerHTML = '';
      suggestions.style.border = 'none';
    });
  });
}

// ----------------------------
// Fetch Weather & Update UI
// ----------------------------
async function getWeather(lat, lon, isDefaultDelhi = false) {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=2078d8fd3148732b191a7bec324b0636&units=metric`
    );
    const data = res.data;

    const countryName = regionNames.of(data.sys.country) || data.sys.country;

    cityCountryName.innerText = isDefaultDelhi ? 'Delhi, India' : `${data.name}, ${countryName}`;
    condition.innerText = data.weather[0].description;
    temperature.innerText = `${Math.round(data.main.temp)}°C`;
    highTemp.innerText = `High - ${Math.round(data.main.temp_max)}°C`;
    lowTemp.innerText = `Low - ${Math.round(data.main.temp_min)}°C`;

    cloud.innerText = `${data.clouds.all}%`;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed} m/s`;

    startCityClock(data.timezone);
  } catch (error) {
    console.error('Error fetching weather:', error);
  }
}
