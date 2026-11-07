import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface TokenState {
  token: string | null;
}

const initialState: TokenState = { token: localStorage.getItem("jwt") };

const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("jwt", action.payload);
    },

    logout: (state) => {
      state.token = null;
      localStorage.removeItem("jwt");
    },
  },
});

export const { login, logout } = tokenSlice.actions;
export default tokenSlice.reducer;
