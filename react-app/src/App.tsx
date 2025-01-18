import './App.css';
import Board from './game';
import bannerImage from './banner.png';
import { useContext, useEffect, useRef, useState } from 'react';
import Button from './game/button';
import { createContext } from 'react';
import { AlertMessage } from './game/alertMessage';
const API_URL = 'http://localhost:3000/up';

export const GlobalContext = createContext<{
  setAlertMessage: React.Dispatch<React.SetStateAction<object>>,
  gameStarted: boolean,
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>
}>(null);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ msg: '', type: 'primary' });
  const global = {
    setAlertMessage,
    gameStarted,
    setGameStarted,
  }

  let retryCount = useRef(0);
  let timer = useRef<NodeJS.Timeout>(null);

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
        <div className="game col-lg-6 offset-lg-3" style={gameStyle}>
          <DarkModeSwitch />
          <Header />
          <AlertMessage alertMessage={alertMessage.msg} type={alertMessage.type} />
          <GlobalContext.Provider value={global}>
            {
              isLoading ? <div className='text-center'>Loading...</div> :
                gameStarted &&
                <Board />
            }
            <Home onStart={handleRestart} onRestart={handleRestart} />
          </GlobalContext.Provider>
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

function Home({ onStart, onRestart }: { onStart: () => void, onRestart: () => void }) {
  const global = useContext(GlobalContext);
  const gameStarted = global.gameStarted;
  return (
    <div className='my-5'>
      {
        gameStarted ? <Button onClick={onRestart}>Restart New Game</Button> :
          <Button onClick={onStart}>Start New Game</Button>
      }
    </div>
  )
}

export default App;


