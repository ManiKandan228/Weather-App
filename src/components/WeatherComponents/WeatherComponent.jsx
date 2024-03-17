import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './WeatherComponents.css'

const WeatherComponent = () => {
    const API_KEY = 'f63aaf1ca83843c6a0094457241103'
    const [cityName,setCityName] = useState('')
    const [weatherData,setWeatherData] = useState({})
    const [latitude,setLatitude] = useState(0)
    const [longitude,setLongitude] = useState(0)
  
    useEffect( () => {
      console.log('UseEffect called')
      fetchCurrentWeather()
    },[cityName])
  
    const fetchCurrentWeather = async() => {
      navigator.geolocation.getCurrentPosition((position) => {
          setLatitude(position.coords.latitude)
          setLongitude(position.coords.longitude)
      })
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
      setWeatherData(response.data)
    }
  
    const handleCityName = (event) =>
    {
      setCityName(event.target.value)
    }
  
    const getCityWeather = async() =>
    {
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`)
      console.log(response.data)
      setWeatherData(response.data)
    }
  
    return (
      <div className='weather-container'>
      <section className='main-container'>
        <div className='search-bar-container'>
          <input 
            type="text" 
            id='cityNameText'
            placeholder='Enter your city name here'
            value={cityName}
            onChange={handleCityName}
            onKeyDown={getCityWeather}
            />
            <button onClick={getCityWeather} id='get-weather-btn'>Get Weather</button>
        </div>
        <div className='location-container'>
          <p id='location-data'>{weatherData.location && weatherData.location.name} , 
             {weatherData.location && weatherData.location.region} , 
             {weatherData.location && weatherData.location.country} 
          </p>
          <h1 id='temperature'>{weatherData.current && weatherData.current.temp_c}&deg; C</h1>
        </div>
        
        <section className='secondary-container'>
        <div className='box1'>
          <p>{weatherData.current && weatherData.current.cloud}</p>
        </div>
        <div className='box2'>
          <p>{weatherData.current && weatherData.current.feelslike_c}</p>
        </div>
        <div className='box3'>
          <p>{weatherData.current && weatherData.current.gust_kph}</p>
        </div>
        <div className='box4'>
          <p>{weatherData.current && weatherData.current.humidity}</p>
        </div>
        <div className='box5'>
          <p>{weatherData.current && weatherData.current.pressure_mb}</p>
        </div>
        <div className='box6'>
          <p>{weatherData.current && weatherData.current.uv}</p>
        </div>
        <div className='box7'>
          <p>{weatherData.current && weatherData.current.wind_degree}</p>
        </div>
        <div className='box8'>
          <p>{weatherData.current && weatherData.current.wind_dir}</p>
        </div>
        </section>
      </section>
      </div>
    )
}

export default WeatherComponent