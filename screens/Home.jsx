import {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, Image, TextInput} from 'react-native';

// import styles
import generalStyles from '../styles/generalStyles';
import colors from '../styles/colors';

// import utility functions for data storage
import {getMenuItems} from '../utils/dataStorage';
import {saveMenuItems} from '../utils/dataStorage';

/**
 * Home screen
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [apiUrl, setApiUrl] = useState('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');

  /**
   * Get the image URL
   * @param imageFileName
   * @returns {`https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${string}?raw=true`}
   */
  const getImageUrl = (imageFileName) => {
    // check if the url is available or if there is an error
    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
  }

  /**
   * Load the menu items from the API
   * @returns {Promise<void>}
   */
  const loadMenuItems = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('data', data.menu);
      // add a unique key to each item
      const augmentedData = data.menu.map((item, index) => {
        console.log('item', item);
        return {
          ...item,
          id: index,
        }
      });
      console.log('augmentedData', augmentedData);
      setMenuItems(augmentedData);
    } catch (error) {
      console.error(error);
    }
  }

  /*
   Load the menu items when the component mounts
   */
  useEffect(() => {
    loadMenuItems();
    console.log('re-rendering')
  }, []);

  /**
   * The item component
   * @param item
   * @returns {JSX.Element}
   * @constructor
   */
  const Item = ({item}) => {
    return (
      <View style={styles.item}>
        <View style={styles.itemTextBlock}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description.substring(0,100)}{item.description.length > 100 ? ' ...' : ''}</Text>
          <Text style={styles.price}>Price: ${(Math.round(item.price * 100) / 100).toFixed(2)}</Text>
        </View>
        <Image
          source={{uri: getImageUrl(item.image)}}
          defaultSource={require('../assets/images/logoMono.png')}
          style={styles.image}
          backgroundColor={colors.white}
        />
      </View>
    );
  }

  return (
    <>
      <SafeAreaView style={styles.parentContainer}>
        <View style={styles.hero}>
          <View>
            <Text style={styles.heroTitle}>Little Lemon</Text>
          </View>
          <View style={styles.heroTextBlock}>
            <View style={styles.heroLeftColumn}>
              <Text style={styles.heroCity}>Chicago</Text>
              <Text style={styles.heroText}>We are a family owned Mediterranean restaurant, focused on traditional
              recipes served with a modern twist.</Text>
            </View>
            <Image source={require('../assets/images/hero.png')} style={styles.heroImage} />
          </View>
          <View style={styles.search}>
            <Image source={require('../assets/images/search.png')} style={styles.searchIcon} />
            <TextInput placeholder="Search for a dish" />
          </View>
        </View>
        <Text style={styles.menuTitle}>Order for Delivery</Text>
        <View style={styles.list}>
          <FlatList
            style={styles.list}
            data={menuItems}
            renderItem={({item}) => <Item item={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </>
  );
}

/**
 * The styles for the Home component
 * @type {{container: {marginRight: number, backgroundColor: string, fontFamily: string, marginLeft: number}, image: {width: number, height: number}, item: {marginHorizontal: number, backgroundColor: string, marginVertical: number}, mainScreen: {backgroundColor: string}, menuTitle: {fontFamily: string, textAlign: string, fontSize: number, fontWeight: string, marginTop: number}, description: {fontFamily: string, fontSize: number}, text: {fontFamily: string, color: string, fontSize: number}, title: {fontFamily: string, fontSize: number, fontWeight: string}, list: {backgroundColor: string}}}
 */
const styles = StyleSheet.create({
  ...generalStyles,
  parentContainer: {
    backgroundColor: colors.highlight1,
    flex: 1,
  },
  hero: {
    marginTop: 10,
    backgroundColor: colors.primary1,
    //height: 200,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontFamily: 'Markazi',
    marginTop: 20,
    lineHeight: 32,
    color: colors.primary2,
  },
  heroCity: {
    marginTop: -10,
    paddingTop: 0,
    fontSize: 26,
    lineHeight: 22,
    fontFamily: 'Markazi',
    color: colors.highlight1,
  },
  heroTextBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroLeftColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  heroImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginLeft: 12,
  },
  heroText: {
    fontSize: 13,
    fontFamily: 'Karla',
    color: colors.highlight1,
  },
  search: {
    backgroundColor: colors.highlight1,
    flexDirection: 'row',
    padding: 8,
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 12,
    fontFamily: 'Karla',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  item: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 8,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor: colors.highlight1,
    marginVertical: 8,
    marginHorizontal: 12,
  },
  separator: {
    height: 2,
    //width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: colors.secondary2,
  },
  itemTextBlock: {
    flex: 1,
    flexDirection: 'column',
  },
  name: {
    fontSize: 18,
    fontFamily: 'Karla-Bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Karla',
    fontWeight: 'bold',
    color: colors.highlight2,
  },
  price: {
    fontSize: 18,
    fontFamily: 'Karla',
    fontWeight: '800',
    marginTop: 8,
    color: colors.highlight2,
  },
  image: {
    width: 70,
    height: 70,
    marginLeft: 6,
  },
  list: {
    flex: 1,
    backgroundColor: colors.highlight1,
  },
  menuTitle: {
    textTransform: 'uppercase',
    fontSize: 20,
    fontFamily: 'Karla-Bold',
    textAlign: 'left',
    marginTop: 10,
    marginLeft: 20,
  },
});

export default Home
