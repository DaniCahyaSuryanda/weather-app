import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from ".";

export const useWeather = (
  locationName: string 
) => {
  const baseUrl = process.env.OPENWEATHER_API_BASEURL;
  const apiKey = process.env.OPENWEATHER_API_KEY;

  const { location } = useLocation("");
  const [currentWeather, setCurrentWeather] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);    

  useEffect(() => {
    setIsLoading(true);
    if (location?.position?.latitude && location?.position?.longitude) {

      const url = `${baseUrl}${locationName == "" ? location.locality : locationName}?unitGroup=metric&include=days%2Chours%2Ccurrent&key=${apiKey}&contentType=json`;       
      axios
        .get(url)
        .then((response) => {
          // console.log(response)
          setCurrent(response.data);
        })
        .catch((error) => {
          console.log(error)
          setCurrent(error.response.data)
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 100);
        });
    }
  }, [location, baseUrl, apiKey, locationName]);

  const setCurrent = (data: any) => {
    setCurrentWeather(data);
  };

  const setHourly = (data: any) => {
    let hourly: any[] = [];
    data.slice(0, 24).forEach((item: any) => {
      hourly.push({
        dt: item.dt,
        weather: {
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        },
        temp: item.temp,
        feels_like: item.feels_like,
        details: {
          rain: item.pop * 100,
          visibility: item.visibility / 1000,
          humidity: item.humidity,
          pressure: item.pressure,
          wind_speed: item.wind_speed,
        },
      });
    });    
  };

  const setDaily = (data: any) => {
    let daily: any[] = [];
    data.slice(1).forEach((item: any) => {
      daily.push({
        dt: item.dt,
        clouds: item.clouds,
        humidity: item.humidity,
        pressure: item.pressure,
        sunrise: item.sunrise,
        sunset: item.sunset,
        minTemp: item.temp.min,
        maxTemp: item.temp.max,
        uvi: item.uvi,
        weather: {
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        },
        wind_speed: item.wind_speed,
        rain: item.pop * 100,
      });
    });    
  };

  return {
    isLoading,
    location,
    currentWeather
  };
};
