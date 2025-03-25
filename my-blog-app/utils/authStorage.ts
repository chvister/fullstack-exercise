import { AccessToken } from "@/generated-api";

const AUTH_KEY = "auth";

export const authStorage = {
  get: (): AccessToken | null => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error("Failed to parse stored auth:", e);
      return null;
    }
  },
  set: (token: AccessToken) => {
    try {
      localStorage.setItem(AUTH_KEY, JSON.stringify(token));
    } catch (e) {
      console.error("Failed to store auth:", e);
    }
  },
  clear: () => {
    localStorage.removeItem(AUTH_KEY);
  },
};
