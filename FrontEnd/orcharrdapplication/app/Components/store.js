// store.js
import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  IsLoggedIn: false,
  GlobalUsername: null,
  GlobalPlace: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_IS_LOGGED_IN":
      return { ...state, IsLoggedIn: action.isLoggedIn };
    case "SET_GLOBAL_USERNAME":
      return { ...state, GlobalUsername: action.globalUsername };
    case "SET_GLOBAL_PLACE":
      return { ...state, GlobalPlace: action.globalPlace };
    default:
      return state;
  }
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
