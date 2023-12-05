import { createSlice } from "@reduxjs/toolkit";
import apiService from "../../api/axios";

export const eventSlice = createSlice({
  name: "events",
  initialState: {
    isDeleted: false,
    isLoading: false,
    error: null,
    eventsByUser: [],
    allEvents: [],
    event: {},
    guestList: [],
  },
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllUserEventsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const userEvents = action.payload;
      state.eventsByUser = userEvents.userEvents;
      console.log(userEvents.userEvents);
    },
    getAllEventsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const allEventsData = action.payload;
      // console.log(allEventsData);
      state.allEvents = allEventsData.allEvents.events;
    },
    getSingleEventSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const singleEvent = action.payload;
      state.event = singleEvent.targetEvent;
    },
    getEventsPublicAccessSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const allEventsData = action.payload;
      // console.log(allEventsData);
      state.allEvents = allEventsData.allEvents.events;
    },
    getGuestListSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const data = action.payload;
      state.guestList = data.userList;
    },
  },
  extraReducers: {},
});

export const getSingleEvent =
  ({ eventId }) =>
  async (dispatch) => {
    dispatch(eventSlice.actions.startLoading());
    try {
      const res = await apiService.get(`/events/${eventId}`);
      dispatch(eventSlice.actions.getSingleEventSuccess(res.data));
      console.log(res);
    } catch (error) {
      dispatch(eventSlice.actions.hasError(error.message));
    }
  };

export const getAllUserEvents =
  ({ userId }) =>
  async (dispatch) => {
    dispatch(eventSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/events/my-events/${userId}`);
      // console.log(response);
      dispatch(eventSlice.actions.getAllUserEventsSuccess(response.data));
    } catch (error) {
      dispatch(eventSlice.actions.hasError(error.message));
    }
  };

export const getEventsPublicAccess = () => async (dispatch) => {
  dispatch(eventSlice.actions.startLoading());
  try {
    const response = await apiService.get("/public/events");
    dispatch(eventSlice.actions.getEventsPublicAccessSuccess(response.data));
  } catch (error) {
    dispatch(eventSlice.actions.hasError(error.message));
  }
};

export const getAllEvents = () => async (dispatch) => {
  dispatch(eventSlice.actions.startLoading());
  try {
    const response = await apiService.get("/events");
    dispatch(eventSlice.actions.getAllEventsSuccess(response.data));
  } catch (error) {
    dispatch(eventSlice.actions.hasError(error.message));
  }
};

export const getGuestList =
  ({ eventId }) =>
  async (dispatch) => {
    dispatch(eventSlice.actions.startLoading());
    try {
      const response = await apiService.get(`/events/guests/${eventId}`);
      dispatch(eventSlice.actions.getGuestListSuccess(response.data));
    } catch (error) {
      dispatch(eventSlice.actions.hasError(error.message));
    }
  };
