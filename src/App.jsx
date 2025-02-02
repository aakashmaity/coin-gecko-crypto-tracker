import { useEffect, useState } from 'react';
import './App.css'
import Banner from './components/Banner/Banner'
import CoinTable from './components/CoinTable/CoinTable'
import Navbar from './components/Navbar/Navbar'


function App() {

  const [currency, setCurrency] = useState('usd');

  // useEffect(() => {
  //   console.log("Currency App:",currency)
  // },[currency])
  
  return (
    <>
      {currency}
      <Navbar setCurrency={setCurrency}/>
      <Banner/>
      <CoinTable currency={currency}/>
    </>
  )
}

export default App
