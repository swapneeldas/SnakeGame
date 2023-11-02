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
            let holder={...a[0]};
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].y=a[0].y+1;
            if(a[0]==a[1] ){
                setsnakedirection("a");
            }
            else{
            setsnakearray(a);
            }
        }
        if(snakedirection==="w"){

            let holder={...a[0]};
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].x=a[0].x-1;
            if(a[0]==a[1] ){
                setsnakedirection("s");
            }
            else{
            setsnakearray(a);
            }
        }
        if(snakedirection==="s"){
            let holder={...a[0]};
            let snakesize=snakearray.length;
            for(let i=snakesize-1;i>0;i--){
                a[i]={...a[i-1]};
            }
            a[0].x=a[0].x+1;
            if(a[0]==a[1] ){
                setsnakedirection("w");
            }
            else{
            setsnakearray(a);
            }
        }
        if(snakedirection==="a"){
            let holder={...a[0]};
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
    a=[...snakearray,a[length-1]];
    console.log(`increase snakearray length ${JSON.stringify(JSON.stringify(a))}`);
    setsnakearray(a);
  }
   //*food is eaten
   useEffect(()=>{
    //food eaten part
    if(JSON.stringify(snakearray[0])===JSON.stringify(foodlocation)){
        console.log("food eaten");
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
    }},[Score])
  

    return (
        <Context.Provider value={{matrix,setmatrix,snakearray,setsnakearray,foodlocation,started,setstarted,setsnakedirection,Score,Hiscore}}>
        {props.children}
        </Context.Provider>
    )
}
export default State;