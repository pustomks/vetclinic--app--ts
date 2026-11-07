import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { ApiInfo, ApiResponse, CreatePet, Pet } from "../../types";
import api from "../../api/axios";

interface PetState {
  items: Pet[];
  info: ApiInfo | null;
  loading: boolean;
  error: string | null;
}

export const fetchPets = createAsyncThunk<
  ApiResponse,
  void,
  { rejectValue: string }
>("pets/fetchPets", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponse>("/api/pets/me");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load pets",
    );
  }
});

export const addPet = createAsyncThunk<Pet, CreatePet, { rejectValue: string }>(
  "pets/addPets",
  async (newPet, { rejectWithValue }) => {
    try {
      const response = await api.post<Pet>("/api/pets/me", newPet);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add pet",
      );
    }
  },
);

export const updatePet = createAsyncThunk<Pet, Pet, { rejectValue: string }>(
  "pets/updatePet",
  async (updatedPet, { rejectWithValue }) => {
    try {
      const response = await api.put<Pet>(
        `/api/pets/me/${updatedPet.id}`,
        updatedPet,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update pet",
      );
    }
  },
);

export const deletePet = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("pets/deletePet", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/pets/me/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete pet",
    );
  }
});

const initialState: PetState = {
  items: [],
  info: null,
  loading: false,
  error: null,
};

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPets.fulfilled,
        (state, action: PayloadAction<ApiResponse>) => {
          const { results, info } = action.payload;
          state.loading = false;
          state.items = results;
          state.info = info;
          state.error = null;
        },
      )
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load pets";
      })
      .addCase(addPet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addPet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add pet";
      })
      .addCase(updatePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePet.fulfilled, (state, action: PayloadAction<Pet>) => {
        state.loading = false;
        const index = state.items.findIndex(
          (pet) => pet.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updatePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update pet";
      })
      .addCase(deletePet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePet.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.items = state.items.filter((pet) => pet.id !== action.payload);
        state.error = null;
      })
      .addCase(deletePet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete pet";
      });
  },
});

export default petsSlice.reducer;
