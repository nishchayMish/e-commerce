import axios from "axios";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  withCredentials: true,
});

/** Auth routes that may legitimately return 401 without forcing a login redirect */
const AUTH_PATHS_SKIP_REDIRECT = [
  "/auth/me",
  "/auth/login",
  "/auth/register",
  "/auth/verify-otp",
  "/auth/forgot-password",
  "/auth/reset-password",
];

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      const url = String(error.config?.url ?? "");
      const skip = AUTH_PATHS_SKIP_REDIRECT.some((path) => url.includes(path));

      if (!skip && !window.location.pathname.startsWith("/login")) {
        const returnTo = encodeURIComponent(
          window.location.pathname + window.location.search
        );
        window.location.href = `/login?redirect=${returnTo}`;
      }
    }
    return Promise.reject(error);
  }
);

export default http;
