import * as Notifications from 'expo-notifications';

export async function doingNotificationSchedule(pickTimeObj) {

  
 
  await Notifications.setNotificationChannelAsync('general', {
    name: 'General NotificationsXXXXXX',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    sound:"ringtone.wav",

  });
  const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Alarm",
        body: "It is time to wake up!",
      },
      trigger: {
        date:pickTimeObj,
        repeats:true,
        channelId:"general"
      },
    });
    return identifier;
};

 let useCreateNotification=async (pickTimeOnject)=>{
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

     let idofnotification=await doingNotificationSchedule(pickTimeOnject);
      return idofnotification;
      

}

export default useCreateNotification;

let importData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys);

    return result.map(req => JSON.parse(req)).forEach(console.log);
  } catch (error) {
    console.error(error)
  }
}

     
