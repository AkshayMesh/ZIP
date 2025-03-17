import { configureStore } from "@reduxjs/toolkit"
import pickupDropReducer from './SliceReducer';

const store = configureStore({
    reducer: {
        pickupDrop: pickupDropReducer,
    },
  });

export default store;