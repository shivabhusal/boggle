// import logo from './logo.svg';
import './App.css';
import Board from './game';
import bannerImage from './banner.png';
import { useEffect, useRef, useState } from 'react';
const API_URL = 'http://localhost:3000/up';

function App() {
  const [isLoading, setIsLoading] = useState(true);
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
      <Header />
      {
        isLoading ? <div className='text-center'>Loading...</div> : <Board />
      }

    </div>
  );
}

function Header() {

  return (
    <header>
      <img src={bannerImage} alt="" className='w-100' />
      <h1>Boggle game</h1>
    </header>
  )
}
export default App;
