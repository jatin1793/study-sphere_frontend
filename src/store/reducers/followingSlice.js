import { createSlice } from '@reduxjs/toolkit';

const followingSlice = createSlice({
  name: 'follow',
  initialState: false, 
  reducers: {
    setFollowingStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFollowingStatus } = followingSlice.actions;
export default followingSlice.reducer;
