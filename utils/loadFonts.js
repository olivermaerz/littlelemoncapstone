import {useFonts} from 'expo-font';

/**
 * Function to load custom fonts for Expo
 * See: https://stackoverflow.com/questions/68646545/how-to-apply-custom-fonts-to-whole-project-expo-react-native
 * @returns {[boolean, Error | null]}
 */
const loadFonts = () => {
  const customFonts = {
    'Karla': require('../assets/fonts/Karla-VariableFont_wght.ttf'),
    'Markazi': require('../assets/fonts/MarkaziText-VariableFont_wght.ttf'),
  };
  return useFonts(customFonts);
}
export default loadFonts;
