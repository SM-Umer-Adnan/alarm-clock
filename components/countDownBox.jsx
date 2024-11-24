import { StyleSheet, Text, View,Pressable,Image, Dimensions } from 'react-native'
import React, { useState,useEffect, useRef } from 'react'
import playBtn from "../assets/play.png"
import pauseBtn from "../assets/pause.png"
import resetBtn from "../assets/reset.png"
import closeBtn from "../assets/close.png"
import useUpdateWhenTimerPause from '../hooks/useUpdateWhenTimerPause'
import useDeleteTimer from '../hooks/useDeleteTimer'
import { useClockData } from '../context/clockContextProvider'
const CountDownBox = ({countTimeObj}) => {
  let {tiggerReloadData}=useClockData();
  let [startTimer,setStartTimer]=useState(false);
  let [preTimerObj,setPreTimerObj]=useState({...countTimeObj});
  let [timerObj,setTimerObj]=useState({...countTimeObj});
  let interValRef=useRef(null)
  let preTime=useRef(0)
  let countDownTimeInSeconds=useRef(Math.floor(preTimerObj.hours*3600)+Math.floor(preTimerObj.minutes*60)+Math.floor(preTimerObj.seconds))

  useEffect(()=>{
    if(startTimer==true){
      interValRef.current=setInterval(() => {
      
        let elapsedSeconds=Math.floor((Date.now()-preTime.current)/1000);
        // console.log("countdownInseconds",(countDownTimeInSeconds.current-elapsedSeconds));
        let updatedSeconds=Math.floor(countDownTimeInSeconds.current-elapsedSeconds);
        let updateHours=Math.floor(updatedSeconds/3600);
        let updateMinutes=Math.floor((updatedSeconds%3600)/60);
        let updateOfSeconds=Math.floor(updatedSeconds%60)
        setTimerObj({...timerObj,seconds:updateOfSeconds,hours:updateHours,minutes:updateMinutes})

      }, 1000);
    }
   
    
    return ()=>{clearInterval(interValRef.current)};
},[startTimer])


let handlePlayPauseBtn=()=>{
  setStartTimer(!startTimer);
  preTime.current=Date.now();
  if(startTimer==true){
    let timerUpdateObj={
      hours:timerObj.hours,
      minutes:timerObj.minutes,
      seconds:timerObj.seconds
    }
    countDownTimeInSeconds.current=Math.floor(timerObj.hours*3600)+Math.floor(timerObj.minutes*60)+Math.floor(timerObj.seconds)
   return useUpdateWhenTimerPause(timerObj.timerId,timerUpdateObj);
  }
 
}

let resetTimerFunc=()=>{
    setStartTimer(false);
    setTimerObj({...countTimeObj,hours:countTimeObj.timerTitle.hours,minutes:countTimeObj.timerTitle.minutes,seconds:countTimeObj.timerTitle.seconds });
  
      let timerUpdateObj={
        hours:countTimeObj.timerTitle.hours,
        minutes:countTimeObj.timerTitle.minutes,
        seconds:countTimeObj.timerTitle.seconds 
      }
      countDownTimeInSeconds.current=Math.floor(timerUpdateObj.hours*3600)+Math.floor(timerUpdateObj.minutes*60)+Math.floor(timerUpdateObj.seconds)
    return useUpdateWhenTimerPause(timerObj.timerId,timerUpdateObj);
}

let deleteTimer=()=>{
  useDeleteTimer(timerObj.timerId);
  return tiggerReloadData();
}
  return (
    <View  style={{position:"relative",backgroundColor:"#1c1919",margin:8,width:Dimensions.get("screen").width*.9,padding:5,borderRadius:15}}>
        <Text style={styles.timerTitle}>{`${String(timerObj.timerTitle.hours).padStart(2,"0")}H ${String(timerObj.timerTitle.minutes).padStart(2,"0")}M ${String(timerObj.timerTitle.seconds).padStart(2,"0")}Sec`}</Text>
       
      <View style={styles.countDownBoxBody}>
            <View>
                    <Text style={styles.countText}>{`${String(timerObj.hours).padStart(2,"0")}:${String(timerObj.minutes).padStart(2,"0")}:${String(timerObj.seconds).padStart(2,"0")}`}</Text>
            </View>

              <View style={styles.countBoxController}> 
                  <Pressable style={styles.controllerBtn}  onPress={()=>{handlePlayPauseBtn()}}>
                        <Image style={{height:30,width:30}} source={startTimer?pauseBtn:playBtn}/>
                  </Pressable>

                  <Pressable style={styles.controllerBtn} onPress={()=>{resetTimerFunc()}}>
                        <Image style={{height:30,width:30}} source={resetBtn}/>
                  </Pressable>
              </View>
      </View>
      <View style={styles.closeWrapper}>
        <Pressable onPress={()=>deleteTimer()} >
            <Image  style={{width:20,height:20}} source={closeBtn}/>
        </Pressable>
      </View>

    </View>
  )
}

export default CountDownBox;

const styles = StyleSheet.create({
  countDownBoxBody:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
  },
  countBoxController:{
    display:'flex',
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row"
  },
  countText:{
    color:"white",
    fontWeight:"500",
    fontSize:30
  },
  controllerBtn:{
    backgroundColor:"#98c698",
    padding:5,
    borderRadius:40,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    margin:5
  },
  timerTitle:{
    color:"white",
    fontWeight:"500",
    fontSize:15
  },
  closeWrapper:{
    backgroundColor:"#98c698",
    position:"absolute",
    left:"93%",
    top:"7%",
    borderRadius:30
  }
})