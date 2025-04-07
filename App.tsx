import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import UserRegisterScreen from './src/screens/UserRegisterScreen'; 
import HomeScreen from './src/screens/HomeScreen';
import RutasScreen from './src/screens/RutasScreen';
import ConductoresScreen from './src/screens/ConductoresScreen';
import AutobusesScreen from './src/screens/AutobusesScreen';
import ViajeScreen from './src/screens/ViajeScreen';
import ViajesListScreen from './src/screens/ViajesListScreen';
import CronometroScreen from './src/screens/CronometroScreen';
import ConductorHomeScreen from './src/screens/ConductorInterface/ConductorHomeScreen';
import SimuladorScreen from './src/screens/ConductorInterface/SimuladorScreen';
import ViajesGuardadosScreen from './src/screens/ViajesGuardadosScreen';
import CarouselComponent from './components/CarouselComponent';
import UsuarioHomeScreen from './src/screens/UsuarioInterface/UsuarioHomeScreen';
import UsuariosScreen from './src/screens/UsuariosScreen';
import EditUserScreen from './src/screens/EditUserScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserRegister" component={UserRegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Rutas" component={RutasScreen} />
        <Stack.Screen name="Conductores" component={ConductoresScreen} />
        <Stack.Screen name="Autobuses" component={AutobusesScreen} />
        <Stack.Screen name="Viaje" component={ViajeScreen} />
        <Stack.Screen name="ViajesList" component={ViajesListScreen} />
        <Stack.Screen name="Cronometro" component={CronometroScreen} />
        <Stack.Screen name="ConductorHome" component={ConductorHomeScreen} />
        <Stack.Screen name="Simulador" component={SimuladorScreen} />
        <Stack.Screen name="ViajesGuardados" component={ViajesGuardadosScreen} />
        <Stack.Screen name="CarouselComponent" component={CarouselComponent} />
        <Stack.Screen name="UsuarioHome" component={UsuarioHomeScreen} />
        <Stack.Screen name="Usuarios" component={UsuariosScreen} />
        <Stack.Screen name="EditUserScreen" component={EditUserScreen} />

       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
