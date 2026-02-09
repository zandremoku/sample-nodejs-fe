'use client';

import InputField      from '@/components/input';
import {useState}      from 'react';
import {Bounce, toast} from 'react-toastify';
import {createUser}    from '@/dbActions/auth';
import {useRouter}     from 'next/navigation';

interface SignUpFormParams {
	onSomething?: (p: { a: string }) => void;
}

const SignupForm: React.FC<SignUpFormParams> = (props) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Signup attempt:', {username, email, password});
		if (confirmPassword !== password) {
			toast.error('Password and Confirm Password should be the same');
			return;
		}
		// props.onSomething({a});
		const response = await createUser({username, email, password, confirmPassword});
		if (response.success) {
			setEmail('');
			setPassword('');
			setConfirmPassword('');
			toast.success(response.success);
			await router.push('/login');
		} else {
			toast.error(response.error);
		}

	};
	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<InputField
				type="text"
				value={username}
				setValue={setUsername}
				label="Username"
				required={true}
			/>
			<InputField
				type="email"
				value={email}
				setValue={setEmail}
				label="Email"
				required={true}
			/>
			<InputField
				type="password"
				value={password}
				setValue={setPassword}
				label="Password"
				required={true}
			/>
			<InputField
				type="password"
				value={confirmPassword}
				setValue={setConfirmPassword}
				label="Password"
				required={true}
			/>
			<button
				type="submit"
				disabled={!password || !username || !email || !confirmPassword}
				className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200"
			>
				Sign Up
			</button>
		</form>
	);
};

export default SignupForm;
