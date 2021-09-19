import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userNeedsReducer from "./userNeeds";
import houseNeedsReducer from "./houseNeeds";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userNeeds: userNeedsReducer,
    houseNeeds: houseNeedsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
