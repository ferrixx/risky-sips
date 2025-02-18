import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';

const PlayerSetup = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [players, setPlayers] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { type } = route.params;

  const addPlayer = () => {
    if (name && gender) {
      setPlayers([...players, { id: players.length + 1, name, gender }]);
      setName('');
      setGender('');
    }
  };

  const removePlayer = (id) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
        <ImageBackground source={appdata.appBackground} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTranslation('truthordarePlayerSetupTitle')}</Text>
        <TextInput 
          style={styles.input} 
          placeholder={getTranslation('truthordarePlayerName')} 
          value={name}
          onChangeText={setName}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'männlich' && styles.selectedButton]} 
            onPress={() => setGender('männlich')}
          >
            <Text style={styles.buttonText}>{getTranslation('truthordarePlayerMan')}</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.genderButton, gender === 'weiblich' && styles.selectedButton]} 
            onPress={() => setGender('weiblich')}
          >
            <Text style={styles.buttonText}>{getTranslation('truthordarePlayerGirl')}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={addPlayer}>
          <Text style={styles.buttonText}>{getTranslation('truthordarePlayerAdd')}</Text>
        </TouchableOpacity>

        <FlatList 
          data={players}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.playerItemContainer}>
              <Text style={styles.playerItem}>
                {item.name} ({item.gender})
              </Text>
              <TouchableOpacity onPress={() => removePlayer(item.id)}>
                <Ionicons name="close-circle" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity 
          style={[styles.nextButton, players.length < 2 && styles.disabledButton]} 
          onPress={() => navigation.navigate('LevelSelection', { players, type })} 
          disabled={players.length < 2}
        >
          <Text style={styles.buttonText}>{getTranslation('truthordarePlayerSetupNext')}</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 100,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '80%',
  },
  genderButton: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  addButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 300,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: 5,
  },
  playerItem: {
    fontSize: 30,
    color: 'white',
  },
});

export default PlayerSetup;