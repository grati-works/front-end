import axios from "axios";
import { parseCookies, setCookie } from "nookies";
import { toast } from "react-toastify";

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue = [];

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Authorization: `Bearer ${cookies["grati.token"]}`,
  },
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (error.response.data.code === "token.invalid") {
            cookies = parseCookies();
            const token = cookies['grati.refreshToken'];
            const originalConfig = error.config;

            if (!isRefreshing) {
              isRefreshing = true;

              api
                .post("refresh", { token })
                .then((response) => {
                  const { token, refresh_token } = response.data;

                  setCookie(undefined, "grati.token", token, {
                    maxAge: 60 * 60 * 24 * 30, // 30 days
                    path: "/",
                  });
                  setCookie(
                    undefined,
                    "grati.refreshToken",
                    refresh_token,
                    {
                      maxAge: 60 * 60 * 24 * 30, // 30 days
                      path: "/",
                    }
                  );

                  api.defaults.headers.common[
                    "Authorization"
                  ] = `Bearer ${token}`;

                  failedRequestQueue.forEach((request) =>
                    request.onSuccess(token)
                  );
                  failedRequestQueue = [];
                })
                .catch((error) => {
                  console.log(error);
                  failedRequestQueue.forEach((request) =>
                    request.onFailure(error)
                  );
                  failedRequestQueue = [];
                })
                .finally(() => {
                  isRefreshing = false;
                });
            }

            return new Promise((resolve, reject) => {
              failedRequestQueue.push({
                onSuccess: (token) => {
                  originalConfig.headers["Authorization"] = `Bearer ${token}`;
                  resolve(api(originalConfig));
                },
                onFailure: (error) => {
                  reject(error);
                },
              });
            });
          }
      }
    } else {
      console.log(error);
      toast.error('Não foi possível se conectar com o servidor')
    }
  }
);
