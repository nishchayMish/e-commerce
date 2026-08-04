"use client"
import { endpoints } from "@/lib/endpoints";
import http from "@/lib/http";
import { createContext, useCallback, useContext, useEffect, useState } from "react"

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  name: string;
  category: string;
  price: number;
  old_price: number;
  description: string;
  image: string;
}

interface CartContextType{
  cartCount: number;
  cartItems: CartItem[];
  loading: boolean;
  fetchCart: () => Promise<void>;
}

export const cartContext = createContext<CartContextType | null>(null);

const CartContextProvider = ({children}: {children: React.ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const fetchCart = useCallback(async () => {
    try {
      const res = await http.get(endpoints.cart.fetchCart);
      setCartItems(res.data.data ?? []);
    } catch (error) {
      console.log(error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchCart();
  }, [fetchCart]);

    return (
    <cartContext.Provider value={{cartCount, cartItems, loading, fetchCart}}>
        {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider;

export const useCart = () => {
  const context = useContext(cartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartContextProvider");
  }

  return context;
};
