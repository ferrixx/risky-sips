import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type Player = {
  id: number;
  name: string;
  gender: 'männlich' | 'weiblich';
};

type PlayerSetupNavigationProp = NativeStackNavigationProp<RootStackParamList, 'PlayerSetup'>;

const PlayerSetup = () => {
  const navigation = useNavigation<PlayerSetupNavigationProp>();
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState('');
  const [gender, setGender] = useState<'männlich' | 'weiblich'>('männlich');

  const addPlayer = () => {
    if (name.trim() === '') return;
    setPlayers([...players, { id: players.length + 1, name, gender }]);
    setName('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spieler hinzufügen</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Name" 
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Button 
          title="Männlich" 
          onPress={() => setGender('männlich')} 
          color={gender === 'männlich' ? '#007bff' : '#ccc'}
        />
        <Button 
          title="Weiblich" 
          onPress={() => setGender('weiblich')} 
          color={gender === 'weiblich' ? '#e83e8c' : '#ccc'}
        />
      </View>
      <Button title="Hinzufügen" onPress={addPlayer} />

      <FlatList 
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.playerItem}>
            {item.name} ({item.gender})
          </Text>
        )}
      />

      <Button 
        title="Weiter" 
        onPress={() => navigation.navigate('LevelSelection')} 
        disabled={players.length < 2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playerItem: {
    fontSize: 18,
    paddingVertical: 5,
  },
});

export default PlayerSetup;
