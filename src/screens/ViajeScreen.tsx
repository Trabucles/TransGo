// src/screens/ViajeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const ViajeScreen = () => {
  const [rutas, setRutas] = useState<string[]>([]);
  const [conductores, setConductores] = useState<{ id: string; nombre: string }[]>([]);
  const [autobuses, setAutobuses] = useState<{ marca: string; numero: string }[]>([]);
  const [selectedRuta, setSelectedRuta] = useState<string>('');
  const [selectedConductor, setSelectedConductor] = useState<string>('');
  const [selectedAutobus, setSelectedAutobus] = useState<string>('');
  const [horaSalida, setHoraSalida] = useState<Date>(new Date());
  const [horaLlegada, setHoraLlegada] = useState<Date>(new Date());
  const [destino, setDestino] = useState<string>('sur');

  // Nueva sección para tiempo estimado
  const [horasEstimadas, setHorasEstimadas] = useState<number>(0);
  const [minutosEstimados, setMinutosEstimados] = useState<number>(0);

  const [viajes, setViajes] = useState<any[]>([]); // Almacenar los viajes

  useEffect(() => {
    const loadData = async () => {
      try {
        const savedRoutes = await AsyncStorage.getItem('routes');
        const savedConductores = await AsyncStorage.getItem('conductores');
        const savedBuses = await AsyncStorage.getItem('autobuses');
        const savedTrips = await AsyncStorage.getItem('viajes');
        
        setRutas(savedRoutes ? JSON.parse(savedRoutes) : []);
        setConductores(savedConductores ? JSON.parse(savedConductores) : []);
        setAutobuses(savedBuses ? JSON.parse(savedBuses) : []);
        setViajes(savedTrips ? JSON.parse(savedTrips) : []); // Cargar viajes guardados
      } catch (e) {
        console.error('Error loading data:', e);
      }
    };
    loadData();
  }, []);

  const saveTrip = async () => {
    const newTrip = {
      selectedRuta,
      selectedConductor,
      selectedAutobus,
      horaSalida: horaSalida.toLocaleTimeString(),
      horaLlegada: horaLlegada.toLocaleTimeString(),
      destino,
      tiempoEstimado: { horas: horasEstimadas, minutos: minutosEstimados },
    };

    try {
      const existingTrips = await AsyncStorage.getItem('viajes');
      const tripsArray = existingTrips ? JSON.parse(existingTrips) : [];
      tripsArray.push(newTrip);
      await AsyncStorage.setItem('viajes', JSON.stringify(tripsArray));
      setViajes(tripsArray); // Actualizar estado
      Alert.alert('Éxito', 'Viaje guardado correctamente');
    } catch (e) {
      console.error('Error al guardar el viaje:', e);
    }
  };

  const deleteTrip = (index: number) => {
    Alert.alert(
      'Eliminar Viaje',
      '¿Estás seguro de que quieres eliminar este viaje?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          onPress: async () => {
            const updatedTrips = viajes.filter((_, i) => i !== index);
            setViajes(updatedTrips);
            try {
              await AsyncStorage.setItem('viajes', JSON.stringify(updatedTrips));
            } catch (e) {
              console.error('Error deleting trip from AsyncStorage:', e);
            }
          },
        },
      ]
    );
  };

  const editTrip = (index: number) => {
    const tripToEdit = viajes[index];
    setSelectedRuta(tripToEdit.selectedRuta);
    setSelectedConductor(tripToEdit.selectedConductor);
    setSelectedAutobus(tripToEdit.selectedAutobus);
    setHoraSalida(new Date(`1970-01-01T${tripToEdit.horaSalida}`));
    setHoraLlegada(new Date(`1970-01-01T${tripToEdit.horaLlegada}`));
    setDestino(tripToEdit.destino);
    setHorasEstimadas(tripToEdit.tiempoEstimado.horas);
    setMinutosEstimados(tripToEdit.tiempoEstimado.minutos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona una Ruta</Text>
      <Picker selectedValue={selectedRuta} onValueChange={setSelectedRuta} style={styles.picker}>
        {rutas.map((ruta, index) => (
          <Picker.Item key={index} label={ruta} value={ruta} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecciona un Conductor</Text>
      <Picker selectedValue={selectedConductor} onValueChange={setSelectedConductor} style={styles.picker}>
        {conductores.map((conductor) => (
          <Picker.Item key={conductor.id} label={conductor.nombre} value={conductor.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Selecciona un Autobús</Text>
      <Picker selectedValue={selectedAutobus} onValueChange={setSelectedAutobus} style={styles.picker}>
        {autobuses.map((autobus, index) => (
          <Picker.Item key={index} label={autobus.numero} value={autobus.numero} />
        ))}
      </Picker>

      <Text style={styles.label}>Tiempo Estimado</Text>
      <View style={styles.timeContainer}>
        <Picker selectedValue={horasEstimadas} onValueChange={setHorasEstimadas} style={styles.picker}>
          {[...Array(24).keys()].map((hour) => (
            <Picker.Item key={hour} label={`${hour} horas`} value={hour} />
          ))}
        </Picker>
        <Picker selectedValue={minutosEstimados} onValueChange={setMinutosEstimados} style={styles.picker}>
          {[...Array(60).keys()].map((minute) => (
            <Picker.Item key={minute} label={`${minute} minutos`} value={minute} />
          ))}
        </Picker>
      </View>

      <Button title="Crear Viaje" onPress={saveTrip} />

      <Text style={styles.label}>Viajes Guardados</Text>
      <FlatList
        data={viajes}
        renderItem={({ item, index }) => (
          <View style={styles.tripItem}>
            <Text style={styles.trip}>
              {`Ruta: ${item.selectedRuta}, Conductor: ${item.selectedConductor}, Autobús: ${item.selectedAutobus}`}
            </Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity style={styles.editButton} onPress={() => editTrip(index)}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTrip(index)}>
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
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  picker: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginVertical: 5,
    borderWidth: 1, // Marco alrededor del Picker
    borderColor: '#ccc', // Color del borde
    borderRadius: 5, // Bordes redondeados
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tripItem: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    width: '100%',
  },
  trip: {
    fontSize: 16,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default ViajeScreen;
