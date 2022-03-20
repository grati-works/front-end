import { createContext, useEffect, useState } from "react";

import { toast } from 'react-toastify';
import { api } from '../services/api';

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState();

    async function signIn(email, password) {
      const response = await api.post('/sessions', { email, password });
      const result = response.data;

      const { token, refresh_token, user } = result.data;
      
      if(token) {  
        setUser(user);

        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return true;
      }

      return false;
    }

    async function refreshUser(refreshToken) {
      const response = await api.post('/refresh-token', { token: refreshToken });
      const result = response.data;

      const { token, refresh_token, user } = result.data;

      if(token) {
        setUser(user);

        localStorage.setItem('token', token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem('user', JSON.stringify(user));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        return user;
      }

      return undefined;
    }

    async function signOut() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
      
      setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}