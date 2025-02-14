import React from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type Level = {
  id: number;
  name: string;
  isFree: boolean;
};

type LevelSelectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'LevelSelection'>;

const levels: Level[] = [
  { id: 1, name: 'Basic (Gratis)', isFree: true },
  { id: 2, name: 'Crazy Challenges', isFree: false },
  { id: 3, name: 'Dirty Secrets', isFree: false },
  { id: 4, name: 'Party Extrem', isFree: false },
];

const LevelSelection = () => {
  const navigation = useNavigation<LevelSelectionNavigationProp>();

  const handleLevelSelect = (level: Level) => {
    if (level.isFree) {
      navigation.navigate('GameScreen');
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
    <View style={styles.container}>
      <Text style={styles.title}>Level auswählen</Text>
      <FlatList 
        data={levels}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.levelItem}>
            <Text style={styles.levelName}>{item.name}</Text>
            <Button 
              title="Spielen" 
              onPress={() => handleLevelSelect(item)} 
              color={item.isFree ? '#28a745' : '#ffc107'}
            />
          </View>
        )}
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
  },
  levelName: {
    fontSize: 20,
  },
});

export default LevelSelection;
