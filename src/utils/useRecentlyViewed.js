import { useEffect, useState, useCallback } from "react";

const RECENTLY_VIEWED_KEY = "fads_recently_viewed";

export const useRecentlyViewed = () => {
  const [viewed, setViewed] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        try {
          setViewed(JSON.parse(stored));
        } catch {
          setViewed([]);
        }
      }
    }
  }, []);

  // ✅ Memoized function so it doesn't change every render
  const addViewed = useCallback(
    (productId) => {
      if (typeof window === "undefined") return;

      const updated = [
        productId,
        ...viewed.filter((id) => id !== productId),
      ].slice(0, 10); // Keep only 10 most recent

      setViewed(updated);
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
    },
    [viewed]
  );

  const getViewed = useCallback(() => viewed, [viewed]);

  const clearViewed = useCallback(() => {
    setViewed([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(RECENTLY_VIEWED_KEY);
    }
  }, []);

  return { viewed, addViewed, getViewed, clearViewed };
};