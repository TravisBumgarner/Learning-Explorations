import { motion } from "framer-motion"

const MotionLib = () => {
    return (
        <div>
        <h1>Motion Library</h1>
        <motion.p animate={{ x: 100 }} >
            hi. default, 100px
        </motion.p>
        <motion.p transition={{duration: 1}} animate={{ x: 100 }} >
            hi. 1s, 200px
        </motion.p>
        <motion.p transition={{duration: 2}} animate={{ x: 200 }} >
            hi. 2s, 300px
        </motion.p>
        </div>
    );
}

export default MotionLib;