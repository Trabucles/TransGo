import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const screenWidth = Dimensions.get('window').width;

const SimuladorScreen = () => {
  const carPosition = useRef(new Animated.Value(0)).current;
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [distance, setDistance] = useState(0);
  const [bitacora, setBitacora] = useState<string>('');
  const [showBitacora, setShowBitacora] = useState(false);
  const [buttonLabel, setButtonLabel] = useState<'Inicio' | 'Pausar' | 'Continuar'>('Inicio');
  const [currentX, setCurrentX] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [color, setColor] = useState<string>('green');
  const [isTripEnded, setIsTripEnded] = useState(false);
  const [comentarioFinal, setComentarioFinal] = useState('');
  const [viajeFinalizado, setViajeFinalizado] = useState(false);

  const images = [
    require('../../../assets/images/inicio.jpg'),
    require('../../../assets/images/viaje1.jpg'),
    require('../../../assets/images/viaje2.jpg'),
    require('../../../assets/images/viaje3.jpg'),
    require('../../../assets/images/viaje4.jpg'),
    require('../../../assets/images/viaje5.jpg'),
    require('../../../assets/images/viaje6.jpg'),
    require('../../../assets/images/viaje7.jpg'),
    require('../../../assets/images/viaje8.jpg'),
    require('../../../assets/images/fin.jpg'),
  ];

  const getImageIndex = (currentPosition: number) => {
    const percentage = (currentPosition / (screenWidth - 100)) * 100;
    if (percentage < 10) return 0;
    if (percentage < 20) return 1;
    if (percentage < 30) return 2;
    if (percentage < 40) return 3;
    if (percentage < 50) return 4;
    if (percentage < 60) return 5;
    if (percentage < 70) return 6;
    if (percentage < 80) return 7;
    if (percentage < 90) return 8;
    if (percentage < 100) return 9;
    return 9;
  };

  useEffect(() => {
    carPosition.addListener((e) => {
      const imageIndex = getImageIndex(e.value);
      if (imageIndex !== currentImageIndex) {
        setCurrentImageIndex(imageIndex);
      }
    });
    return () => {
      carPosition.removeAllListeners();
    };
  }, [currentImageIndex, carPosition]);

  const handleTripAction = () => {
    if (buttonLabel === 'Inicio') {
      setStartTime(new Date());
      setShowBitacora(false);
      setBitacora('');
      setCurrentX(0);
      setIsTripEnded(false);
      setViajeFinalizado(false);
      setComentarioFinal('');
      carPosition.setValue(0);
      animateCar(0);
      setButtonLabel('Pausar');
      logBitacora('Viaje iniciado');
    } else if (buttonLabel === 'Pausar') {
      animationRef.current?.stop();
      carPosition.stopAnimation(value => setCurrentX(value));
      setButtonLabel('Continuar');
      logBitacora('Viaje pausado');
    } else if (buttonLabel === 'Continuar') {
      animateCar(currentX);
      setButtonLabel('Pausar');
      logBitacora('Viaje reanudado');
    }
  };

  const animateCar = (fromValue: number) => {
    const remainingDistance = screenWidth - 100 - fromValue;
    const remainingDuration = 10000 * (remainingDistance / (screenWidth - 100));

    animationRef.current = Animated.timing(carPosition, {
      toValue: screenWidth - 100,
      duration: remainingDuration,
      useNativeDriver: true,
    });

    animationRef.current.start(() => {
      setEndTime(new Date()); // Marca la hora de finalización
      setButtonLabel('Inicio');
      setShowBitacora(true);
      setIsTripEnded(true);
      setViajeFinalizado(true);
    });
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);

    let colorEmoji = '';
    switch (newColor) {
      case 'green':
        colorEmoji = '🟩';
        break;
      case 'yellow':
        colorEmoji = '🟨';
        break;
      case 'red':
        colorEmoji = '🟥';
        break;
      default:
        colorEmoji = '⚪';
    }
    
    logBitacora(`Estado del viaje: ${colorEmoji}`);
  };

  const logBitacora = (message: string) => {
    setBitacora((prev) => `${prev}\n${new Date().toLocaleTimeString()}: ${message}`);
  };

  const finalizarViaje = () => {
    const viajeFinalizadoMessage = `Viaje finalizado a las ${endTime?.toLocaleTimeString()}`;
    logBitacora(viajeFinalizadoMessage);
    logBitacora(`Estado final del viaje: ${color === 'green' ? '🟩' : color === 'yellow' ? '🟨' : '🟥'}`);
    logBitacora(`Comentario final: ${comentarioFinal}`);
    Alert.alert('¡Viaje Finalizado!', 'El comentario y el estado del viaje se han guardado.');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Simulador de Viaje</Text>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Hora de inicio: {startTime?.toLocaleTimeString() || '—'}</Text>
        </View>

        <View style={styles.line}>
          <Animated.Image
            source={require('../../../assets/images/bus-icon.jpg')}
            style={[styles.car, { transform: [{ translateX: carPosition }] }]}/>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleTripAction}>
          <Text style={styles.buttonText}>{buttonLabel}</Text>
        </TouchableOpacity>

        <View style={styles.imageContainer}>
          <Image source={images[currentImageIndex]} style={styles.image} />
        </View>

        {isTripEnded && showBitacora && (
          <View style={styles.bitacoraContainer}>
            <Text style={styles.bitacoraText}>Bitácora del viaje:</Text>
            <Text style={styles.bitacoraText}>{bitacora}</Text>
          </View>
        )}

        {isTripEnded && (
          <View style={styles.colorPickerContainer}>
            <Text>Selecciona un color para el estado del viaje:</Text>
            <Picker selectedValue={color} style={styles.picker} onValueChange={handleColorChange}>
              <Picker.Item label="Verde" value="green" />
              <Picker.Item label="Amarillo" value="yellow" />
              <Picker.Item label="Rojo" value="red" />
            </Picker>

            <View style={[styles.colorCircle, { backgroundColor: color }]} />

            <Text style={{ marginTop: 20 }}>Comentario final del conductor:</Text>
            <TextInput
              style={styles.input}
              value={comentarioFinal}
              onChangeText={setComentarioFinal}
              placeholder="Escribe un comentario..."
              multiline
            />

            <TouchableOpacity style={styles.finalizarButton} onPress={finalizarViaje}>
              <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 40,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
  line: {
    height: 80,
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 40,
    marginBottom: 10,
  },
  car: {
    width: 60,
    height: 40,
    position: 'absolute',
    top: 20,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#3A86FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 12,
  },
  colorPickerContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  picker: {
    width: 200,
    height: 50,
  },
  colorCircle: {
    marginTop: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#000',
  },
  bitacoraContainer: {
    marginVertical: 20,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
  },
  bitacoraText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    height: 80,
    width: '90%',
    textAlignVertical: 'top',
  },
  finalizarButton: {
    marginTop: 15,
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 10,
  },
});

export default SimuladorScreen;
