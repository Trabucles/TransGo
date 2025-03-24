// src/screens/RoutesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, StyleSheet, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RoutesScreen = () => {
  const [routeName, setRouteName] = useState('');
  const [routes, setRoutes] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  useEffect(() => {
    const loadRoutes = async () => {
      try {
        const savedRoutes = await AsyncStorage.getItem('routes');
        if (savedRoutes) {
          setRoutes(JSON.parse(savedRoutes));
        }
      } catch (error) {
        console.error('Error loading routes from AsyncStorage:', error);
      }
    };

    loadRoutes();
  }, []);

  const saveRoute = async () => {
    if (routeName) {
      let updatedRoutes;
      if (isEditing && editIndex !== null) {
        updatedRoutes = [...routes];
        updatedRoutes[editIndex] = routeName;
        setRoutes(updatedRoutes);
        setIsEditing(false);
        setEditIndex(null);
      } else {
        updatedRoutes = [...routes, routeName];
        setRoutes(updatedRoutes);
      }

      try {
        await AsyncStorage.setItem('routes', JSON.stringify(updatedRoutes));
      } catch (error) {
        console.error('Error saving routes to AsyncStorage:', error);
      }
      setRouteName('');
    }
  };

  const deleteRoute = (index: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar esta ruta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            const updatedRoutes = routes.filter((_, i) => i !== index);
            setRoutes(updatedRoutes);
            try {
              await AsyncStorage.setItem('routes', JSON.stringify(updatedRoutes));
            } catch (error) {
              console.error('Error deleting route from AsyncStorage:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const startEditing = (index: number) => {
    setRouteName(routes[index]);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isEditing ? 'Editar Ruta' : 'Agregar Nueva Ruta'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Número de Ruta"
        value={routeName}
        onChangeText={setRouteName}
      />
      <Button title={isEditing ? 'Guardar Cambios' : 'Agregar Ruta'} onPress={saveRoute} />

      <Text style={styles.header}>Lista de Rutas</Text>
      <FlatList
        data={routes}
        renderItem={({ item, index }) => (
          <View style={styles.routeItem}>
            <Text style={styles.route}>{item}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => startEditing(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteRoute(index)} style={styles.deleteButton}>
                <Text style={styles.buttonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
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
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  route: {
    fontSize: 18,
    marginVertical: 5,
  },
  routeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#ddd',
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default RoutesScreen;
