// src/screens/AutobusesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AutobusesScreen = () => {
  const [busMarca, setBusMarca] = useState('');
  const [busNumero, setBusNumero] = useState('');
  const [buses, setBuses] = useState<{ marca: string; numero: string }[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // Para saber cuál autobús estamos editando

  // Cargar autobuses desde AsyncStorage
  useEffect(() => {
    const loadBuses = async () => {
      try {
        const savedBuses = await AsyncStorage.getItem('autobuses');
        if (savedBuses) {
          setBuses(JSON.parse(savedBuses));
        }
      } catch (error) {
        console.error('Error loading buses from AsyncStorage:', error);
      }
    };

    loadBuses();
  }, []);

  // Guardar autobuses en AsyncStorage
  const saveBus = async () => {
    if (busMarca && busNumero) {
      const newBus = { marca: busMarca, numero: busNumero };
      let updatedBuses = [...buses];
      
      if (editingIndex !== null) {
        updatedBuses[editingIndex] = newBus; // Editar autobús existente
      } else {
        updatedBuses.push(newBus); // Agregar nuevo autobús
      }
      
      setBuses(updatedBuses);
      try {
        await AsyncStorage.setItem('autobuses', JSON.stringify(updatedBuses));
      } catch (error) {
        console.error('Error saving buses to AsyncStorage:', error);
      }
      setBusMarca('');
      setBusNumero('');
      setEditingIndex(null); // Resetear el índice de edición
    }
  };

  // Eliminar un autobús
  const deleteBus = (index: number) => {
    Alert.alert(
      'Eliminar Autobús',
      '¿Estás seguro de que quieres eliminar este autobús?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const updatedBuses = buses.filter((_, i) => i !== index);
            setBuses(updatedBuses);
            try {
              await AsyncStorage.setItem('autobuses', JSON.stringify(updatedBuses));
            } catch (error) {
              console.error('Error deleting bus from AsyncStorage:', error);
            }
          },
        },
      ]
    );
  };

  // Editar un autobús
  const editBus = (index: number) => {
    setBusMarca(buses[index].marca);
    setBusNumero(buses[index].numero);
    setEditingIndex(index); // Establecer el índice de edición
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Agregar/Editar Autobús</Text>
      <TextInput
        style={styles.input}
        placeholder="Marca del Autobús"
        value={busMarca}
        onChangeText={setBusMarca}
      />
      <TextInput
        style={styles.input}
        placeholder="Número del Autobús"
        value={busNumero}
        onChangeText={setBusNumero}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.routeButton} onPress={saveBus}>
        <Text style={styles.buttonText}>{editingIndex !== null ? 'Actualizar Autobús' : 'Agregar Autobús'}</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Lista de Autobuses</Text>
      <FlatList
        data={buses}
        renderItem={({ item, index }) => (
          <View style={styles.busItem}>
            <Text style={styles.bus}>{`Marca: ${item.marca} - Número: ${item.numero}`}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editBus(index)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteBus(index)}>
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
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  routeButton: {
    width: '80%',
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  busItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '100%',
  },
  bus: {
    fontSize: 18,
    color: '#495057',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
});

export default AutobusesScreen;
