import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { settings } from '../data/settings';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const levels = {
  duo: [
    { id: 1, name: 'truthordareLevel1', isFree: true, icon: 'game-controller' },
    { id: 2, name: 'truthordareLevel2', isFree: false, icon: 'beer' },
    { id: 3, name: 'truthordareLevel3', isFree: false, icon: 'skull-outline' },
    { id: 4, name: 'truthordareLevel4', isFree: false, icon: 'heart' },
    { id: 5, name: 'truthordareLevel5', isFree: false, icon: 'water' },
  ],
  friends: [
    { id: 1, name: 'truthordareLevel1', isFree: true, icon: 'game-controller' },
    { id: 2, name: 'truthordareLevel2', isFree: false, icon: 'beer' },
    { id: 3, name: 'truthordareLevel3', isFree: false, icon: 'skull-outline' },
    { id: 6, name: 'truthordareLevel6', isFree: false, icon: 'rose-outline' },
    { id: 7, name: 'truthordareLevel7', isFree: false, icon: 'leaf' },
  ],
};

const LevelSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, type } = route.params;
  const [selectedLevels, setSelectedLevels] = useState([]);

  const handleLevelSelect = (level) => {
    if (level.isFree || settings.isPremium) {
      setSelectedLevels((prevSelectedLevels) => {
        if (prevSelectedLevels.includes(level.id)) {
          return prevSelectedLevels.filter((id) => id !== level.id);
        } else {
          return [...prevSelectedLevels, level.id];
        }
      });
    } else {
      Alert.alert(
        'Level kaufen',
        'Dieses Level kostet echtes Geld. Möchtest du es kaufen?',
        [
          { text: 'Abbrechen', style: 'cancel' },
          { text: 'Kaufen', onPress: () => Alert.alert('Gekauft!', 'Viel Spaß mit dem Level!') }
        ]
      );
    }
  };

  const handleStartGame = () => {
    if (selectedLevels.length === 0) {
      Alert.alert('Keine Level ausgewählt', 'Bitte wähle mindestens ein Level aus.');
    } else {
      navigation.navigate('GameScreen', { levels: selectedLevels, players, type });
    }
  };

  return (
    <ImageBackground source={appdata.appBackground} style={styles.background}>
      <View style={styles.container}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>{getTranslation('truthordareLevelSelectionTitle')}</Animatable.Text>
        <FlatList 
          data={levels[type]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Animatable.View animation="fadeInUp" style={styles.levelItem}>
              <View style={styles.levelInfo}>
                <Ionicons name={item.icon} size={wp('6%')} color="#333" style={styles.levelIcon} />
                <Text style={styles.levelName}>{getTranslation(item.name)}</Text>
              </View>
              <TouchableOpacity 
                style={[
                  styles.playButton, 
                  item.isFree || settings.isPremium ? styles.freeButton : styles.paidButton,
                  selectedLevels.includes(item.id) && styles.selectedButton
                ]} 
                onPress={() => handleLevelSelect(item)}
              >
                <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.buttonText}>
                  {selectedLevels.includes(item.id) ? getTranslation('truthordareLevelSelected') : getTranslation('truthordareLevelSelect')}
                </Animatable.Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        />
        <TouchableOpacity style={styles.startGameButton} onPress={handleStartGame}>
          <Text style={styles.startGameButtonText}>{getTranslation('truthordareStartGame')}</Text>
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
    marginBottom: hp('2%'),
    textAlign: 'center',
    marginTop: hp('10%'),
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  levelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: wp('4%'),
    marginVertical: hp('1%'),
    backgroundColor: '#fff',
    borderRadius: wp('2.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    transform: [{ scale: 1 }],
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelIcon: {
    marginRight: wp('2%'),
  },
  levelName: {
    fontSize: wp('5%'),
    color: '#333',
    fontWeight: 'bold',
  },
  playButton: {
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2.5%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  freeButton: {
    backgroundColor: '#28a745',
  },
  paidButton: {
    backgroundColor: '#ffc107',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: 'white',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  startGameButton: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    backgroundColor: '#007bff',
  },
  startGameButtonText: {
    color: 'white',
    fontSize: wp('6%'),
    fontWeight: 'bold',
  },
});

export default LevelSelection;