import { useContext } from 'react';
import './App.css';
import Board from './components/Board';
import Score from './components/Scores';
import State from './context/state';
function App() {
  
  return (
    < >
    <State>
     <Score/>
     <Board/>
     </State>
    </>
  );
}

export default App;
