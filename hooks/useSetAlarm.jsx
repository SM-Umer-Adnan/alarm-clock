import AsyncStorage from '@react-native-async-storage/async-storage';
import useCreateNotification from './useCreateNotification';


const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('88926315-006e-455c-87bc-4f24920dde0a');
    console.log("get data",jsonValue);
    
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
const storeData = async (value) => {
  console.log("storeData in hook",value);
  try {
    const jsonValue = JSON.stringify(value);
   let res= await AsyncStorage.setItem(value.alarmId, jsonValue);
   console.log("set alarm",res);
   
    return res;
  } catch (err) {
    // saving error
    throw err;
  }
};

const useSetAlarm =async (alarmObj) => {
  console.log("LOG OF ALARM OBJ WHWN CREAET",alarmObj);
  
  let idOfNotification=await useCreateNotification(alarmObj.alarmTimeObj);
    getData();
  let alarmObjx={
        alarmId:alarmObj.alarmId,
        alarmTimeObj:alarmObj.alarmTimeObj,
        notificationId:idOfNotification,
        isAlarmEveryDay:alarmObj.alarmEveryday,
        isAlarmOnData:alarmObj.isAlarmOnData
    }
   
   let result= await storeData(alarmObjx);
    
    
    console.log("NOTIFI obj in hook",result);
    return alarmObjx;


}

export default useSetAlarm;