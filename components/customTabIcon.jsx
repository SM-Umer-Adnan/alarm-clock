import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
//#98c698
const CustomTabIcon = ({icon,tabName,foused}) => {
  return (
    <View>
        <View style={{borderRadius:20,padding:7,backgroundColor:foused?"#98c698":"#8f928f",width:60,display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Image styles={{width:32,height:32}} source={icon}/>
            
        </View>
        <Text style={{textAlign:"center",color:"white",fontWeight:foused?"500":"400"}}>{tabName}</Text>
    </View>
  )
}

export default CustomTabIcon

const styles = StyleSheet.create({})