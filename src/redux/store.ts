import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculator';
// import modalSlice from './slices/modal';

export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    // modal: modalSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
