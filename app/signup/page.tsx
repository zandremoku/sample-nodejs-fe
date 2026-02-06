import SignupForm from '@/components/signup-form';

export default function SignupPage() {
	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-white">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-black">
					Sign Up
				</h1>
				<SignupForm></SignupForm>
			</div>
		</div>
	);
}
