import React, {useState, createContext} from 'react';


/**
 * Initial state for the user data
 * @type {{firstName: string, lastName: string, newsletter: boolean, passwordChanges: boolean, phone: string, orderStatuses: boolean, specialOffers: boolean, isLoggedIn: boolean, avatar: null, email: string}}
 */
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  isLoggedIn: false,
  orderStatuses: false,
  passwordChanges: false,
  specialOffers: false,
  newsletter: false,
  avatar: null,
};

/**
 * UserContext
 * @type {React.Context<{data: {firstName: string, lastName: string, newsletter: boolean, passwordChanges: boolean, phone: string, orderStatuses: boolean, specialOffers: boolean, isLoggedIn: boolean, avatar: null, email: string}, updateUser: *}>}
 */
const UserContext = createContext(
  {
    data: initialState,
    updateUser: () => {},
    deleteUser: () => {},
  },
);

/**
 * UserContextProvider
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const UserContextProvider = ({children}) => {
  // Initialize your state with an object
  const [data, setData] = useState(initialState);

  // Function to update user data (only change the properties you want to change)
  const updateUser = (newData) => {
    setData({...data, ...newData});
  };

  // delete user data
  const deleteUser = () => {
    setData(initialState);
  };

  return (
    <UserContext.Provider value={{data, updateUser, deleteUser}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
