import {StyleSheet, View, Image, Text} from 'react-native';
import colors from '../styles/colors';
import {UserContext} from '../contexts/UserContextProvider';
import {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * The header component
 * @returns {JSX.Element}
 * @constructor
 */
const Header = () => {
  // get the user context
  const user = useContext(UserContext);
  const [image, setImage] = useState(null);
  const [initials, setInitials] = useState('');

  useEffect(() => {
    (async () => {
      if (user.data.isLoggedIn) {
        const image = user.data.avatar;
        if (image) {
          setImage(image);
        } else {
          const firstName = user.data.firstName;
          const lastName = user.data.lastName;
          setInitials(`${Array.from(firstName)[0]}${Array.from(lastName)[0]}`);
        }
      }
    })();
  }, [user.data]);

  return (
    <>
    <View style={styles.header}>
      <View style={styles.backButton}>
        <Text style={styles.backText}>←</Text>
      </View>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.image}
        // align center
        resizeMode="contain"
      />
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
    </View>
   {user.data.loggedIn && <Image source={require('../assets/images/Profile.png')} style={styles.profileImage} />}
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
    marginTop: 10,
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
    fontSize: 20,
    fontWeight: 'bold',
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
