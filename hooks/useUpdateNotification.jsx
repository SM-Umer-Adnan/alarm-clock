import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import moment from 'moment';
import useCreateNotification from './useCreateNotification';
import useDeletNotification from './useDeleteNotification';
let useUpdateNotification=async (alarmId,notiId,haveScheduleDate)=>{

    let jsonAlarmObj=await AsyncStorage.getItem(alarmId);
    let alarmObj=JSON.parse(jsonAlarmObj);
    console.log("alarmobj through alarm id use update notio",alarmObj);
    
    await useDeletNotification(alarmId,notiId);
    let idOfNotification=await useCreateNotification(haveScheduleDate);
   
        let alarmObjx={
            alarmId:alarmObj.alarmId,
            alarmTimeObj:haveScheduleDate,
            notificationId:idOfNotification,
            isAlarmEveryDay:false,
            isAlarmOnData:true
        }
        console.log("update noti ",alarmObjx);
      
        AsyncStorage.mergeItem(alarmId,JSON.stringify(alarmObjx)).then((res)=>{
            console.log("update noti merge item",res);
            
        })
    
  
   

}

export default useUpdateNotification;

// let alarmObjx={
//     alarmId:alarmObj.alarmId,
//     alarmTimeObj:haveScheduleDate,
//     alarmInLocalTime:alarmObj.alarmInLocalTime,
//     alarmschedule:'',
//     notificationId:idOfNotification
// }