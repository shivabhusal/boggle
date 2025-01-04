import { useEffect, useState, useRef } from "react"
const width = 150; // Width of the canvas
const height = 150; // Height of the canvas
const radius = 70; // Radius of the circular timer
const lineWidth = 10; // Width of the circle's stroke
const padding = (num: number) => num < 10 ? `0${num}` : num

export default function Timer({ callback, seconds }: { callback: () => void, seconds?: number }) {
  // const [secRemaining, setSecRemaining] = useState(seconds)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const intervalRef = useRef<number>(0);
  const secRemaining = useRef(seconds);
  console.log('secRemaining', secRemaining.current)

  useEffect(() => {
  const canvas = canvasRef.current;

    if(canvas) drawTimer(secRemaining.current, seconds, canvas);

    intervalRef.current = setInterval(() => {
      secRemaining.current -= 1;
      drawTimer(secRemaining.current, seconds, canvas);
      if (secRemaining.current < 1) {
        clearInterval(intervalRef.current)
        callback()
      }
    }, 1000)
    console.log('intervalRef.current', intervalRef.current)
    

    return () => {
      clearInterval(intervalRef.current)
    }
  }, [callback, seconds])

  return (
    <div className="count-down-timer">
      <canvas id="countdown" width={width} height={height} ref={canvasRef} />
      {/* <span className="min">{padding(min)}</span> : <span className="sec">{padding(sec)}</span> */}
    </div>
  )
}


function drawTimer(currentTime: number, seconds: number, canvas: HTMLCanvasElement) {
  const min = Math.floor(currentTime / 60)
  const sec = currentTime % 60
  const ctx = canvas.getContext('2d');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background circle
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = '#e0e0e0';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  // Draw progress circle
  const endAngle = -0.5 * Math.PI + (2 * Math.PI * currentTime) / seconds;
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, radius, Math.PI - endAngle, 1.5 * Math.PI, false);
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = lineWidth;
  ctx.stroke();

  ctx.font = '30px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center'; // Centers text horizontally
  ctx.textBaseline = 'middle'; // Centers text vertically
  ctx.fillText(`${padding(min)}: ${padding(sec)}`, canvas.width / 2, canvas.height / 2);
}