import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/StartScreen';
import TypeSelection from '../screens/TypeSelection';
import PlayerSetup from '../screens/PlayerSetup';
import LevelSelection from '../screens/LevelSelection';
import GameScreen from '../screens/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen">
        <Stack.Screen name="StartScreen" component={StartScreen} options={{ title: 'Start' }} />
        <Stack.Screen name="TypeSelection" component={TypeSelection} options={{ title: 'Spieltyp Auswahl' }} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetup} options={{ title: 'Spieler Setup' }} />
        <Stack.Screen name="LevelSelection" component={LevelSelection} options={{ title: 'Level Auswahl' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Spiel' }} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ title: 'Einstellungen' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;