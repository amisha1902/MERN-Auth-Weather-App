import React, { useEffect, useRef, useState } from "react";
import search_icon from ".././assets/search_4989814.png";
import clear_icon from ".././assets/temp.png";
import cloud_icon from ".././assets/cloudy.png";
import drizzle_icon from ".././assets/drizzle.png";
import rain_icon from ".././assets/rain.png";
import snow_icon from ".././assets/snow.png";
import wind_icon from ".././assets/wind.png";
import humidity_icon from ".././assets/humidity.png";
import pressure_icon from ".././assets/pressure.png";
import visibility_icon from ".././assets/sunrise_17904786.png"
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setweatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();

      if (!response.ok) {
        alert("city not found");
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setweatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        pressure: data.main.pressure,
        gust: data.wind.gust || 0,
        visibility: data.visibility,
        cloud: data.clouds.all,
        precipitation: data.rain ? data.rain["1h"] : 0,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setweatherData(false);
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search("Pune");
  }, []);

  return (
   
    <div className="min-h-screen flex flex-col">
  <Header />
  <div className="flex flex-col items-center justify-center bg-violet-200 flex-grow">
    <div className="flex justify-center items-center h-full bg-violet-200">
      <div className="m-4 p-8 w-96 h-3/4 bg-blue-900 rounded-xl shadow-2xl relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search City.."
          className="w-52 h-12 p-4 rounded-3xl bg-white text-black"
        />
        <img
          onClick={() => search(inputRef.current.value)}
          src={search_icon}
          alt=""
          className="cursor-pointer absolute top-12 right-11 bottom-64 w-5 h-5 me-16 mb-28"
        />
        {weatherData ? (
          <>
            <img
              src={weatherData.icon}
              alt=""
              className="w-[110px] m-[25px] ms-24"
            />
            <p className="text-white text-3xl leading-4">
              {weatherData.temperature}°C
            </p>
            <p className="text-white text-xl pt-2">{weatherData.location}</p>
            <div className="w-full mt-[25px] text-white flex justify-between">
              <div className="flex items-start gap-3 text-[15px]">
                <img
                  src={humidity_icon}
                  alt=""
                  className="w-10 filter invert brightness-0"
                />
                <div>
                  <p>{weatherData.humidity}%</p>
                  <span>Humidity</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[15px]">
                <img src={wind_icon} alt="" className="w-10 ms-12" />
                <div>
                  <p>{weatherData.windSpeed}km/hr</p>
                  <span className="">Wind Speed</span>
                </div>
              </div>
            </div>
            <div className="w-full mt-[40px] text-white flex justify-between">
              <div className="flex items-start gap-3 text-[15px]">
                <img
                  src={pressure_icon}
                  alt=""
                  className="w-10"
                />
                <div>
                  <p>{weatherData.pressure} hPa</p>
                  <span>Pressure</span>
                </div>
              </div>
              <div className="flex items-start gap-3 text-[15px]">
                <img src={rain_icon} alt="" className="w-10 ms-12" />
                <div>
                  <p>{weatherData.precipitation} mm</p>
                  <span className="">Precipitation</span>
                </div>
              </div>
            </div>

            <div className="w-full mt-[40px] text-white flex justify-between">
              <div className="flex items-start gap-3 text-[15px]">
                <img
                  src={visibility_icon}
                  alt=""
                  className="w-10"
                />
                <div>
                  <p>{weatherData.visibility} m</p>
                  <span>Visibility</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[15px] me-11">
                <img src={cloud_icon} alt="" className="w-10 ms-0" />
                <div>
                  <p>{weatherData.cloud} %</p>
                  <span className="">Cloud</span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  </div>
  <ToastContainer />
</div>

  );
};
export default Weather;
