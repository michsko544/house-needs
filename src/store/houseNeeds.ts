import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HouseNeed } from "models/HouseNeed";

export interface HouseNeedsState {
  houseNeeds: HouseNeed[];
}

const initialState: HouseNeedsState = {
  houseNeeds: [],
};

export const houseNeedsSlice = createSlice({
  name: "houseNeeds",
  initialState,
  reducers: {
    setHouseNeeds: (state, action: PayloadAction<HouseNeed[]>) => {
      state.houseNeeds = [...action.payload];
    },
  },
});

export const { setHouseNeeds } = houseNeedsSlice.actions;

export default houseNeedsSlice.reducer;
