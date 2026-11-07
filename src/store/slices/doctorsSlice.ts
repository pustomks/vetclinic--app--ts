import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import api from "../../api/axios";
import type {
  ApiInfo,
  ApiResponseDoctor,
  CreateDoctor,
  Doctor,
} from "../../types";

interface DoctorState {
  items: Doctor[];
  info: ApiInfo | null;
  loading: boolean;
  error: string | null;
}

export const fetchDoctors = createAsyncThunk<
  ApiResponseDoctor,
  void,
  { rejectValue: string }
>("doctors/fetchDoctors", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<ApiResponseDoctor>("/api/doctors");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to load doctors",
    );
  }
});

export const addDoctor = createAsyncThunk<
  Doctor,
  CreateDoctor,
  { rejectValue: string }
>("doctors/addDoctor", async (newDoctor, { rejectWithValue }) => {
  try {
    const response = await api.post<Doctor>("/api/doctors", newDoctor);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to add doctor",
    );
  }
});

export const updateDoctor = createAsyncThunk<
  Doctor,
  Doctor,
  { rejectValue: string }
>("doctors/updateDoctor", async (updatedDoctor, { rejectWithValue }) => {
  try {
    const response = await api.put<Doctor>(
      `/api/doctors/${updatedDoctor.id}`,
      updatedDoctor,
    );
    return response.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to update doctor",
    );
  }
});

export const deleteDoctor = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("doctors/deleteDoctor", async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/api/doctors/${id}`);
    return id;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to delete doctor",
    );
  }
});

const initialState: DoctorState = {
  items: [],
  info: null,
  loading: false,
  error: null,
};

const doctorsSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchDoctors.fulfilled,
        (state, action: PayloadAction<ApiResponseDoctor>) => {
          const { results, info } = action.payload;
          state.loading = false;
          state.items = results;
          state.info = info;
          state.error = null;
        },
      )
      .addCase(fetchDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load doctors";
      })
      .addCase(addDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
        state.loading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(addDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add doctor";
      })
      .addCase(updateDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateDoctor.fulfilled,
        (state, action: PayloadAction<Doctor>) => {
          state.loading = false;
          const index = state.items.findIndex(
            (doctor) => doctor.id === action.payload.id,
          );
          if (index !== -1) {
            state.items[index] = action.payload;
          }
          state.error = null;
        },
      )
      .addCase(updateDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update doctor";
      })
      .addCase(deleteDoctor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteDoctor.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = false;
          state.items = state.items.filter(
            (doctor) => doctor.id !== action.payload,
          );
          state.error = null;
        },
      )
      .addCase(deleteDoctor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete doctor";
      });
  },
});

export default doctorsSlice.reducer;
