import { useEffect, useState } from "react"

export default function Timer({ callback, seconds }: { callback: () => void , seconds?: number }) {
  const [active, setActive] = useState(true)
  // const [min, setMin] = useState(2)
  // const [sec, setSec] = useState(0)
  const [secRemaining, setSecRemaining] = useState(seconds || 120)
  const padding = (num) => num < 10 ? `0${num}` : num
  const min = Math.floor(secRemaining / 60)
  const sec = secRemaining % 60
  
  useEffect(() => {
    const handle = setInterval(() => {
      // const totalSecond = secRemaining - 1;
      // const newSec = totalSecond % 60;
      // const newMin = Math.floor(totalSecond / 60);

      // setMin(newMin);
      // setSec(newSec)
      setSecRemaining(secRemaining - 1)
      if (secRemaining === 1) {
        setActive(false)
        callback()
      }
    }, 1000)

    if (!active) {
      clearInterval(handle)
    }
    return () => {
      clearInterval(handle)
    }
  }, [callback, active, secRemaining])

  return (
    <div className="count-down-timer">
      <span className="min">{padding(min)}</span> : <span className="sec">{padding(sec)}</span>
    </div>
  )
}