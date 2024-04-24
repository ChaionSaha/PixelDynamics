import { motion } from "framer-motion";

const SharedLayout = ({children}) => (
    <motion.div
        initial={{x: 0, y: 0, opacity: 0}}
        animate={{x: 0, y: 0, opacity: 1}}
        exit={{x: 0, y: 0, opacity: 0}}

    >
        {children}
    </motion.div>
);
export default SharedLayout;