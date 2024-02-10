import {Alert, Button, TextInput, View, StyleSheet, Text, Image, Pressable} from 'react-native';
import React, {isValidElement, useEffect, useState, useContext} from 'react';
import {UserContext} from '../contexts/UserContextProvider';

/**
 * Onboarding screen component
 * @returns {JSX.Element}
 * @constructor
 */
const Onboarding = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  const user = useContext(UserContext);

  // set setFormWasSubmitted to false when component mounts
  useEffect(() => {
    setFormWasSubmitted(false);
  }, []);

  useEffect(() => {
    console.log('Onboarding: user', user.data);
  }, [user]);

  // validate email when email state changes
  useEffect(() => {
    setEmailValid(validateEmail(email));
    console.log('email', email, 'valid', validateEmail(email));
  }, [email]);

  /**
   * Validates an email address with regex
   * @param email
   * @returns {boolean}
   */
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  }

  /**
   * Handles the form submission, displays alerts and navigates to the home screen if everything is valid
   */
  const handleSubmit = () => {
    setFormWasSubmitted(true);
    if (!firstName && !email) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    } else if (!firstName && emailValid) {
      Alert.alert('Error', 'Please enter your first name.');
      return;
    } else if (!firstName && !emailValid) {
      Alert.alert('Error', 'Please enter your first name and a valid email address.');
      return;
    } else if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    } else if (!emailValid) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    // Update the user data in the context
    user.updateUser({name: firstName, email: email, onboardingCompleted: true});

    // If everything is valid, navigate to the home screen
    //navigation.navigate('Profile');
  }

  return (
    <>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.image}
          // align center
          resizeMode="contain"
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.fieldText}>First Name</Text>
        {formWasSubmitted && !firstName && <Text style={{color: 'red'}}>Please enter your first name.</Text>}
        <TextInput
          placeholder="First Name"
          style={styles.input}
          // set the state
          onChangeText={(text) => setFirstName(text)}
        />
        <Text style={styles.fieldText}>Email</Text>
        {formWasSubmitted && email && !emailValid && <Text style={{color: 'red'}}>Please enter a valid email address.</Text>}
        {formWasSubmitted && !email && <Text style={{color: 'red'}}>Please enter your email address.</Text>}
        <TextInput
          autoCapitalize='none'o
          placeholder="Email"
          style={styles.input}
          keyboardType="email-address"
          // set the state
          onChangeText={(text) => setEmail(text)}
        />
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>

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
    marginTop: 10,
    alignItems: 'center',
  },
  image: {
    width: 185,
    height: 40,
  },
  fieldText: {
    fontSize: 24,
    textAlign: 'left',
    marginLeft: 12,
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    // add round corners to the button
    borderRadius: 16,
    backgroundColor: 'blue',
    color: 'black',
    marginLeft: 12,
    marginRight: 12,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
    padding: 8,
  },

});

export default Onboarding;
