// app/screens/ConductorHomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Viaje {
  id: string;
  selectedRuta: string;
  selectedConductor: string;
  selectedAutobus: string;
  destino: string;
  horaSalida: string;
  horaLlegada: string;
  fecha: string;
}

const ConductorHomeScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const [viajesConductor, setViajesConductor] = useState<Viaje[]>([]);
  const conductorId = route.params?.conductorId;

  useEffect(() => {
    const loadViajes = async () => {
      try {
        const storedViajes = await AsyncStorage.getItem('viajes');
        if (storedViajes) {
          const viajes: Viaje[] = JSON.parse(storedViajes);
          const viajesAsignados = viajes.filter((viaje) => viaje.selectedConductor === conductorId);
          setViajesConductor(viajesAsignados);
        }
      } catch (error) {
        console.error('Error cargando los viajes', error);
      }
    };

    loadViajes();
  }, [conductorId]);

  const handleViajeSelect = (viaje: Viaje) => {
    navigation.navigate('Simulador', { viaje });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Viajes Asignados</Text>
      {viajesConductor.length === 0 ? (
        <Text>No hay viajes asignados.</Text>
      ) : (
        <FlatList
          data={viajesConductor}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.viajeItem} onPress={() => handleViajeSelect(item)}>
              <Text style={styles.viajeText}>Ruta: {item.selectedRuta}</Text>
              <Text style={styles.viajeText}>Autobús: {item.selectedAutobus}</Text>
              <Text style={styles.viajeText}>Destino: {item.destino}</Text>
              <Text style={styles.viajeText}>Hora de salida: {item.horaSalida}</Text>
              <Text style={styles.viajeText}>Hora de llegada: {item.horaLlegada}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f0f0f0' },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  viajeItem: { padding: 15, backgroundColor: '#ddd', marginBottom: 10, borderRadius: 5 },
  viajeText: { fontSize: 14 },
});

export default ConductorHomeScreen;
