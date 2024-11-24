import { Pressable, StyleSheet, Text, View,Dimensions,Image } from 'react-native'
import React, { useEffect, useState,useRef } from 'react'
import playIcon from "../assets/play.png"
import pauseIcon from "../assets/pause.png"
import resetIcon from "../assets/reset.png"
const StopWatch = () => {
  
    let [startStopWatch,setStartStopWatch]=useState(false)
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {

      if(startStopWatch){
          intervalIdRef.current = setInterval(() => {
              setElapsedTime(Date.now() - startTimeRef.current);
          }, 10);
      }

      return () => {
          clearInterval(intervalIdRef.current);
      }
  }, [startStopWatch]);
  
        function start(){
          setStartStopWatch(true)
          startTimeRef.current = Date.now() - elapsedTime;
      }

      function stop(){
          setStartStopWatch(false)
      }

      function reset(){
          setElapsedTime(0);
          setStartStopWatch(false);
      }

    function formatTime(){

      let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
      let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
      let seconds = Math.floor(elapsedTime / (1000) % 60);
      let milliseconds = Math.floor((elapsedTime % 1000) / 10);

      hours = String(hours).padStart(2, "0");
      minutes = String(minutes).padStart(2, "0");
      seconds = String(seconds).padStart(2, "0");
      milliseconds = String(milliseconds).padStart(2, "0");

      return `${minutes}:${seconds}:${milliseconds}`;
  }



  return (
    <View>
      <Text style={{fontSize:30,fontWeight:"700",color:"white",marginLeft:"3%",marginTop:"2%"}}>Stop Watch</Text>
    <View style={styles.stopWatchHolder} >
      
      <View >
          <View style={styles.stopWatchWrapper}>
            <Text style={styles.numberOfWatch}>{formatTime()}</Text>
          </View>

          <View style={styles.controllerBtn}>
              <Pressable style={{margin:4}} onPress={()=>{startStopWatch?stop():start()}}>
                    <Image source={startStopWatch?pauseIcon:playIcon}/>
              </Pressable>
              <Pressable style={{margin:4}} onPress={reset} >
                <Image source={resetIcon}/>
              </Pressable>
          </View>
            
      </View>
      
    </View>
    </View>
  )
}

export default StopWatch

const styles = StyleSheet.create({
  stopWatchHolder:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:Dimensions.get("window").height*.8
  },
  stopWatchWrapper:{
    borderRadius:500,
    backgroundColor:"black",
    overflow:"hidden",
    width:Dimensions.get("window").width*.7,
    height:Dimensions.get("window").height*.4,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    borderWidth:6,
    borderColor:"#1c1919"
    
  },
  numberOfWatch:{
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
    flexDirection:"row",
    margin:5
    
  }
})