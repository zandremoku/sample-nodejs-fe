import SignupForm from '@/components/signup-form';
import Link       from 'next/link';

export default function SignupPage() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-white dark:bg-black">
			<div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-black dark:text-white">
					Sign Up
				</h1>
				<SignupForm></SignupForm>
				<div>
					<Link
						href="/login"
						prefetch
						className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset"
					>Login</Link>
				</div>
			</div>
		</div>
	);
}
