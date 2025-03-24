import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definir un tipo para los viajes
interface Viaje {
  id: string;
  selectedRuta: string;
  selectedConductor: string;
  selectedAutobus: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
}

// Define el tipo para la navegación en ViajesListScreen (navegará hacia 'Viaje')
type ViajesListScreenNavigationProp = StackNavigationProp<any, 'ViajesList'>;

interface Props {
  navigation: ViajesListScreenNavigationProp;
}

const ViajesListScreen = ({ navigation }: Props) => {
  const [viajes, setViajes] = useState<Viaje[]>([]);

  // Cargar los viajes desde AsyncStorage cuando el componente se monta
  useEffect(() => {
    const loadViajes = async () => {
      try {
        const storedViajes = await AsyncStorage.getItem('viajes');
        if (storedViajes) {
          setViajes(JSON.parse(storedViajes));
        }
      } catch (error) {
        console.error('Error cargando viajes', error);
      }
    };
    loadViajes();
  }, []);

  // Función para editar un viaje
  const handleEdit = (viaje: Viaje) => {
    navigation.navigate('Viaje', { viajeToEdit: viaje }); // Enviamos el viaje que queremos editar
  };

  // Función para eliminar un viaje
  const handleDelete = async (index: number) => {
    try {
      // Confirma la eliminación con una alerta
      Alert.alert('Eliminar Viaje', '¿Estás seguro de que quieres eliminar este viaje?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const updatedViajes = [...viajes];
            updatedViajes.splice(index, 1); // Elimina el viaje en el índice seleccionado
            await AsyncStorage.setItem('viajes', JSON.stringify(updatedViajes)); // Actualiza el almacenamiento
            setViajes(updatedViajes); // Actualiza el estado local
          },
        },
      ]);
    } catch (error) {
      console.error('Error al eliminar el viaje', error);
    }
  };

  // Función para extraer la clave única
  const keyExtractor = (item: Viaje) => {
    return item.id ? item.id.toString() : `${Math.random()}`; // Si no tiene 'id', generamos una clave aleatoria
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lista de Viajes</Text>
      {viajes.length === 0 ? (
        <Text>No hay viajes registrados</Text>
      ) : (
        <FlatList
          data={viajes}
          keyExtractor={keyExtractor} // Usamos la función para generar claves únicas
          renderItem={({ item, index }) => (
            <View style={styles.routeItem}>
              <Text style={styles.route}>{`Ruta: ${item.selectedRuta}`}</Text>
              <Text style={styles.route}>{`Conductor: ${item.selectedConductor}`}</Text>
              <Text style={styles.route}>{`Autobús: ${item.selectedAutobus}`}</Text>
              <Text style={styles.route}>{`Destino: ${item.destino}`}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={() => handleEdit(item)} style={styles.editButton}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)} style={styles.deleteButton}>
                  <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      <Button title="Nuevo Viaje" onPress={() => navigation.navigate('Viaje')} />
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
  route: {
    fontSize: 18,
    marginVertical: 5,
  },
  routeItem: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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

export default ViajesListScreen;
