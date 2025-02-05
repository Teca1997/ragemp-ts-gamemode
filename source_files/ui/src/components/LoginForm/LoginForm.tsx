import { Button, Stack, Typography } from '@mui/material';
import { Client, Types } from '@shared';
import { Form, Formik, FormikHelpers } from 'formik';

import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux';
import { authActions } from '../../redux/slices/authSlice';
import { LoginValidationSchema } from '../../utils/validations/validationSchemas';
import { AuthFormWrapper } from '../StyledComponents';
import { ToastManager } from '../Toast/ToastManager';

function LoginForm() {
	const dispatch = useDispatch();

	async () => {
		await mp.events.callProc(
			Client.Events.Auth.Login,
			JSON.stringify({ username: 'test1', password: 'password' })
		);
	};

	return (
		<AuthFormWrapper>
			<Stack sx={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: '2rem' }}>
				<Typography fontSize={20} fontWeight={'bold'}>
					Welcome!
				</Typography>
			</Stack>

			<Formik
				initialValues={{ username: '', password: '' }}
				onSubmit={async (
					values: Types.LoginFormValues,
					{ resetForm }: FormikHelpers<Types.LoginFormValues>
				) => {
					if (window.mp) {
						const result: { account: any; msgs: string[] } = JSON.parse(
							await mp.events.callProc(
								Client.Events.Auth.Login,
								JSON.stringify(values)
							)
						);
						if (result.account) {
							mp.trigger(Client.Events.Auth.StopAuthCameras);
							mp.trigger(Client.Events.CharacterSelector.Start);

							dispatch(
								authActions.setAuthInfo({
									username: result.account.username,
									email: result.account.email,
									role: result.account.role,
									characters: result.account.characters
								})
							);

							ToastManager.instance.success('Logged in!');
						} else {
							result.msgs.map((msg) => {
								ToastManager.instance.warning(msg);
							});
						}
					}
					resetForm();
				}}
				validationSchema={LoginValidationSchema}
			>
				{(formik) => (
					<Form>
						<Stack sx={{ gap: '2rem' }}>
							<Stack sx={{ gap: '1rem' }}>
								<TextField
									id="outlined-error-helper-text1"
									size="small"
									label="Username"
									type="username"
									name="username"
									placeholder="Username....."
									value={formik.values.username}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.username && Boolean(formik.errors.username)
									}
									helperText={formik.touched.username && formik.errors.username}
								/>

								<TextField
									id="outlined-error-helper-text2"
									size="small"
									label="Password"
									type="password"
									name="password"
									placeholder="Password....."
									value={formik.values.password}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.password && Boolean(formik.errors.password)
									}
									helperText={formik.touched.password && formik.errors.password}
								/>
							</Stack>

							{
								<Button
									variant="contained"
									type="submit"
									disabled={formik.isSubmitting}
									fullWidth
								>
									{formik.isSubmitting ? 'Processing...' : 'Sign in'}
								</Button>
							}
						</Stack>
					</Form>
				)}
			</Formik>
		</AuthFormWrapper>
	);
}

export default LoginForm;
