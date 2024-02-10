import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import SplashScreen from './screens/SplashScreen';
import Profile from './screens/Profile';
import {useContext, useEffect, useState} from 'react';
import {UserContext, UserContextProvider} from './contexts/UserContextProvider';

/**
 * Main app component
 * @returns {JSX.Element}
 * @constructor
 */
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  const Stack = createNativeStackNavigator();
  const user = useContext(UserContext);

  /**
   * Home screen
   * @returns {JSX.Element}
   * @constructor
   */
  const Home = () => {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }

  useEffect(() => {
    console.log('App useEffect: user.data', user.data)
    setOnboardingCompleted(user.data.onboardingCompleted);
  }, [user]);


  // Check if loading and show splash screen
  if (isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {onboardingCompleted ? (
          <>
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Home" component={Home} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding} />
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = () => {
  return (
    <UserContextProvider>
      <AppContent />
    </UserContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
