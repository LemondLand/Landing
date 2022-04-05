import React, { useState } from 'react'
import './Market.scss'
import LMN from '../../assets/lemon-logo.svg'
import EWT from '../../assets/EWT.png'
import FindUs from './FindUs/FindUs'
import Select from 'react-select'
import LMD from '../../assets/lemonade.svg'
const Market = () => {
  const circleWidth = window.innerWidth > 1000 ? '' : '250px'
  const options = [
    {
      value: 'EWT',
      label: (
        <div>
          <img src={EWT} style={{ width: '32px', marginRight: '5px' }} />
          EWT{' '}
        </div>
      ),
    },
    {
      value: 'LMN',
      label: (
        <div>
          <img src={LMN} style={{ width: '32px', marginRight: '5px' }} />
          LMN{' '}
        </div>
      ),
    },
    {
      value: 'BTC',
      label: (
        <div>
          <img src={LMD} style={{ width: '32px', marginRight: '5px' }} />
          LMD{' '}
        </div>
      ),
    },
  ]
  const customTheme = (theme) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        neutral20: '#60DF00',
      },
    }
  }
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      minHeight: '70px',
      height: '70px',
      width: circleWidth,
      borderRadius: '15px',
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '70px',
      padding: '0 6px',
    }),

    input: (provided, state) => ({
      ...provided,
      marginLeft: '0px',
    }),
    indicatorSeparator: (state) => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '70px',
    }),
  }
  const [isOpened, setIsOpened] = useState(false)
  const [optClass, setOptClass] = useState('opt')
  const [selectedCoin, setSelectedCoin] = useState('XVS')
  const [selectedCoinIcon, setSelectedCoinIcon] = useState()
  const handleClick = () => {
    setIsOpened(!isOpened)
    if (isOpened === true) {
      setOptClass('opt-open')
    } else {
      setOptClass('opt')
    }
  }
  const handleCoinClick = (e) => {
    setOptClass('opt')
    setSelectedCoin(e.target.innerText)
    setSelectedCoinIcon(e.target.innerText)
    console.log(e.target.value)
    console.log(selectedCoinIcon)
    console.log(selectedCoin)
  }
  return (
    <div className="market-container">
      <div className="market">
        {/* <div className='market-header'>
					<div className='market-title'>
						<div className='title-line'></div>
						<span>Market</span>
					</div>
					<span>The most updated and accurate knowledge</span>
				</div>
				<div className='market-display'>
					<div className='market-display-select-section'>
						<div className='market-display-select-container'>
							<Select
								components={{
									IndicatorSeparator: () => null,
								}}
								options={options}
								theme={customTheme}
								height='70px'
								width='200px'
								defaultValue={{
									label: (
										<div>
											<img
												src={EWT}
												style={{ width: "32px", marginRight: "5px" }}
											/>
											EWT{" "}
										</div>
									),
									value: "AAA"
								}}
								styles={customStyles}
							/>
						</div>
					</div>
					<div className='market-display-info'>
						<div className='inf1'>
							<span>Total Supply</span>
							<span>$163,424,193.13</span>
						</div>
						<div className='inf1'>
							<span>Number of Suppliers</span>
							<span>13648</span>
						</div>
						<div className='inf1'>
							<span>Total Borrowed</span>
							<span>$10,079,470.72</span>
						</div>
						<div className='inf1'>
							<span>Number of Borrowers</span>
							<span>88</span>
						</div>
						<div className='inf1'>
							<span>Token Address</span>
							<span className="token-adress">0x26a12338b1b7934c94afba7d</span>
						</div>
					</div>
				</div> */}
        <FindUs />
      </div>
    </div>
  )
}

export default Market
