import React, { useContext } from "react";
import logo from "../assets/logo.png";
import arrow_icon from "../assets/arrow_icon.png"
import { CoinContext } from "../context/CoinContext";
export default function NavBar() {
    const {setCurrency}=useContext(CoinContext);
    const currencyHandler=(event)=>{
        switch(event.target.value){
            case "usd":{
                setCurrency({name:'usd',symbol:'$'});
                break;
            }
             case "eur":{
                setCurrency({name:'eur',symbol:'€'});
                break;
            }
            case "npr":{
                setCurrency({name:'npr',symbol:'रु'});
                break;
            }
           default:{
                setCurrency({name:'usd',symbol:'$'});
                break;
            }
        }

    }
  return (
    <div className="flex items-center justify-between py-5 px-5 border-b border-gray-400 md:px-20 ">
      <img className="h-10 w-auto mb-2 md:mb-0 " src={logo} alt="" />
      <ul className=" hidden md:flex gap-8 text-lg ">
        <li className="cursor-pointer">Home</li>
        <li className="cursor-pointer">Features</li>
        <li className="cursor-pointer">Pricing</li>
        <li className="cursor-pointer">Blog</li>
      </ul>
      <div className="flex items-center gap-3 ">
        <select className="border-white border-2 rounded-md px-3 py-1 focus:outline-none focus:ring-0" onChange={currencyHandler}>
            <option value="usd">USD</option>
            <option value="npr">NPR</option>
            <option value="eur">EUR</option>
        </select>
        <button className="flex items-center bg-white text-black rounded-2xl px-3 py-1 gap-1 hover:bg-gray-200 transition cursor-pointer" >Sign up <img src={arrow_icon}alt=""/></button>
      </div>
    </div>
  );
}

