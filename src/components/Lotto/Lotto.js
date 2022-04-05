import React, { useState, useEffect } from 'react'

import './Lotto.scss'
// import Timer from '../Timer/Timer'
import LottoWinners from './LottoWinners/LottoWinners'
import avatar from '../../assets/lemonade.svg'
import EWT from '../../assets/EWT.png'
import networkLogo from '../../assets/lemon-network.png'
import dots from '../../assets/dots.png'
import '../Timer/Timer.scss'

import ScrollContainer from 'react-indiana-drag-scroll'

import { ToastContainer, toast } from 'react-toastify'
import Web3 from 'web3'

import LMNLotto from '../../abis/LMNLotto.json'

import ticketLogo from '../../assets/ticket-green.png'
import { Accounts } from 'web3-eth-accounts'

const Lotto = () => {
  const [jackPot, setJackPot] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [now, setNow] = useState(0)
  const [purchasedTickets, setPurchasedTickets] = useState(0)
  const [purchasing, setPurchasing] = useState(false)

  const LMNLottoAddress = '0x9Af93a8330069743Ff2c5c4466cAc1433EF1d9D7'

  const purchaseNotifyModal = (nPurchased) =>
    toast.success(` You purchased ${nPurchased} LMN Lottery Ticket!`, {
      icon: <img src={networkLogo} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const errorNotifyModal = () =>
    toast.error(`Something went wrong`, {
      icon: <img src={networkLogo} alt="" />,
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  const getBlockData = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const Lotto = new web3.eth.Contract(LMNLotto.abi, LMNLottoAddress)

          const now = new Date()
          let _now = now.setSeconds(now.getSeconds())
          setNow(_now)

          try {
            let jack = await Lotto.methods.lmnLottoPot().call()
            jack = web3.utils.fromWei(jack).toString() + '.00'
            setJackPot(jack)
            let end = await Lotto.methods.endTime().call()
            setEndTime(end)

            const purchasedTickets = await Lotto.methods
              .purchasedTickets(accounts[0])
              .call({
                from: accounts[0],
              })

            setPurchasedTickets(purchasedTickets)
          } catch (e) {
            console.log(e.toString())
          }
        })
      } catch (e) {
        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  const calculateTimeLeft = () => {
    let year = 2022
    let difference = +new Date(endTime * 1000) - +new Date()

    if (difference < 0) {
      difference = 0
    }

    let timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  const leftDays = timeLeft.days,
    days = [],
    sDays = leftDays.toString()
  for (let i = 0, len = sDays.length; i < len; i += 1) {
    days.push(+sDays.charAt(i))
  }

  const leftHours = timeLeft.hours,
    hours = [],
    sHours = leftHours.toString()
  for (let i = 0, len = sHours.length; i < len; i += 1) {
    hours.push(+sHours.charAt(i))
  }

  const leftMins = timeLeft.minutes,
    mins = [],
    sMins = leftMins.toString()
  for (let i = 0, len = sMins.length; i < len; i += 1) {
    mins.push(+sMins.charAt(i))
  }

  const leftSeconds = timeLeft.seconds,
    seconds = [],
    sSeconds = leftSeconds.toString()
  for (let i = 0, len = sSeconds.length; i < len; i += 1) {
    seconds.push(+sSeconds.charAt(i))
  }

  const purchase1 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const Lotto = new web3.eth.Contract(LMNLotto.abi, LMNLottoAddress)

          await Lotto.methods.buy1().send({
            from: accounts[0],
            value: web3.utils.toWei('1'),
          })

          await getBlockData()
          purchaseNotifyModal(1)
          setPurchasing(false)

          //   setTimeout(() => {
          //     window.location.reload(false)
          //   }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()
        setPurchasing(false)

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }
  const purchase5 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const Lotto = new web3.eth.Contract(LMNLotto.abi, LMNLottoAddress)

          await Lotto.methods.buy5().send({
            from: accounts[0],
            value: web3.utils.toWei('5'),
          })
          await getBlockData()
          setPurchasing(false)

          purchaseNotifyModal(5)
          //   setTimeout(() => {
          //     window.location.reload(false)
          //   }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()
        setPurchasing(false)

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }
  const purchase10 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)

      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const Lotto = new web3.eth.Contract(LMNLotto.abi, LMNLottoAddress)

          await Lotto.methods.buy10().send({
            from: accounts[0],
            value: web3.utils.toWei('10'),
          })
          await getBlockData()
          setPurchasing(false)

          purchaseNotifyModal(10)
          //   setTimeout(() => {
          //     window.location.reload(false)
          //   }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()
        setPurchasing(false)

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }
  const purchase20 = async () => {
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      try {
        window.ethereum.enable().then(async function () {
          // User has allowed account access to DApp...
          const netId = await web3.eth.net.getId()
          const accounts = await web3.eth.getAccounts()

          const Lotto = new web3.eth.Contract(LMNLotto.abi, LMNLottoAddress)

          await Lotto.methods.buy20().send({
            from: accounts[0],
            value: web3.utils.toWei('20'),
          })
          await getBlockData()

          purchaseNotifyModal(20)
          setPurchasing(false)

          //   setTimeout(() => {
          //     window.location.reload(false)
          //   }, 4500)
          // window.location.reload(false);
        })
      } catch (e) {
        errorNotifyModal()
        setPurchasing(false)

        console.log('OMG ...')
      }

      //load contracts
    } else {
      window.alert('Please install MetaMask')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  useEffect(async () => {
    await getBlockData()
  }, [])

  return (
    <div className="lotto">
      <br></br>
      <br></br>
      <br></br>
      <div className="lotto-hero">
        <div className="ticket-below">
          <i>
            <span style={{ marginRight: '10px' }}>
              {' '}
              1<img src={ticketLogo} alt="" />{' '}
            </span>
            <span>
              = 1 <img src={EWT} alt="" />
            </span>
          </i>
        </div>
        <div className="lotto-hero-container">
          {purchasedTickets != 0 ? (
            <span className="lotto-ticket-show">
              LMN Tickets : {purchasedTickets}
              {'  '}
              <img src={ticketLogo} alt="" />
            </span>
          ) : (
            <span></span>
          )}
          <span className="lotto-dolar">$ {jackPot * 6}</span>
          <span className="title">Lemonade Lotto</span>
          <span className="number">
            {jackPot} <img src={EWT} height="50px" width="50px" alt="" />
          </span>
          <span className="prize">Jack Pot Prize!</span>
          <span className="timer-text">Will be awarded in</span>
          {endTime == 0 ? (
            <div></div>
          ) : (
            <div className="timer" data-date="2022/08/02">
              <div className="time-display">
                <div className="time-container">
                  {days.map((day) => (
                    <span className="time-number">
                      {timeLeft.days < 10 ? (
                        <div>
                          <span>0</span> <span>{day}</span>
                        </div>
                      ) : (
                        <span>{day}</span>
                      )}
                    </span>
                  ))}
                </div>
                <font color="grey">days</font>
              </div>
              <div className="time-display">
                <div className="time-container">
                  {hours.map((hour) => (
                    <span className="time-number">
                      {timeLeft.hours < 10 ? (
                        <div>
                          <span>0</span> <span>{hour}</span>
                        </div>
                      ) : (
                        <span>{hour}</span>
                      )}
                    </span>
                  ))}
                </div>
                <font color="grey">hours</font>
              </div>
              <span className="first-dots">
                <img src={dots} alt="" />
              </span>
              <div className="time-display">
                <div className="time-container">
                  {mins.map((min) => (
                    <span className="time-number">
                      {timeLeft.minutes < 10 ? (
                        <div>
                          <span>0</span> <span>{min}</span>
                        </div>
                      ) : (
                        <span>{min}</span>
                      )}
                    </span>
                  ))}
                </div>
                <font color="grey">minutes</font>
              </div>
              <span className="dots">
                <img src={dots} alt="" />
              </span>
              <div className="time-display ">
                <div className="time-container">
                  {seconds.map((second) => (
                    <span className="time-number">
                      {timeLeft.seconds < 10 ? (
                        <div>
                          <span>0</span> <span>{second}</span>
                        </div>
                      ) : (
                        <span>{second}</span>
                      )}
                    </span>
                  ))}
                </div>
                <font color="#959595"> seconds</font>
              </div>
            </div>
          )}{' '}
          <div className="lotto-input">
            {purchasing == true ? (
              <div className="ticket-count">
                <button style={{ background: 'grey' }}>1x</button>
                <button style={{ background: 'grey' }}>5x</button>
                <button style={{ background: 'grey' }}>10x</button>
                <button style={{ background: 'grey' }}> 20x</button>
              </div>
            ) : (
              <div className="ticket-count">
                <button
                  onClick={async (e) => {
                    setPurchasing(true)
                    await purchase1()
                  }}
                >
                  1x
                </button>
                <button
                  onClick={async (e) => {
                    setPurchasing(true)
                    await purchase5()
                  }}
                >
                  5x
                </button>
                <button
                  onClick={async (e) => {
                    setPurchasing(true)
                    await purchase10()
                  }}
                >
                  10x
                </button>
                <button
                  onClick={async (e) => {
                    setPurchasing(true)
                    await purchase20()
                  }}
                >
                  20x
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Lotto
