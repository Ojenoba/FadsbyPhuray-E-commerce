"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { useAuth } from "@/context/AuthProvider";
import { useApiClient } from "@/utils/apiClient";

const CartContext = createContext(null);

// Helper to normalize product IDs
const getProductId = (p) => p._id || p.id || p.product_id || p.slug;

// Helper to generate a guaranteed unique lineKey
const makeLineKey = (p) => {
  const id = getProductId(p);
  const size = p.size || "";
  const color = p.color || "";
  // Always include id, and append size/color if present
  return [id, size, color].filter(Boolean).join("|");
};

function cartReducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD_ITEM": {
      const product = action.payload;
      const lineKey = makeLineKey(product);

      // Check if item already exists
      const existing = state.find((i) => i.lineKey === lineKey);
      if (existing) {
        return state.map((i) =>
          i.lineKey === lineKey
            ? { ...i, quantity: i.quantity + (product.quantity || 1) }
            : i
        );
      }

      // Add new item with guaranteed unique lineKey
      return [
        ...state,
        {
          ...product,
          id: getProductId(product),
          lineKey,
          quantity: product.quantity || 1,
        },
      ];
    }

    case "UPDATE_QUANTITY":
      return state.map((i) =>
        i.lineKey === action.payload.lineKey
          ? { ...i, quantity: action.payload.quantity }
          : i
      );

    case "REMOVE_ITEM":
      // ✅ Only remove the item with matching lineKey
      return state.filter((i) => i.lineKey !== action.payload);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { isLoggedIn, user, token } = useAuth();
  const { apiClient } = useApiClient();
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  // Load cart from API or localStorage
  useEffect(() => {
    const fetchCart = async () => {
      if (isLoggedIn && user?.id) {
        const data = await apiClient(`/api/cart?userId=${user.id}`);
        if (data && !data.error) {
          dispatch({ type: "SET_CART", payload: data.data || [] });
        }
      } else {
        const stored = localStorage.getItem("guest_cart");
        dispatch({ type: "SET_CART", payload: stored ? JSON.parse(stored) : [] });
      }
    };
    fetchCart();
  }, [isLoggedIn, user, token]);

  // Persist guest cart
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.setItem("guest_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isLoggedIn]);

  // Actions
  const addToCart = (product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const updateQuantity = (lineKey, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { lineKey, quantity } });

  const removeFromCart = (lineKey) =>
    dispatch({ type: "REMOVE_ITEM", payload: lineKey });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Derived values
  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}