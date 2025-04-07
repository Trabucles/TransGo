import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const [conductorId, setConductorId] = useState('');

  const handleConductorLogin = () => {
    if (conductorId) {
      navigation.navigate('ConductorHome', { conductorId });
    } else {
      Alert.alert('Error', 'Por favor ingresa el ID del conductor');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bienvenido al Administrador de TransGo</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rutas')}>
        <Text style={styles.buttonText}>Rutas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Conductores')}>
        <Text style={styles.buttonText}>Conductores</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Autobuses')}>
        <Text style={styles.buttonText}>Autobuses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Viaje')}>
        <Text style={styles.buttonText}>Crear Viaje</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViajesList')}>
        <Text style={styles.buttonText}>Lista de Viajes</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ViajesGuardados')}>
        <Text style={styles.buttonText}>Ver Viajes Guardados</Text>
      </TouchableOpacity>

      {/* Nuevo botón para ir al carrusel */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CarouselComponent')}>
        <Text style={styles.buttonText}>Ver Carrusel</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Usuarios */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Usuarios')}>
        <Text style={styles.buttonText}>Ir a Usuarios</Text>
      </TouchableOpacity>

      {/* Botón para ir a la pantalla de Usuarios Home */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UsuarioHome')}>
        <Text style={styles.buttonText}>Ir a Usuarios Home</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="ID del Conductor"
        value={conductorId}
        onChangeText={setConductorId}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleConductorLogin}>
        <Text style={styles.buttonText}>Ver Interfaz del Conductor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
