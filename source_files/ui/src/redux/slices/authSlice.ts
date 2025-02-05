import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Types } from '@shared';

const initialState: { authInfo: Types.AccountData } = {
	authInfo: {
		characters: [],
		username: '',
		email: '',
		role: { name: '', description: '', color: '' }
	}
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuthInfo: (state: any, action: PayloadAction<any>) => {
			state.authInfo = action.payload;
		}
	}
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
