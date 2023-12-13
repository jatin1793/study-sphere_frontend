import { configureStore } from '@reduxjs/toolkit';
import enrollmentReducer from './reducers/enrollmentSlice.js';
import followingReducer from './reducers/followingSlice.js';
import likedReducer from './reducers/likedSlice.js';

const store = configureStore({
  reducer: {
    enrollment: enrollmentReducer,
    liked: likedReducer,
    follow: followingReducer,
  },
});

export default store;
