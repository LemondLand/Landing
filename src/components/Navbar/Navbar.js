import React, { useState } from 'react'
import lemon from '../../assets/lemon-logo.svg'
import './Navbar.scss'
import logonegre from '../../assets/lemonadeLogo.png'
const Navbar = () => {
  const windowSize = window.innerWidth
  const [showNav, setShowNav] = useState(false)
  const [navClass, setNavClass] = useState('')

  const handleClick = () => {
    setShowNav(!showNav)
    if (showNav === true) {
      setNavClass('show-nav')
      console.log('set')
    } else {
      setNavClass('')
      console.log('notset')
    }
  }
  return (
    <div>
      {windowSize > 1000 ? (
        <div className="navbar">
          {/* <img src={lemon} alt="" /> */}
          <img height="70px" src={logonegre}></img> <h1></h1>
          <ul>
            <li>
              <a href="#mint">Home</a>
            </li>
            <li>
              <a href="#savings">Savings</a>
            </li>
            <li>
              <a href="#farms">Farms</a>
            </li>
            <li>
              <a href="#lotto">Lottery</a>
            </li>
            {/* <li>
              <a href="#market">Markets</a>
            </li> */}
            <li>
              <a href="#gauge">Vaults</a>
            </li>
            <li>
              <a
                href="https://firebasestorage.googleapis.com/v0/b/lemon-network.appspot.com/o/ICO%2FLEMON%20White%20Paper.pdf?alt=media"
                target="_blank"
              >
                Docs
              </a>
            </li>
          </ul>
          <button>LAUNCH APP</button>
        </div>
      ) : (
        <div className="navbar">
          <button className="navbar-open" onClick={handleClick}>
            <div>
              <div
                style={{
                  width: '14px',
                  background: 'white',
                  height: '3px',
                  borderRadius: '50px',
                  marginBottom: '4px',
                }}
              ></div>
              <div
                style={{
                  width: '20px',
                  background: 'white',
                  height: '3px',
                  borderRadius: '50px',
                  marginBottom: '4px',
                }}
              ></div>
              <div
                style={{
                  width: '8px',
                  background: 'white',
                  height: '3px',
                  borderRadius: '50px',
                }}
              ></div>
            </div>
          </button>
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <ul className={navClass}>
              <li>
                <a href="#mint">Mint</a>
              </li>
              <li>
                <a href="#savings">Savings</a>
              </li>
              <li>
                <a href="#farms">Farms</a>
              </li>
              <li>
                <a href="#lmn">Lottories</a>
              </li>
              {/* <li>
                <a href="#market">Markets</a>
              </li> */}
              <li>
                <a href="#gauge">Gauges</a>
              </li>
              <li>
                <a href="">Docs</a>
              </li>
            </ul>
          </nav>
          <h1>LEMONADE</h1>
          <button className="know-btn">
            <div>.</div>
            <div>.</div>
            <div>.</div>
          </button>
        </div>
      )}
    </div>
  )
}

export default Navbar
