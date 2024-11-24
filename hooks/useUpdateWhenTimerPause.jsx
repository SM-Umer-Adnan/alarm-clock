
import AsyncStorage from '@react-native-async-storage/async-storage';

let useUpdateWhenTimerPause=async (timerId,pasueValue0bj)=>{
    console.log("update timer when pause",timerId);
   await AsyncStorage.mergeItem(timerId,JSON.stringify({...pasueValue0bj})).then((res)=>{
    console.log("update timer when pause",res);
    })
}

export default useUpdateWhenTimerPause;