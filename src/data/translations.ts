import { Body } from "native-base";
import { settings } from "./settings"

export const translations = {
    /* GERMAN */
    de_DE: {
      /* STARTSCREEN */
      welcome: "Willkommen zum Trinkspiel!",
      truthordareStart: "Wahrheit oder Pflicht starten",
      bottlespinStart: "Flaschendrehen \n Coming Soon...",
      diceStart: "Würfeln",
      premiumUser: "Premium Benutzer",
      storeButton: 'Premium Kaufen',
      version: "Version",
      developmentTitle: "In Entwicklung",
      developmentMessage: "Diese Funktion ist noch in Entwicklung und wird bald verfügbar sein.",
      /* SETTINGS */
      settingsTitle: "Einstellungen",
      truthordareSettingsTitle: "Wahrheit oder Pflicht Einstellungen",
      generelSettingsTitle: "Allgemeine Einstellungen",
      settingsSavedHead: "Einstellungen gespeichert",
      settingsSavedText: "Ihre Einstellungen wurden erfolgreich gespeichert.",
      settingsRandomPlayer: "Zufällige Spielerwahl",
      settingsLanguage: "Sprache",
      settingsMaxPoints: "Maximale Punktzahl zum Gewinnen",
      settingsMaxTime: "Maximale Zeit pro Frage",
      settingsMaxTimeSub: "0 = Kein Timer",
      settingsPremium: "Premium",
      settingsSave: "Einstellungen speichern",
      /* STORE */
      storeTitle: "Premium Store",
      storeText: "Kaufe jetzt Premium und erhalte exklusive Features!",
      premiumfeature1: "Keine Werbung",
      premiumfeatureCat1: "Warheit oder Pflicht Features:",
      premiumfeature2: "Zufällige Spielerwahl",
      premiumfeature3: "Maximale Punktzahl zum Gewinnen ändern",
      premiumfeature4: "Mehr Decks bei Wahrheit oder Pflicht",
      premiumfeatureCat2: "Würfel Features:",
      premiumfeature5: "Versaut & Reizend Würfel",
      purchaseSuccessHead: "Kauf erfolgreich",
      purchaseSuccessText: "Vielen Dank für deinen Kauf! 🎉",
      purchaseFailedHead: "Kauf fehlgeschlagen",
      purchaseFailedText: "Der Kauf konnte nicht abgeschlossen werden.",
      purchaseErrorHead: "Kauf Fehler",
      purchaseErrorText: "Es ist ein Fehler beim Kauf aufgetreten. Bitte versuche es erneut.",
      purchaseSuccessButton: "OK",
      storeBuyButton: "Premium Kaufen",
      storeBackButton: "Zurück",
      premiumFeatureHead: "Premium-Funktion",
      premiumFeatureText: "Diese Funktion ist nur für Premium-Benutzer verfügbar.",
      /* TRUTH OR DARE */
      truthordareTitle: "Wie möchtest du spielen?",
      truthordareDuo: "Paar",
      truthordareFriends: "Freunde",
      truthordarePlayerSetupTitle: "Spieler Setup",
      truthordarePlayerName: "Spieler Name",
      truthordarePlayerMan: "Männlich",
      truthordarePlayerGirl: "Weiblich",
      truthordarePlayerAdd: "Spieler hinzufügen",
      truthordarePlayerRemove: "Spieler entfernen",
      truthordarePlayerSetupNext: "Weiter",
      truthordareLevelSelectionTitle: "Level Auswahl",
      truthordareLevel1: "Klassisch",
      truthordareLevel2: "WTF! 💎",
      truthordareLevel3: "Hardcore 💎",
      truthordareLevel4: "Pärchen 💎",
      truthordareLevel5: "DIRTY 💎",
      truthordareLevel6: "Mädelsabend 💎",
      truthordareLevel7: "im Freien 💎",
      truthordareLevelSelect: "Auswählen",
      truthordareLevelSelected: "Ausgewählt",
      truthordareStartGame: "Spiel starten",
      truthordareGamePoints: "Punkte",
      truthordareGameCurrentPlayer: "ist dran",
      truthordareGameTruthSelectButton: "Wahrheit",
      truthordareGameDareSelectButton: "Pflicht",
      truthordareCurrentLevel: "Aktuelles Deck: ",
      truthordareGameTimer: "Timer",
      truthordareGameTimerSeconds: "Sekunden",
      truthordareGameTimerStartButton: "Timer starten",
      truthordareGameTimerExpired: "Zeit abgelaufen",
      truthordareGameTruthSuccessButton: "Ausgeplaudert!",
      truthordareGameTruthFailButton: "Kein Geständnis",
      truthordareGameDareSuccessButton: "Geschafft!",
      truthordareGameDareFailButton: "Voll daneben",
      truthordareGameEnd: "Spiel beendet",
      truthordareGameEndText: "hat das Spiel gewonnen! 🎉",
      truthordareGameEndReset: "Weiter Spielen",
      truthordareGameEndNextLevel: "Zur Level Auswahl",
      /* DICE */
      couplesOnlyMessage: "Dieser Modus ist für Paare gedacht.",  
      selectDiceMessage: "Wählen Sie die Würfel aus:",
      romanticDice: "Romantisch & Liebend",
      naughtyDice: "Versaut & Reizend 💎",
      selectionMade: "Auswahl getroffen",
      selectedRomantic: "Sie haben Romantisch & Liebend ausgewählt.",
      selectedNaughty: "Sie haben Versaut & Reizend ausgewählt.",  
      resultTitle: "Ergebnis",
      startButton: "Start",
      // Romantic BodyParts
      Lips: "Lippen",
      Neck: "Nacken",
      Ears: "Ohren",
      Hands: "Hände",
      Feet: "Füße",
      // Romantic Actions
      Kiss: "Küssen",
      Massage: "Massieren",
      Nibble: "Knabbern",
      Tickle: "Kitzeln",
      Caress: "Streicheln",
      // Naughty BodyParts
      Boobs: "Brüste",
      Butt: "Po",
      Thighs: "Oberschenkel",
      Arm: "Arm",
      Chest: "Brust",
      Back: "Rücken",
      Intimate: "Intim",
      Body: 'Körper',
      // Naughty Actions
      Squeeze: "Drücken",
      Span: "Klatschen",
      Lick: "Lecken",
      Pinch: "Kneifen",
      Rub: "Reiben",
      Blow: "Blasen",
      Choice: "Eigene Wahl",
      Touch: "Berühren",
      Irritate: "Reizen",
      Breathe: "Atmen",
    },
    /* ENGLISH */
    en_US: {
      /* STARTSCREEN */
      welcome: "Welcome to the Drinking Game!",
      truthordareStart: "Start Truth or Dare",
      bottlespinStart: "Spin the Bottle \n Coming Soon...",
      diceStart: "Dice \n Coming Soon...",
      premiumUser: "Premium User",
      version: "Version",
      storeButton: 'Buy Premium',
      developmentTitle: "In Development",
      developmentMessage: "This feature is still in development and will be available soon.",
      /* SETTINGS */
      settingsTitle: "Settings",
      truthordareSettingsTitle: "Truth or Dare Settings",
      generelSettingsTitle: "General Settings",
      settingsSavedHead: "Settings saved",
      settingsSavedText: "Your settings have been saved successfully.",
      settingsRandomPlayer: "Random player selection",
      settingsLanguage: "Language",
      settingsMaxPoints: "Max points to win",
      settingsMaxTime: "Max time per question",
      settingsMaxTimeSub: "0 = No Timer",
      settingsPremium: "Premium",
      settingsSave: "Save Settings",
      /* STORE */
      storeTitle: "Premium Store",
      storeText: "Buy Premium now and get exclusive features!",
      premiumfeature1: "No Ads",
      premiumfeatureCat1: "Truth or Dare Features:",
      premiumfeature2: "Random player selection",
      premiumfeature3: "Change max points to win",
      premiumfeature4: "More decks in Truth or Dare",
      premiumfeatureCat2: "Dice Features:",
      premiumfeature5: "Naughty & Exciting Dice",
      purchaseSuccessHead: "Purchase successful",
      purchaseSuccessText: "Thank you for your purchase! 🎉",
      purchaseFailedHead: "Purchase failed",
      purchaseFailedText: "The purchase could not be completed.",
      purchaseErrorHead: "Purchase Error",
      purchaseErrorText: "An error occurred during the purchase. Please try again.",
      purchaseSuccessButton: "OK",
      storeBuyButton: "Buy Premium",
      storeBackButton: "Back",
      premiumFeatureHead: "Premium Feature",
      premiumFeatureText: "This feature is only available to premium users.",
      /* TRUTH OR DARE */
      truthordareTitle: "How you want to Play?",
      truthordareDuo: "Duo",
      truthordareFriends: "Friends",
      truthordarePlayerSetupTitle: "Player Setup",
      truthordarePlayerName: "Player Name",
      truthordarePlayerMan: "Men",
      truthordarePlayerGirl: "Girl",
      truthordarePlayerAdd: "Add Player",
      truthordarePlayerRemove: "Remove Player",
      truthordarePlayerSetupNext: "Next",
      truthordareLevelSelectionTitle: "Level Selection",
      truthordareLevel1: "Classic 🚫",
      truthordareLevel2: "WTF! 🚫💎",
      truthordareLevel3: "Hardcore 🚫💎",
      truthordareLevel4: "Couples 🚫💎",
      truthordareLevel5: "DIRTY 🚫💎",
      truthordareLevel6: "Girls Night 🚫💎",
      truthordareLevel7: "Outdoor 🚫💎",
      truthordareLevelSelect: "Select",
      truthordareLevelSelected: "Selected",
      truthordareStartGame: "Start Game",
      truthordareGamePoints: "Points",
      truthordareGameCurrentPlayer: "is up",
      truthordareGameTruthSelectButton: "Truth",
      truthordareGameDareSelectButton: "Dare",
      truthordareCurrentLevel: "Current Deck: ",
      truthordareGameTimer: "Timer",
      truthordareGameTimerSeconds: "Seconds",
      truthordareGameTimerStartButton: "Start Timer",
      truthordareGameTimerExpired: "Time Expired",
      truthordareGameTruthSuccessButton: "Spilled the Beans!",
      truthordareGameTruthFailButton: "No Confession",
      truthordareGameDareSuccessButton: "Done!",
      truthordareGameDareFailButton: "Totally missed",
      truthordareGameEnd: "Game Over",
      truthordareGameEndText: "has won the game! 🎉",
      truthordareGameEndReset: "Continue Playing",
      truthordareGameEndNextLevel: "To Level Selection",
      /* DICE */
      couplesOnlyMessage: "This mode is for couples.",
      selectDiceMessage: "Select the dice:",
      romanticDice: "Romantic & Loving",
      naughtyDice: "Naughty & Exciting 💎",
      selectionMade: "Selection Made",
      selectedRomantic: "You selected Romantic & Loving.",
      selectedNaughty: "You selected Naughty & Exciting.",
      resultTitle: "Result",
      startButton: "Start",
      // Romantic BodyParts
      Lips: "Lips",
      Neck: "Neck",
      Ears: "Ears",
      Hands: "Hands",
      Feet: "Feet",
      // Romantic Actions
      Kiss: "Kiss",
      Massage: "Massage",
      Nibble: "Nibble",
      Tickle: "Tickle",
      Caress: "Caress",
      // Naughty BodyParts
      Boobs: "Boobs",
      Butt: "Butt",
      Thighs: "Thighs",
      Arm: "Arm",
      Chest: "Chest",
      Back: "Back",
      Intimate: "Intim",
      Body: 'Body',
      // Naughty Actions
      Squeeze: "Squeeze",
      Span: "Spank",
      Lick: "Lick",
      Pinch: "Pinch",
      Rub: "Rub",
      Blow: "Blow",
      Choice: "Own Choice",
      Touch: "Touch",
      Irritate: "Irritate",
      Breathe: "Breathe",
    },
  };