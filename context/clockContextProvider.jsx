import React, { useContext, createContext,useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
let ClockContext=createContext();

export let useClockData=()=>useContext(ClockContext);
const ClockContextProvider = ({children}) => {
    let [alarmDataArray,setAlarmDataArray]=useState([]);
    let [timerDataArray,setTimerDataArray]=useState([]);
    let [needReload,setNeedReload]=useState(false)
    useEffect(()=>{
     
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        AsyncStorage.getAllKeys((err, keys) => {
          
            AsyncStorage.multiGet(keys, (err, stores) => {
                console.log("keys",keys.length);
                let keyesLength=keys.length
                let keepDataArrayofAlarm=[];
                let keepDataArrayOfTimer=[]
              stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                let key = store[i][0];
                let value = store[i][1];
                console.log(i);
                
                // console.log("value in stirage",value);
                let parseValueofData=JSON.parse(value)
                if(parseValueofData.alarmId){
                  keepDataArrayofAlarm.push(parseValueofData)
                }else{
                  keepDataArrayOfTimer.push(parseValueofData)
                }
                if(keys.length==i+1){
                    console.log("I=",i+1);
              
                setAlarmDataArray([...keepDataArrayofAlarm]);
                setTimerDataArray([...keepDataArrayOfTimer])
              }
              });
            
           
            });
          });
    
          
    },[needReload])

    let tiggerReloadData=()=>{
      console.log("tiggerReloadData");
      
      return setNeedReload(!needReload);
    }

  return (
    <ClockContext.Provider value={{alarmData:alarmDataArray,timerData:timerDataArray,tiggerReloadData}}>
        {console.log("alarmDataArray in main settinhxsdyhc",alarmDataArray)}
 
        {children}
        
    </ClockContext.Provider>
  )
}

export default ClockContextProvider;

