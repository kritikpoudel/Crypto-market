import React, { useEffect, useState } from 'react'
import {Chart}  from 'react-google-charts'

export default function LineChart({historicalData}) {
    const[data,setData]=useState([["Date","Prices"]])
   useEffect(() => {
    let dataCopy = [["Date", "Prices"]];
    if (historicalData?.length) {
      historicalData.forEach(([time, price]) => {
        dataCopy.push([new Date(time), price]);
      });
            setData(dataCopy)
        }
    },[historicalData])
    const options = {
    hAxis: {
      format: "MMM dd",
    },
    legend: { position: "right" }, 
  colors: ["#1a73e8"], 
  };
  return (
    <Chart 
    chartType='LineChart'
    data={data}
     options={options}
 width="100%"
      height="400px"
    legendToggle 
    />
  )
}
