import {Alert, Button, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import useNavigation from '@react-navigation/native';

const [firstName, setFirstName] = useState('');
const [email, setEmail] = useState('');
const [emailValid, setEmailValid] = useState(true);



const Onboarding = () => {
  const navigation = useNavigation();

  /**
   * Validates an email address with regex
   * @param email
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /**
   * Handles the form submission and navigates to the home screen if everything is valid
   */
  const handleSubmit = () => {
    if (!firstName && !email) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    } else if (!firstName && validateEmail(email)) {
      Alert.alert('Error', 'Please enter your first name.');
      return;
    } else if (!firstName && !validateEmail(email)) {
      Alert.alert('Error', 'Please enter your first name and a valid email address.');
      return;
    } else if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    } else if (!validateEmail(email)) {
      setEmailValid(false);
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // If everything is valid, navigate to the home screen
    navigation.navigate('Home');
  };
  return (
    <>
      <View>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.fieldText}>First Name</Text>
        {!firstName && <Text style={{color: 'red'}}>Please enter your first name.</Text>}
        <TextInput
          placeholder="First Name"
          style={styles.input}
        />
        <Text style={styles.fieldText}>Email</Text>
        {!emailValid && <Text style={{color: 'red'}}>Please enter a valid email address.</Text>}
        {!email && <Text style={{color: 'red'}}>Please enter your email address.</Text>}
        <TextInput
          placeholder="Email"
          style={styles.input}
        />
        <Button
          style={styles.button}
          title="Next"
          onPress={handleSubmit}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  },
  image: {
    width: '60%',
    height: 'auto',
  },
  fieldText: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
    // add round corners to the button
    borderRadius: 16,
  },

});

export default Onboarding;
