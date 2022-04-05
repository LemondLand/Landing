import React from 'react'
import './FindUs.scss'
import github from '../../../assets/github.png'
import facebook from '../../../assets/facebook.png'
import google from '../../../assets/google.png'
import twitter from '../../../assets/twitter.png'
import youtube from '../../../assets/youtube.png'
const FindUs = () => {
  return (
    <div className="find">
      <div className="find-title">
        <div className="title-line"></div>
        <span>Find Us</span>
        <div className="title-line"></div>
      </div>
      <div className="find-social">
        <a href="https://github.com/LemonNetwork" target="_blank">
          <div className="find-social-logo">
            <img src={github} alt="" />
          </div>
        </a>
        <a
          href="https://www.facebook.com/Lemon-Network-105840595212484"
          target="_blank"
        >
          <div className="find-social-logo">
            <img src={facebook} alt="" />
          </div>
        </a>
        <a
          href="https://www.google.com/search?q=lemon+network&rlz=1C5CHFA_enAD989AD989&oq=lemon+network&aqs=chrome..69i64j35i39l2j0i512l4j69i60.15071j0j7&sourceid=chrome&ie=UTF-8"
          target="_blank"
        >
          <div className="find-social-logo">
            <img src={google} alt="" />
          </div>
        </a>
        <a href="https://twitter.com/LMN_Network" target="_blank">
          <div className="find-social-logo">
            <img src={twitter} alt="" />
          </div>
        </a>
        <a
          href="https://www.youtube.com/channel/UCe6KLA8caJsRBI3Aqm-XHQg"
          target="_blank"
        >
          <div className="find-social-logo">
            <img src={youtube} alt="" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default FindUs
