import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getTranslation } from '../utils/translationHelper';
import { appdata } from '../data/appdata';
import { initiatePurchase } from '../utils/samsungIAPHelper'; // Import your Samsung IAP helper
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const StoreScreen = () => {
  const navigation = useNavigation();

  const handlePurchase = async () => {
    try {
      const result = await initiatePurchase('premium_subscription_product_ID'); // Replace with your product ID
      if (result.success) {
        Alert.alert(getTranslation('purchaseSuccessHead'), getTranslation('purchaseSuccessText'));
        // Update your app state to reflect the purchase
      } else {
        Alert.alert(getTranslation('purchaseFailedHead'), getTranslation('purchaseFailedText'));
      }
    } catch (error) {
      Alert.alert(getTranslation('purchaseErrorHead'), getTranslation('purchaseErrorText'), [
        { text: 'OK' },
      ]);
    }
  };

  return (
    <ImageBackground source={require('../../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>{getTranslation('storeTitle')}</Text>
        <Text style={styles.subtitle}>{getTranslation('storeText')}</Text>
        <Text style={styles.feature}>{getTranslation('premiumfeature1')}</Text>
        <Text style={styles.cat}>{getTranslation('premiumfeatureCat1')}</Text>
        <Text style={styles.feature}>{getTranslation('premiumfeature2')}</Text>
        <Text style={styles.feature}>{getTranslation('premiumfeature3')}</Text>
        <Text style={styles.feature}>{getTranslation('premiumfeature4')}</Text>
        <Text style={styles.cat}>{getTranslation('premiumfeatureCat2')}</Text>
        <Text style={styles.feature}>{getTranslation('premiumfeature5')}</Text>
        <TouchableOpacity style={styles.purchaseButton} onPress={handlePurchase}>
          <Text style={styles.purchaseButtonText}>{getTranslation('storeBuyButton')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>{getTranslation('storeBackButton')}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: wp('5%'),
    width: '100%',
  },
  title: {
    fontSize: wp('8%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: hp('2.5%'),
    textAlign: 'center',
  },
  feature: {
    fontSize: wp('5%'),
    color: 'white',
    marginBottom: hp('1.5%'),
    textAlign: 'center',
  },
  cat: {
    fontSize: wp('7.5%'),
    color: 'white',
    marginBottom: hp('1.5%'),
    textAlign: 'center',
  },
  purchaseButton: {
    backgroundColor: '#ff8c00',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('2.5%'),
  },
  purchaseButtonText: {
    color: 'white',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#007bff',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('7.5%'),
    borderRadius: wp('2.5%'),
    marginTop: hp('6%'),
  },
  backButtonText: {
    color: 'white',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StoreScreen;