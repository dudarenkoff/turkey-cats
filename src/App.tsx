import { useEffect, useState } from 'react'
import './App.css';

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
      <main>
        <h1>Как долго кiты в Турции:</h1>
        
        <div className="App__container container">
          <p>дней: <b>{timer.days}</b></p>
          <p>часов: <b>{timer.hours}</b></p>
          <p>минут: <b>{timer.minutes}</b></p>
          <p>секунд: <b>{timer.seconds}</b></p>
        </div>
      </main>
    </div>
  )
}

export default App;
