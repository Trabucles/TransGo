// src/screens/Usuarios/UsuariosScreen.tsx

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsuarioHomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pantalla de Usuarios</Text>
      {/* Aquí puedes agregar más contenido o funcionalidad */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default UsuarioHomeScreen;
