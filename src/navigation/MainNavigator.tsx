import React, { lazy, Suspense } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from '../screens/LoadingScreen'; // Optional: Ein Ladebildschirm

const StartScreen = lazy(() => import('../screens/StartScreen'));
const StoreScreen = lazy(() => import('../store/StoreScreen'));
const TypeSelection = lazy(() => import('../truthordare/TypeSelection'));
const PlayerSetup = lazy(() => import('../truthordare/PlayerSetup'));
const LevelSelection = lazy(() => import('../truthordare/LevelSelection'));
const GameScreen = lazy(() => import('../truthordare/GameScreen'));
const SettingsScreen = lazy(() => import('../screens/SettingsScreen'));
const DiceScreen = lazy(() => import('../dice/DiceScreen'));
const DiceGameScreen = lazy(() => import('../dice/GameScreen'));

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Suspense fallback={<LoadingScreen />}>
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
      </Suspense>
    </NavigationContainer>
  );
};

export default MainNavigator;