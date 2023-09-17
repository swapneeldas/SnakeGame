import React, { useContext } from 'react'
import Context from '../context/context'
const Score = () => {
  let context=useContext(Context);
   let{Score,Hiscore}=context;
  return (
    <div className='scoreboard absolute max-sm:right-5  right-11 top-5 text-white font-bold text-3xl max-sm:text-xl'>
        <p>HIGH SCORE:- {Hiscore} </p>
        <p>SCORE:- {Score}</p>
    </div>
  )
}

export default Score