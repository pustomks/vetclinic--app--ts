import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Pet } from "../../types";

interface FavoritePetState {
  items: Pet[];
}

function loadFavoritePets(): Pet[] {
  const savedPets = localStorage.getItem("favoritesPets");

  return savedPets ? JSON.parse(savedPets) : [];
}

const initialState: FavoritePetState = {
  items: loadFavoritePets(),
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavouritePet: (state, action: PayloadAction<Pet>) => {
      const pet = action.payload;

      const favoritePetIndex = state.items.findIndex(
        (item) => item.id === pet.id,
      );

      if (favoritePetIndex !== -1) {
        state.items.splice(favoritePetIndex, 1);
      } else {
        state.items.push(pet);
      }
      localStorage.setItem("favoritesPets", JSON.stringify(state.items));
    },

    deleteAllFavorites: (state) => {
      state.items = [];
      localStorage.setItem("favoritesPets", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavouritePet, deleteAllFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
