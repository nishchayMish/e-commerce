"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import http from "@/lib/http";
import { endpoints } from "@/lib/endpoints";

export interface UserI {
  id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: UserI | null;
  setUser: Dispatch<SetStateAction<UserI | null>>;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<UserI | null>(null);

  useEffect(() => {
    let cancelled = false;

    const getCurrentUser = async () => {
      try {
        const res = await http.get(endpoints.auth.me);
        if (cancelled) return;

        const nextUser = res.data?.user ?? null;
        setUser(nextUser);
      } catch {
        // Don't clear a user that login set while this /me request was in flight
        if (!cancelled) {
          setUser((prev) => prev ?? null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    getCurrentUser();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
