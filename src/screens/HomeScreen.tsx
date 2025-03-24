import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido al Administrador de TransGo</Text>
      
      {/* Botón que lleva a la pantalla de Rutas */}
      <Button title="Rutas" onPress={() => navigation.navigate('Rutas')} />
      
      {/* Botón que lleva a la pantalla de Conductores */}
      <Button title="Conductores" onPress={() => navigation.navigate('Conductores')} />

      {/* Botón que lleva a la pantalla de Autobuses */}
      <Button title="Autobuses" onPress={() => navigation.navigate('Autobuses')} />

      {/* Botón que lleva a la pantalla de Nuevo Viaje */}
      <Button title=" Crear Viaje" onPress={() => navigation.navigate('Viaje')} />

        {/* Botón que lleva a la pantalla de Nuevo Viaje */}
      <Button title="Lista de Viajes" onPress={() => navigation.navigate('ViajesList')} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
