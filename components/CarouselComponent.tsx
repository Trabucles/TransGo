import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Image, StyleSheet, Button, Dimensions } from 'react-native';

const images = [
  require('../assets/images/viaje1.jpg'), 
  require('../assets/images/viaje2.jpg'),
  require('../assets/images/viaje3.jpg'),
  require('../assets/images/viaje4.jpg'), 
  require('../assets/images/viaje5.jpg'),
  require('../assets/images/viaje6.jpg'),
  require('../assets/images/viaje7.jpg'), 
  require('../assets/images/viaje8.jpg'),
  require('../assets/images/viaje9.jpg')
];

const CarouselComponent = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [isPaused, setIsPaused] = useState(false);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  const IMAGE_MARGIN = 10;
  const IMAGE_WIDTH = screenWidth / 3.5; // 3 imágenes visibles aprox
  const duplicatedImages = [...images, ...images]; // duplicar para loop
  const TOTAL_WIDTH = (IMAGE_WIDTH + IMAGE_MARGIN * 2) * duplicatedImages.length;

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenWidth(window.width);
    });

    return () => subscription?.remove();
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const animation = Animated.loop(
      Animated.timing(scrollX, {
        toValue: 1,
        duration: 20000,
        useNativeDriver: true
      })
    );

    animation.start();
    return () => animation.stop();
  }, [scrollX, isPaused]);

  const togglePauseResume = () => setIsPaused(prev => !prev);

  return (
    <View style={[styles.container, { height: IMAGE_WIDTH + 20 }]}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            transform: [
              {
                translateX: scrollX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -TOTAL_WIDTH / 2]
                })
              }
            ]
          }
        ]}
      >
        {duplicatedImages.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * 0.75,
              marginHorizontal: IMAGE_MARGIN,
              borderRadius: 10,
            }}
          />
        ))}
      </Animated.View>

      <View style={styles.buttonContainer}>
        <Button
          title={isPaused ? "Reanudar" : "Pausar"}
          onPress={togglePauseResume}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default CarouselComponent;
