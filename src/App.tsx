import { useEffect, useState } from 'react'
import './App.scss'
import logo from './logo.png'

interface Timer {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function App() {
  const [timer, setTimer] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const getDifferenceTime = (dateStart: Date, dateEnd: Date): Timer => {
    const timeStart = dateStart.getTime()
    const timeEnd = dateEnd.getTime()
    const timeDifference = timeEnd - timeStart
    
    const getFloat = (num: number) => {
      return num >= 1 ? num % Math.floor(num) : num
    }

    /** milliseconds => seconds => minutes => hours => days */
    const days = timeDifference / (1000 * 60 * 60 * 24)
    const hours = getFloat(days) * 24
    const minutes = getFloat(hours) * 60
    const seconds = getFloat(minutes) * 60
    
    return {
      days: Math.floor(days),
      hours: Math.floor(hours),
      minutes: Math.floor(minutes),
      seconds: Math.floor(seconds)
    }
  }

  const dateStart = new Date(2022, 2, 5, 12, 42, 0)

  useEffect(() => {
    const interval = setInterval(() => {
      const timer = getDifferenceTime(dateStart, new Date())
      setTimer(timer)
    }, 1000);

    return () => clearInterval(interval);
  })

  return (
    <div className="App">
      <div className="App__container container">
        <img className="container__image" src={logo} alt="кiты в Турции в лого"/>

        <h1 className="container__title">Как долго кiты в Турции:</h1>

        <div className="container__wrap">
          <div className="container__element">
            <h2 className="container__sub-title">{timer.days}</h2>
            <h4 className="container__description">дней</h4>
          </div>

          <div className="container__element">
            <h2 className="container__sub-title">{timer.hours}</h2>
            <h4 className="container__description">часов</h4>
          </div>

          <div className="container__element">
            <h2 className="container__sub-title">{timer.minutes}</h2>
            <h4 className="container__description">минут</h4>
          </div>

          <div className="container__element">
            <h2 className="container__sub-title">{timer.seconds}</h2>
            <h4 className="container__description">секунд</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
