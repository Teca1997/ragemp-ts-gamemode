import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AccountData } from '@shared';

const initialState: { authInfo: AccountData } = {
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
		setAuthInfo: (state: any, action: PayloadAction<AccountData>) => {
			state.authInfo = action.payload;
		}
	}
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
