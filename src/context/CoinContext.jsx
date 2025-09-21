import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();
const CoinContextProvider = (props) => {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });
  const INR_TO_NPR = 1.6;
  const fetchAllCoin = async () => {
    const vsCurrency = currency.name === "npr" ? "inr" : currency.name;
    const url =
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vsCurrency}&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h`;
   const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": import.meta.env.VITE_API_KEY },
    };
    try {
      const response = await fetch(url, options);
     let data = await response.json();

if (currency.name === "npr") {
  data = data.map((coin) => ({
    ...coin,
    current_price: coin.current_price * INR_TO_NPR,
    market_cap: coin.market_cap * INR_TO_NPR,
  }));
}

      console.log(data);
      setAllCoin(data);
    } catch (error) {
      console.error(error);
    }
  };
 useEffect(()=>{
fetchAllCoin();
  },[currency])
  const ContextValue = {
    allCoin,
    currency,
    setCurrency,
    fetchAllCoin,
  };
  return <CoinContext.Provider value={ContextValue}>{props.children}</CoinContext.Provider>;
};
export default CoinContextProvider;
