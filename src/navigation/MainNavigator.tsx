import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import StartScreen from '../screens/StartScreen';
import StoreScreen from '../store/StoreScreen';
import TypeSelection from '../truthordare/TypeSelection';
import PlayerSetup from '../truthordare/PlayerSetup';
import LevelSelection from '../truthordare/LevelSelection';
import GameScreen from '../truthordare/GameScreen';
import SettingsScreen from '../screens/SettingsScreen';
import DiceScreen from '../dice/DiceScreen';
import DiceGameScreen from '../dice/GameScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="StartScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="TypeSelection" component={TypeSelection} />
        <Stack.Screen name="PlayerSetup" component={PlayerSetup} />
        <Stack.Screen name="LevelSelection" component={LevelSelection} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="DiceScreen" component={DiceScreen} />
        <Stack.Screen name="DiceGameScreen" component={DiceGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;