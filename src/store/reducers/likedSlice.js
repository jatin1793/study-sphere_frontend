import { createSlice } from '@reduxjs/toolkit';

const likedSlice = createSlice({
  name: 'liked',
  initialState: false, 
  reducers: {
    setlikedStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { setlikedStatus } = likedSlice.actions;
export default likedSlice.reducer;
