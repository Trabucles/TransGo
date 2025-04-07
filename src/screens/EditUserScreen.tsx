// EditUserScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditUserScreen = ({ route, navigation }: { route: any, navigation: any }) => {
  const { userId } = route.params; // Recibe el ID del usuario a editar
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Cargar el usuario a editar desde AsyncStorage
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem('userregister');
        if (data) {
          const users = JSON.parse(data);
          const user = users.find((u: any) => u.id === userId);
          if (user) {
            setNombre(user.nombre);
            setPassword(user.password);
          }
        }
      } catch (error) {
        console.error('Error al cargar el usuario:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los datos del usuario.');
      }
    };
    loadUser();
  }, [userId]);

  // Guardar el usuario editado
  const handleSave = async () => {
    if (!nombre || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }

    try {
      const data = await AsyncStorage.getItem('userregister');
      if (data) {
        const users = JSON.parse(data);
        const updatedUsers = users.map((user: any) =>
          user.id === userId ? { ...user, nombre, password } : user
        );
        await AsyncStorage.setItem('userregister', JSON.stringify(updatedUsers));
        Alert.alert('Usuario editado', 'El usuario ha sido actualizado exitosamente');
        navigation.goBack(); // Volver a la pantalla de lista de usuarios
      }
    } catch (error) {
      console.error('Error al editar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al guardar los cambios.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Editar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de Usuario"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar</Text>
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

export default EditUserScreen;
