import { BottomNavigation, BottomNavigationAction, Stack } from '@mui/material';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginForm from '../../components/LoginForm/LoginForm';
import LoginIcon from '@mui/icons-material/Login';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
import { useState } from 'react';

function Auth() {
	const [value, setValue] = useState(0);
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
