import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
        <Animatable.Text animation="bounceInDown" style={styles.animatedTitle}>
          Risky Sips
        </Animatable.Text>
        <Text style={styles.title}>Willkommen zum Trinkspiel!</Text>
        <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('TypeSelection')}>
          <Text style={styles.startButtonText}>Spiel starten</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width: '100%',
  },
  settingsButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  animatedTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00d1ff',
    marginBottom: 20,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StartScreen;