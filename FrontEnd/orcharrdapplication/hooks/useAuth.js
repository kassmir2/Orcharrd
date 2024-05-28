import { View, Text } from 'react-native'
import React, {createContext, useContext} from 'react'

// import {
//     GoogleSignin,
//     GoogleSigninButton,
//     statusCodes,
//   } from '@react-native-google-signin/google-signin';


const AuthContext = createContext(
    {

    }
);

export const AuthProvider = ({children}) => {
  return (
    <AuthContext.Provider value={{
        user: "chucky",
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export default function useAuth()
{
  return useContext(AuthContext);
}