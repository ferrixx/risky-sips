import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ImageBackground } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { truthordare_questions_german } from '../data/questions';
import { settings } from '../data/settings';
import { appdata } from '../data/appdata';
import { getTranslation } from '../utils/translationHelper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type GameScreenRouteProp = RouteProp<RootStackParamList, 'GameScreen'>;

const GameScreen = () => {
  const route = useRoute<GameScreenRouteProp>();
  const navigation = useNavigation();
  const { levels, players: initialPlayers, type } = route.params ?? { levels: [1], players: [], type: 'duo' };

  const playersWithPoints = initialPlayers.map(player => ({
    ...player,
    points: player.points || 0,
  }));

  const maxPoints = settings.maxPoints;

  const [players, setPlayers] = useState(playersWithPoints);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentLevel, setCurrentLevel] = useState<number | null>(null);
  const [isTruth, setIsTruth] = useState<boolean | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timer, setTimer] = useState(30);
  const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  const [pointsChange, setPointsChange] = useState<number | null>(null);
  const confettiRef = useRef(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPlayer = players[currentPlayerIndex];

  const getRandomQuestion = (type: 'truth' | 'dare') => {
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const questionArray = truthordare_questions_german[`level${randomLevel}`][type];
    const randomIndex = Math.floor(Math.random() * questionArray.length);
    setCurrentLevel(randomLevel);
    return questionArray[randomIndex];
  };

  const nextPlayer = () => {
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    setCurrentPlayerIndex(nextIndex);
    setIsTruth(null);
    setCurrentQuestion('');
    setTimer(30);
    setTimerStarted(false);
    setTimerExpired(false);
  };

  const updatePoints = (success: boolean) => {
    const pointChange = Math.floor(Math.random() * 11) + 5;
    const newPoints = success
      ? currentPlayer.points + pointChange
      : currentPlayer.points - pointChange;
  
    const updatedPlayers = [...players];
    updatedPlayers[currentPlayerIndex] = {
      ...currentPlayer,
      points: newPoints
    };
  
    setPlayers(updatedPlayers);
    setPointsChange(success ? pointChange : -pointChange);

    if (newPoints >= maxPoints) {
      setShowConfetti(true);
      Alert.alert(
        getTranslation('truthordareGameEnd'),
        `${currentPlayer.name} ${getTranslation('truthordareGameEndText')}`,
        [
          {
            text: getTranslation('truthordareGameEndReset'),
            onPress: () => resetGame(),
          },
          {
            text: getTranslation('truthordareGameEndNextLevel'),
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
    setTimer(30);
    setTimerStarted(false);
    setTimerExpired(false);
  };

  useEffect(() => {
    if (isTruth !== null) {
      const question = getRandomQuestion(isTruth ? 'truth' : 'dare');
      setCurrentQuestion(question.question);
      setTimer(question.timer || settings.maxTime);
    }
  }, [isTruth]);

  useEffect(() => {
    if (currentQuestion !== '' && timerStarted && timer > 0) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(timerRef.current!);
            setTimerExpired(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
    }

    return () => clearInterval(timerRef.current!);
  }, [currentQuestion, timerStarted, timer]);

  useEffect(() => {
    if (pointsChange !== null) {
      const timeout = setTimeout(() => {
        setPointsChange(null);
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [pointsChange]);

  return (
    <ImageBackground source={appdata.appBackground} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.pointsContainer}>
          <ProgressBar 
            progress={currentPlayer.points / maxPoints} 
            width={wp('80%')} 
            color={'#4caf50'} 
            height={hp('2%')}
          />
          <Text style={styles.pointsText}>{getTranslation('truthordareGamePoints')} {currentPlayer.points} / {maxPoints}</Text>
        </View>

        <Text style={styles.currentPlayerText}>{currentPlayer.name} {getTranslation('truthordareGameCurrentPlayer')}</Text>

        {currentLevel !== null && isTruth !== null && (
          <Text style={styles.levelText}>{getTranslation('truthordareCurrentLevel')} {getTranslation('truthordareLevel' + currentLevel)}</Text>
        )}

        {isTruth === null && (
          <View style={styles.choiceContainer}>
            <TouchableOpacity onPress={() => setIsTruth(true)} style={[styles.choiceButton, styles.truthButton]}>
              <Text style={styles.choiceButtonText}>{getTranslation('truthordareGameTruthSelectButton')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTruth(false)} style={[styles.choiceButton, styles.dareButton]}>
              <Text style={styles.choiceButtonText}>{getTranslation('truthordareGameDareSelectButton')}</Text>
            </TouchableOpacity>
          </View>
        )}

        {currentQuestion !== '' && (
          <Text style={styles.questionText}>{currentQuestion}</Text>
        )}

        {currentQuestion !== '' && timer > 0 && (
          <Text style={styles.timerText}>{getTranslation('truthordareGameTimer')}: {timer} {getTranslation('truthordareGameTimerSeconds')}</Text>
        )}

        {currentQuestion !== '' && timer > 0 && !timerStarted && (
          <TouchableOpacity onPress={() => setTimerStarted(true)} style={styles.startTimerButton}>
            <Text style={styles.startTimerButtonText}>{getTranslation('truthordareGameTimerStartButton')}</Text>
          </TouchableOpacity>
        )}

        {timerExpired && (
          <Text style={styles.timerExpiredText}>{getTranslation('truthordareGameTimerExpired')}</Text>
        )}

        {currentQuestion !== '' && (
          <View style={styles.resultContainer}>
            <TouchableOpacity onPress={() => updatePoints(true)} style={[styles.resultButton, styles.successButton]}>
              <Text style={styles.resultButtonText}>
                {isTruth ? getTranslation('truthordareGameTruthSuccessButton') : getTranslation('truthordareGameDareSuccessButton')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => updatePoints(false)} style={[styles.resultButton, styles.failButton]}>
              <Text style={styles.resultButtonText}>
                {isTruth ? getTranslation('truthordareGameTruthFailButton') : getTranslation('truthordareGameDareFailButton')}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {pointsChange !== null && (
          <View style={styles.pointsChangeContainer}>
            <Text style={styles.pointsChangeText}>
              {pointsChange > 0 ? `+${pointsChange} ${getTranslation('truthordareGamePoints')}` : `${pointsChange} ${getTranslation('truthordareGamePoints')}`}
            </Text>
          </View>
        )}

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
    padding: wp('5%'),
    width: '100%',
  },
  pointsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  pointsTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('1%'),
  },
  pointsText: {
    fontSize: wp('5%'),
    color: 'white',
    marginTop: hp('1%'),
  },
  currentPlayerText: {
    fontSize: wp('7.5%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('2%'),
  },
  questionText: {
    fontSize: wp('10%'),
    color: 'white',
    marginBottom: hp('3%'),
    textAlign: 'center',
    paddingBottom: hp('2%'),
    paddingTop: hp('2%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    backgroundColor: 'rgba(107, 107, 107, 0.5)'
  },
  timerText: {
    fontSize: wp('7.5%'),
    color: '#f5f5f5',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  timerExpiredText: {
    fontSize: wp('7.5%'),
    color: 'red',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  choiceContainer: {
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  choiceButton: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('3%'),
  },
  truthButton: {
    backgroundColor: '#007bff',
    textAlign: 'center',
  },
  dareButton: {
    backgroundColor: '#e83e8c',
    textAlign: 'center',
  },
  choiceButtonText: {
    color: '#fff',
    fontSize: wp('7%'),
    textAlign: 'center',
  },
  startTimerButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('2.5%'),
    marginBottom: hp('2%'),
  },
  startTimerButtonText: {
    color: '#fff',
    fontSize: wp('7.5%'),
  },
  resultContainer: {
    justifyContent: 'space-around',
  },
  resultButton: {
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    marginTop: hp('3%'),
    borderRadius: wp('2.5%'),
    textAlign: 'center',
  },
  successButton: {
    backgroundColor: '#28a745',
    textAlign: 'center',
  },
  failButton: {
    backgroundColor: '#6c757d',
    textAlign: 'center',
  },
  resultButtonText: {
    color: '#fff',
    fontSize: wp('6.5%'),
    textAlign: 'center',
  },
  pointsChangeContainer: {
    position: 'absolute',
    top: hp('6%'),
    right: wp('2.5%'),
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: wp('2.5%'),
    borderRadius: wp('1.25%'),
  },
  pointsChangeText: {
    color: 'white',
    fontSize: wp('4%'),
  },
  levelText: {
    fontSize: wp('5%'),
    color: '#f5f5f5',
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
});

export default GameScreen;