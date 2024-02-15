import {
  Alert,
  Button,
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import React, {isValidElement, useEffect, useState, useContext} from 'react';
import {UserContext} from '../contexts/UserContextProvider';
import formStyles from '../styles/formStyles';
import generalStyles from '../styles/generalStyles';
import {validGenericField, validEmailField} from '../utils/validateFormFields';
import Footer from '../components/Footer';
import {saveUserData} from '../utils/dataStorage';
import colors from '../styles/colors';

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

  /*
   set setFormWasSubmitted to false when component mounts
   */
  useEffect(() => {
    setFormWasSubmitted(false);
  }, []);

  /*
   useEffect to log the user data when it changes
   */
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
      Alert.alert('Oops', '\n' + error);
      return;
    }
    // Update the user data in the context
    user.updateUser({firstName: firstName, lastName: '', email: email, onboardingCompleted: true, isLoggedIn: true});
    // Update the user data in the AsyncStorage
    saveUserData({firstName: firstName, lastName: '', email: email, onboardingCompleted: true, isLoggedIn: true});
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView} // Make sure KeyboardAvoidingView takes up the full screen
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust behavior based on the OS
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust the offset on iOS
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to the Little Lemon!</Text>
        <Text style={styles.description}>You are almost there. Please enter your first name and email address:</Text>
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
    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  ...formStyles,
  ...generalStyles,
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: colors.highlight1,
  },
  title: {
    fontFamily: 'Markazi',
    fontSize: 28,
  },
  description: {
    fontFamily: 'Karla',
    fontSize: 16,
    marginBottom: 30,
    marginTop: 10,
  },
  container: {
    ...generalStyles.container,
    paddingTop: 40,
  }
});

export default Onboarding;
