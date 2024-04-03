import {motion} from "framer-motion";

const SharedLayout = ({children}) => (
    <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        
    >
        {children}
    </motion.div>
);
export default SharedLayout;