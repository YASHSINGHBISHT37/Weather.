import { liveSearch } from "./liverSearch";


const cityCountryName = document.querySelector('.city .cityCountryName');
const dayDateTime = document.querySelector('.city .dayDateTime');

const condition = document.querySelector('.temp .condition');
const temperature = document.querySelector('.temp .temperature');
const highTemp = document.querySelector('.temp .highTemp');
const lowTemp = document.querySelector('.temp .lowTemp');

const cloud = document.querySelector('.otherDetails .cloud');
const humidity = document.querySelector('.otherDetails .humidity');
const wind = document.querySelector('.otherDetails .wind');

cityCountryName.innerHTML = `${}`;
dayDateTime.innerHTML = `${}`;

condition.innerHTML = `${}`;
temperature.innerHTML = `${}`;
highTemp.innerHTML = `${}`;
lowTemp.innerHTML = `${}`;

cloud.innerHTML = `${}`;
humidity.innerHTML = `${}`;
wind.innerHTML = `${}`;


async function getWeather() 

const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${.lat}&lon=${.lon}&appid=2078d8fd3148732b191a7bec324b0636`)
const resData = res.data



