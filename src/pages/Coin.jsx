import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

export default function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [historicalData, setHistoricalData] = useState();
  const { currency } = useContext(CoinContext);
  const INR_TO_NPR = 1.6;
  const fetchCoinData = async () => {
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    const vsCurrency = currency.name === "npr" ? "inr" : currency.name;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (currency.name === "npr") {
        data.market_data.current_price["npr"] =
          data.market_data.current_price["inr"] * INR_TO_NPR;
        data.market_data.market_cap["npr"] =
          data.market_data.market_cap["inr"] * INR_TO_NPR;
        data.market_data.high_24h["npr"] =
          data.market_data.high_24h["inr"] * INR_TO_NPR;
        data.market_data.low_24h["npr"] =
          data.market_data.low_24h["inr"] * INR_TO_NPR;
      }
      // console.log(data);
      setCoinData(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchHistoricalData = async () => {
    const vsCurrency = currency.name === "npr" ? "inr" : currency.name;
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=20&interval=daily`;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      let prices = data.prices; // [[timestamp, price], ...]

      if (currency.name === "npr") {
        prices = prices.map(([time, price]) => [time, price * INR_TO_NPR]);
      }
      setHistoricalData(prices);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency]);
  if (coinData && historicalData) {
    return (
      <div className="p-4">
        <div className="flex flex-col items-center mb-6">
          <img src={coinData.image.large} alt="" className="w-30 h-30 mb-2" />
          <p className="text-xl font-bold">
            <b>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart mb-6">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 text-black text-center md:text-left">
          <ul className="bg-gray-200 p-4 rounded">
            <li className="font-semibold">Crypto Market Rank</li>
            <li>{coinData.market_cap_rank}</li>
          </ul>
          <ul className="bg-gray-200 p-4 rounded">
            <li className="font-semibold">Current Price</li>
            <li>
              {currency.symbol}
              {coinData?.market_data?.current_price?.[currency.name]
                ? coinData.market_data.current_price[
                    currency.name
                  ].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul className="bg-gray-200 p-4 rounded">
            <li className="font-semibold">Market Capitalization</li>
            <li>
              {currency.symbol}
              {coinData?.market_data?.market_cap?.[currency.name]
                ? coinData.market_data.market_cap[
                    currency.name
                  ].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul className="bg-gray-200 p-4 rounded">
            <li className="font-semibold">24 Hour High</li>
            <li>
              {currency.symbol}
              {coinData?.market_data?.high_24h?.[currency.name]
                ? coinData.market_data.high_24h[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
          <ul className="bg-gray-200 p-4 rounded">
            <li className="font-semibold">24 Hour Low</li>
            <li>
              {currency.symbol}
              {coinData?.market_data?.low_24h?.[currency.name]
                ? coinData.market_data.low_24h[currency.name].toLocaleString()
                : "N/A"}
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className="grid place-items-center min-h-[80vh]">
        <div className="w-[60px] h-[60px] border-[5px] border-white border-t-gray-400 rounded-full animate-spin"></div>
      </div>
    );
  }
}
