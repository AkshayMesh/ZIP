import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './src/Screens/map/MapScreen';
import OnboardingScreen from './src/Screens/onboard/OnboardingScreen';
import LoginScreen from './src/Screens/auth/Login';
import OtpScreen from './src/Screens/auth/Otp';
import ProfileScreen from './src/Screens/profile/Profile';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import store from './src/data/redux/Store';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <PaperProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
              name='Map'
              component={MapScreen}
              options={{ headerShown: false }} />
            <Stack.Screen
              name='Profile'
              component={ProfileScreen}
              options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </PaperProvider>
    </Provider>
  );
}

export default App;