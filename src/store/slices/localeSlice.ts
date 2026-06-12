import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { defaultLocale, dirByLocale, normalizeLocale, type Locale } from "@/i18n";

type LocaleState = {
  locale: Locale;
  direction: "rtl" | "ltr";
};

const initialState: LocaleState = {
  locale: defaultLocale,
  direction: dirByLocale[defaultLocale]
};

const localeSlice = createSlice({
  name: "locale",
  initialState,
  reducers: {
    setLocale(state, action: PayloadAction<string>) {
      const locale = normalizeLocale(action.payload);
      state.locale = locale;
      state.direction = dirByLocale[locale];
    }
  }
});

export const { setLocale } = localeSlice.actions;
export default localeSlice.reducer;
