// src/Weather.js  
import React, { useState } from 'react';  
import axios from 'axios';  
import './App.css'; // Додай цей рядок, щоб імпортувати стилі  

const Weather = () => {  
    const [cities, setCities] = useState([  
        'Kyiv',  
        'Lviv',  
        'Odesa',  
        'Kharkiv',  
        'Dnipro',  
        'Warsaw',  
        'Berlin',  
        'Paris',  
        'London',  
        'New York'  
    ]);  
    const [weatherData, setWeatherData] = useState([]);  
    const [error, setError] = useState('');  

    const API_KEY = 'dabf10f8041f12ff5c8acc58151e6f5d'; // Заміни на свій API ключ  

    const getWeather = async () => {  
        const data = [];  
        const errors = [];  

        for (const city of cities) {  
            try {  
                const response = await axios.get(  
                    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`  
                );  
                data.push(response.data);  
            } catch (err) {  
                errors.push(`City ${city} not found`);  
            }  
        }  
        
        setWeatherData(data);  
        setError(errors.length > 0 ? errors.join(', ') : '');  
    };  

    const handleAddCity = (e) => {  
        e.preventDefault();  
        const newCity = e.target.city.value;  
        if (newCity && !cities.includes(newCity)) {  
            setCities([...cities, newCity]);  
            e.target.city.value = ''; // Очищення поля вводу  
        }  
    };  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        getWeather();  
    };  

    return (  
        <div className="container mt-5">  
            <h1 className="text-center">Weather App</h1>  
            <form className="input-group mb-3" onSubmit={handleAddCity}>  
                <input  
                    type="text"  
                    className="form-control"  
                    placeholder="Enter city"  
                    name="city"  
                />  
                <div className="input-group-append">  
                    <button className="btn btn-primary" type="submit">  
                        Add City  
                    </button>  
                </div>  
            </form>  
            <button className="btn btn-success mb-3" onClick={handleSubmit}>  
                Get Weather for All Cities  
            </button>  

            {error && <div className="alert alert-danger">{error}</div>}  
            <div className="row">  
                {weatherData.map((data, index) => (  
                    <div className="col-md-4 mb-4" key={index}>  
                        <div className="card">  
                            <div className="card-body">  
                                <h2 className="card-title">{data.name}</h2>  
                                <p className="card-text">Temperature: {data.main.temp}°C</p>  
                                <p className="card-text">Weather: {data.weather[0].description}</p>  
                            </div>  
                        </div>  
                    </div>  
                ))}  
            </div>  
        </div>  
    );  
};  

export default Weather;