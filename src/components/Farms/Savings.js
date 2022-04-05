import React, { useEffect } from 'react'
import './Savings.scss'
import swipe from '../../assets/swipe-sxp-logo.png'
import LMN from '../../assets/lemon-logo.svg'
import LMD from '../../assets/lemonade.svg'
import EWT from '../../assets/EWT.png'
import USDT from '../../assets/USDT.png'
import wheel from '../../assets/btn-wheel.svg'
import Aos from 'aos'
import 'aos/dist/aos.css'
const Savings = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <div className="savings-container">
      <div className="savings">
        <div className="savings-left">
          <div className="savings-title">
            <div className="title-line"></div>
            <span>Farms</span>
          </div>
          <span>Earn with Lemon Network Farms</span>
          <p>
            In the new ecosystem we are building we <br /> want to reward our
            Lemon Liquidity <br /> Providers. Provide liquidity to a pair and{' '}
            <br /> get rewarded from all Lemonade Trades. <br /> Grow with Lemon
            Network, helping us <br /> grow is a way to grow your investment.{' '}
            <br />
            <br /> <i>Earn while earning</i>
          </p>
          <button>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
              Launch App <img src={wheel} alt="" />
            </div>
          </button>
        </div>
        <div className="savings-right">
          <div data-aos="fade-right" className="coin-box">
            <div className="coin-box-left">
              <div style={{ display: 'flex' }} className="coin-logo">
                <img className="first-icon" src={LMN} alt="" />
                <img className="second-icon" src={LMD} alt="" />
              </div>
              <div className="coin-name">
                <span>LMN - LMD</span>
                <span>Lemon - Lemonade LP</span>
              </div>
            </div>
            <div className="coin-box-right">
              <span>79%</span>
              <span>APY</span>
            </div>
          </div>

          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img
                  className="first-icon"
                  style={{ width: '45px' }}
                  src={LMD}
                  alt=""
                />
                <img className="second-icon" src={EWT} alt="" />
              </div>
              <div className="coin-name">
                <span>LMD - EWT</span>
                <span>Lemonade - Energy Web Token LP</span>
              </div>
            </div>
            <div className="coin-box-right">
              <span>65%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img className="first-icon" src={LMN} alt="" />
                <img className="second-icon" src={EWT} alt="" />
              </div>
              <div className="coin-name">
                <span>LMN - EWT</span>
                <span>Lemon - Energy Web Token LP</span>
              </div>
            </div>
            <div className="coin-box-right">
              <span>35%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img className="first-icon" src={LMN} alt="" />
                <img className="second-icon" src={USDT} alt="" />
              </div>
              <div className="coin-name">
                <span>LMN - USDT</span>
                <span>Lemon - USDT LP</span>
              </div>
            </div>
            <div className="coin-box-right">
              <span>20%</span>
              <span>APY</span>
            </div>
          </div>
          <div className="coin-box-right1">
            <i>
              <span>
                {' '}
                *The actual APY’s are provisional, before LEMONADE Launch
              </span>
            </i>
          </div>
          {/* <button data-aos='fade-up'>
						<div>CALCULATE</div>
					</button> */}
        </div>
      </div>
    </div>
  )
}

export default Savings
