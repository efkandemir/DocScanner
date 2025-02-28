import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraScreen from './screens/Camera';
import Tabs from './navigation/tabs';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
        {/* Ana ekran olarak TabNavigator'ı göster */}
        <Stack.Screen name="Main" component={Tabs} />
        {/* Kamera ekranını StackNavigator'a ekle */}
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
