import Link                              from 'next/link';
import {useContext, useEffect, useState} from 'react';
import {checkAuth, logOut}               from '@/dbActions/auth';
import {useRouter}                       from 'next/navigation';
import {toast}                           from '@/lib/toast';
import {AppContext}                      from '@/context/app.context';

export default function Header() {
	const router = useRouter();

	const {dispatch, state} = useContext(AppContext);

	useEffect(() => {
		const fetchLoggedInUser = async () => {
			try {
				const response = await checkAuth();
				if (response.success) {
					dispatch({type: 'set-is-authenticated', payload: true})
				} else {
					dispatch({type: 'set-is-authenticated', payload: false})
				}
			} catch (error) {
			}
		};

		fetchLoggedInUser();
	}, []);

	const logoutHandler = async () => {
		const response = await logOut();
		if (response.error) {
			toast.error(response.error);
		}
		dispatch({type: 'set-is-authenticated', payload: false})
		router.push('/login');
	};

	return (
			<nav id="header" className="w-full z-30 top-10 py-1 bg-white shadow-lg border-b border-b-gray-500">
				<div className="w-full flex items-center justify-between mt-0 px-6 py-2">
					<div className=" flex items-center w-1/2 md:w-3/4 " id="menu">
						<ul className="flex items-center justify-between text-base text-black pt-0">
							<li>
								<Link
									className="inline-block no-underline hover:text-gray-700 font-medium text-lg py-2 px-4 lg:-ml-2"
									href="/"
								>
									My Sample App
								</Link>
							</li>
						</ul>
					</div>
					<div
						className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4"
						id="nav-content"
					>
						<div className="auth flex items-center w-full md:w-full">
							{state.isAuthenticated ? ( <>
									<Link
										href="/my-travel-experiences"
										className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700 whitespace-nowrap"
									>
										My travel experiences
									</Link>
									<button
										onClick={logoutHandler}
										className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700 whitespace-nowrap"
									>
										Log Out
									</button>
								</>

							) : (
								<>
									<Link
										href="/login"
										className="bg-transparent text-gray-800  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
									>
										Sign in
									</Link>
									<Link
										href="/signup"
										className="bg-blue-600 text-gray-200  p-2 rounded  hover:bg-blue-500 hover:text-gray-100"
									>
										Sign up
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</nav>
	);
}
