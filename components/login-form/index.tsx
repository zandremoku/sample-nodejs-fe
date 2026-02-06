'use client';

import {useState}                      from 'react';
import InputField                      from '@/components/input';
import {loginUser}                     from '@/dbActions/auth';
import {Bounce, toast, ToastContainer} from 'react-toastify';
import {useRouter}                     from 'next/navigation';

const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Login attempt:', {email, password});
		const response = await loginUser({email, password});
		if (response.success){
			toast.success(response.success, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce
			});
			await router.push('/');
		} else {
			toast.error(response.error, {
				position: 'top-right',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: false,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: 'light',
				transition: Bounce
			});
		}
	};

	return <>
		<ToastContainer
			position="top-right"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			aria-label="toast"
			transition={Bounce}
		/>
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
				className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-200"
			>
				Login
			</button>
		</form>
	</>;
};

export default LoginForm;
