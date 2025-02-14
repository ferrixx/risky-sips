import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type MainMenuNavigationProp = NativeStackNavigationProp<RootStackParamList, 'MainMenu'>;

const MainMenu = () => {
  const navigation = useNavigation<MainMenuNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wahrheit oder Pflicht</Text>
      <Button 
        title="Spiel starten" 
        onPress={() => navigation.navigate('TypeSelection')} 
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
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default MainMenu;
