import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@supabase/supabase-js";

interface House {
  id: string;
  name: string;
}
export interface AuthState {
  isLoggedin: boolean;
  me: User | null;
  house: House | null;
}

const initialState: AuthState = {
  isLoggedin: false,
  me: null,
  house: null,
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
      state.house = null;
    },
    setHouse: (state, action: PayloadAction<House>) => {
      state.house = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setHouse } = authSlice.actions;

export default authSlice.reducer;
