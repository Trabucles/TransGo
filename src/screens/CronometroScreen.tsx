// src/screens/CronometroScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CronometroScreen = () => {
  const [tiempoRestante, setTiempoRestante] = useState<number>(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Cargar el tiempo estimado desde AsyncStorage
  useEffect(() => {
    const loadTripData = async () => {
      try {
        const viajesData = await AsyncStorage.getItem('viajes');
        const viajes = viajesData ? JSON.parse(viajesData) : [];
        const lastTrip = viajes[viajes.length - 1];
        const { tiempoEstimado } = lastTrip;
        const totalSeconds = tiempoEstimado.horas * 3600 + tiempoEstimado.minutos * 60;
        setTiempoRestante(totalSeconds);
      } catch (error) {
        console.error('Error loading trip data:', error);
      }
    };

    loadTripData();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const startTimer = () => {
    if (isRunning) return;

    setIsRunning(true);
    const interval = setInterval(() => {
      setTiempoRestante((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          Alert.alert('¡Tiempo agotado!');
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    setIntervalId(interval);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setTiempoRestante(0);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsLeft = seconds % 60;
    return `${hours}:${minutes}:${secondsLeft}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cronómetro</Text>
      <Text style={styles.time}>{formatTime(tiempoRestante)}</Text>
      <Button title={isRunning ? 'Pausar' : 'Iniciar'} onPress={startTimer} />
      <Button title="Detener" onPress={stopTimer} />
      <Button title="Reiniciar" onPress={resetTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  time: {
    fontSize: 48,
    marginVertical: 20,
  },
});

export default CronometroScreen;

