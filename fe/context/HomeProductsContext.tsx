"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
import { getHomeProducts } from "@/services/home";
import type { HomeProductsResponse } from "@/lib/types";

interface HomeProductsContextType {
  data: HomeProductsResponse | null;
  loading: boolean;
}

const HomeProductsContext = createContext<HomeProductsContextType | null>(null);

export default function HomeProductsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [data, setData] = useState<HomeProductsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getHomeProducts();
        setData(res);
      } catch {
        toast.error("error fetching products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <HomeProductsContext.Provider value={{ data, loading }}>
      {children}
    </HomeProductsContext.Provider>
  );
}

export function useHomeProducts() {
  const context = useContext(HomeProductsContext);
  if (!context) {
    throw new Error("useHomeProducts must be used within HomeProductsProvider");
  }
  return context;
}
