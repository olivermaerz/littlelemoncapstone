import {View, Text, TextInput, Pressable, StyleSheet, Alert, Image, ScrollView} from 'react-native';
import CheckBox from 'expo-checkbox';
import {useContext, useEffect, useState} from 'react';
import {MaskedTextInput} from 'react-native-mask-text';
import {UserContext} from '../contexts/UserContextProvider';
import * as ImagePicker from 'expo-image-picker';
import FlashMessage, {showMessage} from "react-native-flash-message";

// get the styles
import generalStyles from '../styles/generalStyles';
import colors from '../styles/colors';
import formStyles, {getButtonStyle} from '../styles/formStyles';

// get components
import Footer from '../components/Footer';

// get some helper functions for form validation and data storage on local device
import {validGenericField, validEmailField, validPhoneField} from '../utils/validateFormFields';
import {saveUserData} from '../utils/dataStorage';

/**
 * Profile screen
 * @returns {JSX.Element}
 * @constructor
 */
const Profile = () => {
  const [formWasSubmitted, setFormWasSubmitted] = useState(false);

  // get the user state
  const user = useContext(UserContext);

  // set the local states for the checkboxes
  const [orderStatuses, setOrderStatuses] = useState(user.data.orderStatuses);
  const [passwordChanges, setPasswordChanges] = useState(user.data.passwordChanges);
  const [specialOffers, setSpecialOffers] = useState(user.data.specialOffers);
  const [newsletter, setNewsletter] = useState(user.data.newsletter);

  // set the local states for the form fields
  const [firstName, setFirstName] = useState(user.data.firstName);
  const [lastName, setLastName] = useState(user.data.lastName);
  const [email, setEmail] = useState(user.data.email);
  const [phone, setPhone] = useState(user.data.phone);

  // set the local state for the avatar
  const [avatar, setAvatar] = useState(user.data.avatar);

  /**
   * Pick an avatar from the avatar library
   * @returns {Promise<JSX.Element>}
   */
  const pickImage = async () => {
    // No permissions request is necessary for launching the avatar library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  /**
   * Reset the avatar avatar
   */
  const resetImage = () => {
    setAvatar(null);
  }

  /**
   * Reset the form fields to either the initial state or empty
   * @param deleteAll
   */
  const resetForm = (deleteAll) => {
    setFirstName(deleteAll ? '' : user.data.firstName);
    setLastName(deleteAll ? '' : user.data.lastName);
    setEmail(deleteAll ? '' : user.data.email);
    setPhone(deleteAll ? '' : user.data.phone);
    setOrderStatuses(deleteAll ? false : user.data.orderStatuses);
    setPasswordChanges(deleteAll ? false : user.data.passwordChanges);
    setSpecialOffers(deleteAll ? false : user.data.specialOffers);
    setNewsletter(deleteAll ? false : user.data.newsletter);
    setAvatar(deleteAll ? null : user.data.avatar);
    setFormWasSubmitted(false);
  }

  /**
   * Save the user status
   * @param loggedIn
   */
  const saveUserStatus = (loggedIn = true) => {
    return user.updateUser({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      orderStatuses: orderStatuses,
      passwordChanges: passwordChanges,
      specialOffers: specialOffers,
      newsletter: newsletter,
      avatar: avatar,
      isLoggedIn: loggedIn,
    });
  }

  /**
   * Logout the user and reset the form
   */
  const logout = () => {
    resetForm(true);
    user.updateUser({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
      avatar: null,
      isLoggedIn: false,
    });
  }

  /**
   * Handle the form submit
   */
  const handleSubmit = async () => {
    setFormWasSubmitted(true);
    const error = validGenericField(firstName, 'first name') +
      validGenericField(lastName, 'last name') +
      validEmailField(email) +
      validPhoneField(phone);

    if (error) {
      Alert.alert('Oops', '\n' + error);
      return;
    }
    await saveUserStatus();
    showMessage({
      message: "Profile updated",
      type: "info",
    });
  }

  /*
   useEffect to save the user data when it changes
   */
  useEffect(() => {
    saveUserData(user.data);
  }, [user.data]);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.headerText}>Avatar</Text>
        <View style={styles.avatarContainer}>
          <Pressable onPress={pickImage}>
          {avatar ?
            <Image source={{uri: avatar}} style={styles.avatarImage} />
            :
            <View style={styles.avatarInitials}>
              <Text style={styles.avatarInitialsText}>{Array.from(firstName)[0]}{Array.from(lastName)[0]}</Text>
            </View>
          }
          </Pressable>
          <Pressable style={({pressed}) => getButtonStyle(pressed, styles.avatarButton2)}
                     onPress={pickImage}>
            <Text style={styles.buttonText}>Change</Text>
          </Pressable>
          <Pressable style={({pressed}) => getButtonStyle(pressed, styles.avatarButton)}
                     onPress={resetImage}>
            <Text style={styles.secondaryButtonText}>Remove</Text>
          </Pressable>
        </View>
        <Text style={styles.headerText}>Personal Information</Text>
        <Text style={styles.fieldText}>First Name</Text>
        <TextInput
          placeholder="John"
          style={styles.input}
          // set the initial state
          value={firstName}
          // set the state
          onChangeText={(text) => setFirstName(text)}
        />
        {formWasSubmitted && validGenericField(firstName, 'first name') && <Text style={styles.formError}>{validGenericField(lastName, 'first name')}</Text>}

        <Text style={styles.fieldText}>Last Name</Text>
        <TextInput
          placeholder="Doe"
          style={styles.input}
          // set the initial state
          value={lastName}
          // set the state
          onChangeText={(text) => setLastName(text)}
        />
        {formWasSubmitted && validGenericField(lastName, 'last name') && <Text style={styles.formError}>{validGenericField(lastName, 'last name')}</Text>}

        <Text style={styles.fieldText}>Email</Text>
        <TextInput
          autoCapitalize='none'
          placeholder="john.doe@gmail.com"
          style={styles.input}
          keyboardType="email-address"
          // set the initial state
          value={email}
          // set the state
          onChangeText={(text) => setEmail(text)}
        />
        {formWasSubmitted && validEmailField(email) && <Text style={styles.formError}>{validEmailField(email)}</Text>}

        <Text style={styles.fieldText}>Phone number</Text>

        <MaskedTextInput
          mask="(999) 999-9999"
          placeholder={'(123) 456-7890'}
          // set the initial state
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
        />

        {formWasSubmitted && validPhoneField(phone) && <Text style={styles.formError}>{validPhoneField(phone)}</Text>}

        <Text style={styles.headerText}>Email Notifications</Text>

        <View style={styles.checkboxContainer}>
          <CheckBox
            value={orderStatuses}
            onValueChange={setOrderStatuses}
            style={styles.checkbox}
            color={colors.primary1}
          />
          <Text style={styles.checkBoxText}>Order Statuses</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={passwordChanges}
            onValueChange={setPasswordChanges}
            style={styles.checkbox}
            color={colors.primary1}
          />
          <Text style={styles.checkBoxText}>Password Changes</Text>
        </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
          value={specialOffers}
          onValueChange={setSpecialOffers}
          style={styles.checkbox}
          color={colors.primary1}
        />
        <Text style={styles.checkBoxText}>Special Offers</Text>
      </View>
        <View style={styles.checkboxContainer}>
        <CheckBox
          value={newsletter}
          onValueChange={setNewsletter}
          style={styles.checkbox}
          color={colors.primary1}
        />
        <Text style={styles.checkBoxText}>Newsletter</Text>
      </View>

        <Pressable style={({pressed}) => getButtonStyle(pressed, styles.button)}
                   onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Profile</Text>
        </Pressable>

        <View style={styles.secondaryButtonsContainer}>
          <Pressable style={({pressed}) => getButtonStyle(pressed, styles.secondaryButton)}
                     onPress={(e) => resetForm(false)}>
            <Text style={styles.secondaryButtonText}>Reset</Text>
          </Pressable>
          <Pressable style={({pressed}) => getButtonStyle(pressed, styles.tertiaryButton)}
                     onPress={logout}>
            <Text style={styles.buttonText}>Logout</Text>
          </Pressable>

        </View>

      </ScrollView>
      <Footer />
      <FlashMessage position="top" style={styles.flash} textStyle={styles.flashText} titleStyle={styles.flashText}/>
    </>
  );
}

/**
 * The styles for the Profile screen
 * @type {{container: {padding: number}, input: {borderWidth: number, padding: number, marginBottom: number}, fieldText: {fontSize: number, marginBottom: number}, button: {backgroundColor: string, padding: number, borderRadius: number}, buttonText: {color: string, textAlign: string}}}
 */
const styles = StyleSheet.create({
  ...generalStyles,
  ...formStyles,
  headerText: {
    fontFamily: 'Markazi',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 10,
  },
  avatarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarButton: {
    ...formStyles.button,
    backgroundColor: colors.secondary2,
    width: 100,
    height: 38,
  },
  avatarButton2: {
    ...formStyles.button,
    backgroundColor: colors.secondary1,
    width: 100,
    height: 38,
  },
  avatarInitials: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitialsText: {
    fontSize: 48,
    color: colors.white,
    fontFamily: 'Markazi',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  secondaryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
  secondaryButton: {
    ...formStyles.button,
    backgroundColor: colors.secondary2,
    width: '48%',
  },
  secondaryButtonText: {
    ...formStyles.buttonText,
    color: colors.secondary1,
  },
  tertiaryButton: {
    ...formStyles.button,
    backgroundColor: colors.secondary1,
    width: '48%',
  },
  flash: {
    backgroundColor: colors.primary1,
  },
  flashText: {
    color: colors.white,
    fontFamily: 'Karla',
    fontSize: 20,
    paddingBottom: 20,
  },
});

export default Profile;
