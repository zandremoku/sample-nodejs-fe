import {NextResponse, type NextRequest} from 'next/server';
import {jwtVerify}                      from 'jose';

const publicRoutes = ['/login', '/signup', '/api'];

const byPassPaths = ['/images', 'assets', '/_next', '/favico.ico'];


export async function middleware (request: NextRequest){
	const path = request.nextUrl.pathname;
	if(byPassPaths.some(p=>path.startsWith(p)) || path.startsWith('api')){
		return NextResponse.next();
	}

	const session = request.cookies.get('sessionId')?.value;

	let decoded = null;

	if(session){
		try {
			const secret = new TextEncoder().encode(process.env.JWT_KEY);
			const {payload} = await jwtVerify(session, secret);
			decoded = payload;
		}catch (e){
			const response = NextResponse.redirect(new URL('/login', request.url));
			response.cookies.delete('sessionId');
			return response;
		}
	}

	if(!publicRoutes.includes(path) && !decoded){
		const loginUrl = new URL('/login', request.url);
		return NextResponse.redirect(loginUrl);
	}

	if(publicRoutes.includes(path) && decoded && !path.startsWith('/api')){
		const homeUrl = new URL('/', request.url);
		return NextResponse.redirect(homeUrl);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!_next/static|_next/image|favicon.ico|assets|images).*)"],
};
