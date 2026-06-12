import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Role, ScoutProfile } from "@/types";

type AuthState = {
  status: "anonymous" | "authenticated";
  role: Role;
  currentProfile: ScoutProfile | null;
};

const initialState: AuthState = {
  status: "authenticated",
  role: "scout",
  currentProfile: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setRole(state, action: PayloadAction<Role>) {
      state.role = action.payload;
    },
    setCurrentProfile(state, action: PayloadAction<ScoutProfile | null>) {
      state.currentProfile = action.payload;
      state.status = action.payload ? "authenticated" : "anonymous";
    }
  }
});

export const { setRole, setCurrentProfile } = authSlice.actions;
export default authSlice.reducer;
