
import AsyncStorage from '@react-native-async-storage/async-storage';
let useDeleteTimer=async (timerId)=>{
    await AsyncStorage.removeItem(timerId);
}

export default useDeleteTimer;