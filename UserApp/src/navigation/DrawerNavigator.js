import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from '../Screens/map/MapScreen';
import ProfileScreen from '../Screens/profile/Profile';
import CustomDrawerContent from '../components/Organisms/CustomDrawerContent';
import { MyTheme } from '../components/ui/theme/color/Colors';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: MyTheme.primary,
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#333',
      }}>
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}