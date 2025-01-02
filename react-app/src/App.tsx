// import logo from './logo.svg';
import './App.css';
import Board from './board';
import bannerImage from './banner.png';

function App() {
  return (
    <div className='container'>
      <Header/>
      <Board/>
    </div>
  );
}

function Header(){

  return(
    <header>
      <img src={bannerImage} alt="" className='w-100' />
      <h1>Boggle game</h1>
      </header>
  )
}
export default App;
