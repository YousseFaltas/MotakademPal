"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Provider } from "react-redux";
import { siteConfig } from "@/config/site";
import { dirByLocale, normalizeLocale, type Locale } from "@/i18n";
import { store, type AppStore } from "./store";
import { setLocale } from "./slices/localeSlice";
import { setTheme } from "./slices/uiSlice";

function PersistedStateBridge() {
  useEffect(() => {
    const savedLocale = normalizeLocale(window.localStorage.getItem(siteConfig.storageKeys.locale));
    const savedTheme = window.localStorage.getItem(siteConfig.storageKeys.theme);
    store.dispatch(setLocale(savedLocale));
    if (savedTheme === "light" || savedTheme === "dark") {
      store.dispatch(setTheme(savedTheme));
    }

    const unsubscribe = store.subscribe(() => {
      const state = store.getState();
      window.localStorage.setItem(siteConfig.storageKeys.locale, state.locale.locale);
      window.localStorage.setItem(siteConfig.storageKeys.theme, state.ui.theme);
      document.documentElement.lang = state.locale.locale;
      document.documentElement.dir = dirByLocale[state.locale.locale as Locale];
      document.documentElement.classList.toggle("dark", state.ui.theme === "dark");
    });

    return unsubscribe;
  }, []);

  return null;
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore>(store);

  return (
    <Provider store={storeRef.current}>
      <PersistedStateBridge />
      {children}
    </Provider>
  );
}
