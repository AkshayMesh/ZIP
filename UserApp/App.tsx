import { React } from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingScreen from './src/Screens/onboard/OnboardingScreen';
import LoginScreen from './src/Screens/auth/Login';
import OtpScreen from './src/Screens/auth/Otp';
import ProfileScreen from './src/Screens/profile/Profile';

const Stack = createStackNavigator();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    // isDarkMode ? Colors.darker :
  };
  return (
    // <View style={{ width: '100%', height: '100%', backgroundColor: isDarkMode ? MyDarkTheme.windowBackground : MyTheme.windowBackground }}></View>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Otp'
          component={OtpScreen}
          options={{ headerShown: false }} />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;