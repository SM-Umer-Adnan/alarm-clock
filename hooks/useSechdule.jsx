
import useUpdateNotification from './useUpdateNotification';

let useSchedule=async (alarmId,notiId,scheduleDate)=>{
            console.log("alarm id in useschedule hook",alarmId);
            console.log("notiid in useschedule hook",notiId);
       let res= await useUpdateNotification(alarmId,notiId,scheduleDate);
        console.log("after changing schedule in calender in nuseSchedule hooks ",res);

}

export default useSchedule;