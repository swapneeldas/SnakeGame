import { useContext } from 'react';
import './App.css';
import Board from './components/Board';
import Score from './components/Scores';
import State from './context/state';
import GameOver from './components/GameOver';
function App() {
  
  return (
    < >
    <State>
     <GameOver/>
     <Score/>
     <Board/>
     </State>
    </>
  );
}

export default App;
