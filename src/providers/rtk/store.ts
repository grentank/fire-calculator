import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './slices/calculator';
import modalReducer from './slices/modal';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
    modal: modalReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
