'use client';

import {useContext, useState} from 'react';
import InputField             from '@/components/input';
import {loginUser}            from '@/dbActions/auth';
import {Bounce, toast}        from 'react-toastify';
import {useRouter}            from 'next/navigation';
import {AppContext}           from '@/context/app.context';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const {dispatch, state} = useContext(AppContext);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		const response = await loginUser({email, password});
		if (response.success) {
			dispatch({type: 'set-is-authenticated', payload: true});
			await router.push('/');
		} else {
			toast.error(response.error);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputField
				type="email"
				value={email}
				setValue={setEmail}
				label="Email"
			/>
			<InputField
				type="password"
				value={password}
				setValue={setPassword}
				label="Password"
			/>
			<button
				type="submit"
				className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-200"
			>
				Login
			</button>
		</form>
	);
};

export default LoginForm;
