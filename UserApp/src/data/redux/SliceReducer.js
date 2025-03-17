import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

const initialState = {
    pickupLocation: '',
    dropLocation: '',
    loading: false,
  };
  
  const pickupDropSlice = createSlice({
    name: 'pickupDrop',
    initialState,
    reducers: {
      setPickupLocation(state, action) {
        state.pickupLocation = action.payload;
      },
      setDropLocation(state, action) {
        state.dropLocation = action.payload;
      },
    },
  });  

export const { setPickupLocation, setDropLocation } = pickupDropSlice.actions;
export default pickupDropSlice.reducer;