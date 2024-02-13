import {StyleSheet, View, Text} from 'react-native';
import generalStyles from '../styles/generalStyles';

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
    container:{
      ...generalStyles.container,
      flex: 1,
    }
  },
});

export default Footer;
