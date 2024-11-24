import { StyleSheet, Text, View,Pressable,Dimensions,Image } from 'react-native'
import React from 'react'
import addIcon from '../assets/add.png'
const CustomAddBtn = ({handleAddBtn}) => {
  return (

    <View style={{position:"absolute",zIndex:200,top:Dimensions.get('window').height*.7,left:Dimensions.get('window').width*.42}} > 
              
    <Pressable style={styles.addBtnContainer} onPress={handleAddBtn} >
        <Image style={{width:50,height:50}} source={addIcon}/>
        </Pressable>
  
      </View>
  )
}

export default CustomAddBtn

const styles = StyleSheet.create({
    addBtnContainer:{
        backgroundColor:"#98c698",
        borderRadius:50,
        padding:10
      }
})