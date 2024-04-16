import {motion, MotionConfig} from 'framer-motion';
import {useRouter} from "next/router";

const HamburgerMenu = ({active, setActive}) => {
    const router = useRouter();

    return (
        <MotionConfig transition={{duration: 0.5}}>
            <motion.button
                onClick={() => {
                    setActive((pv) => !pv);
                }}
                className='relative w-12 lg:hidden h-12 z-[1000]'
                animate={active ? 'open' : 'close'}
            >
                <motion.span
                    style={{
                        top: '30%',
                        left: '50%',
                        x: '-50%',
                        y: '-50%',
                    }}
                    className={`absolute w-7 h-[2px]  ${router.asPath === '/' || router.asPath.includes('/admin') ? 'bg-white' : 'bg-black'}`}
                    variants={{
                        open: {
                            top: ['30%', '50%', '50%'],
                            rotate: ['0deg', '0deg', '45deg'],
                        },
                        close: {
                            top: ['50%', '50%', '30%'],
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
                    className={`absolute w-7 h-[2px] ${router.asPath === '/' || router.asPath.includes('/admin') === '/' ? 'bg-white' : 'bg-black'}`}
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
                        bottom: '30%',
                        left: '50%',
                        x: '-50%',
                        y: '50%',
                    }}
                    className={`absolute w-7 h-[2px]  ${router.asPath === '/' || router.asPath.includes('/admin') === '/' ? 'bg-white' : 'bg-black'}`}
                    variants={{
                        open: {
                            bottom: ['30%', '50%', '50%'],
                            rotate: ['0deg', '0deg', '-45deg'],
                        },
                        close: {
                            bottom: ['50%', '50%', '30%'],
                            rotate: ['-45deg', '0deg', '0deg'],
                        },
                    }}
                ></motion.span>
            </motion.button>
        </MotionConfig>
    );
};

export default HamburgerMenu;
