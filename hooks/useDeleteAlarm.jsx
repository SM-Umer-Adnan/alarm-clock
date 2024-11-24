import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

let useDeleteAlarm=async (alarmId,notiId)=>{
    await AsyncStorage.removeItem(alarmId);
    await Notifications.cancelScheduledNotificationAsync(notiId);
}

export default useDeleteAlarm;