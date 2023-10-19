import { createSlice } from '@reduxjs/toolkit';

const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState: false, 
  reducers: {
    setEnrollmentStatus: (state, action) => {
      return action.payload;
    },
  },
});

export const { setEnrollmentStatus } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
