import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

export interface AuthState {
  isLoggedin: boolean;
  me: User | null;
}

const initialState: AuthState = {
  isLoggedin: false,
  me: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isLoggedin = true;
      state.me = action.payload;
    },
    logout: (state) => {
      state.isLoggedin = false;
      state.me = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
