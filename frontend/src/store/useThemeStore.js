import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "light", // Default to "light" theme
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme); // Store selected theme in localStorage
    set({ theme }); // Update the state
  },
}));
