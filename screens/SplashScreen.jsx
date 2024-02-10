import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';

/**
 * The Splash Screen
 * @returns {JSX.Element}
 * @constructor
 */
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Little Lemon</Text>
      <ActivityIndicator />
    </View>
  );
}

/**
 * The styles for the Splash Screen
 * @type {{container: {alignItems: string, flex: number, justifyContent: string}, text: {fontSize: number}}}
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});


export default SplashScreen;
