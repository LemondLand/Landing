import React, { useEffect, useState } from 'react'
import './Savings.scss'
import lemonade from '../../assets/lemon-logo.svg'
import EWT from '../../assets/ewt-logo.svg'
import EWD from '../../assets/EWD.png'

import wheel from '../../assets/btn-wheel.svg'
import lamanade from '../../assets/lamanade.png'
import SUSU from '../../assets/susu.png'
import Aos from 'aos'
import 'aos/dist/aos.css'
import LMN from '../../assets/lemonade.svg'

const Savings = () => {
  const windowSize = window.innerWidth
  const [flexDirection, setFlexDirection] = useState('row-reverse')

  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])
  return (
    <div style={{ background: 'white' }} className="savings-container">
      <div className="savings-middle">
        <div className="savings-left" style={{ textAlign: 'right' }}>
          <div style={{ justifyContent: 'flex-end' }} className="savings-title">
            <div className="title-line"></div>
            <span>Savings</span>
          </div>
          <span>Earn interest on your assets</span>
          <p style={{ textAlign: 'right' }}>
            Lemonade is not only focused on lemonade <br /> investors, stake
            your ERC-20 and earn from <br /> supporting Lemonade, easily manage{' '}
            <br /> your staking with nearly no Fee <br /> for operating over
            your portfolio.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button>
              <div style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>
                Launch App <img src={wheel} alt="" />
              </div>
            </button>
          </div>
        </div>
        <div className="savings-right" style={{ alignItems: 'flex-end' }}>
          <div data-aos="fade-left" className="savings-coin-box">
            <div className="savings-coin-box-left">
              <div className="coin-logo">
                <img src={LMN} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemonade</span>
                <span>LMD</span>
              </div>
            </div>
            <div className="savings-coin-box-right">
              <span>87%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-right" className="savings-coin-box">
            <div className="savings-coin-box-left">
              <div className="coin-logo">
                <img src={lemonade} style={{width:"250px"}} alt="" />
              </div>
              <div className="coin-name">
                <span>Lemon</span>
                <span>LMN</span>
              </div>
            </div>
            <div className="savings-coin-box-right">
              <span>25%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-right" className="savings-coin-box">
            <div className="savings-coin-box-left">
              <div className="coin-logo">
                <img src={EWT} alt="" />
              </div>
              <div className="coin-name">
                <span>Energy Web Token</span>
                <span>EWT</span>
              </div>
            </div>
            <div className="savings-coin-box-right">
              <span>10%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-right" className="savings-coin-box">
            <div className="savings-coin-box-left">
              <div className="coin-logo">
                <img src={SUSU} alt="" />
              </div>
              <div className="coin-name">
                <span>Susu Token</span>
                <span>SUSU</span>
              </div>
            </div>
            <div className="savings-coin-box-right">
              <span>3.5%</span>
              <span>APY</span>
            </div>
          </div>
          <div data-aos="fade-left" className="savings-coin-box">
            <div className="savings-coin-box-left">
              <div className="coin-logo">
                <img src={EWD} alt="" />
              </div>
              <div className="coin-name">
                <span>Energy Web Doge</span>
                <span>EWD</span>
              </div>
            </div>
            <div className="savings-coin-box-right">
              <span>2%</span>
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
						<div>CALCULATE</div>
					</button> */}
        </div>
      </div>
    </div>
  )
}

export default Savings
