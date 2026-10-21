import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/lib/motion";

type CollapseOutProps = {
  children: ReactNode;
  className?: string;
};

// Va usato come figlio diretto di <AnimatePresence>, con una `key` univoca.
export function CollapseOut({ children, className }: CollapseOutProps) {
  return (
    <motion.div
      exit={{
        opacity: 0,
        x: 48,
        height: 0,
        paddingTop: 0,
        paddingBottom: 0,
        borderBottomWidth: 0,
      }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
