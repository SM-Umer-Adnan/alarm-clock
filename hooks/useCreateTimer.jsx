import AsyncStorage from '@react-native-async-storage/async-storage';

let useCreateTimer=async (timerObj)=>{
    const jsonValue = JSON.stringify(timerObj);
    let res= await AsyncStorage.setItem(timerObj.timerId, jsonValue);
    console.log("set timer",res);
}

export default useCreateTimer;