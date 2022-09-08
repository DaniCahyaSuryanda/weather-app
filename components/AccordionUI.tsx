import React from "react";
import { DateTime } from "luxon";
import Image from "next/image";

const AccordionUI = (props: any) => {
  const { Id, Index, setIndex, dataDay : data} = props;
  const handleSetIndex = (Id: any) => Index !== Id && setIndex(Id);
    // console.log(data)
  return (
    <>
      <div
        onClick={() => handleSetIndex(Id)}
        className="flex group cursor-pointer w-full mx-auto h-16 justify-between  items-center p-2 mt-2 rounded-md bg-white hover:bg-gray-500 hover:shadow-lg focus:bg-gray-500 "
      >
        <div className="flex group cursor-pointer">
            <Image
                className="block mr-5"
                src={`/${data?.icon}.png`}
                alt={data?.conditions}
                width={50}
                height={50}                
            />
          <div className="font-semibold pl-10 group-hover:text-white">            
            {DateTime.fromSQL(data?.datetime).toFormat('cccc')}
          </div>
        </div>
        <div className="flex items-center justify-center pr-10 group-hover:text-white">
          {data.conditions} <span className="ml-5 group-hover:text-white text-gray-400">{data.tempmin}<sup>&deg;</sup>C / {data.tempmax}<sup>&deg;</sup>C</span>
        </div>
      </div>

      {Index === Id && (
        <div className="bg-gray-100 pl-10 font-semibold text-gray-500 w-3/4 h-auto rounded-md p-4 border-l-2 border-blue-300 mb-2 ">
            <div className="px-6 py-6">
                <div className="block sm:flex justify-between items-center flex-wrap">
                <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                    <span>Cloud Cover</span>
                    <small className="px-2 inline-block">
                    {data?.cloudcover ?? 0}&nbsp;%
                    </small>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                    <span>Humidity</span>
                    <small className="px-2 inline-block">
                    {data?.humidity ?? 0}&nbsp;%
                    </small>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                    <span>Wind speed</span>
                    <small className="px-2 inline-block">
                    {data?.windspeed ?? 0}&nbsp;m/s
                    </small>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                    <span>Pressure</span>
                    <small className="px-2 inline-block">{data?.pressure ?? 0}&nbsp;hPa</small>
                    </div>
                </div>
                <div className="w-full sm:w-1/2">
                    <div className="flex mb-2 justify-between items-center">
                    <span>Visibility</span>
                    <small className="px-2 inline-block">{data?.visibility ?? 0}&nbsp;km</small>
                    </div>
                </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

export default AccordionUI;
