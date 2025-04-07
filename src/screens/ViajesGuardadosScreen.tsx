import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ViajesGuardadosScreen = () => {
  // Datos estáticos de los viajes que siempre estarán ahí
  const viajesEstaticos = [
    {
      id: 1,
      ruta: 'Ruta 50',
      conductor: 'Juan Pérez',
      horaSalida: '08:00',
      horaLlegada: '12:00',
      estado: '🟩', // Estado del viaje, por ejemplo, verde (terminado correctamente)
      comentario: 'Viaje tranquilo, sin problemas.',
    },
    {
      id: 2,
      ruta: 'Ruta 25',
      conductor: 'María Gómez',
      horaSalida: '09:30',
      horaLlegada: '13:15',
      estado: '🟨', // Estado del viaje, por ejemplo, amarillo (retrasado)
      comentario: 'Retrasos por tráfico, pero todo salió bien.',
    },
    {
      id: 3,
      ruta: 'Ruta 50',
      conductor: 'Carlos Ruiz',
      horaSalida: '14:00',
      horaLlegada: '18:00',
      estado: '🟥', // Estado del viaje, por ejemplo, rojo (problema durante el viaje)
      comentario: 'Problemas técnicos, el viaje se retrasó considerablemente.',
    },
    {
      id: 4,
      ruta: 'Ruta 25',
      conductor: 'Ana Torres',
      horaSalida: '07:00',
      horaLlegada: '11:00',
      estado: '🟩', // Estado del viaje
      comentario: 'Viaje sin inconvenientes, todo en orden.',
    },
  ];

  // Estado para los viajes guardados, se combinan los estáticos y nuevos viajes
  const [viajesGuardados, setViajesGuardados] = useState(viajesEstaticos);

  // Función para agregar un nuevo viaje a la lista
  const agregarViaje = () => {
    const nuevoViaje = {
      id: viajesGuardados.length + 1,  // Generar un ID único
      ruta: 'Ruta 10',
      conductor: 'Felipe Martínez',
      horaSalida: '15:00',
      horaLlegada: '19:00',
      estado: '🟩',
      comentario: 'Viaje sin inconvenientes.',
    };

    setViajesGuardados([...viajesGuardados, nuevoViaje]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Viajes Guardados</Text>

      {viajesGuardados.map((viaje) => (
        <View key={viaje.id} style={styles.viajeContainer}>
          <Text style={styles.viajeText}>Ruta: {viaje.ruta}</Text>
          <Text style={styles.viajeText}>Conductor: {viaje.conductor}</Text>
          <Text style={styles.viajeText}>Hora de salida: {viaje.horaSalida}</Text>
          <Text style={styles.viajeText}>Hora de llegada: {viaje.horaLlegada}</Text>
          <Text style={styles.viajeText}>Estado: {viaje.estado}</Text>
          <Text style={styles.viajeText}>Comentario: {viaje.comentario}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.addButton} onPress={agregarViaje}>
        <Text style={styles.addButtonText}>Agregar Nuevo Viaje</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  viajeContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  viajeText: {
    fontSize: 16,
    marginVertical: 4,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ViajesGuardadosScreen;
