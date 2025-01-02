import { useEffect, useState } from "react"

export default function Timer({ callback }: { callback: () => void }) {
  const [active, setActive] = useState(true)
  const [min, setMin] = useState(2)
  const [sec, setSec] = useState(0)
  const padding = (num) => num < 10 ? `0${num}` : num

  useEffect(() => {
    const handle = setInterval(() => {
      const totalSecond = min * 60 + sec - 1;
      const newSec = totalSecond % 60;
      const newMin = Math.floor(totalSecond / 60);

      setMin(newMin);
      setSec(newSec)

      if (totalSecond === 0) {
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
  }, [callback, min, sec, active])

  return (
    <div className="count-down-timer">
      <span className="min">{padding(min)}</span> : <span className="sec">{padding(sec)}</span>
    </div>
  )
}