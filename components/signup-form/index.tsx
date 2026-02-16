'use client';

import InputField      from '@/components/input';
import {useState, useTransition}      from 'react';
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
	const [isPending, startTransition] = useTransition();

	const router = useRouter();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		console.log('Signup attempt:', {username, email, password});
		if (confirmPassword !== password) {
			toast.error('Password and Confirm Password should be the same');
			return;
		}
		if (isPending) return;
		startTransition(() => {
			void (async () => {
				try {
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
				} catch (err) {
					toast.error('Something went wrong. Please try again.');
					console.error(err);
				}
			})();
		});

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
				label="Confirm password"
				required={true}
			/>
			<button
				type="submit"
				disabled={isPending || !password || !username || !email || !confirmPassword}
				className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold rounded-lg transition duration-200 flex items-center justify-center gap-2"
			>
				{isPending && <span className="h-4 w-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" aria-hidden/>}
				{isPending ? 'Creating account…' : 'Sign Up'}
			</button>
		</form>
	);
};

export default SignupForm;
