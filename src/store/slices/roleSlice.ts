import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api/axios";
import type { UserRoleResponse } from "../../types";

interface RoleState {
  role: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: RoleState = {
  role: null,
  loading: false,
  error: null,
};

export const checkRole = createAsyncThunk<
  string,
  void,
  { rejectValue: string }
>("role/checkRole", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<UserRoleResponse>("/api/users/me");
    const { role } = response.data;
    return role;
  } catch (error: any) {
    return rejectWithValue(error.message || "Failed to check role");
  }
});

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setUserRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
      state.loading = false;
    },

    deleteUserRole: (state) => {
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkRole.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkRole.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(checkRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { setUserRole, deleteUserRole } = roleSlice.actions;

export default roleSlice.reducer;
