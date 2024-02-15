import {StyleSheet, View, Image, Text, SafeAreaView, Pressable} from 'react-native';
import colors from '../styles/colors';
import {UserContext} from '../contexts/UserContextProvider';
import {useContext, useEffect, useState} from 'react';

/**
 * The header component
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({navigation}) => {
  // get the user context
  const user = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);

  /*
   useEffect to set the image or initials based on the user data
   */
  useEffect(() => {
    console.log('header user.data', user.data);
    (async () => {
      if (user.data.isLoggedIn) {
        const avatar = user.data.avatar;
        if (avatar) {
          setImage(user.data.avatar);
        } else {
          setImage(null);
          const firstName = user.data.firstName;
          const lastName = user.data.lastName;
          if (lastName) {
            setInitials(`${Array.from(firstName)[0]}${Array.from(lastName)[0]}`);
          } else {
            setInitials(`${Array.from(firstName)[0]}`);
          }
        }
      }
    })();
  }, [user.data]);

  /*
   useEffect to set the canGoBack state based on the navigation prop (it can be undefined when the component is
   not fully mounted yet)
   */
  useEffect(() => {
    setCanGoBack(!!navigation?.canGoBack());
    //console.log('canGoBack', !!navigation?.canGoBack());
  }, [navigation]);

  return (
    <>
    <SafeAreaView style={styles.header}>
      {canGoBack ?
        <Pressable onPress={() => navigation.goBack()}>
          <View style={styles.backButton}>
            <Text style={styles.backText }>←</Text>
          </View>
        </Pressable>
      : <View style={styles.placeholder}></View> }
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
        // align center
        resizeMode="contain"
      />
      {user.data.isLoggedIn ? (
      <Pressable onPress={() => navigation.navigate('Profile')}>
        {image ?
          <Image source={{uri: image}} style={styles.avatarImage} />
          :
          (initials ?
            <View style={styles.avatarInitials}>
            <Text style={styles.avatarInitialsText}>{initials}</Text>
          </View> :
              <View style={styles.placeholder}></View>
          )
        }
      </Pressable>
      ) : (
      <View style={styles.placeholder}></View>
      )}
    </SafeAreaView>
    </>
  );
}

/**
 * The styles for the header component
 * @type {{image: {width: number, height: number}, headerText: {fontFamily: string, color: string, fontSize: number, fontWeight: string}, header: {fontFamily: string, alignItems: string, textAlign: string, fontSize: number, fontWeight: string, marginTop: number}}}
 */
const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontFamily: 'Markazi',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: colors.highlight1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 185,
    height: 40,
  },
  headerText: {
    fontFamily: 'Markazi',
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary1,
  },
  profileImage: {
    width: 40,
    height: 40,
    position: 'absolute',
    right: 10,
    top: 10,
    borderRadius: 20,
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 20,
  },
  avatarInitials: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarInitialsText: {
    color: colors.highlight1,
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'Markazi',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary1,
    marginLeft: 20,
    borderRadius: 20,
  },
  backText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
  },
  placeholder: {
    width: 40,
    height: 40,
    marginRight: 20,
  },
});

export default Header;
