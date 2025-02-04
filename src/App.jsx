import { useState } from 'react';
import './App.css';
import { CurrencyContext } from './context/CurrencyContext';
import Home from './pages/Home';


function App() {
  const [currency, setCurrency] = useState('usd')

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency}}>
      <Home />
    </CurrencyContext.Provider>
  )
}

export default App