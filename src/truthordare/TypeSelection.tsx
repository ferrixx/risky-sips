import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    padding: wp('5%'),
    width: '100%',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('5%'),
    textAlign: 'center',
    marginTop: hp('10%'),
  },
  button: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginVertical: hp('1%'),
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
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
  },
});

export default TypeSelection;