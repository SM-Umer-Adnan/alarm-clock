
import moment from 'moment';
import useUpdateNotification from './useUpdateNotification';

let useScheduleEveryDay=async(alarmId,notiId,preTimeObj)=>{
let tomorrow  = moment(preTimeObj).add(1,'days');

   let res=await useUpdateNotification(alarmId,notiId,tomorrow);
    console.log("schedule for next day",tomorrow);
}

export default useScheduleEveryDay;