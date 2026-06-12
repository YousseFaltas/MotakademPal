import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ThemeMode } from "@/types";

export type ToastState = {
  id: string;
  message: string;
  tone: "success" | "info" | "error";
};

type UiState = {
  theme: ThemeMode;
  profileDrawerOpen: boolean;
  settingsOpen: boolean;
  toast: ToastState | null;
};

const initialState: UiState = {
  theme: "dark",
  profileDrawerOpen: false,
  settingsOpen: false,
  toast: null
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
    setProfileDrawerOpen(state, action: PayloadAction<boolean>) {
      state.profileDrawerOpen = action.payload;
    },
    setSettingsOpen(state, action: PayloadAction<boolean>) {
      state.settingsOpen = action.payload;
    },
    showToast(state, action: PayloadAction<Omit<ToastState, "id">>) {
      state.toast = {
        id: `${Date.now()}`,
        ...action.payload
      };
    },
    clearToast(state) {
      state.toast = null;
    }
  }
});

export const {
  clearToast,
  setProfileDrawerOpen,
  setSettingsOpen,
  setTheme,
  showToast,
  toggleTheme
} = uiSlice.actions;
export default uiSlice.reducer;
