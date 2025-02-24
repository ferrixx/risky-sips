import { NativeModules } from 'react-native';
import { SAMSUNG_IAP_KEY } from './config';

const { SamsungIAP } = NativeModules;

export const initiatePurchase = async (productId) => {
  try {
    // Initialize the Samsung IAP SDK with the IAP Key
    await SamsungIAP.initialize(SAMSUNG_IAP_KEY);

    const result = await SamsungIAP.purchaseItem(productId);
    if (result && result.purchaseState === 'PURCHASED') {
      return { success: true, data: result };
    } else {
      return { success: false, data: result };
    }
  } catch (error) {
    console.error('Purchase error:', error);
    return { success: false, error };
  }
};