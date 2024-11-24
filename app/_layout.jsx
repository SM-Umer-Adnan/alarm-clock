import { StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import ClockContextProvider from '../context/clockContextProvider'
import { Stack, Tabs } from 'expo-router'
import clockIocn from "../assets/clock.png"
import timerIcon from "../assets/timer.png"
import stopWatchIcon from "../assets/stopWatch.png"
import CustomTabIcon from '../components/customTabIcon'
// eas build -p android --profile preview

const _layout = () => {
 
  return (
    <ClockContextProvider>
     <StatusBar style="light" hidden={true} />
          <SafeAreaView edges={["top"]}  style={{height:"100%",width:"100%"}}>
           <Tabs sceneContainerStyle={{backgroundColor:"black"}} screenOptions={{
              tabBarStyle:styles.customTabBar,
              tabBarShowLabel:false,
            }}>
                  <Tabs.Screen name='index'  options={{headerShown:false,tabBarIcon:({focused})=>{
                  return (<CustomTabIcon icon={clockIocn} foused={focused}  tabName="Alarm" />)
                  }}}></Tabs.Screen>

                  <Tabs.Screen name='stopWatch' options={{headerShown:false,tabBarIcon:({focused})=>{
                  return (<CustomTabIcon icon={stopWatchIcon} foused={focused}  tabName="Stopwatch" />)}}}>
                  </Tabs.Screen>

                  <Tabs.Screen name='timerCountDown' options={{headerShown:false,title:"Timer",tabBarIcon:({focused})=>{
                  return (<CustomTabIcon icon={timerIcon} foused={focused}  tabName="Timer" />)}}}>
                  </Tabs.Screen>
            </Tabs>
          </SafeAreaView>
    </ClockContextProvider>
         
    
  )
}

export default _layout

const styles = StyleSheet.create({
  customTabBar:{
    backgroundColor:"#1c1919",//
    height:80
  }
})