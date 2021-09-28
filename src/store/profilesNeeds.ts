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
    updateProfileNeeds: (state, action: PayloadAction<ProfilesNeed>) => {
      const filteredNeeds = state.profilesNeeds.filter(
        (profile) => profile.id !== action.payload.id
      );
      state.profilesNeeds = [action.payload, ...filteredNeeds];
    },
  },
});

export const { setProfilesNeeds, updateProfileNeeds } =
  profilesNeedsSlice.actions;

export default profilesNeedsSlice.reducer;
