import type {Metadata}      from 'next';
import {Geist, Geist_Mono}  from 'next/font/google';
import './globals.css';
import {AppContextProvider} from '@/context/app.context';
import ToastProvider from '@/components/toast-provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin']
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin']
});

export const metadata: Metadata = {
	title: 'Sample App (Auth, Forms, Lists)',
	description: 'Sample Next.Js App with NodeJs backend using Postgres db via sequelize, everything deployed on Vercel.'
};

export default function RootLayout({
									   children
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
		<AppContextProvider lang={'en'}>
			{children}
			<ToastProvider />
		</AppContextProvider>
		</body>
		</html>
	);
}
