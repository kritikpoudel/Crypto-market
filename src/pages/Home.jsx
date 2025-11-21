import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/CoinContext";

export default function Home() {
  const { allCoin, currency } = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput]=useState('');

  const inputHandler=(event)=>{
   setInput(event.target.value);
   if (event.target.value === ""){
    setDisplayCoin(allCoin);
   }
  }
  const searchHandler= async(event)=>{
   event.preventDefault();
   const coins=await allCoin.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase());
   })
   setDisplayCoin(coins);
  }
  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);
 
  return (
    <div className="py-0 px-2.5 pb-25">
      <div className="max-w-2xl my-20 mx-auto flex flex-col items-center text-center gap-7.5">
        <h1 className="text-[max(4vw,36px)] font-bold">
          Largest
          <br />
          Crypto Marketplace
        </h1>
        <p className="w-[75%] text-gray-300">
          Welcome to the world's largest cryptocurrency marketplace.
          <br /> Sign up to explore more about cryptos.
        </p>
        <form onSubmit={searchHandler} className="p-2 w-[80%] bg-white rounded-md text-xl flex items-center justify-between text-black gap-2.5">
          <input
            className="flex-1 text-lg outline-none border-none pl-2.5"
            type="text"
            placeholder="Search crypto..."
            onChange={inputHandler}
            required
            value={input}
            list="coinlist"
          />
          <datalist id="coinlist">
            {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}

          </datalist>
          <button
            className="border-none bg-green-800 text-white text-lg py-2.5 px-7.5 rounded-lg cursor-pointer"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
      <div className="max-w-[1000px] m-auto bg-gradient-to-b from-[#395332b7] to-[#8d6d62c4] rounded-2xl">
        <div className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] grid-cols-[0.5fr_3fr_1fr_1fr] py-4 px-5 items-center border-b border-gray-400">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className="text-center">24H Change</p>
          <p className="text-right hidden md:block">Market Cap</p>
        </div>
        {displayCoin.slice(0, 10).map((item, index) => (
          <div
            className="grid md:grid-cols-[0.5fr_2fr_1fr_1fr_1.5fr] py-4 px-5 items-center border-b border-gray-400 last:border-b-0
            grid-cols-[0.5fr_3fr_1fr_1fr]"
            key={index}
          >
            <p>{item.market_cap_rank}</p>
            <div className="flex items-center gap-2.5">
                <img className="w-8.75" src={item.image} alt="" />
                <p>{item.name + " - "+item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
            <p className={`text-center ${item.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"}`}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
            <p className="text-right hidden md:block">{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
