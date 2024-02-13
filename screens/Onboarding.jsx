import {Alert, Button, TextInput, View, StyleSheet, Text, Image, Pressable} from 'react-native';
import React, {isValidElement, useEffect, useState, useContext} from 'react';
import {UserContext} from '../contexts/UserContextProvider';
import formStyles from '../styles/formStyles';
import generalStyles from '../styles/generalStyles';
import {validGenericField, validEmailField} from '../utils/validateFormFields';
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Onboarding screen component
 * @returns {JSX.Element}
 * @constructor
 */
const Onboarding = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  const user = useContext(UserContext);

  // set setFormWasSubmitted to false when component mounts
  useEffect(() => {
    setFormWasSubmitted(false);
  }, []);

  useEffect(() => {
    console.log('Onboarding: user', user.data);
  }, [user]);

  /**
   * Handles the form submission, displays alerts and navigates to the home screen if everything is valid
   */
  const handleSubmit = () => {
    setFormWasSubmitted(true);
    // Validate the form fields and get all errors in a string.
    const error = validGenericField(firstName, 'first name') + validEmailField(email);
    if (error) {
      Alert.alert('Signup Error', '\n' + error);
      return;
    }

    // Update the user data in the context
    user.updateUser({firstName: firstName, email: email, onboardingCompleted: true});

    // If everything is valid, navigate to the home screen
    //navigation.navigate('Profile');
  }

  return (
    <>
      <Header />
      <View style={styles.container}>
        <Text style={styles.fieldText}>First Name</Text>
        <TextInput
          placeholder="John"
          style={styles.input}
          // set the state
          onChangeText={(text) => setFirstName(text)}
        />
        {formWasSubmitted && validGenericField(firstName, 'first name') && <Text style={styles.formError}>{validGenericField(firstName, 'first name')}</Text>}
        <Text style={styles.fieldText}>Email</Text>
        <TextInput
          autoCapitalize='none'o
          placeholder="john.doe@gmail.com"
          style={styles.input}
          keyboardType="email-address"
          // set the state
          onChangeText={(text) => setEmail(text)}
        />
        {formWasSubmitted && validEmailField(email) && <Text style={styles.formError}>{validEmailField(email)}</Text>}
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
      </View>
      <Footer />
    </>

  );
}

const styles = StyleSheet.create({
  ...formStyles,
  ...generalStyles,
});

export default Onboarding;
