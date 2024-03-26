import React, { useState, useRef } from 'react';
import { LuSearch } from 'react-icons/lu';
import image1 from '../assets/cloud.png';
import image2 from '../assets/humidity.png';
import image3 from '../assets/wind.png';
import image4 from '../assets/clear.png';
import image5 from '../assets/drizzle.png';
import image6 from '../assets/rain.png';
import image7 from '../assets/snow.png';


const WeatherApp = () => {
  const api_key = '858976673b6bd4787b038d30f2e8f552';

  const [wicon, setWicon] = useState(image4);
  const [error, setError] = useState('');
  const inputRef = useRef('');
  const previousInputValue = useRef('');

  const search = async () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue === '') {
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=Metric&appid=${api_key}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Location not found. Please check the spelling and try again.');
      }
      const data = await response.json();

      const humidity = document.getElementsByClassName('humidity-percent');
      const wind = document.getElementsByClassName('wind-rate');
      const temperature = document.getElementsByClassName('weather-temp');
      const location = document.getElementsByClassName('weather-location');

      humidity[0].innerHTML = data.main.humidity + ' %';
      wind[0].innerHTML = Math.floor(data.wind.speed) + ' km/h';
      temperature[0].innerHTML = Math.floor(data.main.temp) + '°c';
      location[0].innerHTML = data.name;

      // weather icon based on weather condition
      if (data.weather[0].icon === '01d' || data.weather[0].icon === '01n') {
        setWicon(image4);
      } else if (data.weather[0].icon === '02d' || data.weather[0].icon === '02n') {
        setWicon(image1);
      } else if (data.weather[0].icon === '03d' || data.weather[0].icon === '03n') {
        setWicon(image5);
      } else if (data.weather[0].icon === '04d' || data.weather[0].icon === '04n') {
        setWicon(image1);
      } else if (data.weather[0].icon === '09d' || data.weather[0].icon === '09n') {
        setWicon(image6);
      } else if (data.weather[0].icon === '10d' || data.weather[0].icon === '10n') {
        setWicon(image6);
      } else if (data.weather[0].icon === '13d' || data.weather[0].icon === '13n') {
        setWicon(image7);
      } else {
        setWicon(image4);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  
  const handleInputChange = () => {
    const inputValue = inputRef.current.value.trim();
    if (inputValue !== previousInputValue.current) {
      setError('');
      previousInputValue.current = inputValue;
    }
  };
  

  return (
    <>
      <div className='w-96 h-[550px] mt-10 rounded-md p-10 mx-auto bg-gradient-to-r from-[#130754] to-[#3b2f80] flex flex-col items-center'>
        <div className='text-center flex justify-center gap-2 items-center'>
          <input
            ref={inputRef}
            type='text'
            className='w-72 cityInput h-12 text-lg rounded-full text-[#626262] pl-7 bg-[#ebfffc] focus:outline-none focus:ring focus:border-blue-300'
            placeholder='Search'
            onChange={handleInputChange}
          />
          <div onClick={() => search()} className='w-12 rounded-full cursor-pointer bg-[#ebfffc] h-12 flex items-center justify-center'>
            <LuSearch className='text-gray-500 text-xl' />
          </div>
        </div>

        {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}

        <div className='w-40 weather-image mx-auto mt-4'>
          <img src={wicon} alt='Weather Image' />
        </div>

        <div className='text-white weather-temp text-7xl mt-4'>24°c</div>

        <div className='text-white text-4xl weather-location mt-5'>London</div>

        <div className='flex justify-between w-full mt-12'>
          <div className='flex items-center element'>
            <img src={image2} alt='Humidity Icon' className='mr-2' />
            <div>
              <div className='text-white text-lg font-semibold humidity-percent'>64%</div>
              <div className='text-gray-300 text'>Humidity</div>
            </div>
          </div>

          <div className='flex items-center'>
            <img src={image3} alt='Wind Speed Icon' className='mr-2' />
            <div>
              <div className='text-white text-lg font-semibold wind-rate'>18 km/h</div>
              <div className='text-gray-300 text'>Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;