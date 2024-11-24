import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';

  const getData = async (alarmId) => {
    try {
      const jsonValue = await AsyncStorage.getItem(alarmId);
      console.log("get data",jsonValue);
      
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
let useDeletNotification=async (alarmId,notiId)=>{
    
    Notifications.cancelScheduledNotificationAsync(notiId).then((res)=>{
        console.log("delete notification",res);
    })
   
}

export default useDeletNotification;