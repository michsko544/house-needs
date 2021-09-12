import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserNeed } from "models/UserNeed";

export interface UserNeedsState {
  userNeeds: UserNeed[];
}

const initialState: UserNeedsState = {
  userNeeds: [],
};

export const userNeedsSlice = createSlice({
  name: "userNeeds",
  initialState,
  reducers: {
    setUserNeeds: (state, action: PayloadAction<UserNeed[]>) => {
      state.userNeeds = [...action.payload];
    },
  },
});

export const { setUserNeeds } = userNeedsSlice.actions;

export default userNeedsSlice.reducer;
