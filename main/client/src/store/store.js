import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice";
import { eventSlice } from "./slices/eventSlice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    event: eventSlice.reducer,
  },
});

export default store;
