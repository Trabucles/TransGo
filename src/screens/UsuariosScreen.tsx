import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UsuariosScreen = ({ navigation }: { navigation: any }) => {
  const [usuarios, setUsuarios] = useState<any[]>([]);
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const loadUsuarios = async () => {
      try {
        const data = await AsyncStorage.getItem('userregister');
        if (data) {
          const parsedData = JSON.parse(data);
          setUsuarios(parsedData);
        }
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        Alert.alert('Error', 'Hubo un problema al cargar los usuarios.');
      }
    };

    loadUsuarios();
  }, []);

  const handleRegister = async () => {
    if (!nombre || !password) {
      Alert.alert('Error', 'Por favor ingresa todos los campos');
      return;
    }

    const newUser = {
      id: Math.floor(Math.random() * 9000) + 1000, // Generar ID único de 4 dígitos
      nombre,
      password,
    };

    try {
      const data = await AsyncStorage.getItem('userregister');
      const users = data ? JSON.parse(data) : [];
      users.push(newUser);
      await AsyncStorage.setItem('userregister', JSON.stringify(users));
      setUsuarios(users);
      setNombre('');
      setPassword('');
      Alert.alert('Usuario registrado', 'El usuario ha sido registrado exitosamente');
      
      // Redirigir a la pantalla UsuarioHomeScreen después del registro exitoso
      navigation.navigate('UsuarioHomeScreen');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario.');
    }
  };

  // Eliminar un usuario
  const handleDelete = async (id: string) => {
    try {
      const updatedUsers = usuarios.filter((user) => user.id !== id);
      await AsyncStorage.setItem('userregister', JSON.stringify(updatedUsers));
      setUsuarios(updatedUsers);
      Alert.alert('Usuario eliminado', 'El usuario ha sido eliminado exitosamente');
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      Alert.alert('Error', 'Hubo un problema al eliminar el usuario.');
    }
  };

  // Navegar a la pantalla de edición de usuario
  const handleEdit = (id: string) => {
    navigation.navigate('EditUserScreen', { userId: id });
  };

  const renderItem = ({ item }: { item: { id: string; nombre: string; password: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>ID: {item.id}</Text>
      <Text style={styles.itemText}>Nombre: {item.nombre}</Text>
      <Text style={styles.itemText}>Contraseña: {'******'}</Text>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleEdit(item.id)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => handleDelete(item.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Usuarios Registrados</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
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
  list: {
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#F44336', // Rojo para eliminar
  },
});

export default UsuariosScreen;
