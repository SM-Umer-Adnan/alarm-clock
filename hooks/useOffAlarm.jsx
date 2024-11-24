import AsyncStorage from '@react-native-async-storage/async-storage';


let useOffAlarm=async (alarmId)=>{

    AsyncStorage.mergeItem(alarmId,JSON.stringify({isAlarmOnData:false})).then((res)=>{
        console.log("use alaem off",res);
        
    })
}

export default useOffAlarm;