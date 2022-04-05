import React, { useEffect, useState } from 'react'
import { useTimer } from 'react-timer-hook'

function LemonNetworkTimer({ dateDeposit, dateWithdraw }) {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear()
    let difference
    let difference1 = +new Date(dateDeposit * 1000) - +new Date() //* 1643669999
    let difference2 = +new Date(dateWithdraw * 1000) - +new Date() //* 1672527600

    if (difference1 >= 0) {
      difference = difference1
    } else if ((difference1 < 0) & (difference2 >= 0)) {
      difference = difference2
    } else {
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

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
  })

  return (
    <div
      className=" d-flex justify-content-between "
      style={{ width: '50%', fontSize: '2.5rem', color: '#7fd705' }}
      data-date="2021/08/10"
    >
      <div
        className="d-flex flex-column align-items-center"
        style={{ fontSize: '1rem' }}
      >
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {timeLeft.days < 10 ? '0' + timeLeft.days : timeLeft.days}
        </span>
        <font color="grey">Days</font>
      </div>
      :
      <div
        className="d-flex flex-column align-items-center"
        style={{ fontSize: '1rem' }}
      >
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {timeLeft.hours < 10 ? '0' + timeLeft.hours : timeLeft.hours}
        </span>
        <font color="grey">Hours</font>
      </div>
      :
      <div
        className="d-flex flex-column align-items-center"
        style={{ fontSize: '1rem' }}
      >
        <span style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          {timeLeft.minutes < 10 ? '0' + timeLeft.minutes : timeLeft.minutes}
        </span>
        <font color="grey">Minutes</font>
      </div>
      :
      <div
        className="d-flex flex-column align-items-center "
        style={{ fontSize: '1rem' }}
      >
        <span
          style={{ fontSize: '2.5rem', fontWeight: 'bold' }}
          className="d-flex align-items-center justify-content-center"
        >
          {timeLeft.seconds < 10 ? '0' + timeLeft.seconds : timeLeft.seconds}
        </span>
        <font color="grey"> Seconds</font>
      </div>
    </div>
  )
}

export default LemonNetworkTimer
