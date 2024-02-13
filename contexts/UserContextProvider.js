import React, {useState, createContext} from 'react';

const UserContext = createContext(
  {
    data: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      onboardingCompleted: false,
      isLoggedIn: false,
      orderStatuses: false,
      passwordChanges: false,
      specialOffers: false,
      newsletter: false,
      avatar: null,
    },
    updateUser: () => {},
  },
);

const UserContextProvider = ({children}) => {
  // Initialize your state with an object
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    onboardingCompleted: false,
    isLoggedIn: false,
    orderStatuses: false,
    passwordChanges: false,
    specialOffers: false,
    newsletter: false,
    avatar: null,
  });

  // Function to update user data (only change the properties you want to change)
  const updateUser = (newData) => {
    setData({...data, ...newData});
  };

  return (
    <UserContext.Provider value={{data, updateUser}}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserContextProvider};
