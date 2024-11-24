import { StyleSheet, Text, View,Switch, Pressable, Alert,Image ,Dimensions} from 'react-native'
import React,{useEffect, useState} from 'react'
import uuid from 'react-native-uuid';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import useSetAlarm from '../hooks/useSetAlarm';
import useDeleteNotification from '../hooks/useDeleteNotification';
import useUpdateNotification from '../hooks/useUpdateNotification';
import * as Notifications from 'expo-notifications';
import useSchedule from '../hooks/useSechdule';
import useScheduleEveryDay from '../hooks/useScheduleEveyday';
import calenLogo from "../assets/calender.png"
import useConcateScheduleDateWithAlarmTime from '../hooks/useConcateScheduleDateWithAlarmTime';
import { useClockData } from '../context/clockContextProvider';
import deleteBtn from "../assets/delete.png"
import useOffAlarm from '../hooks/useOffAlarm';
import useDeleteAlarm from '../hooks/useDeleteAlarm';
const TimerBox = ({alarmDataObj}) => {  
    let {tiggerReloadData}=useClockData();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDateTimeVisible, setDateTimeVisibility] = useState(false);
    let [pickTime,setPickTime]=useState("");
    let [pickTimeObj,setPickTimeObj]=useState(new Date());
    let [alarmOn,setAlarmOn]=useState(true);
    let [notificationId,setNotificationId]=useState("");
    let [alarmIdx,setAlarmIdx]=useState("");
    let [scheduleDate,setScheduleDate]=useState("");
    let [hasScheduled,setHasScheduled]=useState(false);
    let [isEveryDay,setIsEveryDay]=useState(true);
    ///IMPELEMET EVERYDAY ALARM

    useEffect(()=>{
      setAlarmIdx(alarmDataObj.alarmId);
      setPickTimeObj(new Date(alarmDataObj.alarmTimeObj));
      setPickTime(moment(alarmDataObj.alarmTimeObj).local().format('hh:mm a'))
      setScheduleDate(new Date(alarmDataObj.alarmTimeObj));
      setNotificationId(alarmDataObj.notificationId)
      setIsEveryDay(alarmDataObj.isAlarmEveryDay)
      setAlarmOn(alarmDataObj.isAlarmOnData);
     console.log( "today getting",alarmDataObj.alarmTimeObj);
     const dateIsBefore = moment(alarmDataObj.alarmTimeObj).isBefore(moment(new Date()));
     console.log("checking switvh state",dateIsBefore,moment(alarmDataObj.alarmTimeObj).local().format('hh:mm a'));
     
     if(dateIsBefore==true){
      console.log("setAlarmOn(false)");
      
      setAlarmOn(false)
     }

    },[])


    Notifications.addNotificationResponseReceivedListener((notification) => {
      // console.log("recider fseji",notification);
      //IMCORECT NEED EVEVRYDAY
      if(alarmIdx && notificationId && isEveryDay ){
        console.log("alarm set for tommoreow");
        useScheduleEveryDay(alarmIdx,notification,pickTimeObj).then((res)=>{
          console.log("alarm set for tommoreow");
          tiggerReloadData()
        })
      }else{
        useOffAlarm(alarmIdx);
      }
      
    });

    let createAlarmOnFly=(pickTimeObj,localTime,dateForSchedule)=>{
      console.log("response after create on fly alarmxyh",dateForSchedule);
      useSetAlarm({alarmId:uuid.v4(),
        alarmTimeObj:dateForSchedule==""?pickTimeObj:dateForSchedule,
        alarmEveryday:true,
        isAlarmOnData:true
        }).then((res)=>{
          setAlarmIdx(res.alarmId);
          setNotificationId(res.notificationId);
          
          console.log("response after create on alarm",res);
          
        })
    }

    let handleAlarmSwitch=(e)=>{
        setAlarmOn(!alarmOn);
    console.log("e",e);
        if(e===true){
            useSetAlarm({alarmId:uuid.v4(),
              alarmTimeObj:scheduleDate==""?pickTimeObj:scheduleDate,
              alarmEveryday:true,isAlarmOnData:true}).then((res)=>{
                setAlarmIdx(res.alarmId)
                setNotificationId(res.notificationId)
                console.log("response after switc",res);
                
              })
            Alert.alert("Alarm has been set")
        }else if(alarmIdx!==""||notificationId!==""){
          useOffAlarm(alarmIdx);
          useDeleteNotification(alarmIdx,notificationId).then((res)=>{
            Alert.alert("Alarm is off")
          })
        }
        
    }
 

  console.log("new Date().toISOString()",new Date());
  

  const handleConfirmTime = (datex) => {
    console.log("A date has been picked: ", datex);
    setPickTimeObj(datex);
    setScheduleDate(datex);
    var local = moment(datex).local().format('hh:mm a');//("hh,mm") means am,pm and (HH,MM) MEANS 24 FORMAT
    setPickTime(local);
    console.log("timeComponent",local);
    setDateTimeVisibility(!isDateTimeVisible);
    setAlarmOn(true);
    createAlarmOnFly(datex,local,datex);

  };
  const handleConfirmDate = (datex) => {
    console.log("A date calenderxx has been picked: ", datex);
    // let day = moment(datex).format("MMM Do");  ;//("hh,mm") means am,pm and (HH,MM) MEANS 24 FORMAT
    // console.log("datecomponet",day);
    setDatePickerVisibility(!isDatePickerVisible);
    setPickTimeObj(datex);
    setIsEveryDay(false);
    if(alarmOn==false){
      setScheduleDate(datex);
      console.log("doing seheduling uin change without alramn id",datex);
    }else{
      setScheduleDate(datex);
      console.log("doing seheduling uin change",datex);
      useSchedule(alarmIdx,notificationId,datex)
    }
 
  };

  let handleDelete=()=>{
    useDeleteAlarm(alarmDataObj.alarmId,alarmDataObj.notificationId);
    tiggerReloadData()
  }


  return (
    <View style={styles.timerBoxWrapper}>
        <View>
            <Text onPress={()=>setDateTimeVisibility(true)} style={styles.timeText}>{pickTime==""?moment().local().format('hh:mm a'):pickTime}</Text>
            
        </View>
        <View style={styles.switchWrapper}>
        <Text  style={styles.schduleText}>{isEveryDay==true?"Everyday":moment(scheduleDate).format("MMM Do")}</Text>
                <Switch
                trackColor={{false: "#93a6c1", true: 'white'}}
                thumbColor={alarmOn?"#f37171":"#98c698"}
                onValueChange={handleAlarmSwitch}
                value={alarmOn}
                
            />
        </View>
      <View>

            <View>
                <Pressable style={styles.schduleBtnWrapper} onPress={()=>setDatePickerVisibility(!isDatePickerVisible)}>
                      <Image style={{height:20,width:20,backgroundColor:"#98c698"}} source={calenLogo} />
                      <Text  style={styles.schduleBtn}>Sehedule</Text>
                </Pressable>
                <Pressable style={styles.schduleBtnWrapper} onPress={()=>handleDelete()}>
                      <Image style={{height:20,width:20,backgroundColor:"#98c698",marginTop:5}} source={deleteBtn} />
                      <Text  style={styles.schduleBtn}>Delete</Text>
                </Pressable>
            </View>
        
      
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        date={pickTimeObj}
        onCancel={()=>setDatePickerVisibility(!isDatePickerVisible)}
      />
   
      </View>
      
      <DateTimePickerModal
        isVisible={isDateTimeVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={()=>setDateTimeVisibility(!isDateTimeVisible)}
        is24Hour={false}
        date={pickTimeObj}
      />
    
    </View>
  )
}

export default TimerBox;

const styles = StyleSheet.create({
    timerBoxWrapper:{
        backgroundColor:'#1c1919',
        color:"white",
        padding:10,
        width:"100%",
        borderRadius:10,
        margin:5
    },
    timeText:{
        color:"white",
        fontSize:30,
        fontWeight:"700",
    },
    switchWrapper:{
      display:'flex',
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center",
      backgroundColor:"#1c1919"
    },
    schduleText:{
      color:"#f37171",
      fontSize:17,
      fontWeight:"500",
    },
    schduleBtn:{
      color:"#f37171",
      fontSize:15,
      fontWeight:"500",
      marginLeft:"3%"
    },
    schduleBtnWrapper:{
      display:"flex",
      justifyContent:"flex-start",
      alignItems:"center",
      flexDirection:"row",
    }
})