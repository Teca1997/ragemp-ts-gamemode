import { BottomNavigation, BottomNavigationAction, Stack } from '@mui/material';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { CEF } from '@shared';
import { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useAppDispatch } from '../../redux/hooks';
import { authActions } from '../../redux/slices/authSlice';

function Auth() {
	const [value, setValue] = useState(0);
	const dispatch = useAppDispatch();

	mp.events.add(CEF.Events.Auth.SetAccountData, (data: string) =>
		dispatch(authActions.setAuthInfo(JSON.parse(data)))
	);

	return (
		<Stack sx={{ height: '100%' }}>
			<Stack
				sx={{
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '1rem',
					flex: 1
				}}
			>
				{value == 0 ? <LoginForm /> : <RegisterForm />}

				<BottomNavigation
					showLabels
					value={value}
					onChange={(_event, newValue) => {
						setValue(newValue);
					}}
					sx={{
						borderRadius: '1rem',
						gap: '1rem',
						position: 'absolute',
						bottom: 0
					}}
				>
					<BottomNavigationAction label="Login" icon={<LoginIcon />} />
					<BottomNavigationAction label="Register" icon={<AppRegistrationIcon />} />
				</BottomNavigation>
			</Stack>
		</Stack>
	);
}

export default Auth;
