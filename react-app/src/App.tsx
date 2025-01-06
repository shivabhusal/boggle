import './App.css';
import Board from './game';
import bannerImage from './banner.png';
import { useEffect, useRef, useState } from 'react';
import Button from './game/button';
const API_URL = 'http://localhost:3000/up';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const global: object = {
    setAlertMessage,
    gameStarted,
    setGameStarted,
  }

  let retryCount = useRef(0);
  let timer = useRef(0);

  useEffect(() => {
    // Call server to check status  
    timer.current = setInterval(() => {
      fetch(API_URL)
        .then(data => {
          console.log(data)
          setIsLoading(false)
          clearInterval(timer.current)

        }).catch(err => {
          console.log(err)
          setIsLoading(true)
        })
      if (retryCount.current++ === 3) {
        clearInterval(timer.current)
      }
    }, 1000)

    return (() => {
      clearInterval(timer.current)
    })
  }, [])

  const gameStyle = {
    borderRadius: "10px",
    background: "linear-gradient(145deg,rgb(248, 243, 243),rgb(204, 199, 199))",
    border: "1px solid #d9d9d9",
    padding: "20px",
    marginTop: "20px"
  }

  const handleRestart = () => {
    setGameStarted(false);
    setTimeout(() => setGameStarted(true), 500)
  }

  return (
    <div className='container'>
      <div className="row">
        <div className="game col-md-6 offset-md-3" style={gameStyle}>
          <DarkModeSwitch />
          <Header />
          {alertMessage && <div className="alert alert-primary mt-2" role="alert">{alertMessage}</div>}
          {
            isLoading ? <div className='text-center'>Loading...</div> :
              gameStarted && <Board />
          }
          <Home onStart={handleRestart} onRestart={handleRestart} global={global} />
        </div>
      </div>
    </div>
  );
}

function DarkModeSwitch() {
  const [darkMode, setDarkMode] = useState(false);
  document.body.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')

  useEffect(() => {
    if (window.matchMedia) {
      const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(matchMedia.matches ? true : false)
      matchMedia.addEventListener('change', e => {
        setDarkMode(e.matches ? true : false)
      })
    }
  }, [])

  return (
    <div className="form-check form-switch">
      <input className="form-check-input" checked={darkMode} type="checkbox" onChange={() => setDarkMode(!darkMode)} role="switch" id="flexSwitchCheckDefault" />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
    </div>
  )
}

function Header() {
  return (
    <header>
      <img src={bannerImage} alt="" className='w-100' />
    </header>
  )
}

function Home({ onStart, onRestart, global }: { onStart: () => void, onRestart: () => void, global: any }) {
  return (
    <div className='my-5'>
      {
        global.gameStarted ? <Button onClick={onRestart}>Restart New Game</Button> :
                <Button onClick={onStart}>Start New Game</Button>
          
      }
    </div>
  )
}

export default App;
