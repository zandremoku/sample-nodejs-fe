import LoginForm from '@/components/login-form';

export default async function LoginPage() {

	return (
		// use dark:bg-gray-900 to support dark mode
		<div className="flex flex-col min-h-screen items-center justify-center bg-white">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-black">
					Login
				</h1>
				<LoginForm></LoginForm>
			</div>
		</div>
	);
}
