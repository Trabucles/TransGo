import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import RutasScreen from './src/screens/RutasScreen';
import ConductoresScreen from './src/screens/ConductoresScreen';  
import AutobusesScreen from './src/screens/AutobusesScreen';
import ViajeScreen from './src/screens/ViajeScreen';
import ViajesListScreen from './src/screens/ViajesListScreen'; 
import CronometroScreen from './src/screens/CronometroScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rutas" component={RutasScreen} />
        <Stack.Screen name="Conductores" component={ConductoresScreen} /> 
        <Stack.Screen name="Autobuses" component={AutobusesScreen} /> 
        <Stack.Screen name="Viaje" component={ViajeScreen} /> 
        <Stack.Screen name="ViajesList" component={ViajesListScreen} />
        <Stack.Screen name=" CronometroScreen " component={ CronometroScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
