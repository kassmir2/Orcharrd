// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  IsLoggedIn: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, IsLoggedIn: action.isLoggedIn };
    // ... (other cases)
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
