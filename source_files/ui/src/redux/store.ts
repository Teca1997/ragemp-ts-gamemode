import authReducer from './slices/authSlice';
import { configureStore } from '@reduxjs/toolkit';
import pageManagerReducer from './slices/pageManagerSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		pageManager: pageManagerReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
