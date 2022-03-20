import { createContext, useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();

    async function signIn(email, password) {
      const response = await api.post('/sessions', { email, password });
      const result = response.data;

      const { token, user } = result.data;
      
      if(token) {  
        setUser(user);

        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return true;
      }

      return false;
    }

    async function signOut() {
      localStorage.removeItem('token')
      
      setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}