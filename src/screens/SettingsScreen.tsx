import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { settings } from '../data/settings';

const SettingsScreen = () => {
  const [randomPlayerSelection, setRandomPlayerSelection] = useState(settings.randomPlayerSelection);

  const toggleRandomPlayerSelection = () => {
    const newValue = !randomPlayerSelection;
    setRandomPlayerSelection(newValue);
    settings.randomPlayerSelection = newValue;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einstellungen</Text>
      <View style={styles.settingItem}>
        <Text style={styles.settingText}>Zufällige Spielerwahl</Text>
        <Switch
          value={randomPlayerSelection}
          onValueChange={toggleRandomPlayerSelection}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingText: {
    fontSize: 18,
  },
});

export default SettingsScreen;