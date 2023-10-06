import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./userSlice";
import searchSlice from "./searchSlice";
import playerReducer from './playerSlice';

const store = configureStore ({
    reducer: {
        search: searchSlice,
        authentication: authenticationReducer,
        player: playerReducer,
    }
});

export default store;