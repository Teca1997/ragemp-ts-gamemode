import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import characterCreatorReducer from './slices/characterCreatorSlice';
import pageManagerReducer from './slices/pageManagerSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		pageManager: pageManagerReducer,
		characterCreator: characterCreatorReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
