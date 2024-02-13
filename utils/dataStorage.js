import AsyncStorage from '@react-native-async-storage/async-storage';

const saveUserData = (data) => {
  // save the user data to the local storage
  AsyncStorage.setItem('user', JSON.stringify(data)).then(
    () => {
      console.log('User data saved to local storage', data);
    }
  )
}

const getUserData = async () => {

  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      return (JSON.parse(userData));
    }
  } catch (e) {
    console.error('Error loading user data', e);
  }
}

export {saveUserData, getUserData};

