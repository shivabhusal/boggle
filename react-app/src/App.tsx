// import logo from './logo.svg';
import './App.css';
import Board from './game';
import bannerImage from './banner.png';
import { useEffect, useRef, useState } from 'react';
const API_URL = 'http://localhost:3000/up';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
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

      return (() => {
        clearInterval(timer.current)
      })
    }, 1000)

  }, [isLoading])

  return (
    <div className='container'>
      <div className='container'>
        <div className="row">
          <div className="game col-md-6 offset-md-3">
            <Header />

            { isLoading && <div className='text-center'>Loading...</div> }
            { !isLoading && (gameStarted ? <Board /> : <Home onStart={()=> setGameStarted(true)} />) }
          </div>
        </div>
      </div>


    </div>
  );
}

function Header() {

  return (
    <header>
      <img src={bannerImage} alt="" className='w-100' />
    </header>
  )
}

function Home({onStart}: {onStart: () => void}) {
  return (
    <div className='my-5'>
      <button className='btn btn-primary' onClick={ onStart}>Start New Game</button>
    </div>
  )
}

export default App;
