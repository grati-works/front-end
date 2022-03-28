import { parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";

import { toast } from "react-toastify";
import { api } from "../services/api";
import { toastProps } from "../utils/toast";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "grati.token": token } = parseCookies();

    if (token) {
      api.get("user").then((response) => {
        const user = response.data;

        setUser(user);
      });
    }
  }, []);

  async function signIn(email, password) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refresh_token, user } = response.data;

      setCookie(undefined, "grati.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "grati.refreshToken", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      setUser(user);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      Router.push("/organizations");
    } catch (error) {
      console.log(error);
      toast.error(error.message, toastProps);
    }
  }

  async function signOut() {
    destroyCookie(undefined, "grati.token");
    destroyCookie(undefined, "grati.refreshToken");

    authChannel.postMessage("signOut");

    Router.push("/");
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
