"use client";

import { motion } from "motion/react";

export default function NotFound() {
  return (
    <motion.div transition={{duration: 2}} animate={{ opacity: 1 }} initial={{ opacity: 0 }} style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      Not found in this orbit.
    </motion.div>
  );
}
