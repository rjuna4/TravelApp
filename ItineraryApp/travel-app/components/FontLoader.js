import { useEffect } from 'react';
import * as Font from 'expo-font';

// Define your custom font names here
const customFonts = {
    'outfit-black': require('travel-app/assets/fonts/Outfit-Black.ttf'),
    'outfit-bold': require('travel-app/assets/fonts/Outfit-Bold.ttf'),
    'outfit-extraBold': require('travel-app/assets/fonts/Outfit-ExtraBold.ttf'),
    'outfit-extraLight': require('travel-app/assets/fonts/Outfit-ExtraLight.ttf'),
    'outfit-light': require('travel-app/assets/fonts/Outfit-Light.ttf'),
    'outfit-medium': require('travel-app/assets/fonts/Outfit-Medium.ttf'),
    'outfit-regular': require('travel-app/assets/fonts/Outfit-Regular.ttf'),
    'outfit-semiBold': require('travel-app/assets/fonts/Outfit-SemiBold.ttf'),
    'outfit-thin': require('travel-app/assets/fonts/Outfit-Thin.ttf'),
};

export const useLoadFonts = () => {
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync(customFonts);
    }
    loadFonts();
  }, []);
};

// Export the font family names
export const fonts = {
  outfitBlack: 'outfit-black',
  outfitBold: 'outfit-bold',
  outfitExtraBold: 'outfit-extraBold',
  outfitExtraLight: 'outfit-extraLight',
  outfitLight: 'outfit-light',
  outfitMedium: 'outfit-medium',
  outfitRegular: 'outfit-regular',
  outfitSemiBold: 'outfit-semiBold',
  outfitThin: 'outfit-thin',

  // Add more font families as needed
};