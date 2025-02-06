import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MyDarkTheme, MyTheme } from '../../components/ui/theme/color/Colors';

const { width, height } = Dimensions.get('window');
export class ProfileScreen extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient style={styles.glassyView}
          colors={['rgb(255, 255, 255)', 'rgba(162, 0, 255, 0.21)']}></LinearGradient>
        <Icon color='#222' backgroundColor='rgba(0, 0, 0, 0)' size={34} name="angle-left"
          style={{ padding: 12, }}
          onPress={() => { this.props.navigation.goBack() }} />
        <View style={{ marginTop: 50, marginStart: 30, flexDirection: "row", width: "100%" }}>
          <Image style={styles.profile_pic_view}
            source={{ uri: "https://images.wallpaperscraft.com/image/single/girl_fantasy_face_125403_240x400.jpg" }} />
          <View style={{ marginStart: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>User Name</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems:'center', width: "100%", marginTop: 100, marginStart: 30}}>
          <Icon color={MyTheme.secondary} size={24} name="user"
            onPress={() => { this.props.navigation.goBack() }} />
          <Text style={{fontSize:18, marginStart: 30}}>Profile</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems:'center', width: "100%", marginTop: 30, marginStart: 30}}>
          <Icon color={MyTheme.secondary} size={24} name="bell"
            onPress={() => { this.props.navigation.goBack() }} />
          <Text style={{fontSize:18, marginStart: 30}}>Notifications</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems:'center', width: "100%", marginTop: 30, marginStart: 30}}>
          <Icon color={MyTheme.secondary} size={24} name="gear"
            onPress={() => { this.props.navigation.goBack() }} />
          <Text style={{fontSize:18, marginStart: 30}}>Settings</Text>
        </View>
        <View style={{ flexDirection: "row", alignItems:'center', width: "100%", marginTop: 30, marginStart: 34}}>
          <Icon color={MyTheme.secondary} size={24} name="question"
            onPress={() => { this.props.navigation.goBack() }} />
          <Text style={{fontSize:18, marginStart: 30}}>Help and Support</Text>
        </View>
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
  profile_pic_view: {
    width: 60,
    height: 60,
    backgroundColor: MyTheme.primary,
    borderRadius: 30
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