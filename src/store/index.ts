import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import roleSlice from "./slices/roleSlice";
import petsSlice from "./slices/petsSlice";
import favoritePetSlice from "./slices/favoritePetSlice";
import doctorsSlice from "./slices/doctorsSlice";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    role: roleSlice,
    pets: petsSlice,
    favorites: favoritePetSlice,
    doctors: doctorsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
