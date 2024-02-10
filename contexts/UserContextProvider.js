import React, {useState, createContext} from 'react';

const UserContext = createContext(
  {
    data: {
      name: '',
      email: '',
      onboardingCompleted: false,
      isLoggedIn: false,
    },
    updateUser: () => {},
  },
);

const UserContextProvider = ({children}) => {
  // Initialize your state with an object
  const [data, setData] = useState({
    name: '',
    email: '',
    onboardingCompleted: false,
    isLoggedIn: false,
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
