import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { House } from "models/House";

export interface HousesState {
  houses: House[];
}

const initialState: HousesState = {
  houses: [],
};

export const housesSlice = createSlice({
  name: "houses",
  initialState,
  reducers: {
    setHouses: (state, action: PayloadAction<House[]>) => {
      state.houses = [...action.payload];
    },
  },
});

export const { setHouses } = housesSlice.actions;

export default housesSlice.reducer;
