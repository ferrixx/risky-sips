import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { settings } from '../data/settings';
import * as Animatable from 'react-native-animatable';
import { Ionicons } from '@expo/vector-icons';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';

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

  const handleLevelSelect = (level) => {
    if (level.isFree || settings.isPremium) {
      navigation.navigate('GameScreen', { level: level.id, players, type });
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
                <Ionicons name={item.icon} size={24} color="#333" style={styles.levelIcon} />
                <Text style={styles.levelName}>{getTranslation(item.name)}</Text>
              </View>
              <TouchableOpacity 
                style={[styles.playButton, item.isFree || settings.isPremium ? styles.freeButton : styles.paidButton]} 
                onPress={() => handleLevelSelect(item)}
              >
                <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.buttonText}>{getTranslation('truthordareLevelSelect')}</Animatable.Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        />
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
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 50,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  levelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
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
    marginRight: 10,
  },
  levelName: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
  },
  playButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
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
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default LevelSelection;