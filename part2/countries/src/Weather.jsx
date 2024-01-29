import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({capital, capitalInfo}) => {
    const [weatherData, setWeatherData] = useState('');
    const lat = capitalInfo.latlng[0];
    const lon = capitalInfo.latlng[1];
    //const api_key = process.env.REACT_APP_API_KEY;
    //const url = `https://api.meteoblue.com/packages/basic-day?lat=${lat}&lon=${lon}&asl=500&tz=Europe%2FZurich&apikey=${api_key}`
    const url = `https://api.meteoblue.com/packages/basic-day?lat=${lat}&lon=${lon}&apikey=${api_key}`
    console.log("hola")
    return (
        <div>
            <h1>Weather in {capital}</h1>
            
        </div>
    )
}

export default Weather;