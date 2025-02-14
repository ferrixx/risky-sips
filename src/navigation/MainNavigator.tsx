import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainMenu from '../screens/MainMenu';
import TypeSelection from '../screens/TypeSelection';
import PlayerSetup from '../screens/PlayerSetup';
import LevelSelection from '../screens/LevelSelection';
import GameScreen from '../screens/GameScreen';
import EndScreen from '../screens/EndScreen';

export type RootStackParamList = {
  MainMenu: undefined;
  TypeSelection: undefined;
  PlayerSetup: undefined;
  LevelSelection: undefined;
  GameScreen: undefined;
  EndScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainMenu">
        <Stack.Screen name="MainMenu" component={MainMenu} options={{ title: 'Wahrheit oder Pflicht' }} />
        <Stack.Screen name="TypeSelection" component={TypeSelection} options={{ title: 'Modus wählen' }} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetup} options={{ title: 'Spieler eingeben' }} />
        <Stack.Screen name="LevelSelection" component={LevelSelection} options={{ title: 'Level auswählen' }} />
        <Stack.Screen name="GameScreen" component={GameScreen} options={{ title: 'Spiel' }} />
        <Stack.Screen name="EndScreen" component={EndScreen} options={{ title: 'Spiel Ende' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
