import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserRegisterScreen = ({ navigation }: { navigation: any }) => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleRegister = async () => {
    try {
      const existingUsers = await AsyncStorage.getItem('userregister');
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const existingConductores = await AsyncStorage.getItem('conductores');
      const conductores = existingConductores ? JSON.parse(existingConductores) : [];

      const userExists = users.some((user: { id: string }) => user.id === id);
      const conductorExists = conductores.some((conductor: { id: string }) => conductor.id === id);

      if (userExists || conductorExists) {
        Alert.alert('Error', 'El ID ya está registrado.');
        return;
      }

      const newUser = { id, nombre, contrasena };
      users.push(newUser);
      await AsyncStorage.setItem('userregister', JSON.stringify(users));

      console.log('Usuario registrado:', newUser);

      Alert.alert('Registro exitoso', 'Te has registrado correctamente.');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Registrar Usuario</Text>

        <TextInput
          style={styles.input}
          placeholder="ID"
          value={id}
          onChangeText={setId}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={contrasena}
          onChangeText={setContrasena}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
  container: {
    alignItems: 'center',
    padding: 20,
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

export default UserRegisterScreen;
