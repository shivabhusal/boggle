// import logo from './logo.svg';
import './App.css';
import Board from './board';

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
    <header><h1>Boggle game</h1></header>
  )
}
export default App;
