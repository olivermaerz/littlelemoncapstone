import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './screens/Onboarding';
import SplashScreen from './screens/SplashScreen';
import Profile from './screens/Profile';
import {useContext, useEffect, useState} from 'react';
import {UserContext, UserContextProvider} from './contexts/UserContextProvider';
import loadFonts from './utils/loadFonts';
import {getUserData} from './utils/dataStorage';

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

  useEffect(() => {
    // load the user data from AsyncStorage
    (async () => {
      setIsLoading(true);

      getUserData().then((data) => {
        user.updateUser(data);
      });

      setIsLoading(false);
    })();
  } , []);

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
  // load the custom fonts (makes them app wide available as 'Markazi' and 'Karla')
  const [fontsLoaded] = loadFonts();

  return (
    <>
      {fontsLoaded === false ? <SplashScreen /> :
        (<UserContextProvider>
          <AppContent />
        </UserContextProvider>) }
    </>
  )
}

export default App;
