import prisma from '@/db';
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

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
					// Check if User exsist in database.
					const CheckUser = await prisma.user.findFirst({
						where: {
							Email: credentials.email,
						},
					});
					// If no User then Create a Entry in DB.
					if (!CheckUser) {
						const hashedpassword = await bcrypt.hash(credentials.password, 10);
						const User = await prisma.user.create({
							data: {
								Email: credentials.email,
								Name: credentials.name,
								Password: hashedpassword,
								MobileNumber: credentials.number,
								iSGoogle: false,
							},
						});
						return {
							id: User.id,
							email: User.Email,
							name: User.Name,
							number: User.MobileNumber,
						};
					}
					// If isGoogle is true then it means User is authenticated with Google then No password matching.
					if (CheckUser.iSGoogle) {
						return false;
					}
					// If name and Number are there then it is Signup, so return false.
					if (credentials.name && credentials.number) {
						return false;
					}
					// To validate the password for the Login.
					const validatedPassword = await bcrypt.compare(
						credentials.password,
						CheckUser.Password as string,
					);
					// If validatedPassword then return the CheckUser.
					if (validatedPassword) {
						return {
							id: CheckUser.id,
							email: CheckUser.Email,
							name: CheckUser.Name,
							number: CheckUser.MobileNumber,
							role: CheckUser.role,
						};
					}
					return false;
				} catch (e) {
					return false;
				}
			},
		}),
		// Here google provider is given.
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		// You can add your many more oauth providers.
	],
	// Your Secrets
	secret: process.env.NEXTAUTH_SECRET,

	// Your signin signup pages on Custom route.
	pages: {
		signIn: '/signin',
		newUser: '/signup',
	},
	callbacks: {
		async jwt({ token, user, profile, account }) {
			// Check if signin is done by google or credentials.
			if (account?.provider === 'google') {
				const UserExist = await prisma.user.findFirst({
					where: { Email: profile?.email },
				});
				if (UserExist) {
					// Store user ID in token
					user.id = UserExist.id;
				} else {
					const NewUser = await prisma.user.create({
						data: {
							Email: profile?.email as string,
							Name: profile?.name as string,
							picture: profile?.image,
							iSGoogle: true,
						},
					});
					// Store new user's ID in token
					user.id = NewUser.id;
				}
			}
			// if credential signin then we already have a user and you can create an token.
			if (user) {
				token.id = user.id;
				token.name = user.name;
				token.email = user.email;
				token.number = user.number;
				token.picture = user.image;
				token.role = user.role;
			}
			return token;
		},
		async session({ token, session, user }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.number = token.number;
				session.user.image = token.picture;
				session.user.role = token.role;
			}
			return session;
		},
		async signIn({ account, profile, token }: any) {
			if (account.provider === 'google') {
				try {
					const UserExist = await prisma.user.findFirst({
						where: {
							Email: profile.email,
						},
					});

					if (UserExist?.iSGoogle) {
						return profile;
					}
					if (UserExist?.iSGoogle == false) {
						return false;
					}
					if (!UserExist) {
						const NewUser = await prisma.user.create({
							data: {
								Email: profile.email,
								Name: profile.name,
								picture: profile.picture,
								iSGoogle: true,
							},
						});
						token.id = NewUser.id;
						return NewUser;
					}
				} catch (error) {
					// console.log(error, 'In Google Provider');
				}
			}
			return true;
		},
	},
};
