import {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, SafeAreaView, Image, TextInput, ScrollView, Pressable} from 'react-native';

// import styles
import generalStyles from '../styles/generalStyles';
import formStyles from '../styles/formStyles';
import colors from '../styles/colors';

// import utility functions for data storage
import {getMenuItems, getMenuItemCount, saveMenuItems} from '../utils/dataStorage';

/**
 * Home screen
 * @returns {JSX.Element}
 * @constructor
 */
const Home = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [apiUrl, setApiUrl] = useState('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
  // for the menu items search and categories
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState(['Starters', 'Mains', 'Desserts', 'Drinks', 'Specials']);
  const [categorySearch, setCategorySearch] = useState([]);
  const [menuItemsLoaded, setMenuItemsLoaded] = useState(false);


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
   * Fetch the menu items from the API
   * @returns {Promise<*>}
   */
  const fetchMenuItems = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log('API data', data.menu);
      // add a unique key to each item
      const augmentedData = data.menu.map((item, index) => {
        return {
          ...item,
          id: index,
        }
      });
      return augmentedData;
    } catch (error) {
      console.error(error);
    }
  }

  /*
   * useEffect to reload the menu items from db when the search term changes
   */
  useEffect(() => {
    // give it a delay of 500ms
    const delayDebounceFn = setTimeout(() => {
      if(menuItemsLoaded) {
        updateMenuItemsFromDB();
      }
    }, 500);

  }, [searchTerm]);

  /*
   * useEffect to reload the menu items from db when the category search changes
   */
  useEffect(() => {
    // reload the menu items when the category search changes
    console.log('triggered category search', categorySearch);
    if (menuItemsLoaded) {
      updateMenuItemsFromDB();
    }
  }, [categorySearch]);

  /**
   * Load the menu items from the sqlite db or API
   * @returns {Promise<void>}
   */
  const loadMenuItems = async () => {
    // first check if the menu items are already in the db (count), then fetch
    // them from the API and store the menu items in the db, finally get the menu items from the db
    try {
      const dbCount = await getMenuItemCount();
      if (dbCount === 0) {
        console.log('fetching menu items from the API');
        const data = await fetchMenuItems();
        await saveMenuItems(data);
        setMenuItemsLoaded(true);

      }
      updateMenuItemsFromDB();
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Get the menu items from the db
   * @returns {Promise<void>}
   */
  const updateMenuItemsFromDB = async () => {
    try {
      const data = await getMenuItems(searchTerm, categorySearch);
      setMenuItems(data);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Update the selected categories (from buttons) for the search
   * @param category
   */
  const updateCategoriesForSearch = (category) => {
    const lowerCategory = category.toLowerCase();
    if (categorySearch.includes(lowerCategory)) {
      setCategorySearch(categorySearch.filter(item => item !== lowerCategory));
    } else {
      setCategorySearch([...categorySearch, lowerCategory]);
    }
  }

  /*
   Load the menu items when the component mounts
   */
  useEffect(() => {
    setSearchTerm('');
    console.log('triggered component mount');
    loadMenuItems();
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
            <TextInput
              style={styles.searchInput}
              placeholder="Search for a dish"
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
        </View>
        <Text style={styles.menuTitle}>Order for Delivery</Text>
        <View>
        <ScrollView
          style={styles.buttonRow}
          horizontal={true}
          showsHorizontalScrollIndicator={true}
        >
          {categories.map((category, index) => {
            return (
              <Pressable
                style={categorySearch.includes(category.toLowerCase()) ? styles.buttonActive : styles.button}
                key={index}
                onPress={() => updateCategoriesForSearch(category)}
              >
                <Text key={index} style={styles.buttonText}>{category}</Text>
              </Pressable>
            );
          })}
        </ScrollView>
          </View>
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
  ...formStyles,
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
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Karla',
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
  buttonRow: {
    marginLeft: 20,
    flex: 0,
  },
  button: {
    ...formStyles.button,
    backgroundColor: colors.secondary2,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  buttonActive: {
    ...formStyles.button,
    backgroundColor: colors.secondary1,
    marginRight: 10,
    marginTop: 4,
    marginBottom: 10,
  },
  buttonText: {
    ...formStyles.buttonText,
    // capitalize the first letter of the category
    textTransform: 'capitalize',
    flex: 0,
    color: colors.black,
  },
});

export default Home
