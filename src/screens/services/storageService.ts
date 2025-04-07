import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY_CONDUCTOR_ID = 'conductorId';
const STORAGE_KEY_VIAJES = 'viajes'; // Para almacenar los viajes de los conductores

// Función para guardar el ID del conductor
export const saveConductorId = async (conductorId: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY_CONDUCTOR_ID, conductorId);
  } catch (error) {
    console.error('Error guardando el conductor ID:', error);
  }
};

// Función para recuperar el ID del conductor
export const getConductorId = async () => {
  try {
    const conductorId = await AsyncStorage.getItem(STORAGE_KEY_CONDUCTOR_ID);
    return conductorId;
  } catch (error) {
    console.error('Error obteniendo el conductor ID:', error);
  }
};

// Función para guardar un viaje específico para un conductor
export const saveViaje = async (conductorId: string, viaje: any) => {
  try {
    const viajesString = await AsyncStorage.getItem(STORAGE_KEY_VIAJES);
    const viajes = viajesString ? JSON.parse(viajesString) : {};

    // Agregar o actualizar el viaje del conductor
    viajes[conductorId] = viajes[conductorId] || [];
    viajes[conductorId].push(viaje);

    await AsyncStorage.setItem(STORAGE_KEY_VIAJES, JSON.stringify(viajes));
  } catch (error) {
    console.error('Error guardando el viaje:', error);
  }
};

// Función para obtener los viajes de un conductor específico
export const getViajesByConductor = async (conductorId: string) => {
  try {
    const viajesString = await AsyncStorage.getItem(STORAGE_KEY_VIAJES);
    const viajes = viajesString ? JSON.parse(viajesString) : {};

    return viajes[conductorId] || [];
  } catch (error) {
    console.error('Error obteniendo los viajes:', error);
    return [];
  }
};
