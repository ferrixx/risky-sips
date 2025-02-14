import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/MainNavigator';
import { useNavigation } from '@react-navigation/native';

type Question = {
  id: number;
  type: 'wahrheit' | 'pflicht';
  text: string;
};

const questions: Question[] = [
  { id: 1, type: 'wahrheit', text: 'Hast du jemals jemanden betrogen?' },
  { id: 2, type: 'wahrheit', text: 'Was war deine größte Lüge?' },
  { id: 3, type: 'pflicht', text: 'Trinke 3 Schlücke!' },
  { id: 4, type: 'pflicht', text: 'Umarme die Person links von dir!' },
];

type GameScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const navigation = useNavigation<GameScreenNavigationProp>();
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const getRandomQuestion = (type: 'wahrheit' | 'pflicht') => {
    const filteredQuestions = questions.filter(q => q.type === type);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setCurrentQuestion(filteredQuestions[randomIndex]);
  };

  const handleNext = () => {
    setCurrentQuestion(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wahrheit oder Pflicht</Text>
      {!currentQuestion ? (
        <>
          <Button title="Wahrheit" onPress={() => getRandomQuestion('wahrheit')} />
          <Button title="Pflicht" onPress={() => getRandomQuestion('pflicht')} />
        </>
      ) : (
        <>
          <Text style={styles.questionText}>{currentQuestion.text}</Text>
          <Button title="Nächste Frage" onPress={handleNext} />
        </>
      )}
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
  questionText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
  },
});

export default GameScreen;
