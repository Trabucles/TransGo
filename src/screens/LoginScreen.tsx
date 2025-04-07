import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [id, setId] = useState('');
  const [contrasena, setContrasena] = useState('');

  const adminId = '00';  // ID del administrador
  const adminPassword = 'admin';  // Contraseña del administrador

  // Función para manejar el login
  const handleLogin = async () => {
    try {
      // Cargar conductores desde AsyncStorage
      const conductoresData = await AsyncStorage.getItem('conductores');
      const conductores = conductoresData ? JSON.parse(conductoresData) : [];
      console.log('Conductores:', conductores); // Depuración

      // Cargar usuarios desde AsyncStorage
      const usersData = await AsyncStorage.getItem('userregister');
      const users = usersData ? JSON.parse(usersData) : [];
      console.log('Usuarios:', users); // Depuración

      // Verificar si el ID y la contraseña coinciden con algún conductor
      const conductor = conductores.find((c: { id: string; contrasena: string }) => c.id === id && c.contrasena === contrasena);
      if (conductor) {
        navigation.navigate('ConductorHome');
        return;
      }

      // Verificar si el ID y la contraseña coinciden con algún usuario
      const user = users.find((u: { id: string; contrasena: string }) => u.id === id && u.contrasena === contrasena);
      if (user) {
        navigation.navigate('UsuariosHome');
        return;
      }

      // Si no es un usuario ni conductor, verificar si es administrador
      if (id === adminId && contrasena === adminPassword) {
        navigation.navigate('Home');
        return;
      }

      // Si no se encuentra el usuario, mostrar un error
      Alert.alert('Error', 'ID o Contraseña incorrectos');
    } catch (error) {
      console.error('Error al hacer login:', error);
      Alert.alert('Error', 'Hubo un problema al verificar las credenciales.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={contrasena}
        onChangeText={setContrasena}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('UserRegister')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
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
  registerText: {
    marginTop: 10,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
