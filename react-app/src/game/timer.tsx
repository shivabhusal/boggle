import { useEffect, useState, useRef } from "react"
const width = 150; // Width of the canvas
const height = 150; // Height of the canvas
const radius = 70; // Radius of the circular timer
const lineWidth = 10; // Width of the circle's stroke
const padding = (num: number) => num < 10 ? `0${num}` : num

export default function Timer({ callback, seconds }: { callback: () => void, seconds?: number }) {
  const [currentTime, setCurrentTime] = useState(seconds || 60);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const callbackRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawTimer(currentTime, seconds || 60, canvasRef.current);

    const interval = setInterval(() => {
      console.log('interval')
      if (currentTime === 0) {
        clearInterval(interval);
        if (callbackRef.current === 0) {
          callback();
          callbackRef.current = 1;
        }
      } else {
        setCurrentTime(currentTime - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [callback, currentTime, seconds]);

  return (
    <canvas id="countdown-timer" width={width} height={height} ref={canvasRef} />
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
  ctx.fillStyle = "rgba(2, 2, 2, 0.4)";
  ctx.fill()
  ctx.strokeStyle = '#ec5555';
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
  ctx.fillText(`${padding(min)} : ${padding(sec)}`, canvas.width / 2, canvas.height / 2);
}
