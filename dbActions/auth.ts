'use server';

import axios           from 'axios';
import {cookies}       from 'next/headers';
import {jwtVerify}     from 'jose';
import {validateEmail} from '@/helpers/validation';

export interface UserCreatePayload {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface UserLoginPayload {
	email: string;
	password: string;
}

const url = process.env.NEXT_PUBLIC_API_URL;

const createUser = async (payload: UserCreatePayload) => {
	try {
		const {email, password, confirmPassword} = payload;
		if (!email || !validateEmail(email)) {
			return {error: 'Email is required!'};
		}
		if (!password || password.trim().length === 0) {
			return {error: 'Password is required!'};
		}
		if (!confirmPassword || confirmPassword.trim().length === 0) {
			return {error: 'Confirm Password is required!'};
		}
		if (password != confirmPassword) {
			return {error: 'Password does not match'};
		}

		const response = await axios.post(`${url}/user`, {
			...payload,
			email: payload.email.toLowerCase()
		});

		return {success: 'User created Successfully'};
	} catch (err: any) {
		// Prefer API-provided message (e.g., "Email already in use") over generic axios message
		const apiError = err?.response?.data?.error;
		return {error: apiError ?? err.message ?? 'Something went wrong'};
	}
};

const loginUser = async (payload: UserLoginPayload) => {
	try {
		const {email, password} = payload;
		if (!email || !validateEmail(email)) {
			return {error: 'Email is required!'};
		}
		if (!password || password.trim().length === 0) {
			return {error: 'Password is required!'};
		}
		const cookieStore = await cookies();
		const response = await axios.post(`${url}/login`, {
			email: email.toLowerCase(),
			password
		});

		console.log('loginUser', response);
		const token = response.data.token;
		cookieStore.set('sessionId', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			maxAge: 60 * 60 * 2
		});

		return {success: 'Login Successfully'};
	} catch (err: any) {
		const apiError = err?.response?.data?.error;
		return {error: apiError ?? err.message ?? 'Something went wrong'};
	}
};

const logOut = async () => {
	try {
		const cookieStore = await cookies();
		cookieStore.delete('sessionId');

		return {success: true};
	} catch (err: any) {
		const apiError = err?.response?.data?.error;
		return {error: apiError ?? err.message ?? 'Something went wrong'};
	}
};

const checkAuth = async () => {
	try {
		const cookieStore = await cookies();

		const token = cookieStore.get('sessionId')?.value;

		if (token) {
			const secret = new TextEncoder().encode(process.env.JWT_KEY!);
			const {payload} = await jwtVerify(token, secret);

			return {success: true};
		}
		return {success: false};
	} catch (err: any) {
		return {success: false};
	}
};

export {createUser, logOut, loginUser, checkAuth};
