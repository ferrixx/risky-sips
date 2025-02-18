import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { settings } from '../data/settings';

const StartScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Aktualisiere den Bildschirm, wenn er in den Fokus kommt
  }, [isFocused]);

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
        <Animatable.Text animation="bounceInDown" style={styles.animatedTitle}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </Animatable.Text>
        <Text style={styles.title}>Willkommen zum Trinkspiel!</Text>
        {settings.isPremium && (
          <Text style={styles.premiumText}>Premium Benutzer</Text>
        )}
        <Animatable.View animation="pulse" iterationCount="infinite">
          <TouchableOpacity style={styles.startButton} onPress={() => navigation.navigate('TypeSelection')}>
            <Text style={styles.startButtonText}>Wahrheit oder Pflicht starten</Text>
          </TouchableOpacity>
        </Animatable.View>
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
  logo: {
    width: 250,
    height: 100,
    marginBottom: 20,
  },
  animatedTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#00d1ff',
    marginBottom: 0,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 100,
    textAlign: 'center',
  },
  premiumText: {
    fontSize: 18,
    color: 'gold',
    marginBottom: 20,
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