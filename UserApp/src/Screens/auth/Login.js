import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { MyTheme } from '../../components/ui/theme/color/Colors';
import LinearGradient from 'react-native-linear-gradient';
import { useState } from 'react';

const { width, height } = Dimensions.get('window');
export default function LoginScreen({ navigation }) {
  const [number, setNumber] = useState('');
  return (<View style={styles.container}>
    <LinearGradient style={styles.glassyView}
      colors={['rgba(162, 0, 255, 0.1)', 'rgba(0, 255, 247, 0.3)']}></LinearGradient>
    <Text style={styles.title}>Login</Text>
    <View style={styles.numberInput_card}>
      <Text style={styles.prefix}>+91</Text>
      <TextInput
        keyboardType='phone-pad'
        style={styles.numberInput}
        placeholder='Enter Number'
        placeholderTextColor='#eee'
        maxLength={10}
        onChangeText={setNumber}
        value={number} />
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => { navigation.navigate('Otp', { number }) }}>
      <Text style={styles.button_text}>Login</Text>
    </TouchableOpacity>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: "100%",
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    padding: 40,
  },
  button: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222',
  },
  button_text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    marginStart: 12
  },
  prefix: {
    paddingStart: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontWeight: 'bold',
  },
  numberInput: {
    width: '100%',
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 14,
    fontWeight: 'bold',
  }, 
  numberInput_card: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginTop: 32,
    color: '#222',
    fontSize: 14,
    fontWeight: 'bold',
    borderRadius: 12,
  },
  glassyView: {
    position: 'absolute',
    width: width,
    height: height,
  }
});
