import { Button, Stack, Typography } from '@mui/material';
import { Form, Formik, FormikHelpers } from 'formik';

import { AuthFormWrapper } from '../StyledComponents';
import { Client } from '@shared';
import { LoginValidationSchema } from '../../utils/validations/validationSchemas';
import TextField from '@mui/material/TextField';
import { Types } from '../../../../shared';

function RegisterForm() {
	return (
		<AuthFormWrapper>
			<Stack sx={{ flexDirection: 'row', justifyContent: 'center', paddingBottom: '2rem' }}>
				<Typography fontSize={20} fontWeight={'bold'}>
					Register
				</Typography>
			</Stack>
			<Formik
				initialValues={{ username: '', email: '', password: '', repeatPassword: '' }}
				onSubmit={async (
					values: Types.RegisterFormValues,
					{ resetForm }: FormikHelpers<Types.RegisterFormValues>
				) => {
					if (window.mp) {
						const result = await mp.events.callProc(
							Client.Events.Auth.Register,
							JSON.stringify(values)
						);
						console.log(result);
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
									label="Email"
									type="email"
									name="email"
									placeholder="Email....."
									value={formik.values.email}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={formik.touched.email && Boolean(formik.errors.email)}
									helperText={formik.touched.email && formik.errors.email}
								/>

								<TextField
									id="outlined-error-helper-text3"
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

								<TextField
									id="outlined-error-helper-text4"
									size="small"
									label="Repeat password"
									type="password"
									name="repeatPassword"
									placeholder="Repeat password....."
									value={formik.values.repeatPassword}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.repeatPassword &&
										Boolean(formik.errors.repeatPassword)
									}
									helperText={
										formik.touched.repeatPassword &&
										formik.errors.repeatPassword
									}
								/>
							</Stack>
							<Button
								variant="contained"
								type="submit"
								disabled={formik.isSubmitting}
								fullWidth
							>
								{formik.isSubmitting ? 'Processing...' : 'Register'}
							</Button>
						</Stack>
					</Form>
				)}
			</Formik>
		</AuthFormWrapper>
	);
}

export default RegisterForm;
