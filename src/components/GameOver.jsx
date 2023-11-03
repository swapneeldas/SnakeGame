import React from 'react'

const GameOver = () => {
  return (
    <div className='GameOverScreen absolute w-full h-[100vh] grid place-items-center top-0'>
    <div className='text-yellow-300'>
    <p className='text-center text-5xl'>GameOver</p>
    <p className='text-center text-4xl'>Press any key to start the Game</p>
    
    </div>
    </div>
  )
}

export default GameOver