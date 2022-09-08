import Image from "next/image";
import React, { useEffect, useState } from "react";
import Accordion from "../components/Accordion";
import { useWeather } from "../hooks";
import { DateTime } from "luxon";
import { useRouter } from "next/router";

export default function Index() {
  const [currentWeatherSelectedItem, setCurrentWeatherSelectedItem] = useState<any>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<any>("")  
  const [err, setErr] = useState<any>(false)  
  let { isLoading, location, currentWeather } = useWeather(selectedLocation);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if(typeof currentWeather === 'string'){
      setCurrentWeatherSelectedItem(null);
      setErr(currentWeather)
    }else{
      setCurrentWeatherSelectedItem(currentWeather);
    }
  }, [currentWeather]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // console.log(searchTerm)      
      if(searchTerm.length > 0){
        setSelectedLocation(searchTerm)              
      }
    }, 2000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])

  return (
    <div>
      {!isLoading && currentWeatherSelectedItem && (
        <>
          <div className="p-4 pt-5 mt-5 items-end flex justify-center">
            <div className="flex items-end flex-row w-3/4">
              <div className="basis-6/12">
                <h3 className="text-5xl">
                  {currentWeatherSelectedItem?.address}
                </h3>
                <h5 className="text-1xl m-0">{currentWeatherSelectedItem.resolvedAddress.split(' ')[1]}</h5>
                {DateTime.now().toFormat('DDDD')} {currentWeatherSelectedItem.currentConditions.datetime}
              </div>
              <div className="basis-6/12">
                <input
                  className="inputSearchCity"
                  type="text"
                  autoComplete='off'
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter Your City"
                />
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex flex-row w-3/4 items-center ">
              <div className="basis-6/12 p-5">
                <div className="flex justify-between">
                  <div className="text-center basis-6/12">
                    <Image
                      src={`/${currentWeatherSelectedItem.currentConditions.icon}.png`}
                      alt={currentWeatherSelectedItem.currentConditions.conditions}
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="basis-6/12 text-right">
                    <h3 className="font-bold text-4xl mb-0">
                    {currentWeatherSelectedItem.currentConditions.temp}<sup>&deg;</sup>
                      <span style={{ fontSize: "23px" }}>c</span>
                    </h3>
                    <small className="text-gray-600">
                      Feels Like : {currentWeatherSelectedItem.currentConditions.feelslike}<sup>&deg;</sup>
                    </small>{" "}
                    <br />
                    <small className="text-gray-600">
                    {currentWeatherSelectedItem.currentConditions.conditions}
                    </small>
                  </div>
                </div>
              </div>
              <div className="basis-6/12 bg-white rounded-lg text-gray-500 shadow-lg">
                <div className="px-6 py-6">
                  <div className="block sm:flex justify-between items-center flex-wrap">
                    <div className="w-full sm:w-1/2">
                      <div className="flex mb-2 justify-between items-center">
                        <span>Cloud Cover</span>
                        <small className="px-2 inline-block">
                        {currentWeatherSelectedItem?.currentConditions?.cloudcover ?? 0}&nbsp;%
                        </small>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="flex mb-2 justify-between items-center">
                        <span>Humidity</span>
                        <small className="px-2 inline-block">
                        {currentWeatherSelectedItem?.currentConditions?.humidity ?? 0}&nbsp;%
                        </small>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="flex mb-2 justify-between items-center">
                        <span>Wind speed</span>
                        <small className="px-2 inline-block">
                        {currentWeatherSelectedItem?.currentConditions?.windspeed ?? 0}&nbsp;m/s
                        </small>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="flex mb-2 justify-between items-center">
                        <span>Pressure</span>
                        <small className="px-2 inline-block">{currentWeatherSelectedItem?.currentConditions?.pressure ?? 0}&nbsp;hPa</small>
                      </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                      <div className="flex mb-2 justify-between items-center">
                        <span>Visibility</span>
                        <small className="px-2 inline-block">{currentWeatherSelectedItem?.currentConditions?.visibility ?? 0}&nbsp;km</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex flex-row w-3/4 items-center ">
              <div className="w-full">
                <h3 className="text-2xl mb-4">Hourly</h3>
                <div className="overflow-x-auto flex w-full p-3">
                  {currentWeatherSelectedItem?.days[0]?.hours?.map((row : any, index : number) => {
                    return (
                      <div key={index} className="text-center bg-gray-300 hover:bg-gray-200 rounded-xl p-4 mr-3">
                        <div className="block">{row?.datetime?.split(':')[0]+':'+row?.datetime?.split(':')[1]}</div>
                        <Image
                          className="block"
                          src={`/${row?.icon}.png`}
                          alt={row?.conditions}
                          width={50}
                          height={50}
                        />
                        <div className="block">
                          {row?.temp}<sup>&deg;</sup>C
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            <div className="flex flex-row w-3/4 items-center ">
              <div className="w-full">
                <h3 className="text-2xl mb-4">Weather Forecast</h3>
                <div>
                  <Accordion data={currentWeatherSelectedItem.days}/>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {
        isLoading && (
          <div className="pt-5 mt-5 items-end flex justify-center">
            <div className="flex items-end flex-row w-3/4">
              <div className="basis-full text-center bg-white p-5 rounded-xl shadow-lg">
                <Image
                  src={`/weather-icon/gif-load.gif`}
                  alt={"GIF"}
                  width={100}
                  height={100}
                />
                <h3 className="text-5xl mb-5">
                  Loading
                </h3>
              </div>
            </div>
          </div>
        )
      }  
      {
        !isLoading && err && (
          <div className="pt-5 mt-5 items-end flex justify-center">
            <div className="flex items-end flex-row w-3/4">
              <div className="basis-full text-center bg-white p-5 rounded-xl shadow-lg">                
                <h3 className="text-5xl mb-5">
                  {err}
                </h3>
                <button className="px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm" onClick={() => router.reload()}>
                  Refresh
                </button>
              </div>
            </div>
          </div>
          
        )
      }  
      {/* {DateTime.fromSQL("2022-09-09").toFormat('cccc')}     */}
    </div>
  );
}
