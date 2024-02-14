import {useFonts} from 'expo-font';

/**
 * Function to load custom fonts for Expo
 * See: https://stackoverflow.com/questions/68646545/how-to-apply-custom-fonts-to-whole-project-expo-react-native
 * @returns {[boolean, Error | null]}
 */
const loadFonts = () => {
  const customFonts = {
    'Karla': require('../assets/fonts/Karla-Regular.ttf'),
    'Karla-Bold': require('../assets/fonts/Karla-Bold.ttf'),
    'Karla-Italic': require('../assets/fonts/Karla-Italic.ttf'),
    'Karla-BoldItalic': require('../assets/fonts/Karla-BoldItalic.ttf'),
    'Karla-ExtraBold': require('../assets/fonts/Karla-ExtraBold.ttf'),
    'Markazi': require('../assets/fonts/MarkaziText-Regular.ttf'),
    'Markazi-Bold': require('../assets/fonts/MarkaziText-Bold.ttf'),
  };
  return useFonts(customFonts);
}
export default loadFonts;
