import { AuroraBackground } from '@/components/ui/aurora-background';
import { FloatingNav } from '@/components/ui/floating-navbar';
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react';
import { FcDocument } from 'react-icons/fc';
export default async function Home() {
	const navItems = [
		{
			name: 'Home',
			link: '/',
			icon: <IconHome className='h-4 w-4 text-neutral-500 dark:text-white' />,
		},
		{
			name: 'Docs',
			link: 'https://github.com/PatelYash7/saas-template',
			icon: <FcDocument className='h-4 w-4 text-neutral-500 dark:text-white' />,
		},
	];
	return (
		<>
			<FloatingNav navItems={navItems} />
			<AuroraBackground className='px-48'>
				<div className='text-3xl md:text-5xl font-bold dark:text-white text-center'>
					Effortless NextJS Starter Kit for Developers
				</div>
				<div className='py-4 text-xl text-gray-400 dark:text-gray-400'>In cmd type <span className='text-white font-bold'> npx next-development-kit </span>to get started</div>
				<p className='text-xl md:text-xl px-24 py-8 font-semibold dark:text-gray-400 text-gray-400  text-center'>
					This template is designed for modern developers who want to focus on
					business logic while minimizing setup time.
				</p>
			</AuroraBackground>
		</>
	);
}
