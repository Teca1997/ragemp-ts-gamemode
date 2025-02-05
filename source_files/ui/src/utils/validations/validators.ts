import * as Yup from 'yup';

export const EmailValidator = Yup.string().email('Email must be in correct format!');

export const PasswordValidator = Yup.string().min(
	8,
	'Password must be at least 8 characters long!'
);
