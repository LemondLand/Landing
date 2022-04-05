import React, { useEffect } from 'react'
import './LMN.scss'
import lemon from '../../assets/lemon-logo.svg'
import Aos from 'aos'
import wheel from '../../assets/btn-wheel.svg'
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
            <span>LMN Staking</span>
          </div>
          <span>Earn interest over your LMN </span>
          <p>
            Lemonade enables investors to earn <br /> profits from staking their
            LMN. Our Lemon <br /> Protocol allows LMN Holders to Earn <br />{' '}
            passive income with the Governance <br /> token of Lemon Network.{' '}
            <br /> <br /> <i>Make Lemonade with your Lemons.</i>
          </p>
          <button>
            <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
              Launch App <img src={wheel} alt="" />
            </div>
          </button>
        </div>
        <div className="savings-right">
          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img src={lemon} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="coin-box-center">
              <i>
                <span>7 Days Lock </span>
              </i>
            </div>
            <div className="coin-box-right">
              <span>2.5%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-right" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img src={lemon} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="coin-box-center">
              <i>
                <span>14 Days Lock </span>
              </i>
            </div>
            <div className="coin-box-right">
              <span>6.5%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img src={lemon} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="coin-box-center">
              <i>
                <span>30 Days Lock </span>
              </i>
            </div>
            <div className="coin-box-right">
              <span>14%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-right" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img src={lemon} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="coin-box-center">
              <i>
                <span>60 Days Lock </span>
              </i>
            </div>
            <div className="coin-box-right">
              <span>35%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-left" className="coin-box">
            <div className="coin-box-left">
              <div className="coin-logo">
                <img src={lemon} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="coin-box-center">
              <i>
                <span>120 Days Lock </span>
              </i>
            </div>
            <div className="coin-box-right">
              <span>70%</span>
              <span>APY</span>
            </div>
          </div>
          <div className="coin-box-right1">
            <i>
              {' '}
              <span>
                {' '}
                *The actual APY’s are provisional, before LEMONADE Launch
              </span>
            </i>
          </div>
          {/* <button data-aos='fade-up'>
						<div>Calculate</div>
					
					</button> */}
        </div>
      </div>
    </div>
  )
}

export default Savings
