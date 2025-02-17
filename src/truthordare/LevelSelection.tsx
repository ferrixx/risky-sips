import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { settings } from '../data/settings';

const levels = {
  duo: [
    { id: 1, name: 'Romantisch (Gratis)', isFree: true },
    { id: 2, name: 'Intime Fragen', isFree: false },
    { id: 3, name: 'Paare Herausforderungen', isFree: false },
  ],
  friends: [
    { id: 1, name: 'Basic (Gratis)', isFree: true },
    { id: 2, name: 'Challenges', isFree: false },
    { id: 3, name: 'Dirty Secrets', isFree: false },
    { id: 4, name: 'Party Extrem', isFree: false },
  ],
};

const LevelSelection = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, type } = route.params;

  const handleLevelSelect = (level) => {
    if (level.isFree || settings.isPremium) {
      navigation.navigate('GameScreen', { level: level.id, players });
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
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Level auswählen</Text>
        <FlatList 
          data={levels[type]}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.levelItem}>
              <Text style={styles.levelName}>{item.name}</Text>
              <TouchableOpacity 
                style={[styles.playButton, item.isFree || settings.isPremium ? styles.freeButton : styles.paidButton]} 
                onPress={() => handleLevelSelect(item)}
              >
                <Text style={styles.buttonText}>Spielen</Text>
              </TouchableOpacity>
            </View>
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
  },
  levelItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    width: '100%',
  },
  levelName: {
    fontSize: 20,
    color: '#333',
  },
  playButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
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
  },
});

export default LevelSelection;