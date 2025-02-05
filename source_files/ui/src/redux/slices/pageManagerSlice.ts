import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentPage: 'auth'
};

const pageManagerSlice = createSlice({
	name: 'pageManager',
	initialState,
	reducers: {
		setPage: (state: any, action: PayloadAction<any>) => {
			state.currentPage = action.payload;
		}
	}
});

export default pageManagerSlice.reducer;
export const pageManagerActions = pageManagerSlice.actions;
