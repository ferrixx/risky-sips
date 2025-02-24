import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTranslation } from '../utils/translationHelper';
import { settings } from '../data/settings';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DiceScreen = () => {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const isPremium = settings.isPremium; // Replace with actual premium status check

  const handleOkPress = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleDiceSelection = (type) => {
    if (type === 'Naughty' && !isPremium) {
      Alert.alert(getTranslation('premiumFeatureHead'), getTranslation('premiumFeatureText'));
      return;
    }
    navigation.navigate('DiceGameScreen', { type });
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {step === 1 ? (
          <>
            <Text style={styles.message}>{getTranslation('couplesOnlyMessage')}</Text>
            <TouchableOpacity style={styles.okButton} onPress={handleOkPress}>
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.message}>{getTranslation('selectDiceMessage')}</Text>
            <TouchableOpacity style={styles.diceButton} onPress={() => handleDiceSelection('Romantic')}>
              <Text style={styles.diceButtonText}>{getTranslation('romanticDice')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.diceButton} onPress={() => handleDiceSelection('Naughty')}>
              <Text style={styles.diceButtonText}>{getTranslation('naughtyDice')}</Text>
            </TouchableOpacity>
          </>
        )}
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
  message: {
    fontSize: wp('8%'),
    color: '#ff41fc',
    marginBottom: hp('2%'),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  okButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
  },
  okButtonText: {
    color: 'white',
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  diceButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
  },
  diceButtonText: {
    color: 'white',
    fontSize: wp('7%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DiceScreen;