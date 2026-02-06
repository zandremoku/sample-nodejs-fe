import LoginForm from '@/components/login-form';

export default async function LoginPage() {

	return (
		<div className="flex flex-col min-h-screen items-center justify-center bg-white dark:bg-black">
			<div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
				<h1 className="text-3xl font-bold text-center text-black dark:text-white">
					Login
				</h1>
				<LoginForm></LoginForm>
			</div>
		</div>
	);
}
