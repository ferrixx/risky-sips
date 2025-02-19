import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { settings } from '../data/settings';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [randomPlayerSelection, setRandomPlayerSelection] = useState(settings.randomPlayerSelection);
  const [language, setLanguage] = useState(settings.language);
  const [maxPoints, setMaxPoints] = useState(settings.maxPoints.toString());
  const [maxTime, setMaxTime] = useState(settings.maxTime.toString());
  const [isPremium, setIsPremium] = useState(settings.isPremium);

  const toggleRandomPlayerSelection = () => {
    const newValue = !randomPlayerSelection;
    setRandomPlayerSelection(newValue);
    settings.randomPlayerSelection = newValue;
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    settings.language = newLanguage;
  };

  const changeMaxPoints = (newMaxPoints) => {
    setMaxPoints(newMaxPoints);
  };

  const changeMaxTime = (newMaxTime) => {
    setMaxTime(newMaxTime);
  };

  const togglePremium = () => {
    const newValue = !isPremium;
    setIsPremium(newValue);
    settings.isPremium = newValue;
  };

  const saveSettings = () => {
    settings.maxPoints = parseInt(maxPoints, 10);
    Alert.alert(getTranslation('settingsSavedHead'), getTranslation('settingsSavedText'), [
      {
        text: 'OK',
        onPress: () => navigation.navigate('StartScreen'),
      },
    ]);
  };

  return (
      <ImageBackground source={appdata.appBackground} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTranslation('settingsTitle')}</Text>
        <Text style={styles.catTitle}>{getTranslation('truthordareSettingsTitle')}</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{getTranslation('settingsRandomPlayer')}:</Text>
          <Switch
            value={randomPlayerSelection}
            onValueChange={toggleRandomPlayerSelection}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{getTranslation('settingsMaxPoints')}:</Text>
          <TextInput
            style={styles.input}
            value={maxPoints}
            onChangeText={changeMaxPoints}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{getTranslation('settingsMaxTime')}:</Text>
          <Text style={styles.settingsubText}>{getTranslation('settingsMaxTimeSub')}:</Text>
          <TextInput
            style={styles.input}
            value={maxTime}
            onChangeText={changeMaxTime}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.catTitle}>{getTranslation('generelSettingsTitle')}</Text>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{getTranslation('settingsLanguage')}</Text>
          <View style={styles.languageContainer}>
            <TouchableOpacity onPress={() => changeLanguage('de_DE')}>
              <Text style={[styles.flag, language === 'de_DE' ? styles.activeFlag : styles.inactiveFlag]}>
                🇩🇪
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeLanguage('en_US')}>
              <Text style={[styles.flag, language === 'en_US' ? styles.activeFlag : styles.inactiveFlag]}>
                🇺🇸
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.settingText}>{getTranslation('settingsPremium')}</Text>
          <Switch
            value={isPremium}
            onValueChange={togglePremium}
          />
        </View>
        <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
          <Text style={styles.saveButtonText}>{getTranslation('settingsSave')}</Text>
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 50,
  },
  catTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  settingText: {
    fontSize: 20,
    color: 'white',
  },
  settingsubText: {
    marginTop: 25,
    fontSize: 12,
    color: 'white',
  },
  languageContainer: {
    flexDirection: 'row',
  },
  flag: {
    fontSize: 40,
    marginHorizontal: 10,
  },
  activeFlag: {
    opacity: 1,
  },
  inactiveFlag: {
    opacity: 0.5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 100,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;