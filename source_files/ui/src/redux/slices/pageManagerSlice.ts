import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CEF } from '@shared';

const initialState = {
	currentPage: CEF.Pages.Auth
};

const pageManagerSlice = createSlice({
	name: 'pageManager',
	initialState,
	reducers: {
		setPage: (state: any, action: PayloadAction<string>) => {
			state.currentPage = action.payload;
		}
	}
});

export default pageManagerSlice.reducer;
export const pageManagerActions = pageManagerSlice.actions;
