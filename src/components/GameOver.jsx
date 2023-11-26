import React, { useContext } from 'react'
import Context from '../context/context'
const GameOver = () => {
  let context=useContext(Context);
  let {gameover}=context;
  return (
    <div className={`GameOverScreen absolute w-full h-[100vh] grid place-items-center top-0 ${(!gameover)&&'hidden'}`}>
    <div className='text-yellow-300'>
    <p className='text-center text-5xl'>GameOver</p>
    <p className='text-center text-4xl'>Press any key to start the Game</p>
    
    </div>
    </div>
  )
}

export default GameOver