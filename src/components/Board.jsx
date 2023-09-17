import React, { useContext, useEffect } from 'react'
import Context from '../context/context';
const Board = () => {
  let context=useContext(Context);
  // console.log(context);
  let {matrix,setmatrix,snakearray,setsnakearray,foodlocation,started,setstarted,setsnakedirection}=context;
  useEffect(()=>{
    document.addEventListener("keydown",detectKey,true)
  },[])
  const detectKey=(e)=>{
    // if(!started){
    //   setstarted(!started);
    // }
    console.log(e.key);
    setsnakedirection(e.key);
  }
  return (
    <div className='boarddiv flex justify-center items-center mt-28 relative -z-[50] '>
    <div>
        <div className='header'><p className='text-yellow-300 text-4xl text-center font-bold'>Snake Game</p></div>
        {/* <div className='Gameover flex justify-center items-center h-[80vmin] w-[80vmin] bg-transparent absolute top-[-50%] -z-[40]'><p className='text-yellow-400 font-bold text-3xl'>Game Over</p></div> */}
        <div className='board h-[80vmin] w-[80vmin]
         bg-black grid grid-cols-12  border-cyan-800 border-[6px] max-sm:border-4'>
          {
           matrix.map((element,index)=>{
            return(
             element.map((ele,i)=>{
              let position={x:index,y:i};

              //*SNAKE HEAD

              if(JSON.stringify(position) === JSON.stringify(snakearray[0])){
                return (<div key={`snakehead${index},${i}`} className='bg-green-400 rounded-full'></div>);
              }

              //*Food

              if(JSON.stringify(foodlocation)===JSON.stringify(position)){
                return (<div key={`food${index},${i}`} className='bg-red-800 rounded-full m-1'></div>);
              }
              //*Other snake part
              for(let i=1;i<snakearray.length;i++){
                if(JSON.stringify(position)===JSON.stringify(snakearray[i])){
                  return (<div key={`snakebody${index},${i}`} className='bg-green-400 rounded-[20%] m-[2px]'></div>);
                }
              }
              return (<div key={`box${index},${i}`} className='bg-black'></div>);
             })
            )
           })
          }
         </div>
    </div>
    </div>
  )
}

export default Board;