import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SQLite from 'expo-sqlite';


/**
 * Save the user data to the local storage
 * @param data
 */
const saveUserData = (data) => {
  // save the user data to the local storage
  AsyncStorage.setItem('user', JSON.stringify(data)).then(
    () => {
      console.log('User data saved to local storage', data);
    }
  )
}

/**
 * Get the user data from the local storage
 * @returns {Promise<any>}
 */
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


/**
 * Open the local sqlite database
 * @returns {SQLiteDatabase}
 */
const openDatabase = () => {
  const db = SQLite.openDatabase('menuItems.db');
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS menuItems (id INTEGER PRIMARY KEY NOT NULL, name TEXT, description TEXT, price REAL, category TEXT, image TEXT);'
    );
  });
  return db;
}

/**
 * Save the menu items in the local sqlite database
 * @param data
 */
const saveMenuItems = (data) => {
  // save the menu items in sqllite
  const db = openDatabase();
  db.transaction((tx) => {
    data.forEach((item) => {
      tx.executeSql(
        'INSERT INTO menuItems (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)',
        [item.name, item.description, item.price, item.category, item.image]
      );
    });
  });
}

/**
 * Get the menu items from the local sqlite database
 * @returns {Promise<unknown>}
 */
const getMenuItems = () => {
  const db = openDatabase();
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM menuItems',
        [],
        (_, {rows: {_array}}) => {
          resolve(_array);
          console.log('Menu items loaded from local storage', _array);
        },
        (_, error) => {
          console.error('Error loading menu items', error);
          reject(error);
        }
      );
    });
  });
}

export {saveUserData, getUserData, saveMenuItems, getMenuItems};


