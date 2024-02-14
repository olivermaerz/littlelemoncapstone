import {StyleSheet, View, Text} from 'react-native';
import generalStyles from '../styles/generalStyles';
import colors from '../styles/colors';

/**
 * Footer component
 * @returns {JSX.Element}
 * @constructor
 */
const Footer = () => {
  return (
    <View style={styles.footer}>

    </View>
  );
}


const styles = StyleSheet.create({
  footer: {
    ...generalStyles,
    backgroundColor: colors.highlight1,
    flex: 1,
  },
});

export default Footer;
