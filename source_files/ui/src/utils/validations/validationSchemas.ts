import * as Yup from 'yup';

export const LoginValidationSchema = Yup.object({
	username: Yup.string().max(32, 'Username cant be more then 32 characters long!'),
	password: Yup.string().min(8, 'Password must be at least 8 characters long!')
});
