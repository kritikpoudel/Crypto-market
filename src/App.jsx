import React from 'react'
import NavBar from './components/NavBar'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Coin from './pages/Coin'
import Footer from './components/Footer'


export default function App() {
  return (
    <div className='min-h-screen text-white bg-gradient-to-b from-[#041001] via-[#16462b] to-[#320303]'>
<NavBar/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/coin/:coinId' element={<Coin/>}/>
</Routes>
<Footer/>
    </div>
  )
}
