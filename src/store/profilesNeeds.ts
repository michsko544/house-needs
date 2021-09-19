import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfilesNeed } from "models/ProfilesNeed";

export interface ProfilesNeedsState {
  profilesNeeds: ProfilesNeed[];
}

const initialState: ProfilesNeedsState = {
  profilesNeeds: [],
};

export const profilesNeedsSlice = createSlice({
  name: "profilesNeeds",
  initialState,
  reducers: {
    setProfilesNeeds: (state, action: PayloadAction<ProfilesNeed[]>) => {
      state.profilesNeeds = [...action.payload];
    },
  },
});

export const { setProfilesNeeds } = profilesNeedsSlice.actions;

export default profilesNeedsSlice.reducer;
