import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';

const TypeSelection = () => {
  const navigation = useNavigation();

  return (
      <ImageBackground source={appdata.appBackground} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTranslation('truthordareTitle')}</Text>
        <TouchableOpacity style={[styles.button, styles.duoButton]} onPress={() => navigation.navigate('PlayerSetup', { type: 'duo' })}>
          <Text style={styles.buttonText}>{getTranslation('truthordareDuo')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.friendsButton]} onPress={() => navigation.navigate('PlayerSetup', { type: 'friends' })}>
          <Text style={styles.buttonText}>{getTranslation('truthordareFriends')}</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
    textAlign: 'center',
    marginTop: 50,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  duoButton: {
    backgroundColor: '#ff69b4',
  },
  friendsButton: {
    backgroundColor: '#1e90ff',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default TypeSelection;