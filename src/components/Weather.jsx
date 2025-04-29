import React, { useEffect, useRef, useState } from 'react';
import './Weather.css';
import SearchIcon from '@mui/icons-material/Search';
import AirIcon from '@mui/icons-material/Air';
import WavesIcon from '@mui/icons-material/Waves';
import clear from '../assets/01d.png';
import fewclouds from '../assets/02d.png';
import scatteredclouds from '../assets/03d.png';
import brokenclouds from '../assets/04d.png';
import showerRain from '../assets/09d.png';
import rain from '../assets/10d.png';
import thunderstorm from '../assets/11d.png';
import snow from '../assets/13d.png';
import mist from '../assets/50d.png';

const Weather = () => {
    const inputRef = useRef();
    const [weatherData, setweatherData] = useState(false);
    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": fewclouds,
        "02n": fewclouds,
        "03d": scatteredclouds,
        "03n": scatteredclouds,
        "04d": brokenclouds,
        "04n": brokenclouds,
        "09d": showerRain,
        "09n": showerRain,
        "10d": rain,
        "10n": rain,
        "11d": thunderstorm,
        "11n": thunderstorm,
        '13d': snow,
        '13n': snow,
        '50d': mist,
        '50n': mist,
    }

    const search = async (city) => {
        try {
            const apiKey = '39c277583c279cc8c8873adf54444ba2';
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            const icon = allIcons[data.weather[0].icon] || clear;
            setweatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })
        } catch (error) {

        }
    }
    useEffect(() => {
        search('new york'); // default city
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className='weather'>
            <div className="search-bar">
                <div className="search-bar">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="search-city"
                        className="search-bar-input"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                search(inputRef.current.value);
                            }
                        }}
                    />
                    <SearchIcon
                        className="search-icon"
                        onClick={() => search(inputRef.current.value)}
                    />
                </div>
            </div>
            <img src={weatherData.icon} alt='sunimage' className='weather-icon' />
            <p className='temperature'>{weatherData.temperature}°</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className='col'>
                    <WavesIcon className='humidity-icon' />
                    <div >
                        <p>{weatherData.humidity}</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <AirIcon className='wind-icon' />
                    <div >
                        <p>{weatherData.windSpeed}</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;
