import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'example@xyz.com',
				},
				name: { label: 'Name', type: 'name', placeholder: 'Yash Patel' },
				password: { label: 'Password', type: 'password' },
				number: { label: 'Number', type: 'number' },
			},
			async authorize(credentials: any): Promise<any> {
				try {
					// Authorization Logic for Credentials Signin
				} catch (e) {
					console.log(e);
				}
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.NEXTAUTH_SECRET || 'JaiShreeRaam',
	pages: {
		// You can Specify the specific page for the Custom pages.

		// signIn: '/signin',
		// newUser: '/signup',
	},
	callbacks: {
		async jwt({ token, user, session, trigger }) {
            //handle the jwt token
			return token;
		},
		async session({ token, session }) {
            //handle the session token
			return session;
		},
		async signIn({ account, profile }: any) {
			if (account.provider === 'google') {
				try {
					// Your Signin logic for Login with Google
				} catch (error) {
					console.log(error, 'In Google Provider');
				}
			}
			return true;
		},
	},
};
