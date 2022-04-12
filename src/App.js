import Hero from './components/Hero/Hero'
import Mint from './components/Mint/Mint'
import Navbar from './components/Navbar/Navbar'
import Savings from './components/Savings/Savings'
import LMN from './components/LMN/Savings'
import SavingsMid from './components/Farms/Savings'
import Market from './components/Market/Market'
import Gauge from './components/Gauges/Gauge'
import Lotto from './components/Lotto/Lotto'
import {
  MouseParallaxContainer,
  MouseParallaxChild,
} from 'react-parallax-mouse'
import bg from './assets/bg-wheel.svg'
function App() {
  return (
    <div className="App">
      <div className="hero-main">
        <Navbar />
        <Hero />
      </div>
      <div id="mint">
        <Mint />
      </div>
      <div id="lmn">
        <LMN />
      </div>

      <div id="savings">
        <Savings />
      </div>
      <div id="farms">
        <SavingsMid />
      </div>
      {/* <div id="gauge">
        <Gauge />
      </div> */}
      <div id="lotto">
        <Lotto />
      </div>

      <div id="market">
        <Market />
      </div>
    </div>
  )
}

export default App
