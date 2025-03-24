import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConductoresScreen = () => {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [conductores, setConductores] = useState<{ id: string; nombre: string; contrasena: string }[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Cargar conductores desde AsyncStorage
  useEffect(() => {
    const loadConductores = async () => {
      try {
        const savedConductores = await AsyncStorage.getItem('conductores');
        if (savedConductores) {
          setConductores(JSON.parse(savedConductores));
        }
      } catch (error) {
        console.error('Error loading conductores from AsyncStorage:', error);
      }
    };

    loadConductores();
  }, []);

  // Guardar conductor en AsyncStorage
  const saveConductor = async () => {
    if (id && nombre && contrasena) {
      let newConductores;
      if (editMode && editIndex !== null) {
        // Editar conductor existente
        newConductores = [...conductores];
        newConductores[editIndex] = { id, nombre, contrasena };
        setEditMode(false);
        setEditIndex(null);
      } else {
        // Agregar conductor nuevo
        newConductores = [...conductores, { id, nombre, contrasena }];
      }

      setConductores(newConductores);
      try {
        await AsyncStorage.setItem('conductores', JSON.stringify(newConductores));
      } catch (error) {
        console.error('Error saving conductores to AsyncStorage:', error);
      }
      setId(''); // Limpiar el campo de ID
      setNombre(''); // Limpiar el campo de Nombre
      setContrasena(''); // Limpiar el campo de Contraseña
    }
  };

  // Editar conductor
  const editConductor = (index: number) => {
    const conductor = conductores[index];
    setId(conductor.id);
    setNombre(conductor.nombre);
    setContrasena(conductor.contrasena);
    setEditMode(true);
    setEditIndex(index);
  };

  // Eliminar conductor
  const deleteConductor = (index: number) => {
    Alert.alert('Eliminar Conductor', '¿Estás seguro de eliminar este conductor?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          const newConductores = conductores.filter((_, i) => i !== index);
          setConductores(newConductores);
          try {
            await AsyncStorage.setItem('conductores', JSON.stringify(newConductores));
          } catch (error) {
            console.error('Error saving conductores to AsyncStorage:', error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{editMode ? 'Editar Conductor' : 'Agregar Nuevo Conductor'}</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del Conductor"
        value={id}
        onChangeText={setId}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del Conductor"
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
      <TouchableOpacity style={styles.saveButton} onPress={saveConductor}>
        <Text style={styles.buttonText}>{editMode ? 'Guardar Cambios' : 'Agregar Conductor'}</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Lista de Conductores</Text>
      <FlatList
        data={conductores}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.conductor}>{item.id} - {item.nombre}</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={() => editConductor(index)} style={styles.editButton}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteConductor(index)} style={styles.deleteButton}>
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  conductor: {
    fontSize: 18,
    marginRight: 10,
    color: '#495057',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default ConductoresScreen;
