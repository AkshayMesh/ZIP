import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');
export class ProfileScreen extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <LinearGradient style={styles.glassyView}
          colors={['rgb(255, 255, 255)', 'rgba(162, 0, 255, 0.21)']}></LinearGradient>
        <Icon.Button color='#222' backgroundColor='rgba(0, 0, 0, 0)' name="chevron-left" onPress={()=> {NavigationContainer.onBack()}}/>
        <Text style={styles.title}>Profile</Text>
      </View>
    )
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    width: width,
    height: "100%",
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 40,
    marginStart: 12
  },
  glassyView: {
    position: 'absolute',
    width: width,
    height: height,
  }
})