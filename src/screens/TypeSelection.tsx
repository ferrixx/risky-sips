import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type TypeSelectionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'TypeSelection'>;

const TypeSelection = () => {
  const navigation = useNavigation<TypeSelectionNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wie wollt ihr spielen?</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="Freunde" 
          onPress={() => navigation.navigate('PlayerSetup')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button 
          title="Duo (Paar)" 
          onPress={() => navigation.navigate('PlayerSetup')} 
        />
      </View>
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '60%',
  },
});

export default TypeSelection;
