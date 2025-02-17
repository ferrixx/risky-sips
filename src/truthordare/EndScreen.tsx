import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type Player = {
  id: number;
  name: string;
  points: number;
};

const players: Player[] = [
  { id: 1, name: 'Max', points: 120 },
  { id: 2, name: 'Lisa', points: 200 },
  { id: 3, name: 'Tom', points: 85 },
];

type EndScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EndScreen'>;

const EndScreen = () => {
  const navigation = useNavigation<EndScreenNavigationProp>();

  const getWinner = () => {
    return players.reduce((prev, current) => (prev.points > current.points) ? prev : current);
  };

  const winner = getWinner();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Spiel beendet!</Text>
      <Text style={styles.subtitle}>Der Gewinner ist:</Text>
      <Text style={styles.winnerName}>{winner.name}</Text>
      <Text style={styles.winnerPoints}>{winner.points} Punkte</Text>

      <Text style={styles.subtitle}>Endstand:</Text>
      <FlatList 
        data={players}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.playerItem}>
            {item.name}: {item.points} Punkte
          </Text>
        )}
      />

      <Button 
        title="Zurück zum Hauptmenü" 
        onPress={() => navigation.navigate('MainMenu')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  winnerName: {
    fontSize: 28,
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: 10,
  },
  winnerPoints: {
    fontSize: 22,
    color: '#6c757d',
    marginBottom: 30,
  },
  playerItem: {
    fontSize: 20,
    paddingVertical: 5,
  },
});

export default EndScreen;
