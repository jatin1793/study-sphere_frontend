import { configureStore } from '@reduxjs/toolkit';
import enrollmentReducer from './reducers/enrollmentSlice.js';
import followingReducer from './reducers/followingSlice.js';

const store = configureStore({
  reducer: {
    enrollment: enrollmentReducer,
    follow: followingReducer,
  },
});

export default store;
