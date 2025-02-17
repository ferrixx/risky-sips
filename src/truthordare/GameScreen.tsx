import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/MainNavigator';
import ConfettiCannon from 'react-native-confetti-cannon';
import { questions } from '../data/questions';
import { settings } from '../data/settings';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation();
  const { level, players: initialPlayers, type } = route.params ?? { level: 1, players: [], type: 'duo' };

  // Ensure each player has a points property
  const playersWithPoints = initialPlayers.map(player => ({
    ...player,
    points: player.points || 0,
  }));

  const maxPoints = settings.maxPoints;

  const levelQuestions = level === 1 ? questions.level1 : questions.level2;

  const [players, setPlayers] = useState(playersWithPoints);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [isTruth, setIsTruth] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiRef = useRef(null);

  const currentPlayer = players[currentPlayerIndex];

  const getRandomQuestion = (type: 'truth' | 'dare') => {
    const questionArray = levelQuestions[type];
    const randomIndex = Math.floor(Math.random() * questionArray.length);
    return questionArray[randomIndex];
  };

  const nextPlayer = () => {
    let nextIndex;
    if (settings.randomPlayerSelection) {
      nextIndex = Math.floor(Math.random() * players.length);
    } else {
      nextIndex = (currentPlayerIndex + 1) % players.length;
    }
    setCurrentPlayerIndex(nextIndex);
    setIsTruth(null);
    setCurrentQuestion('');
  };

  const updatePoints = (success: boolean) => {
    const pointChange = Math.floor(Math.random() * 11) + 5; // Random zwischen 5 und 15
    const newPoints = success
      ? currentPlayer.points + pointChange
      : currentPlayer.points - pointChange;

    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      points: newPoints
    };

    setPlayers(updatedPlayers);

    // Spielende prüfen
    if (newPoints >= maxPoints) {
      setShowConfetti(true);
      Alert.alert(
        'Spiel vorbei!',
        `${currentPlayer.name} hat gewonnen! 🎉`,
        [
          {
            text: 'Im aktuellen Level bleiben',
            onPress: () => resetGame(),
          },
          {
            text: 'Zum nächsten Level wechseln',
            onPress: () => {
              resetGame();
              navigation.navigate('LevelSelection', { players: updatedPlayers, type });
            },
          },
        ]
      );
    } else {
      nextPlayer();
    }
  };

  const resetGame = () => {
    const resetPlayers = players.map(player => ({
      ...player,
      points: 0,
    }));
    setPlayers(resetPlayers);
    setCurrentPlayerIndex(0);
    setIsTruth(null);
    setCurrentQuestion('');
    setShowConfetti(false);
  };

  useEffect(() => {
    if (isTruth !== null) {
      setCurrentQuestion(getRandomQuestion(isTruth ? 'truth' : 'dare'));
    }
  }, [isTruth]);

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Punkte-Anzeige als Bar */}
        <View style={styles.pointsContainer}>
          <ProgressBar 
            progress={currentPlayer.points / maxPoints} 
            width={300} 
            color={'#4caf50'} 
            height={20}
          />
          <Text style={styles.pointsText}>Punkte {currentPlayer.points} / {maxPoints}</Text>
        </View>

        {/* Spielername */}
        <Text style={styles.currentPlayerText}>{currentPlayer.name} ist dran!</Text>

        {/* Wahrheit und Pflicht Auswahl */}
        <View style={styles.choiceContainer}>
          <TouchableOpacity onPress={() => setIsTruth(true)} style={[styles.choiceButton, styles.truthButton]}>
            <Text style={styles.choiceButtonText}>Wahrheit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsTruth(false)} style={[styles.choiceButton, styles.dareButton]}>
            <Text style={styles.choiceButtonText}>Pflicht</Text>
          </TouchableOpacity>
        </View>

        {/* Frage / Aufgabe */}
        {currentQuestion !== '' && (
          <Text style={styles.questionText}>{currentQuestion}</Text>
        )}

        {/* Erfolgs-/Versagen-Buttons */}
        {currentQuestion !== '' && (
          <View style={styles.resultContainer}>
            <TouchableOpacity onPress={() => updatePoints(true)} style={[styles.resultButton, styles.successButton]}>
              <Text style={styles.resultButtonText}>Erfolgreich</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updatePoints(false)} style={[styles.resultButton, styles.failButton]}>
              <Text style={styles.resultButtonText}>Versagt</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Konfetti */}
        {showConfetti && (
          <ConfettiCannon
            count={200}
            origin={{ x: 0, y: 0 }}
            autoStart={true}
            fadeOut={true}
            explosionSpeed={350}
            fallSpeed={3000}
            ref={confettiRef}
            onAnimationEnd={() => setShowConfetti(false)}
          />
        )}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    width: '100%',
  },
  pointsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  pointsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  pointsText: {
    fontSize: 16,
    color: 'white',
    marginTop: 10,
  },
  currentPlayerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  choiceButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  truthButton: {
    backgroundColor: '#007bff',
  },
  dareButton: {
    backgroundColor: '#e83e8c',
  },
  choiceButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  resultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  resultButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  failButton: {
    backgroundColor: '#6c757d',
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default GameScreen;