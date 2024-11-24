let useConcateScheduleDateWithAlarmTime=(scheduleTime,AlarmTime)=>{
    let needToExtractDate=scheduleTime.slice(0,10);
    let needToExtractTimeFromAlarmTime=AlarmTime.slice(10,24);
    let concateScheduleDateWithAlarmTime=needToExtractDate.concat(needToExtractTimeFromAlarmTime);
    console.log("concateScheduleDateWithAlarmTime;",concateScheduleDateWithAlarmTime);
    
    return concateScheduleDateWithAlarmTime;
}
export default useConcateScheduleDateWithAlarmTime;