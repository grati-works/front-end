import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import Router from "next/router";

import { toast } from "react-toastify";
import { api } from "../services/api";
import { toastProps } from "../utils/toast";

export const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { "grati.token": token } = parseCookies();

    if (token) {
      api
        .get("user")
        .then((response) => {
          const user = response.data;

          setUser(user);

          const { "grati.organization_id": organization_id } = parseCookies();
          if (organization_id) {
            api
              .get(`profile/${organization_id}/${user.id}`)
              .then((response) => {
                const organization = response.data;

                setProfile(organization);
              })
              .catch((error) => console.log(error));
          }
        })
        .catch((error) => {});
    }
  }, []);

  async function signIn(email, password, redirect = true) {
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

      if (redirect) Router.push("/organizations");
    } catch (error) {
      if (error.response?.data?.code.includes("auth.not_activated")) {
        toast.error("Usuário não ativado", toastProps);
      } else {
        toast.error(error.message, toastProps);
      }
    }
  }

  async function signUp(name, username, email, password) {
    try {
      await api
        .post("user", {
          name,
          username,
          email,
          password,
        })
        .then((response) => {
          Router.push("/auth/signin");
          toast.success("Usuário cadastrado com sucesso!", toastProps);
        })
        .catch((error) => {
          toast.error(error.message, toastProps);
        });
    } catch (error) {
      toast.error(error.message, toastProps);
    }
  }

  async function signOut() {
    destroyCookie(undefined, "grati.token");
    destroyCookie(undefined, "grati.refreshToken");
    destroyCookie(undefined, "grati.organization_id");
    destroyCookie(undefined, "grati.group_id");

    Router.push("/");
    setUser(undefined);
  }

  async function reloadProfile() {
    try {
      const { "grati.organization_id": organization_id } = parseCookies();

      await api
        .get(`profile/${organization_id}/${user.id}`)
        .then((response) => {
          const organization = response.data;

          setProfile(organization);
        })
        .catch((error) => {});
    } catch (error) {
      toast.error(error.message, toastProps);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated,
        signIn,
        signUp,
        signOut,
        reloadProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
