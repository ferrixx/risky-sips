import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { getTranslation } from '../utils/translationHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GameScreen = ({ route }) => {
  const { type } = route.params;
  const bodyParts = type === 'Romantic' ? ['Lips', 'Neck', 'Ears', 'Hands', 'Feet'] : ['Lips', 'Neck', 'Ears', 'Hands', 'Feet'];
  const actions = type === 'Romantic' ? ['Boobs', 'Butt', 'Thighs', 'Chest', 'Back', 'Intim'] : ['Squeeze', 'Span', 'Lick', 'Pinch', 'Rub', 'Nibble'];

  const [bodyPart, setBodyPart] = useState('');
  const [action, setAction] = useState('');
  const [isRolling, setIsRolling] = useState(false);

  const startRolling = () => {
    setIsRolling(true);
    const interval = setInterval(() => {
      const randomBodyPart = bodyParts[Math.floor(Math.random() * bodyParts.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setBodyPart(randomBodyPart);
      setAction(randomAction);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setIsRolling(false);
    }, 3000);
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTranslation('resultTitle')}</Text>
        {isRolling ? (
          <Text style={styles.resultText}>{`${getTranslation(bodyPart)} - ${getTranslation(action)}`}</Text>
        ) : (
          <>
            <Text style={styles.resultText}>{`${getTranslation(bodyPart)} - ${getTranslation(action)}`}</Text>
            <TouchableOpacity style={styles.startButton} onPress={startRolling}>
              <Text style={styles.startButtonText}>{getTranslation('startButton')}</Text>
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
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  resultText: {
    fontSize: wp('10%'),
    color: 'white',
    marginBottom: hp('3%'),
    marginTop: hp('3%'),
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2%'),
  },
  startButtonText: {
    color: 'white',
    fontSize: wp('8%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;