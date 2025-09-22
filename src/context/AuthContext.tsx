import { IContextType } from "@/types";
import React, { useContext } from "react";

const INITIAL_USER = {
  id: "",
  username: "",
  email: "",

  password: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isloading: false,
  isAuthenticated: false,
  setUser: () => {},
  checkAuthUser: async () => {},
  setIsAuthenticated: () => {},
};
const AuthContext = React.createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(INITIAL_USER);
  const [isloading, setIsLoading] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
 

    const value = {
      user,
      isloading,
      setUser,
      isAuthenticated,
      setIsAuthenticated,
      
      setIsLoading,
    };
    return (
      <div></div>
    )
  };


export default AuthProvider;
