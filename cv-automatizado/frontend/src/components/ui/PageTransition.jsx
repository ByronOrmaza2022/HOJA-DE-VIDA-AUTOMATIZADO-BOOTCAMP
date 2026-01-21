import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function PageTransition({ children }) {
  const location = useLocation();
  // 🎯 Key solo por sección raíz
  const sectionKey = "/" + location.pathname.split("/")[1];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={sectionKey}
        initial={{
          opacity: 0,
          scale: 0.985
        }}
        animate={{
          opacity: 1,
          scale: 1
        }}
        exit={{
          opacity: 0,
          scale: 1.015
        }}
        transition={{
          duration: 0.28,
          ease: "easeOut"
        }}
        style={{
          height: "100%",
          overflow: "hidden"
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
