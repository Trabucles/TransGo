// src/screens/ViajeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const ViajeScreen = () => {
  const [rutas, setRutas] = useState<string[]>([]);
  const [conductores, setConductores] = useState<{ id: string; nombre: string }[]>([]);
  const [autobuses, setAutobuses] = useState<{ marca: string; numero: string }[]>([]);
  const [selectedRuta, setSelectedRuta] = useState<string>('');
  const [selectedConductor, setSelectedConductor] = useState<string>('');
  const [selectedAutobus, setSelectedAutobus] = useState<string>('');
  const [horaSalida, setHoraSalida] = useState<Date>(new Date());
  const [horaLlegada, setHoraLlegada] = useState<Date>(new Date());
  const [destino, setDestino] = useState<string>('sur');  // Aquí se define el valor inicial
  const [selectedFecha, setSelectedFecha] = useState<Date>(new Date());
  const [viajes, setViajes] = useState<any[]>([]);
  const [showHoraSalida, setShowHoraSalida] = useState(false);
  const [showHoraLlegada, setShowHoraLlegada] = useState(false);
  const [showFecha, setShowFecha] = useState(false);

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
        setViajes(savedTrips ? JSON.parse(savedTrips) : []);
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
      fecha: selectedFecha.toISOString().split('T')[0], // Guardar solo la fecha
    };

    try {
      const existingTrips = await AsyncStorage.getItem('viajes');
      const tripsArray = existingTrips ? JSON.parse(existingTrips) : [];
      tripsArray.push(newTrip);
      await AsyncStorage.setItem('viajes', JSON.stringify(tripsArray));
      setViajes(tripsArray);
      Alert.alert('Éxito', 'Viaje guardado correctamente');
    } catch (e) {
      console.error('Error al guardar el viaje:', e);
    }
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

      <Text style={styles.label}>Selecciona una Fecha</Text>
      <TouchableOpacity onPress={() => setShowFecha(true)}>
        <Text style={styles.dateText}>{selectedFecha.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showFecha && (
        <DateTimePicker
          value={selectedFecha}
          mode="date"
          display="default"
          onChange={(event, date) => {
            if (date) {
              setSelectedFecha(date);
              setShowFecha(false);
            }
          }}
        />
      )}

      <Text style={styles.label}>Hora de Salida</Text>
      <TouchableOpacity onPress={() => setShowHoraSalida(true)}>
        <Text style={styles.dateText}>{horaSalida.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showHoraSalida && (
        <DateTimePicker
          value={horaSalida}
          mode="time"
          display="default"
          onChange={(event, date) => {
            if (date) {
              setHoraSalida(date);
              setShowHoraSalida(false);
            }
          }}
        />
      )}

      <Text style={styles.label}>Hora de Llegada</Text>
      <TouchableOpacity onPress={() => setShowHoraLlegada(true)}>
        <Text style={styles.dateText}>{horaLlegada.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showHoraLlegada && (
        <DateTimePicker
          value={horaLlegada}
          mode="time"
          display="default"
          onChange={(event, date) => {
            if (date) {
              setHoraLlegada(date);
              setShowHoraLlegada(false);
            }
          }}
        />
      )}

      <Text style={styles.label}>Selecciona un Destino</Text>
      <Picker selectedValue={destino} onValueChange={setDestino} style={styles.picker}>
        <Picker.Item label="Sur" value="sur" />
        <Picker.Item label="Norte" value="norte" />
      </Picker>

      <Button title="Crear Viaje" onPress={saveTrip} />
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
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    textAlign: 'center',
  },
});

export default ViajeScreen;
