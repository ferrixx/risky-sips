import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { settings } from '../data/settings';
import Constants from 'expo-constants';
import { getTranslation } from '../utils/translationHelper';
import { appdata } from '../data/appdata';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const StartScreen = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Aktualisiere den Bildschirm, wenn er in den Fokus kommt
  }, [isFocused]);

  const handleBottleSpinPress = () => {
    Alert.alert(getTranslation('developmentTitle'), getTranslation('developmentMessage'));
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('SettingsScreen')}>
          <Ionicons name="settings" size={wp('6%')} color="white" />
        </TouchableOpacity>
        <Animatable.Text animation="bounceInDown" style={styles.animatedTitle}>
          <Image source={require('../../assets/logo.png')} style={styles.logo} />
        </Animatable.Text>
        <Text style={styles.title}>{getTranslation('welcome')}</Text>
        {settings.isPremium && (
          <Text style={styles.premiumText}>{getTranslation('premiumUser')}</Text>
        )}
        <Animatable.View animation="pulse" iterationCount="infinite">
          <TouchableOpacity style={styles.startButtonTruthorDare} onPress={() => navigation.navigate('TypeSelection')}>
            <Text style={styles.startButtonText}>{getTranslation('truthordareStart')}</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="pulse" iterationCount="infinite">
          <TouchableOpacity style={styles.startButtonBottleSpin} onPress={handleBottleSpinPress}>
            <Text style={styles.startButtonText}>{getTranslation('bottlespinStart')}</Text>
          </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="pulse" iterationCount="infinite">
          <TouchableOpacity style={styles.startButtonDice} onPress={() => navigation.navigate('DiceScreen')}>
            <Text style={styles.startButtonText}>{getTranslation('diceStart')}</Text>
          </TouchableOpacity>
        </Animatable.View>
        
        {!settings.isPremium && (
        <Animatable.View animation="pulse" iterationCount="infinite">
          <TouchableOpacity style={styles.storeButton} onPress={() => navigation.navigate('StoreScreen')}>
            <Text style={styles.startButtonText}>{getTranslation('storeButton')}</Text>
          </TouchableOpacity>
        </Animatable.View>
        )}
        <Text style={styles.version}>{getTranslation('version')}: {appdata.version}</Text>
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
    padding: wp('5%'),
    width: '100%',
  },
  settingsButton: {
    position: 'absolute',
    top: hp('5%'),
    left: wp('5%'),
  },
  logo: {
    width: wp('80%'),
    height: hp('15%'),
    marginBottom: hp('2%'),
  },
  animatedTitle: {
    fontSize: wp('10%'),
    fontWeight: 'bold',
    color: '#00d1ff',
    marginBottom: 0,
    textAlign: 'center',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('10%'),
    textAlign: 'center',
  },
  premiumText: {
    fontSize: wp('4.5%'),
    color: 'gold',
    marginBottom: hp('2%'),
  },
  startButtonTruthorDare: {
    backgroundColor: '#00d1ff',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
  },
  startButtonBottleSpin: {
    backgroundColor: '#a6ff00',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
  },
  startButtonDice: {
    backgroundColor: '#e83e8c',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  storeButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
    textAlign: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  version: {
    position: 'absolute',
    bottom: hp('2%'),
    left: wp('5%'),
    fontSize: wp('5%'),
    color: '#fff',
  },
});

export default StartScreen;