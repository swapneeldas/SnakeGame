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
   let lengthtobeincrease=useRef(0);
   let setinterval=useRef();
   function movesnake(){
    if(snakedirection!==null){
        let a=[...snakearray];
        if(snakedirection==="d"){
            let holder={...a[0]};
            let snakesize=snakearray.length;
            a[0].y=a[0].y+1;
            for(let i=1;i<snakesize-lengthtobeincrease;i++){
                a[i]={...holder};
                if(i+1<snakesize){
                holder={...a[i+1]}
                }
            }
            setsnakearray(a);
        }
        if(snakedirection==="w"){

            let holder={...a[0]};
            let snakesize=snakearray.length;
            a[0].x=a[0].x-1;
            for(let i=1;i<snakesize-lengthtobeincrease.current;i++){
                if(lengthtobeincrease.current!==0){
                    lengthtobeincrease.current--;
                }
                a[i]={...holder};
                if(i+1<snakesize){
                holder={...a[i+1]}
                }
            }
            setsnakearray(a);
        }
        if(snakedirection==="s"){
            let holder={...a[0]};
            let snakesize=snakearray.length;
            a[0].x=a[0].x+1;
            for(let i=1;i<snakesize-lengthtobeincrease.current;i++){
                if(lengthtobeincrease.current!==0){
                    lengthtobeincrease.current--;
                }
                a[i]={...holder};
                if(i+1<snakesize){
                holder={...a[i+1]}
                }
            }
            setsnakearray(a);
        }
        if(snakedirection==="a"){
            let holder={...a[0]};
            let snakesize=snakearray.length;
            a[0].y=a[0].y-1;
            for(let i=1;i<snakesize-lengthtobeincrease.current;i++){
                if(lengthtobeincrease.current!==0){
                    lengthtobeincrease.current--;
                }
                a[i]={...holder};
                if(i+1<snakesize){
                holder={...a[i+1]}
                }
            }
            setsnakearray(a);
        }
    
    }
   }
   //movement of snake
   useEffect(()=>{
    if(gameover!=true){
    movesnake();
   setinterval=setInterval(() => {
    movesnake();
}, 200);
    }
return ()=>{
    
    clearInterval(setinterval)

};
   },[started,snakedirection,gameover])



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
    a.push(a[length-1]);
    lengthtobeincrease++;
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
    for(let i=1;i<snakearray.length;i++){
        if(JSON.stringify(snakearray[0])===JSON.stringify(snakearray[i])){
            console.log("Game Over");
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