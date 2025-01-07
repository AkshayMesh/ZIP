import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Slider from '../../components/Molecules/Slider'
import GetStarted from '../../components/Organisms/GetStarted'
import { MyTheme } from '../../components/ui/theme/color/Colors'

export default function OnboardingScreen({navigation}) {
  return (
    <SafeAreaProvider>
       <SafeAreaView style={[styles.container , { flex: 1, backgroundColor: '#eee'}]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={MyTheme.statusBarColor} />
         <Slider></Slider>
         <GetStarted navigation={navigation}></GetStarted>
     </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });