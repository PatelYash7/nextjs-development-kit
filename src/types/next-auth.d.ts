//You can add your types for your session and JWT data


import 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
	interface User {
		
	}
	interface Session {
		user: {
		} & DefaultSession['user'];
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
	}
}
