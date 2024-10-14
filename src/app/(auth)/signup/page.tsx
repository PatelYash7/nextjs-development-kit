'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Eye, Mail, User, Phone } from 'lucide-react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchemaSignup, UserSchemaSignupType } from '@/zod/authentication';
import { useState } from 'react';

export default function SignUpPage() {
	const router = useRouter();
	const [visible, setVisible] = useState(true);
	const [cvisible, setcVisible] = useState(true);
	const [error, setError] = useState('');
	const onSubmit = async (e: UserSchemaSignupType) => {
		const res = await signIn('credentials', {
			email: e.Email,
			name: e.Name,
			number: e.MobileNumber,
			password: e.Password,
			redirect: false,
		});
		if (res?.ok) {
			router.push('/');
		} else {
			setError('If you have account, please try signin');
		}
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserSchemaSignupType>({
		mode: 'onChange',
		resolver: zodResolver(UserSchemaSignup),
	});
	return (
		<div className='min-h-screen py-8 flex items-center justify-center bg-black bg-[linear-gradient(rgba(0,0,0,.5)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,.5)_2px,transparent_2px)] bg-[size:50px_50px]'>
			<Card className='w-full max-w-md bg-[#111] text-white border-none shadow-2xl'>
				<CardHeader className='space-y-1 text-center'>
					<h1 className='text-3xl font-bold tracking-tight mb-2'>
						Product Name
					</h1>
					<p className='text-sm text-gray-400'>Short Description of Product</p>
					<p className='text-sm text-gray-400'>
						Already have an account?{' '}
						<Link href='/signin' className='text-blue-500 hover:underline'>
							signin.
						</Link>
					</p>
				</CardHeader>
				<CardContent className='space-y-4'>
					<Button
						className='w-full bg-[#222] hover:bg-[#333] text-white'
						variant='outline'
						onClick={() => {
							signIn('google', { callbackUrl: '/' });
						}}
					>
						<FcGoogle className='mr-2 h-4 w-4' />
						Sign up with Google
					</Button>
					<div className='relative'>
						<div className='absolute inset-0 flex items-center'>
							<span className='w-full border-t border-gray-700' />
						</div>
						<div className='relative flex justify-center text-xs uppercase'>
							<span className='bg-[#111] px-2 text-gray-400'>OR</span>
						</div>
					</div>
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						<div className='space-y-2'>
							<label
								htmlFor='email'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Email
							</label>
							<div className='relative'>
								<Input
									{...register('Email')}
									id='email'
									placeholder='microplacer@hotmail.com'
									className='bg-[#222] border-gray-700 text-white pl-10'
								/>
								<Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							</div>
						</div>

						{errors.Email?.message && (
							<p className='text-sm text-red-600 text-start '>
								{errors.Email.message}
							</p>
						)}

						<div className='space-y-2'>
							<label
								htmlFor='name'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Name
							</label>
							<div className='relative'>
								<Input
									{...register('Name')}
									id='name'
									placeholder='John Doe'
									className='bg-[#222] border-gray-700 text-white pl-10'
								/>
								<User className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							</div>
						</div>
						{errors.Name?.message && (
							<p className='text-sm text-red-600 text-start'>
								{errors.Name?.message}
							</p>
						)}
						<div className='space-y-2'>
							<label
								htmlFor='number'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Number
							</label>
							<div className='relative'>
								<Input
									id='number'
									placeholder='Enter your Mobile Number'
									className='bg-[#222] border-gray-700 text-white pl-10'
									{...register('MobileNumber')}
								/>
								<Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
							</div>
						</div>
						{errors.MobileNumber?.message && (
							<p className='text-sm text-red-600 text-start'>
								{errors.MobileNumber?.message}
							</p>
						)}
						<div className='space-y-2'>
							<label
								htmlFor='password'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Password
							</label>
							<div className='relative'>
								<Input
									{...register('Password')}
									id='password'
									type={visible ? 'password' : 'text'}
									placeholder='Enter Your password'
									className='bg-[#222] border-gray-700 text-white pr-10'
								/>
								<Eye
									onClick={() => {
										setVisible((prev) => !prev);
									}}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer'
								/>
							</div>
						</div>
						{errors.Password?.message && (
							<p className='text-sm text-red-600 text-start'>
								{String(errors.Password.message)}
							</p>
						)}
						<div className='space-y-2'>
							<label
								htmlFor='confirm-password'
								className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
							>
								Confirm Password
							</label>
							<div className='relative'>
								<Input
									type={cvisible ? 'password' : 'text'}
									id='confirm-password'
									{...register('confirmPassword')}
									placeholder='Confirm password'
									className='bg-[#222] border-gray-700 text-white pr-10'
								/>
								<Eye
									onClick={() => {
										setcVisible((prev) => !prev);
									}}
									className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer'
								/>
							</div>
						</div>
						{errors.confirmPassword?.message && (
							<p className='text-sm text-red-600 text-start'>
								{String(errors.confirmPassword.message)}
							</p>
						)}
						<Button
							type='submit'
							className='w-full my-4 bg-blue-600 hover:bg-blue-700 text-white'
						>
							Sign up
						</Button>
						{error && (
							<div className='text-sm text-red-600 text-center py-2 font-semibold'>
								{error}
							</div>
						)}
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
