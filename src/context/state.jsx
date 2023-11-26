import { useEffect, useRef, useState } from "react";
import Context from "./context";
const State=(props)=>{
   let [matrix,setmatrix]=useState(new Array(12).fill(new Array(12).fill(0)));
   let [Score,setScore]=useState(0);
   let [Hiscore,setHiscore]=useState(0);
   let [snakearray,setsnakearray]=useState([{x:5,y:5}]);
   let [foodlocation,setfoodlocation]=useState({x:4,y:4});
   let [started,setstarted]=useState(false);
   let [snakedirection,setsnakedirection]=useState(null);
   let [gameover,setgameover]=useState(false);
   

   let setinterval=useRef();
   function movesnake(){
    if(snakedirection!==null){
        let a=[...snakearray];
        if(snakedirection==="d"){
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].y=a[0].y+1;
            setsnakearray(a);
            
        }
        if(snakedirection==="w"){
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].x=a[0].x-1;
            setsnakearray(a);
            
        }
        if(snakedirection==="s"){
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].x=a[0].x+1;
            setsnakearray(a);
        }
        if(snakedirection==="a"){
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].y=a[0].y-1;
            setsnakearray(a);
        }
    
    }
   }
//    movement of snake 
   useEffect(()=>{
    if(gameover!==true){
    // movesnake();
   setinterval=setInterval(() => {
    movesnake();
    let snakesize=snakearray.length;
    let a=[...snakearray];
    for(let i=snakesize-1;i>0;i--){
        a[i]={...a[i-1]};
    }
}, 100);
}    
return ()=>{   
    clearInterval(setinterval)
};
   })


   useEffect(()=>{
    if(snakedirection!==null){
        if(!started){
        setstarted(true);
    }
    }

   },[snakedirection])


  function LengthIncrease(){
    let a=[...snakearray];
    let length=a.length;
    if(length>20){
        return;
    }
    a=[...snakearray,a[length-1]];
    setsnakearray(a);
  }
   //*food is eaten
   useEffect(()=>{
    //food eaten part
    if(JSON.stringify(snakearray[0])===JSON.stringify(foodlocation)){
        generatefood();
        setScore(Score+1);
        LengthIncrease();
    }
    //**gameover

    //*outside box
    if(snakearray[0].x>11 || snakearray[0].y>11 ||snakearray[0].x<0 || snakearray[0].y<0){
        // console.log('gameover');
        setgameover(true);
    }
    //*inside snake
    for(let i=2;i<snakearray.length;i++){
        if(JSON.stringify(snakearray[0])===JSON.stringify(snakearray[i])){
            setgameover(true);
        }}
   },[snakearray])
    
   //generating food logic
   function generatefood(){
    let foodloc={...foodlocation};
    let newposition;
    do{
        let xr=Math.floor((Math.random()*11));
        let yr=Math.floor((Math.random()*11));

        newposition={
            x:xr,
            y:yr
        }

    }while(foodisinsnake(newposition))
    console.log(newposition);
    setfoodlocation(newposition);
   }
   function foodisinsnake(position){
    for(let i=0;i<snakearray.length;i++){
        if(JSON.stringify(snakearray[i])===JSON.stringify(position)){
            return true;
        }
    }
    return false;
   }
   useEffect(
    ()=>{
    if(Score>Hiscore){
        setHiscore(Score);
        localStorage.setItem("Hiscoresnake",`${Score}`);
    }},[Score])

  useEffect(
    ()=>{
        if(gameover==false){
            setScore(0);
            setsnakearray([{x:5,y:5}]);
            setfoodlocation({x:4,y:4});
            setstarted(false);
            setsnakedirection(null);
            setgameover(false);
        }
    },[gameover])
 useEffect(
    ()=>{
        let hiS=localStorage.getItem("Hiscoresnake");
        if(hiS!=null){
            hiS=Number(hiS);
            setHiscore(hiS);
        }
    },
    []
 )
    return (
        <Context.Provider value={{matrix,setmatrix,snakearray,setsnakearray,foodlocation,started,setstarted,setsnakedirection,Score,Hiscore,gameover,setgameover}}>
        {props.children}
        </Context.Provider>
    )
}
export default State;