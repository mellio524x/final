import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/axios";

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    userProfile: null,
    error: null,
    attendedEvents: null,
    createdEvents: null,
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCurrentUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const currentUser = action.payload;
      state.userProfile = currentUser;
    },
  },
  extraReducers: {},
});

export const getCurrentUser = () => async (dispatch) => {
  dispatch(userSlice.actions.startLoading());
  try {
    const response = await apiService.get("/users/me");
    dispatch(userSlice.actions.getCurrentUserSuccess(response.data));
  } catch (error) {
    dispatch(userSlice.actions.hasError(error.message));
  }
};
