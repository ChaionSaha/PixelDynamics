import { motion, MotionConfig } from 'framer-motion';
import { useState } from 'react';

const HamburgerMenu = () => {
	const [active, setActive] = useState(false);

	return (
		<MotionConfig transition={{ duration: 0.5 }}>
			<motion.button
				onClick={() => {
					setActive((pv) => !pv);
				}}
				className='relative w-20 h-20 border'
				animate={active ? 'open' : 'close'}
			>
				<motion.span
					style={{
						top: '35%',
						left: '50%',
						x: '-50%',
						y: '-50%',
					}}
					className='absolute w-10 h-1 bg-black'
					variants={{
						open: {
							top: ['35%', '50%', '50%'],
							rotate: ['0deg', '0deg', '45deg'],
						},
						close: {
							top: ['50%', '50%', '35%'],
							rotate: ['45deg', '0deg', '0deg'],
						},
					}}
				></motion.span>
				<motion.span
					style={{
						top: '50%',
						left: '50%',
						x: '-50%',
						y: '-50%',
					}}
					className='absolute w-10 h-1 bg-black'
					variants={{
						open: {
							rotate: ['0deg', '0deg', '45deg'],
						},
						close: {
							rotate: ['45deg', '0deg', '0deg'],
						},
					}}
				></motion.span>
				<motion.span
					style={{
						bottom: '35%',
						left: '50%',
						x: '-50%',
						y: '50%',
					}}
					className='absolute w-10 h-1 bg-black'
					variants={{
						open: {
							bottom: ['35%', '50%', '50%'],
							rotate: ['0deg', '0deg', '-45deg'],
						},
						close: {
							bottom: ['50%', '50%', '35%'],
							rotate: ['-45deg', '0deg', '0deg'],
						},
					}}
				></motion.span>
			</motion.button>
		</MotionConfig>
	);
};

export default HamburgerMenu;
