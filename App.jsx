import {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import the user context and provider
import {UserContext, UserContextProvider} from './contexts/UserContextProvider';

// import the utility functions for style and data storage
import loadFonts from './utils/loadFonts';
import {getUserData} from './utils/dataStorage';

// import the screens
import Onboarding from './screens/Onboarding';
import SplashScreen from './screens/SplashScreen';
import Profile from './screens/Profile';
import Home from './screens/Home';
import Header from './components/Header';

/**
 * Main app component
 * @returns {JSX.Element}
 * @constructor
 */
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    setIsLoggedIn(user.data.isLoggedIn);
  }, [user]);


  // Check if loading and show splash screen
  if (isLoading) {
    // We haven't finished reading from AsyncStorage yet
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={Home}
              options={({navigation}) => ({
                headerShown: true,
                header: () => (<Header navigation={navigation} />),
                //headerTitle: (props) => (<Header {...props} />),
              })}
            />
            <Stack.Screen name="Profile" component={Profile}
              options={({navigation}) => ({
                headerShown: true,
                header: () => (<Header navigation={navigation} />),
              })}
            />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={Onboarding}
            options={({navigation}) => ({
              headerShown: true,
              header: () => (<Header navigation={navigation} />),
            })}
          />
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
